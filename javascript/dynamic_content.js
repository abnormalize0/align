function showUser(str,id) {
    set_selected(str, id);
    sql_exec();
}

function set_selected(str, id) {
    sql_blocks[id].selected = str;
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
    clearing();
    for (let i = 0; i < blocks; i++) {
        //await sleep(1000);
        if (sql_blocks[i].purpose.localeCompare("select") == 0) {
            let cur_block = i;
            let wtite_to = sql_blocks[cur_block].selected;
            let write_from = -1;
            while (sql_blocks[cur_block].next_line != null) {
                cur_block = sql_blocks[cur_block].next_line;
                if (sql_blocks[cur_block].purpose.localeCompare("from") == 0) {
                    write_from = sql_blocks[cur_block].selected;
                }
            }
            if (write_from != -1) {
                console.log(wtite_to + " " + write_from);
                table_id = "el" + wtite_to;

                let response = await fetch("ajax_reqests/interface_content.php?q="+write_from);
                if (response.ok) {
                    let text = await response.text();
                    document.getElementById(table_id).innerHTML = text;
                }
                response = await fetch("ajax_reqests/release_content.php?q="+write_from);
                if (response.ok) {
                    let text = await response.text();
                    elementscode[wtite_to].text = text;
                }
            }
        }
    }
}