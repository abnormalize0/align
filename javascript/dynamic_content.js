function regular_select(str,id) {
    set_selected(str, id);
    join_arguments();
    sql_exec();
}

function from_select(str,id) {
    select_columns(id, str);
    set_selected(str, id);
    where_check();
    join_arguments();
    sql_exec();
}

function join_method(str,id) {
    //select_columns(id, str);
    join_set_selected(str, id);
    where_check();
    sql_exec();
    join_explanation(str,id);
    join_arguments();
}

function join_table_select(str,id) {
    sql_blocks[id].from_table = null;
    join_from_table(id, str)
    join_columns(id, str);
    set_selected(str, id);
    where_check();
    join_arguments();
    sql_exec();
}

async function select_columns(id, str) {
    if (document.contains(document.getElementById("select_columns" + id))) {
        document.getElementById("select_columns" + id).remove();
    }
    let toinsert = document.getElementById("block" + id);
    let insert_line = "<div id = \"select_columns" + id + "\">Столбцы: <br> <select multiple size='5' id='select_columns_select" + id + "' onchange='reselect(" + id + ")'>";
    let table = tables_array[str];
    let response = await fetch("ajax_reqests/fetch_columns.php?send_table=" + table);
    if (response.ok) {
        let text = await response.text();
        //document.getElementById(table_id).innerHTML = text;
        insert_line = insert_line + text + "</select> </div>";
    }

    toinsert.insertAdjacentHTML('beforeend',insert_line);
    reselect(id);
}

async function join_columns(id, str) {
    if (document.contains(document.getElementById("join_columns" + id))) {
        document.getElementById("join_columns" + id).remove();
    }
    let toinsert = document.getElementById("block" + id);
    let insert_line = "<div id = \"join_columns" + id + "\">Столбцы: <br> <select multiple size='5' id='select_columns_select" + id + "' onchange='join_reselect(" + id + ")'>";//check
    let table = tables_array[str];
    let response = await fetch("ajax_reqests/fetch_columns.php?send_table=" + table);
    if (response.ok) {
        let text = await response.text();
        //document.getElementById(table_id).innerHTML = text;
        insert_line = insert_line + text + "</select> </div>";
    }
    toinsert.insertAdjacentHTML('beforeend',insert_line);
    join_reselect(id);
}

let selected_array = [[],[]];
let join_selected_array = [[],[]];
let selected_len = 0;
let join_selected_len = 0;

function reselect(id) {
    let opt;
    let len = document.getElementById("select_columns_select" + id).options.length;
    let array_index = selected_len;
    for (let i = 0; i < selected_len; i++) {
        if (selected_array[i][0] == id) {
            array_index = i;
            break;
        }
    }
    selected_array[array_index] = [];
    let counter = 2;
    for (let i = 0; i < len; i++) {
        opt = document.getElementById("select_columns_select" + id).options[i];
        
        selected_array[array_index][0] = id;
        
        if (opt.selected) {
            selected_array[array_index][counter] = opt.value;
            counter++;
        }
    }
    selected_array[array_index][1] = counter;
    if (selected_len == array_index) {
        selected_len++;
    }
    sql_exec();
}

function join_reselect(id) {
    let opt;
    let len = document.getElementById("select_columns_select" + id).options.length;
    let array_index = join_selected_len;
    for (let i = 0; i < join_selected_len; i++) {
        if (join_selected_array[i][0] == id) {
            array_index = i;
            break;
        }
    }
    join_selected_array[array_index] = [];
    let counter = 2;
    for (let i = 0; i < len; i++) {
        opt = document.getElementById("select_columns_select" + id).options[i];
        
        join_selected_array[array_index][0] = id;
        
        if (opt.selected) {
            join_selected_array[array_index][counter] = opt.value;
            counter++;
        }
    }
    join_selected_array[array_index][1] = counter;
    if (join_selected_len == array_index) {
        join_selected_len++;
    }
    sql_exec();
}

function set_selected(str, id) {
    sql_blocks[id].selected = str;
}

