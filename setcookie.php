Подождите, мы всё подготовим...
<?php
$dbname = $_GET['dbname'];
$host = $_GET['host'];
$login = $_GET['login'];
$pass = $_GET['pass'];
$method = $_GET['method'];
$schema = $_GET['schema'];
?>
<script>
    document.cookie = "database=<?php echo $dbname; ?>"
    document.cookie = "host=<?php echo $host; ?>"
    document.cookie = "login=<?php echo $login; ?>"
    document.cookie = "pass=<?php echo $pass; ?>"
    document.cookie = "method=<?php echo $method; ?>"
    document.cookie = "schema=<?php echo $schema; ?>"
    window.location.href = "index.php";
</script>