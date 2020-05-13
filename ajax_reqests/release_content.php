<?php

$q = intval($_GET['from']);
$dbname = $_COOKIE["database"];
$host = $_COOKIE["host"];
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];

$con = mysqli_connect($host,$login,$pass,$dbname);
echo "<?php \$con = mysqli_connect('".$host."','".$login."','".$pass."','".$dbname."');?>";
mysqli_select_db($con,$dbname);

$index = 0;
$table_title = 0;
$tables_sql="SHOW TABLES FROM ".$dbname;
$tables_result = mysqli_query($con,$tables_sql);
while($row = mysqli_fetch_array($tables_result)) {
    if ($index == $q) {
        $table_title = $row['Tables_in_'.$dbname];
        break;
    }
    $index++;
}

echo "<tr>
\t\t<?php \$headers_sql='Select column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=\"".$table_title."\" AND TABLE_SCHEMA=\"".$dbname."\"';
\t\t\$headers_result = mysqli_query(\$con,\$headers_sql);
\t\t\$number_of_columns = 0;
\t\t\$column_names = array();
\t\twhile(\$row = mysqli_fetch_array(\$headers_result)) {
\t\t	echo '<th>' . \$row['COLUMN_NAME'] . '</th>';
\t\t	\$column_names[\$number_of_columns] = \$row['COLUMN_NAME'];
\t\t	\$number_of_columns++;
\t\t}?></tr>
<?php \$sql='SELECT * FROM `".$table_title."`';
\$result = mysqli_query(\$con,\$sql);
while(\$row = mysqli_fetch_array(\$result)) {
    echo '<tr>';
    for (\$i = 0; \$i < \$number_of_columns; \$i++) {
        echo '<td>' . \$row[\$column_names[\$i]] . '</td>';
    }
    echo '</tr>';
}
mysqli_close(\$con);?>
";
mysqli_close($con);
?>