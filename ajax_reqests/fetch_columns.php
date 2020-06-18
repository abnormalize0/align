<?php

$table_title = $_GET['send_table'];

$dbname = $_COOKIE["database"];
$host = $_COOKIE["host"];
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];
$method = $_COOKIE["method"];
$pdo = "";
if ($method == 1) {
    $pdo = new PDO("mysql:host=".$host.";dbname=".$dbname, $login, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $headers_sql="Select column_name as 'column_name' FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='".$table_title."' AND TABLE_SCHEMA='".$dbname."'";
    $result = $pdo->query($headers_sql);
    $tables = $result->fetchAll();
} else if ($method == 2) {
    $line = "host=".$host." dbname=".$dbname." user=".$login." password=".$pass;
    $pdo = pg_connect($line);
    $headers_sql="Select column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='".$table_title."' AND table_catalog='".$dbname."'";
    $result = pg_query($pdo, $headers_sql);
    $tables = pg_fetch_all($result);
}

// $con = mysqli_connect($host,$login,$pass,$dbname);
// mysqli_select_db($con,$dbname);

// $headers_sql="Select column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='".$table_title."' AND table_catalog='".$dbname."'";
// echo $table_title;
// echo $dbname;
// Select column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='bill' AND TABLE_SCHEMA='carcompany'
// $headers_result = mysqli_query($con,$headers_sql);
// while($row = mysqli_fetch_array($headers_result)) {
//     echo "<option selected>" . $row['column_name'] . "</option>";
// }
foreach ($tables as $table):
    echo "<option selected>" . $table['column_name'] . "</option>";
endforeach;

?>