function join_set_selected(str, id) {
    sql_blocks[id].join_method = str;
}

function join_explanation(str, id) {
    let to_insert = document.getElementById("explanation" + id);
    let insertion;
    switch(str) {
        case '1':
            insertion = "<i>Внутреннее присоединение. Такое присоединение покажет нам данные из таблиц только если условие связывания соблюдается.</i>";
            break;
        case '2':
            insertion = "<i>Внешнее присоединение «слева». Внешнее присоединение включает в себя результаты запроса и добавляются «неиспользованные» строки из одной из таблиц.</i>";
            break;
        case '3':
            insertion = "<i>Внешнее присоединение «справа». Внешнее присоединение включает в себя результаты запроса и добавляются «неиспользованные» строки из одной из таблиц.</i>";
            break;
        case '4':
            insertion = "<i>Объединение «левого» и «правого» внешниего присоединения. Внешнее присоединение включает в себя результаты запроса и добавляются «неиспользованные» строки из из таблиц.</i>";
            break;
        case '5':
            insertion = "<i>Внешнее присоединение «слева», включающее в себя только «неиспользованные» строки из одной из таблиц.</i>";
            break;
        case '6':
            insertion = "<i>Внешнее присоединение «справа», включающее в себя только «неиспользованные» строки из одной из таблиц.</i>";
            break;
        case '7':
            insertion = "<i>Объединение «левого» и «правого» внешниего присоединения, включающее в себя только «неиспользованные» строки из таблиц.</i>";
            break;
        default:
            insertion = "";
            break;
    }
    to_insert.innerHTML = insertion;
}

function join_arguments() {
    for(let i = 0; i < blocks; i++) {
        if(sql_blocks[i].purpose.localeCompare("join") == 0) {
            let search = i;
            let input = "К таблице: <select onchange=\"join_to_table(" + i + ", this.value);\"><option value=\"\">Не выбрано</option>";
            while(((sql_blocks[search].purpose).localeCompare("from") != 0)&&(sql_blocks[search].prev_join_line != null)&&(sql_blocks[search].prev_join_line != "")) {
                search = sql_blocks[search].prev_join_line;
                input = input + "<option>" + tables_array[sql_blocks[search].selected] + "</option>";
            }
            input = input + "</select>";
            if(document.getElementById("join_to" + i).innerHTML.localeCompare(input) != 0) {
                document.getElementById("join_to" + i).innerHTML = input;
                join_to_table(i,tables_array[sql_blocks[i].join_to]);
            }
            let loop = true;
            search = i;
            let allowed = [...tables_array];
            if (sql_blocks[search].prev_join_line != null) {
                search = sql_blocks[search].prev_join_line;
            } else {
                loop = false;
            }
            while(loop) {
                if (sql_blocks[search].purpose.localeCompare("from") == 0) {
                    loop = false;
                    if ((sql_blocks[search].selected != null)&&(sql_blocks[search].selected != "")) {
                        allowed[sql_blocks[search].selected] = null;
                    }
                } else if (sql_blocks[search].prev_join_line != null) {
                    if ((sql_blocks[search].selected != null)&&(sql_blocks[search].selected != "")) {
                        allowed[sql_blocks[search].selected] = null;
                    }
                    search = sql_blocks[search].prev_join_line;
                } else {
                    loop = false;
                }
            }
            let insert = "Таблицу: <select onchange=\"join_table_select(this.value, " + i + ")\"> <option value=\"\"> Не выбрано </option>";
            let rewrite = true;
            for (let j = 0; j < allowed.length; j++) {
                if (allowed[j] != null) {
                    if ((j == sql_blocks[i].selected)&&(sql_blocks[i].selected != "")) {
                        rewrite = false;
                        insert = insert + "<option selected value=\"" + j + "\">";
                    } else {
                        insert = insert + "<option value=\"" + j + "\">";
                    }
                    insert = insert + allowed[j];
                    insert = insert + "</option>";
                }
            }
            insert = insert + "</select>";
            if(rewrite) {
                sql_blocks[i].selected = null;
                
            }
            document.getElementById("join_from" + i).innerHTML = insert;
        }
    }
}

