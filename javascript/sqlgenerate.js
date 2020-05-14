document.getElementById('field').scroll(100000, 100000);  //установить поле в центре, ну плюс минус

let moving = 0;
let drawing = 0;
let cur_line = 0;
let cur_hover = -1;
let cur_tab = 0;

let sql_blocks = [];
let sql_lines = [];

tosql = document.getElementById("tosql"); //открыть скул генератор
tosql.onclick = function() {
    current_mode = 1;
    let pos = 100;
    let pos2 = -100;
    let id = setInterval(frame,1);
    function frame() {
    if (pos == 0) {
            clearInterval(id);
        } else {
            pos-=5;
            pos2+=5;
            sqlgenpage.style.bottom = pos + '%';
            sqlgenpage.style.top = pos2 + '%';
        }
    }
};

let field = document.getElementById("field");
field.addEventListener("mousedown", field_drag);

function field_drag(b) {   //такскаем поле на скм
    if (b.which) { // if e.which, use 2 for middle button
        if ((b.which === 2) && (!moving)) {
            window.addEventListener("mousemove", mousemove);
            window.addEventListener("mouseup", mouseup);
        }
    } else if (b.button) { // and if e.button, use 4
        if ((b.button === 4) && (!moving)) {
            window.addEventListener("mousemove", mousemove);
            window.addEventListener("mouseup", mouseup);
        }
    }

    let prevX = b.clientX;
    let prevY = b.clientY;

    function mousemove(e) {
          let newX = prevX - e.clientX;
          let newY = prevY - e.clientY;

          let scroll_pos_y = document.getElementById('field').scrollLeft;
          let scroll_pos_x = document.getElementById('field').scrollTop;
    
          document.getElementById('field').scroll(scroll_pos_y + newX, scroll_pos_x + newY );

    
          prevX = e.clientX;
          prevY = e.clientY;
      }

    function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }

}

function field_close() { //закрыть sql генератор
    current_mode = 0;
    let pos = 0;
        let pos2 = 0;
        let id = setInterval(frame,1);
        function frame() {
        if (pos == 100) {
                clearInterval(id);
            } else {
                pos+=5;
                pos2-=5;
                sqlgenpage.style.bottom = pos + '%';
                sqlgenpage.style.top = pos2 + '%';
            }
        }
}


let select_block = document.getElementById("select_block");  //добавление штукенций
let from_block = document.getElementById("from_block");
let where_block = document.getElementById("where_block");
select_block.addEventListener("mousedown", add_block);
from_block.addEventListener("mousedown", add_block);
where_block.addEventListener("mousedown", add_block);

let blocks = 0
let lines = 0;

