<link rel="stylesheet" href="css/welcome_page.css" />
<div class="connect_dialouge" align="center">
    <h1>Создание нового проекта</h1>
    <form mthod="post" action="setcookie.php" id="from">
    <input required placeholder="Название базы данных" name="dbname"><br><br>
    <input placeholder="Схема (при наличии)" name="schema"><br><br>
    <input required placeholder="Хост" name="host"><br><br>
    <input required placeholder="Логин" name="login"><br><br>
    <input required type = "password"placeholder="Пароль" name="pass"><br><br>
    <select required name="method">
    <option disabled selected>База данных</option>
    <option value = 1>MySQL</option>
    <option value = 2>PostgreSQL</option>
    </select>
    <button type="submit"> Создать! </button>
    </from>
</div>
<?php
if ((isset($_COOKIE["error"]))&&($_COOKIE["error"]==1)) {
    echo("<br><br>Ошибка подключения к базе данных. Проверьте правильность ввода данных.");
}
?>