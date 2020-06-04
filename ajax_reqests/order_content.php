<?php

$table_title = $_GET['send_table'];
$id = $_GET['id'];


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
    while($row = mysqli_fetch_array($headers_result)) {
        echo "<option value=\"`" . $dbname . "`.`" . $table_title[$i] . "`.`" . $row['COLUMN_NAME'] . "`\">" . $row['COLUMN_NAME'] . " из таблицы " . $table_title[$i] . "</option>";
    }
}


echo "</select>";
echo "<select onchange='order_selection(" .$id.")' style=\"width: 105px;\" id=\"order_selection".$id."\">
<option value=''>Не выбрано</option>
<option value=\"1\">Возрастания</option>
<option value=\"2\">Убывания</option>
</select>";

mysqli_close($con);
?>