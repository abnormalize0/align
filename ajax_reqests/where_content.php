<?php

$table_title = $_GET['send_table'];
$id = $_GET['id'];


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
    echo "<option>" . $row['COLUMN_NAME'] . "</option>";
}

echo "</select>";
echo "<select onchange='where_selection(" .$id.")' style=\"width: 70px;\" id=\"where_columns_sign".$id."\">
<option value=\"=\">=</option>
<option value=\"<>\">≠</option>
<option value=\"<\"><</option>
<option value=\">\">></option>
<option value=\"<=\">⩽</option>
<option value=\">=\">⩾</option>
<option value=\" LIKE \">LIKE</option>
<option value=\" NOT LIKE \">NOT LIKE</option>
</select>";
echo "<input id=\"where_columns_search".$id."\" style=\"width: 70px;\" oninput='where_selection(".$id.")'>";

mysqli_close($con);
?>