async function join_to_table(id,str) {
    let insert_line = "Правый аргумент: <select onchange=\"sql_blocks[" + id + "].to_table = this.value; sql_exec(); where_check();\"><option value=\"\">Не выбрано</option>";
    if ((str==null)||(str=="")) {
        
    } else {
        let response = await fetch("ajax_reqests/join_columns.php?send_table=" + str);
        if (response.ok) {
            let text = await response.text();
            insert_line = insert_line + text;
        }
    }
    sql_blocks[id].to_table = null;
    insert_line = insert_line + "</select>";
    document.getElementById("right_join" + id).innerHTML = insert_line;
    where_check();
    sql_exec();
}

async function join_from_table(id,str) {
    if (str == "") {
        sql_blocks[id].from_table = null;
    }
    let insert_line = "Левый агрумент: <select onchange=\"sql_blocks[" + id + "].from_table = this.value; sql_exec(); where_check();\"><option value=\"\">Не выбрано</option>";
    let response = await fetch("ajax_reqests/join_columns.php?send_table=" + tables_array[str]);
    if (response.ok) {
        let text = await response.text();
        insert_line = insert_line + text;
    }
    insert_line = insert_line + "</select>";
    document.getElementById("left_join" + id).innerHTML = insert_line;
}

function clearing() {
    for (let i = 0; i < count; i++) {
        if (elements[i].type.localeCompare("table") == 0) {
            let table_to_clear = document.getElementById("el" + i);
            table_to_clear.innerHTML = "<table  border=\"1\" class=\"defaultclass\" style=\"left: " + elements[i].x + "; top:" + elements[i].y +";\" class=\"item\" id=\"el" + i + "\"><tr><th>Таблица</th></tr><td> " + i + " </td></table>";
        }
    }
}

