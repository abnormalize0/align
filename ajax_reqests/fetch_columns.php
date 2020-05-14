<?php

$table_title = $_GET['send_table'];


$dbname = $_COOKIE["database"];
$host = $_COOKIE["host"];
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];

$con = mysqli_connect($host,$login,$pass,$dbname);
mysqli_select_db($con,$dbname);

$headers_sql="Select column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='".$table_title."' AND TABLE_SCHEMA='".$dbname."'";
echo $table_title;
echo $dbname;
// Select column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='bill' AND TABLE_SCHEMA='carcompany'
$headers_result = mysqli_query($con,$headers_sql);
while($row = mysqli_fetch_array($headers_result)) {
    echo "<option selected>" . $row['COLUMN_NAME'] . "</option>";
}

mysqli_close($con);
?>