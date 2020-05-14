<?php
$dbname = $_COOKIE["database"];
$sql= "SHOW TABLES FROM ".$dbname;
$arr = array();
$result= $pdo->query($sql);
$tables= $result->fetchAll();
?>
<script>
    let tables_array = [];
</script>
<?php foreach ($tables as $table):?>
	<script>
		tables_array.push("<?php echo $table['Tables_in_'.$dbname]; ?>");
	</script>
    <?php
        // $header = $table['Tables_in_'.$dbname];
        // $headers_sql="Select column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='$header'";
        // $result= $pdo->query($headers_sql);
        // $headers= $result->fetchAll();

    ?>
<?php endforeach; ?>

<?php