async function sql_exec() {
    table_substitution();
    console.log("EXEC");
    clearing();
    for (let i = 0; i < blocks; i++) {
        if (sql_blocks[i].purpose.localeCompare("select") == 0) {
            let cur_block = i;
            let wtite_to = sql_blocks[cur_block].selected;
            if ((wtite_to == "")||(wtite_to == null)) {
                continue;
            }
            table_id = "el" + wtite_to;
            let request = "";
            let order_found = false;
            while (sql_blocks[cur_block].next_line != null) {
                cur_block = sql_blocks[cur_block].next_line;
                if (sql_blocks[cur_block].purpose.localeCompare("from") == 0) {
                    if (request.search("from") != -1) {
                        document.getElementById("block" + cur_block).style.boxShadow = "0px 0px 5px 5px red";
                    } else {
                        if ((sql_blocks[cur_block].selected == null) || (sql_blocks[cur_block].selected == "")) {
                            continue;
                        }
                        request = request + "from=" + sql_blocks[cur_block].selected + "&";
                        for (let i = 0; i < selected_len; i++) {
                            if (selected_array[i][0] == cur_block) {
                                for (let j = 2; j < selected_array[i][1]; j++) {
                                    request = request + "select[]=`" + tables_array[sql_blocks[cur_block].selected] + "`.`" + selected_array[i][j] + "`&";
                                }
                            }
                        }
                        document.getElementById("block" + cur_block).style.boxShadow = "none";
                        let go_down = cur_block;
                        while (sql_blocks[go_down].next_join_line != null) {
                            go_down = sql_blocks[go_down].next_join_line;
                            if ((sql_blocks[go_down].join_method != null)&&(sql_blocks[go_down].to_table != null)&&(sql_blocks[go_down].from_table != null)&&(sql_blocks[go_down].join_method != "")&&(sql_blocks[go_down].to_table != "")&&(sql_blocks[go_down].from_table != "")) {
                                request = request + "join_method[]=" + sql_blocks[go_down].join_method + "&";
                                request = request + "to_table[]=" + sql_blocks[go_down].to_table + "&";
                                request = request + "from_table[]=" + sql_blocks[go_down].from_table + "&";
                                request = request + "join[]=" + tables_array[sql_blocks[go_down].selected] + "&";
                                for (let i = 0; i < join_selected_len; i++) {
                                    if (join_selected_array[i][0] == go_down) {
                                        for (let j = 2; j < join_selected_array[i][1]; j++) {
                                            request = request + "select[]=`" + tables_array[sql_blocks[go_down].selected] + "`.`" + join_selected_array[i][j] + "`&";
                                        }
                                    }
                                }
                            }
                        } //join_connect_out
                    }
                } else if (sql_blocks[cur_block].purpose.localeCompare("where") == 0) {
                    if ((sql_blocks[cur_block].sign != null)&&(sql_blocks[cur_block].sign != "")&&(sql_blocks[cur_block].column != null)&&(sql_blocks[cur_block].column != "")&&(sql_blocks[cur_block].compare != null)&&(sql_blocks[cur_block].compare != "")&&(sql_blocks[cur_block].compare.search("text field") == -1)) {
                        request = request + "where_sign[]=" + sql_blocks[cur_block].sign + "&";
                        request = request + "where_column[]=" + sql_blocks[cur_block].column + "&";
                        request = request + "where_compare[]=" + sql_blocks[cur_block].compare + "&";
                    }
                } else if (sql_blocks[cur_block].purpose.localeCompare("order") == 0) {
                    if (order_found) {
                        document.getElementById("block" + cur_block).style.boxShadow = "0px 0px 5px 5px red";
                    } else {
                        if ((sql_blocks[cur_block].column != null)&&(sql_blocks[cur_block].column != "")&&(sql_blocks[cur_block].direction != null)&&(sql_blocks[cur_block].direction != "")) {
                            request = request + "order_direction=" + sql_blocks[cur_block].direction + "&";
                            request = request + "order_column=" + sql_blocks[cur_block].column + "&";
                        }
                        order_found = true;
                    }
                }
            }
            if (request.search("from") != -1) {
                
                let response = await fetch("ajax_reqests/interface_content.php?"+request);//+"array[]=1&array[]=2&array[]=3&a=0&b=0&array[]=4");
                if (response.ok) {
                    let text = await response.text();
                    document.getElementById(table_id).innerHTML = text;
                }
                response = await fetch("ajax_reqests/release_content.php?"+request);
                if (response.ok) {
                    let text = await response.text();
                    elementscode[wtite_to].text = text;
                }
            }
        }
    }
    table_substitution();
}

async function where_fill() {
    for (let id = 0; id < blocks; id++) {
        if ((sql_blocks[id].purpose.localeCompare("where") == 0) && (sql_blocks[id].table[0] != null) && (sql_blocks[id].table[0] != "")) {
            if ((document.contains(document.getElementById("where" + id))) && (sql_blocks[id].tochange == 0)) {
                continue;
            }
            let table;
            let search = id;
            while (sql_blocks[search].purpose.localeCompare("select") != 0) {
                search = sql_blocks[search].prev_line;
            }
            table = sql_blocks[search].selected;
            let insert_line = "<div id = \"where" + id + "\">&nbspСтолбец:&nbsp&nbsp&nbsp&nbsp&nbspЗнак:&nbsp&nbsp&nbsp&nbsp&nbsp&nbspЗначение: <br> <select style=\"width: 70px;\" id='where_columns_select" + id + "' onchange='where_selection(" + id + ")'>";
            let request = "";
            for(let i = 0; i < sql_blocks[id].table.length; i++) {
                request = request + "send_table[]=" + tables_array[sql_blocks[id].table[i]] + "&";
            }
            for(let i = 0; i < elements.length; i++) {
                if ((elements[i].type.localeCompare("input") == 0)&&(elements[i].table_rel == table)) {
                    request = request + "dynamic_table_id[]=" + i + "&";
                    request = request + "dynamic_table_name[]=" + elements[i].text + "&";
                }
            }
            request = request + "id=" + id;
            let response = await fetch("ajax_reqests/where_content.php?" + request);
            if (response.ok) {
                let text = await response.text();
                insert_line = insert_line + text + "</div>";
            }
            let toinsert = document.getElementById("where" + id);
            toinsert.innerHTML = insert_line;
            //toinsert.innerHTML = insert_line + "<datalist id='where_columns_select" + id + "'><option value='Boston'><option value='Cambridge'></datalist>";
            sql_blocks[id].connected = true;
        } else if (sql_blocks[id].purpose.localeCompare("where") == 0) {
            let toinsert = document.getElementById("where" + id);
            toinsert.innerHTML = "Соедините этот блок с одним из блоков \"Из таблицы\" для его использования.";
            sql_blocks[id].connected = false;
            sql_blocks[id].column = null;
            sql_blocks[id].sign = null;
            sql_blocks[id].compare = null;
            sql_blocks[id].tochange = 1;
        }
    }
}

