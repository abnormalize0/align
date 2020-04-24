Подождите, мы всё подготовим...
<?php
$dbname = $_GET['dbname'];
$host = $_GET['host'];
$login = $_GET['login'];
$pass = $_GET['pass'];
?>
<script>
    document.cookie = "database=<?php echo $dbname; ?>"
    document.cookie = "host=<?php echo $host; ?>"
    document.cookie = "login=<?php echo $login; ?>"
    document.cookie = "pass=<?php echo $pass; ?>"
    window.location.href = "index.php";
</script>