<?php

$from = intval($_GET['from']);
$array = intval($_GET['array'][3]);
echo $array;

$dbname = $_COOKIE["database"];
$host = $_COOKIE["host"];
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];

$con = mysqli_connect($host,$login,$pass,$dbname);
mysqli_select_db($con,$dbname);

$index = 0;
$table_title = 0;
$tables_sql="SHOW TABLES FROM ".$dbname;
$tables_result = mysqli_query($con,$tables_sql);
while($row = mysqli_fetch_array($tables_result)) {
    if ($index == $from) {
        $table_title = $row['Tables_in_'.$dbname];
    }
    $index++;
}

echo "<tr>";
$headers_sql="Select column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='$table_title' AND TABLE_SCHEMA='".$dbname."'";
$headers_result = mysqli_query($con,$headers_sql);
$number_of_columns = 0;
$column_names = array();
while($row = mysqli_fetch_array($headers_result)) {
    echo "<th>" . $row['COLUMN_NAME'] . "</th>";
    $column_names[$number_of_columns] = $row['COLUMN_NAME'];
    $number_of_columns++;
}
echo "</tr>";

$sql="SELECT * FROM `$table_title`";
$result = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    for ($i = 0; $i < $number_of_columns; $i++) {
        echo "<td>" . $row[$column_names[$i]] . "</td>";
    }
    echo "</tr>";
}

mysqli_close($con);
?>