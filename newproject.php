<h1>Создание нового проекта</h1>
<form mthod="post" action="setcookie.php" id="from">
<input placeholder="Название базы данных" name="dbname"><br><br>
<input placeholder="Хост" name="host"><br><br>
<input placeholder="Логин" name="login"><br><br>
<input placeholder="Пароль" name="pass"><br><br>
<button type="submit"> Создать! </button>
</from>
<?php
if ((isset($_COOKIE["error"]))&&($_COOKIE["error"]==1)) {
    echo("<br><br>Ошибка подключения к базе данных. Проверьте правильность ввода данных.");
}
?>