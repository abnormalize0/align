<?php
$dbname = $_COOKIE["database"];
$host = $_COOKIE["host"];
$login = $_COOKIE["login"];
$pass = $_COOKIE["pass"];
$method = $_COOKIE["method"];
try{
	$pdo = "";
	if ($method == 1) {
		$conn = new PDO("mysql:host=".$host.";dbname=".$dbname, $login, $pass);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} else if ($method == 2) {
		$conn = pg_connect("host=".$host." dbname=".$dbname." user=".$login." password=".$pass);
	}
	
	//$pdo = new PDO("mysql:host=".$host.";dbname=".$dbname, $login, $pass);
	//$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	//$pdo->exec("set names utf8");
}catch (PDOException $e){
	$output = 'Невозможно подключиться к серверу БД  '.$e->getMessage();
	Echo "<div class='modal_error'><strong>Ошибка:&nbsp;</strong> $output </div>";
	?>
	<script>
		let date = new Date(Date.now() + 1000);
		date = date.toUTCString();
		document.cookie = "error=1; expires=" + date;
    	window.location.href = "newproject.php";
	</script>
	<?php
	exit();  
}

?>