async function order_fill() {
    for (let id = 0; id < blocks; id++) {
        if ((sql_blocks[id].purpose.localeCompare("order") == 0) && (sql_blocks[id].table[0] != null) && (sql_blocks[id].table[0] != "")) {
            if ((document.contains(document.getElementById("order" + id))) && (sql_blocks[id].tochange == 0)) {
                continue;
            }
            let insert_line = "<div id = \"order" + id + "\">&nbsp&nbsp&nbsp&nbsp&nbspСтолбец:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspВ порядке:<br> <select style=\"width: 105px;\" id='order_columns_select" + id + "' onchange='order_selection(" + id + ")'>";
            let request = "";
            insert_line = insert_line + "<option value=''> Не выбрано </option>";
            for(let i = 0; i < sql_blocks[id].table.length; i++) {
                request = request + "send_table[]=" + tables_array[sql_blocks[id].table[i]] + "&";
            }
            request = request + "id=" + id;
            let response = await fetch("ajax_reqests/order_content.php?" + request);
            if (response.ok) {
                let text = await response.text();
                //document.getElementById(table_id).innerHTML = text;
                insert_line = insert_line + text + "</div>";
            }
            let toinsert = document.getElementById("order" + id);
            toinsert.innerHTML = insert_line;
            sql_blocks[id].connected = true;
        } else if (sql_blocks[id].purpose.localeCompare("order") == 0) {
            let toinsert = document.getElementById("order" + id);
            toinsert.innerHTML = "Соедините этот блок с одним из блоков \"Из таблицы\" для его использования.";
            sql_blocks[id].direction = null;
            sql_blocks[id].column = null;
            sql_blocks[id].connected = false;
        }
    }
}

function where_selection() {
    for (let id = 0; id < blocks; id++) {
        let sign = document.getElementById( "where_columns_sign" + id );
        let select = document.getElementById( "where_columns_select" + id );
        let search = document.getElementById( "where_columns_search" + id );
        if (((sql_blocks[id].purpose.localeCompare("where") == 0))&&(sql_blocks[id].connected)&&(document.contains(sign))&&(document.contains(select))&&(document.contains(search))) {
            sql_blocks[id].sign = sign.options[sign.selectedIndex].value;
            sql_blocks[id].column = select.options[select.selectedIndex].value;
            sql_blocks[id].compare = search.value;
        }
    }
    join_arguments();
    sql_exec();
}

function order_selection() {
    for (let id = 0; id < blocks; id++) {
        let order_selection = document.getElementById( "order_selection" + id );
        let order_columns_select = document.getElementById( "order_columns_select" + id );
        if (((sql_blocks[id].purpose.localeCompare("order") == 0))&&(sql_blocks[id].connected)&&(document.contains(order_selection))&&(document.contains(order_columns_select))) {
            sql_blocks[id].direction = order_selection.options[order_selection.selectedIndex].value;
            sql_blocks[id].column = order_columns_select.options[order_columns_select.selectedIndex].value;
        }
    }
    join_arguments();
    sql_exec();
}