<?php include "db.php"; ?>                  <!-- подключается к carcompany. надо сделать страницу, предваряющую эту с предварительным подключением к некой научной базе данных -->
<?php include "tables_fetch.php"; ?>        <!-- теперь есть js массив tables_array с названиями всех таблиц -->
<!DOCTYPE html>
<html lang="ru">
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <meta charset="UTF-8" />
        <title>awesome shit generator</title>
        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="css/properties.css" />
        <link rel="stylesheet" href="css/sqlgenerate.css" />
        <link rel="stylesheet" href="css/paging.css" />
    </head>
    <body>
    
        <div class="substrate" id="substrate"></div>
        <div class="menu" id="textmenu">
            <h1>Добавить элементы</h1>
            <div id="textfield" class="text_baton"> Создать текстовое поле </div>
            <div id="button" class="button_baton"> Создать кнопку </div>
            <div id="editabletext" class="editabletext"> Добавить надпись </div>
            <div id="table" class="table"> Создать таблицу </div>
            
            <h1 style="position: absolute; top: 200px;">Элементы на страницах</h1>
            <div style="position: absolute; overflow-y: auto; overflow-x: hidden; top: 320px; bottom: 100px; width: 200px;" id="tree"></div>
        </div>
        <div style="left: 65px;" id="left" class="hide-reveal"> > </div>
        <div style="left: 65px;" id="leftback" class="hide-reveal_bottom"> </div>

        <div id="settings" class="settings">
            <h1>Настройки</h1>
            Название проекта: <input id="untitled" value="untitled" style="position: absolute;">
            <div class="save_baton"> Сохранить php/CSS </div>
            <div class="save_project_baton"> Сохранить как проект </div>
            <div class="load_project_baton"> Загрузить проект </div>
            <div class="tosql" id="tosql">to sql generator</div>
            <div class="ranges" align="center">
                Настроить тип и шаг перемещения элементов<br>
                Горизональное перемещение: <input name="horizontal" type="radio" id="hper">%<input name="horizontal" type="radio" id="hpix" checked>px<br>
                Вертикальное перемещение: <input name="vertical" type="radio" id="vper" >%<input name="vertical" type="radio" id="vpix" checked>px<br>Процентов
                <input type="range" id="prerange" name="volume"
                       min="1" max="10" value="1">
                <label for="volume"><input id="perdeitid" style="width: 30px;" value="1" onkeydown="return perdeit(event.key)">%</label><br>Пикселей
                <input type="range" id="pixrange" name="cowbell" 
                       min="1" max="100" value="1" step="1">
                <label for="cowbell"><input id="pixeditid" style="width: 30px;" value="1" onkeydown="return pixedit(event.key)">px</label>

              </div>
        </div>

        <div style="right: 125px;" id="right" class="settings-reveal"> ⚙ </div>
        <div style="right: 125px" id="rightback" class="settings-reveal_bottom"> </div>

        <div syyle="right:-300px;" align="center" id="text_input_properties" class="text_input_properties">
            <div align="center" class="props" id="textfieldproperties" style="visibility: hidden;"><h1>Текстовое поле</h1>
            плейсхолдер: <input id="ph">
            <div id='textfieldsetup'></div>
            </div>
            <div align="center" class="props" id="buttonproperties" style="visibility: hidden;"><h1>Кнопка</h1>
                Текст: <textarea cols="20" rows="3" style="resize:none;" id="buttontext"></textarea>
                <br>Действие:<select id="buttonaction">
                <option value=0>Отсутствует</option>
                <option value=1>Принять форму</option>
                <option value=2>Перйти на другую страницу</option>
                </select><div id="buttoption"></div>
                </div>
            <div align="center" class="props" id="textproperties" style="visibility: hidden;"><h1>Текст</h1>
                Текст: <textarea id="texttext"></textarea></div>
            <div align="center" class="props" id="tableproperties" style="visibility: hidden;"><h1>Таблица</h1>
                Заголовки:<br><div class="headers_editor" id="table_headers"></div></div>
            <div align="center" class="props" id="pageproperties" style="visibility: hidden;"><h1>Страница</h1>
                Название: <input id="pagename" maxlength="44"></div>
            <div id="delet" class="delet">Удалить</div>
            <div id="style_editor" class="style_editor"><div id="style_list"></div><div id="style_manage"></div><div id="style_edit"></div></div>
        </div>
        <div class="sqlgenpage" id="sqlgenpage">
            <div id="select_block" class="text_baton"> Вывести данные </div>
            <div id="from_block" class="button_baton"> Из таблицы </div>
            <div id="where_block" class="editabletext"> С условием, что </div>
            <div id="join_block" class="join_block"> Присоединить таблицу </div>
            <div id="order_block" class="order_block"> Сортировать по </div>
            <div class="field" id="field" style="overflow-y: scroll; overflow-x: scroll;  overflow: hidden">
                <button style="top: 200000px; left: 200000px; position: absolute;"></button>
            </div>
            <button onclick="document.getElementById('field').scroll(100000, 100000);"> сброс </button>
            <button onclick="field_close();"> закрыть </button>
        </div>

        <div id="for_hover" class="for_hover"></div>

        <div id="paging_panel" class="paging_panel">
            <div id="pages_part" class="pages_part"></div>
            <div class="add_block" id="add_block"> + </div>
        </div>
        <script src="jszip_lib/dist/jszip.js"></script>
        <script src="javascript/draq.js"></script>
        <script src="javascript/sqlgenerate.js"></script>
        <script src="javascript/menu_buttons.js"></script>
        <script src="javascript/paging.js"></script>
        <script src="javascript/dynamic_content.js"></script>
        <script src="javascript/saving.js"></script>
        <script src="javascript/style_editor.js"></script>
        <script src="javascript/export.js"></script>
        <script src="javascript/import.js"></script>
        <div id="loading_screen"></div>
    </body>
</html>