function add_block(b) {  //добавление элементов в2точка0
    let block_y_position = document.getElementById('field').scrollTop + document.documentElement.clientHeight/2 - document.documentElement.clientHeight/100 * 2 - 100/2;
    let block_x_position = document.getElementById('field').scrollLeft + document.documentElement.clientWidth/2 - document.documentElement.clientWidth/100 * 15 - 250/2;
    if (this.id == "select_block") {
        let insert = "<div class=\"defaultclass\" style=\"background: white; left: "+ block_x_position +"px; top: " + block_y_position + "px; height: 100px; width: 250px;\" class=\"item\" id=\"block" + blocks + "\"> <h3>Вывести данные в таблицу:</h3>" + "<select onchange=\"regular_select(this.value, " + blocks + ")\"> <option value=\"\"> Не выбрано </option> ";
        let j = 0;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type == "table") {
                insert = insert + "<option value=\"" + i + "\">";
                j++;
                insert = insert + elements[i].text;
                insert = insert + "</option>";
            }
        }
        insert = insert + "</select> <div id='connect_out" + blocks + "' style='right: -10px; top: 40px;' class='connect'> </div> </div>";
        document.getElementById("field").insertAdjacentHTML('beforeend',insert);

        console.log(document.getElementById("block" + blocks).innerHTML);

        document.getElementById("connect_out" + blocks).addEventListener("mousedown",draw_line.bind(null,blocks));
        document.getElementById("connect_out" + blocks).addEventListener("mouseover",colorfy_out.bind(null,blocks));
        document.getElementById("connect_out" + blocks).addEventListener("mouseout",uncolorfy_out.bind(null,blocks));
        sql_blocks[blocks] = {
            id: "block" + blocks,
            purpose: "select",
            input_line: null,
            output_line: null,
            next_line: null,
            prev_line: null,
            selected: null
        }


    } else if (this.id == "from_block") {
        let insert = "<div class=\"defaultclass\" style=\"background: white; left: "+ block_x_position +"px; top: " + block_y_position + "px; width: 250px;\" class=\"item\" id=\"block" + blocks + "\"> <h3>Взятые из таблицы:</h3> <select onchange=\"from_select(this.value, " + blocks + ")\"> <option value=\"\"> Не выбрано </option>";
        for (let i = 0; i < tables_array.length; i++) {
            insert = insert + "<option value=\"" + i + "\">";
            insert = insert + tables_array[i];
            insert = insert + "</option>";
        }
        insert = insert + "</select> <div id='connect_out" + blocks + "' style='right: -10px; top: 40px;' class='connect'> </div> <div id='connect_in" + blocks + "' style='left: -10px; top: 40px;' class='connect'> </div> </div>";
        document.getElementById("field").insertAdjacentHTML('beforeend',insert);

        document.getElementById("connect_out" + blocks).addEventListener("mousedown",draw_line.bind(null,blocks));
        document.getElementById("connect_out" + blocks).addEventListener("mouseover",colorfy_out.bind(null,blocks));
        document.getElementById("connect_out" + blocks).addEventListener("mouseout",uncolorfy_out.bind(null,blocks));

        document.getElementById("connect_in" + blocks).addEventListener("mousedown",block_move.bind(null,blocks));
        document.getElementById("connect_in" + blocks).addEventListener("mouseover",colorfy_in.bind(null,blocks));
        document.getElementById("connect_in" + blocks).addEventListener("mouseout",uncolorfy_in.bind(null,blocks));

        sql_blocks[blocks] = {
          id: "block" + blocks,
          purpose: "from",
          input_line: null,
          output_line: null,
          next_line: null,
          prev_line: null,
          selected: null
        }
    } else if (this.id == "where_block") {
        document.getElementById("field").insertAdjacentHTML('beforeend',"<div class=\"defaultclass\" style=\"background: white; left: "+ block_x_position +"px; top: " + block_y_position + "px; width: 250px;\" class=\"item\" id=\"block" + blocks + "\"> <h3>С условием:</h3>" + "<select> <option>Пункт 1</option> <option>Пункт 2</option> </select> <div id='connect_out" + blocks + "' style='right: -10px; top: 40px;' class='connect'> </div> <div id='connect_in" + blocks + "' style='left: -10px; top: 40px;' class='connect'> </div> </div>");

        document.getElementById("connect_out" + blocks).addEventListener("mousedown",draw_line.bind(null,blocks));
        document.getElementById("connect_out" + blocks).addEventListener("mouseover",colorfy_out.bind(null,blocks));
        document.getElementById("connect_out" + blocks).addEventListener("mouseout",uncolorfy_out.bind(null,blocks));

        document.getElementById("connect_in" + blocks).addEventListener("mousedown",block_move.bind(null,blocks));
        document.getElementById("connect_in" + blocks).addEventListener("mouseover",colorfy_in.bind(null,blocks));
        document.getElementById("connect_in" + blocks).addEventListener("mouseout",uncolorfy_in.bind(null,blocks));

        sql_blocks[blocks] = {
          id: "block" + blocks,
          purpose: "where",
          input_line: null,
          output_line: null,
          next_line: null,
          prev_line: null,
          selected: null
    }
}
    
    function block_move(id,e) {

        window.addEventListener("mousemove", line_blockmove);
        window.addEventListener("mouseup", line_blockmouseup);

        function line_blockmove(e) {
            drawing = 1;
        }
        function line_blockmouseup() {
            drawing = 0;
            window.removeEventListener("mousemove", line_blockmove);
            window.removeEventListener("mouseup", line_blockmouseup);
        }
    }

    let el = document.getElementById("block" + blocks);
    blocks++;

    el.addEventListener("mousedown", mousedown);

