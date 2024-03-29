<?php

$from = intval($_GET['from']);
if (isset($_GET['select'])) {
    $select = $_GET['select'];
}
if (isset($_GET['where_sign'])) {
    $where_sign = $_GET['where_sign'];
    $where_column = $_GET['where_column'];
    $where_compare = $_GET['where_compare'];
}
if (isset($_GET['join_method'])) {
    $join_method = $_GET['join_method'];
    $to_table = $_GET['to_table'];
    $from_table = $_GET['from_table'];
    $join = $_GET['join'];
}
if (isset($_GET['order_direction'])) {
    $order_direction = $_GET['order_direction'];
    $order_column = $_GET['order_column'];
}

$dbname = $_COOKIE["database"];
$host = $_COOKIE["host"];
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];
$method = $_COOKIE["method"];
if(isset($_COOKIE["schema"])){
    $schema = $_COOKIE["schema"];
}
$pdo = "";
if ($method == 1) {
    $pdo = new PDO("mysql:host=".$host.";dbname=".$dbname, $login, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} else if ($method == 2) {
    $line = "host=".$host." dbname=".$dbname." user=".$login." password=".$pass;
    $pdo = pg_connect($line);
}

$index = 0;
$table_title = 0;
$name = "";
if ($method == 1) {
    $sql= "SHOW TABLES FROM ".$dbname;
    $result = $pdo->query($sql);
    $tables = $result->fetchAll();
    $name = 'Tables_in_'.$dbname;
} else if ($method == 2) {
    $sql= "SELECT table_name FROM information_schema.tables WHERE table_catalog = '".$dbname."' AND table_schema != 'pg_catalog' AND table_schema != 'information_schema'";
    $result = pg_query($pdo, $sql);
    $tables = pg_fetch_all($result);
    $name = 'table_name';
}
foreach ($tables as $table):
    if ($index == $from) {
        $table_title = $table[$name];
    }
    $index++;
endforeach;

echo "<tr>";
if (!isset($select)) {
    $headers_sql="Select column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='$table_title' AND TABLE_SCHEMA='".$dbname."'";
    $headers_result = mysqli_query($con,$headers_sql);
    $number_of_columns = 0;
    $column_names = array();
    while($row = mysqli_fetch_array($headers_result)) {
        $select[$number_of_columns] = $row['COLUMN_NAME'];
        $number_of_columns++;
    }
}

for ($i = 0; $i < count($select); $i++) {
    echo "<th>" . $select[$i] . "</th>";
}
echo "</tr>";

$sql = "";

$sql="SELECT ".$select[0];
$i = 1;
for ($i; $i < count($select); $i++) {
    $sql = $sql.", ".$select[$i];
}
if ((isset($schema))&&($method == 2)) {
    $sql = $sql." FROM `$schema`.`$table_title`";
} else {
    $sql = $sql." FROM `$table_title`";
}
$global_order = false;
if (isset($join_method)) {
    for ($i = 0; $i < count($join_method); $i++) {
        switch ($join_method[$i]) {
            case 1:
                $sql = $sql." INNER JOIN ".$join[$i]." ON (".$from_table[$i]." = ".$to_table[$i] . ")";
                break;
            case 2:
                $sql = $sql." LEFT OUTER JOIN ".$join[$i]." ON (".$from_table[$i]." = ".$to_table[$i] . ")";
                break;
            case 3:
                $sql = $sql." RIGHT OUTER JOIN ".$join[$i]." ON (".$from_table[$i]." = ".$to_table[$i] . ")";
                break;
            case 4:
                $global_order = true;
                $intermediate1 = $sql." LEFT OUTER JOIN ".$join[$i]." ON (".$from_table[$i]." = ".$to_table[$i] . ")";
                $intermediate2 = $sql." RIGHT OUTER JOIN ".$join[$i]." ON (".$from_table[$i]." = ".$to_table[$i] . ")";
                $sql = "((" . $intermediate1 . ") UNION (" . $intermediate2 . "))";
                break;
            case 5:
                $sql = $sql." LEFT OUTER JOIN ".$join[$i]." ON (".$from_table[$i]." = ".$to_table[$i] . ") WHERE " . $to_table[$i] . " is NULL";
                break;
            case 6:
                $sql = $sql." RIGHT OUTER JOIN ".$join[$i]." ON (".$from_table[$i]." = ".$to_table[$i] . ") WHERE " . $to_table[$i] . " is NULL";
                break;
            case 7:
                $global_order = true;
                $intermediate1 = $sql." LEFT OUTER JOIN ".$join[$i]." ON (".$from_table[$i]." = ".$to_table[$i] . ") WHERE " . $to_table[$i] . " is NULL";
                $intermediate2 = $sql." RIGHT OUTER JOIN ".$join[$i]." ON (".$from_table[$i]." = ".$to_table[$i] . ") WHERE " . $to_table[$i] . " is NULL";
                $sql = "((" . $intermediate1 . ") UNION ALL (" . $intermediate2 . "))";
                break;
        }
    }
}
if (isset($where_sign)) {
    $sql = $sql." WHERE ".$where_column[0].$where_sign[0]."'".$where_compare[0]."'";
    for ($i = 1; $i < count($where_sign); $i++) {
        $sql = $sql." AND ".$where_column[$i].$where_sign[$i].$where_compare[$i];
    }
}

if (isset($order_direction)) {
    if($global_order) {
        $divide = explode(".", $order_column);
        $order_column = $divide[2];
    }
    $sql = $sql. " ORDER BY " . $order_column;
    if ($order_direction == 1) {
        $sql = $sql. " ASC";
    } else {
        $sql = $sql. " DESC";
    }
}

if ($method == 1) {
    $result = $pdo->query($sql);
    $tables = $result->fetchAll();
    foreach ($tables as $table):
        echo "<tr>";
        for ($i = 0; $i < count($select); $i++) {
            echo "<td>" . str_replace("`","\"",$table[$i]) . "</td>";
        }
        echo "</tr>";
    endforeach;
} else if ($method == 2) {
    $sql = str_replace("`","\"",$sql);
    $result = pg_query($pdo, $sql);
    for ($i = 0; $i < count($select); $i++) {
        $arr = explode("`.`",$select[$i]);
        $select[$i] = str_replace("`","",$arr[1]);
    }
    while ($row = pg_fetch_assoc($result)) {
        echo "<tr>";
        for ($i = 0; $i < count($select); $i++) {
            echo "<td>" . $row[$select[$i]] . "</td>";
        }
        echo "</tr>";
      }
}
?>