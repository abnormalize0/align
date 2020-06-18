<?php
$dbname = $_COOKIE["database"];
$method = $_COOKIE["method"];

$arr = array();
$tables = array();
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
?>
<script>
    let tables_array = [];
</script>
<?php foreach ($tables as $table):?>
	<script>
		tables_array.push("<?php echo $table[$name]; ?>");
	</script>
<?php endforeach; ?>