function mousedown(e) {
    if (e.which) { // if e.which, use 2 for middle button
        if (e.which === 2) {
            return;
        }
    } else if (e.button) { // and if e.button, use 4
        if (e.button === 4) {
            return;
        }
    }
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);


    let prevX =  e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {
        if(drawing) {
            return;
        }

        moving = 1;
        let scroll_pos_y = document.getElementById('field').scrollTop;
        let scroll_pos_x = document.getElementById('field').scrollLeft;
            
          let newX = prevX - e.clientX;
          let newY = prevY - e.clientY;
          const rect = el.getBoundingClientRect();

          if ((e.clientX - document.documentElement.clientWidth / 100 * 20 < 0) && (e.clientY - document.documentElement.clientHeight / 100 * 10 < 0)) {
            document.getElementById('field').scroll(scroll_pos_x - 20, scroll_pos_y - 20);
            el.style.left = rect.left - newX - (document.documentElement.clientWidth / 100 * 15) + scroll_pos_x - 20 +  "px";
            el.style.top = rect.top - newY - (document.documentElement.clientHeight / 100 * 2) + scroll_pos_y - 20 +  "px";
            prevX = e.clientX;
                prevY = e.clientY;
                return;
          } else if ((e.clientX - document.documentElement.clientWidth / 100 * 20 < 0) && (document.documentElement.clientHeight / 100 * 90 - e.clientY < 0)) {
            document.getElementById('field').scroll(scroll_pos_x - 20, scroll_pos_y + 20);
            el.style.left = rect.left - newX - (document.documentElement.clientWidth / 100 * 15) + scroll_pos_x - 20 +  "px";
            el.style.top = rect.top - newY - (document.documentElement.clientHeight / 100 * 2) + scroll_pos_y + 20 +  "px";
            prevX = e.clientX;
                prevY = e.clientY;
                return;
          } else if ((document.documentElement.clientWidth / 100 * 80 - e.clientX < 0) && (e.clientY - document.documentElement.clientHeight / 100 * 10 < 0)) {
            document.getElementById('field').scroll(scroll_pos_x + 20, scroll_pos_y - 20);
            el.style.left = rect.left - newX - (document.documentElement.clientWidth / 100 * 15) + scroll_pos_x + 20 +  "px";
            el.style.top = rect.top - newY - (document.documentElement.clientHeight / 100 * 2) + scroll_pos_y - 20 +  "px";
            prevX = e.clientX;
                prevY = e.clientY;
                return;
          } else if ((document.documentElement.clientWidth / 100 * 80 - e.clientX < 0) && (document.documentElement.clientHeight / 100 * 90 - e.clientY < 0)) {
            document.getElementById('field').scroll(scroll_pos_x + 20, scroll_pos_y + 20);
            el.style.left = rect.left - newX - (document.documentElement.clientWidth / 100 * 15) + scroll_pos_x + 20 +  "px";
            el.style.top = rect.top - newY - (document.documentElement.clientHeight / 100 * 2) + scroll_pos_y + 20 +  "px";
            prevX = e.clientX;
                prevY = e.clientY;
                return;
          } else if (e.clientX - document.documentElement.clientWidth / 100 * 20 < 0) {
                 document.getElementById('field').scroll(scroll_pos_x - 20, scroll_pos_y);
                 el.style.left = rect.left - newX - (document.documentElement.clientWidth / 100 * 15) + scroll_pos_x - 20 +  "px";
                 el.style.top = rect.top - newY - (document.documentElement.clientHeight / 100 * 2) + scroll_pos_y + "px";
                 prevX = e.clientX;
                prevY = e.clientY;
                return;
          } else if ( document.documentElement.clientWidth / 100 * 80 - e.clientX < 0) {
                document.getElementById('field').scroll(scroll_pos_x + 20, scroll_pos_y);
                el.style.left = rect.left - newX - (document.documentElement.clientWidth / 100 * 15) + scroll_pos_x + 20 +  "px";
                el.style.top = rect.top - newY - (document.documentElement.clientHeight / 100 * 2) + scroll_pos_y + "px";
                prevX = e.clientX;
                prevY = e.clientY;
                return;
          } else if (e.clientY - document.documentElement.clientHeight / 100 * 10 < 0) {
                document.getElementById('field').scroll(scroll_pos_x, scroll_pos_y - 20);
                el.style.top = rect.top - newY - (document.documentElement.clientHeight / 100 * 2) + scroll_pos_y - 20 +  "px";
            el.style.left = rect.left - newX - (document.documentElement.clientWidth / 100 * 15) + scroll_pos_x +  "px";

                prevX = e.clientX;
                prevY = e.clientY;
                return;
            } else if ( document.documentElement.clientHeight / 100 * 90 - e.clientY < 0) {
                document.getElementById('field').scroll(scroll_pos_x, scroll_pos_y + 20);
                el.style.top = rect.top - newY - (document.documentElement.clientHeight / 100 * 2) + scroll_pos_y + 20 +  "px";
          el.style.left = rect.left - newX - (document.documentElement.clientWidth / 100 * 15) + scroll_pos_x +  "px";

                prevX = e.clientX;
                prevY = e.clientY;
                return;
            }
    
         //document.getElementById('field').scroll(scroll_pos_y + newX, scroll_pos_x + newY );


          el.style.left = rect.left - newX - (document.documentElement.clientWidth / 100 * 15) + scroll_pos_x +  "px";
          el.style.top = rect.top - newY - (document.documentElement.clientHeight / 100 * 2) + scroll_pos_y + "px";
          
          let i = 0;
          while (el.id.localeCompare(sql_blocks[i].id) != 0) {
            i++;
          }

            if (sql_blocks[i].output_line != null) {
                move_redraw_out(i);
            }
            if (sql_blocks[i].input_line != null) {
                move_redraw_in(i);
            }

            function move_redraw_out(id) {
                const rect = document.getElementById("connect_out" + id).getBoundingClientRect();

                let x1 = scroll_pos_x + rect.left - (document.documentElement.clientWidth / 100 * 15) + 10;
                let x2 = sql_lines[sql_blocks[id].output_line].x2;
                let y1 = scroll_pos_y + rect.top - (document.documentElement.clientHeight / 100 * 2) + 10;
                let y2 = sql_lines[sql_blocks[id].output_line].y2;

                sql_lines[sql_blocks[id].output_line].x2 = x2;
                sql_lines[sql_blocks[id].output_line].x1 = x1;
                sql_lines[sql_blocks[id].output_line].y2 = y2;
                sql_lines[sql_blocks[id].output_line].y1 = y1;
            
            
                let distance = Math.sqrt(((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)));
                let xMid = (x1 + x2) / 2;
                let yMid = (y1 + y2) / 2;
                let salopeInRadian = Math.atan2(y1 - y2, x1 - x2);
                let salopeInDegrees = (salopeInRadian * 180) / Math.PI;

                let line = document.getElementById("line" + sql_blocks[id].output_line);
                line.style.width = distance + "px";
                line.style.height = "1px";
                line.style.top = yMid + "px";
                line.style.left = xMid - (distance/2) + "px";
                line.style.transform = "rotate(" + salopeInDegrees + "deg)";
                line.style.backgroundColor = "black";
                line.style.position = "absolute";
            }

            function move_redraw_in(id) {
                const rect = document.getElementById("connect_in" + id).getBoundingClientRect();

                let x1 = scroll_pos_x + rect.left - (document.documentElement.clientWidth / 100 * 15) + 10;
                let x2 = sql_lines[sql_blocks[id].input_line].x1;
                let y1 = scroll_pos_y + rect.top - (document.documentElement.clientHeight / 100 * 2) + 10;
                let y2 = sql_lines[sql_blocks[id].input_line].y1;

                sql_lines[sql_blocks[id].input_line].x1 = x2;
                sql_lines[sql_blocks[id].input_line].x2 = x1;
                sql_lines[sql_blocks[id].input_line].y1 = y2;
                sql_lines[sql_blocks[id].input_line].y2 = y1;
            
            
                let distance = Math.sqrt(((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)));
                let xMid = (x1 + x2) / 2;
                let yMid = (y1 + y2) / 2;
                let salopeInRadian = Math.atan2(y1 - y2, x1 - x2);
                let salopeInDegrees = (salopeInRadian * 180) / Math.PI;

                let line = document.getElementById("line" + sql_blocks[id].input_line);
                line.style.width = distance + "px";
                line.style.height = "1px";
                line.style.top = yMid + "px";
                line.style.left = xMid - (distance/2) + "px";
                line.style.transform = "rotate(" + salopeInDegrees + "deg)";
                line.style.backgroundColor = "black";
                line.style.position = "absolute";
            }
    
          prevX = e.clientX;
          prevY = e.clientY;
      }


  function mouseup() {
      moving = 0;
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}


}

