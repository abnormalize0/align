<?php

$table_title = $_GET['send_table'];
$id = $_GET['id'];
$dynamic_table_id = $_GET['dynamic_table_id'];
$dynamic_table_name = $_GET['dynamic_table_name'];


$dbname = $_COOKIE["database"];
$host = $_COOKIE["host"];
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];

$con = mysqli_connect($host,$login,$pass,$dbname);
mysqli_select_db($con,$dbname);

for ($i = 0; $i < count($table_title); $i++) {
    $headers_sql="Select column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='".$table_title[$i]."' AND TABLE_SCHEMA='".$dbname."'";
    echo $table_title[$i];
    echo $dbname;
    echo $i;
    // Select column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='bill' AND TABLE_SCHEMA='carcompany'
    $headers_result = mysqli_query($con,$headers_sql);
    echo "<option value=''>Не выбрано</option>";
    while($row = mysqli_fetch_array($headers_result)) {
        echo "<option value=\"`" . $dbname . "`.`" . $table_title[$i] . "`.`" . $row['COLUMN_NAME'] . "`\">" . $row['COLUMN_NAME'] . " из таблицы " . $table_title[$i] . "</option>";
    }
}


echo "</select>";
echo "<select onchange='where_selection(" .$id.")' style=\"width: 70px;\" id=\"where_columns_sign".$id."\">
<option value=''>Не выбрано</option>
<option value=\"=\">=</option>
<option value=\"<>\">≠</option>
<option value=\"<\"><</option>
<option value=\">\">></option>
<option value=\"<=\">⩽</option>
<option value=\">=\">⩾</option>
<option value=\" LIKE \">LIKE</option>
<option value=\" NOT LIKE \">NOT LIKE</option>
</select>";
echo "<input id=\"where_columns_search".$id."\" style=\"width: 70px;\" oninput='where_selection(".$id.")'";
if (isset($dynamic_table_id)) {
    echo " list='where_columns_search_list".$id."'><datalist id='where_columns_search_list".$id."'>";
    for ($i = 0; $i < count($dynamic_table_id); $i++) {
        echo "<option value='text field ".$dynamic_table_id[$i]."'>";
    }
    echo "</datalist>";
} else {
    echo ">";
}
mysqli_close($con);
?>