document.onkeydown = function (evt) {
    var allowDefault = true;
    var tabPressed = null;
    evt = evt || event;

    if (evt.keyCode === 9) {
        evt.preventDefault();
        if (current_mode) {
            if (blocks == 0) {
                return;
            }
            if (cur_tab == blocks - 1) {
                cur_tab = 0;
            } else {
                cur_tab++;
            }
            let x = parseInt(document.getElementById("block" + cur_tab).style.left.replace('px','')) - document.documentElement.clientWidth / 2 + document.documentElement.clientWidth/100 * 15 + 250/2;
            let y = parseInt(document.getElementById("block" + cur_tab).style.top.replace('px','')) - document.documentElement.clientHeight / 2 + document.documentElement.clientHeight/100 * 2 + 100/2;
            document.getElementById('field').scroll(x, y);
            console.log(x);   
        } else {

        }
    }
    else if (evt.keyCode === 27){
        evt.preventDefault();
        if(current_mode) {
            field_close();
        }
    }
    return evt.keyCode;
}

function draw_line(id,e) {
    window.addEventListener("mousemove", line_mousemove);
    window.addEventListener("mouseup", line_mouseup);

    function line_mousemove(e) {
        drawing = 1;
        if (sql_blocks[id].output_line == null) {
            sql_blocks[id].output_line = lines;
            cur_line = lines;
            lines++;
        } else {
            cur_line = sql_blocks[id].output_line;
        }
        var elementExists = document.getElementById("line" + cur_line);
        if (elementExists == null) {
            document.getElementById("field").insertAdjacentHTML('beforeend', "<div id='line" + cur_line +"'></div>");
        }

        
        
        let scroll_pos_y = document.getElementById('field').scrollTop;
        let scroll_pos_x = document.getElementById('field').scrollLeft;
        

        const rect = document.getElementById("connect_out" + id).getBoundingClientRect();


      let x1 = scroll_pos_x + rect.left - (document.documentElement.clientWidth / 100 * 15) + 10;
      let x2 = scroll_pos_x + e.clientX - (document.documentElement.clientWidth / 100 * 15);
      let y1 = scroll_pos_y + rect.top - (document.documentElement.clientHeight / 100 * 2) + 10;
      let y2 = scroll_pos_y + e.clientY - (document.documentElement.clientHeight / 100 * 2);

      sql_lines[cur_line] = {
          x1: x1,
          x2: x2,
          y1: y1,
          y2: y2
      }
      
      
        let distance = Math.sqrt(((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)));
        let xMid = (x1 + x2) / 2;
        let yMid = (y1 + y2) / 2;
        let salopeInRadian = Math.atan2(y1 - y2, x1 - x2);
        let salopeInDegrees = (salopeInRadian * 180) / Math.PI;

        let line = document.getElementById("line" + cur_line);
        line.style.width = distance + "px";
        line.style.height = "1px";
        line.style.top = yMid + "px";
        line.style.left = xMid - (distance/2) + "px";
        line.style.transform = "rotate(" + salopeInDegrees + "deg)";
        line.style.backgroundColor = "black";
        line.style.position = "absolute";
      }
      function line_mouseup() {
          window.removeEventListener("mousemove", line_mousemove);
          window.removeEventListener("mouseup", line_mouseup);
          let exist = sql_blocks[id].next_line;
          if (exist != null) {      //удаляю существующую линию оттуда откуда веду
              console.log("here");
              sql_blocks[sql_blocks[id].next_line].prev_line = null;
              sql_blocks[sql_blocks[id].next_line].input_line = null;
          }
          
          if ((cur_hover == -1)||(sql_blocks[cur_hover].output_line == cur_line)) {
            console.log("what");
            
            console.log("1");
            let exist = document.getElementById('line' + cur_line);
            if (exist!=null) {
                console.log("2");
                document.getElementById('line' + cur_line).remove();
            }
            exist = sql_blocks[id].next_line;
            if (exist!=null) {
                sql_blocks[sql_blocks[id].next_line].prev_line = null;
                sql_blocks[sql_blocks[id].next_line].input_line = null;
            }
            sql_blocks[id].next_line = null;
            sql_blocks[id].output_line = null;
            drawing = 0;
            sql_exec();
            return;
          }
          exist = sql_blocks[cur_hover].prev_line;
          if (exist != null) {
              console.log("for what");
              document.getElementById('line' + sql_blocks[sql_blocks[cur_hover].prev_line].output_line).remove();
              sql_blocks[sql_blocks[cur_hover].prev_line].next_line = null;
              sql_blocks[sql_blocks[cur_hover].prev_line].output_line = null;
          }
          sql_blocks[id].next_line = null;
          sql_blocks[id].output_line = null;
          sql_blocks[cur_hover].prev_line = null;
          sql_blocks[cur_hover].input_line = null;
          exist = sql_blocks[cur_hover].prev_line;
          if (exist != null) {
            console.log("no,here");
              document.getElementById('line' + sql_blocks[sql_blocks[cur_hover].prev_line].output_line).remove();
              sql_blocks[sql_blocks[cur_hover].prev_line].next_line = null;
              sql_blocks[sql_blocks[cur_hover].prev_line].output_line = null;
          }

          sql_blocks[cur_hover].prev_line = id;
          sql_blocks[id].next_line = cur_hover;
          sql_blocks[cur_hover].input_line = cur_line;
          sql_blocks[id].output_line = cur_line;

          drawing = 0;
          console.log("-");
          sql_exec();
    }
}

function colorfy_out(id,e) {
    if (drawing) {
        document.getElementById("connect_out" + id).style.backgroundColor = "red";
    } else {
        document.getElementById("connect_out" + id).style.backgroundColor = "green";
    }
}
function uncolorfy_out(id,e) {
    document.getElementById("connect_out" + id).style.backgroundColor = "orange";
}
function colorfy_in(id,e) {
    if (drawing) {
        document.getElementById("connect_in" + id).style.backgroundColor = "green";
    } else {
        document.getElementById("connect_in" + id).style.backgroundColor = "red";
    }
    cur_hover = id;
}
function uncolorfy_in(id,e) {
    document.getElementById("connect_in" + id).style.backgroundColor = "orange";
    cur_hover = -1;
}