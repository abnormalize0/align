"use strict";

let elements = [];
let elementscode = [];

let original_header = [[],[]];
let altered_header = [[],[]]

let count = 0;

let right_visible = false;

let shadowed = -1;
let current_mode = 0;

function topageeditor() {
    location.replace("index.html");
    alert(elements[1].type);
}

function generate_shadow(id) {
  document.getElementById("el" + id).style.boxShadow = "0px 0px 5px 5px cyan";
  document.getElementById("tree" + id).style.boxShadow = "0px 0px 2px 2px cyan";
  shadowed = id;
}

function drop_shadow() {
  if (shadowed!= -1) {
    document.getElementById("el" + shadowed).style.boxShadow = "none";
    document.getElementById("tree" + shadowed).style.boxShadow = "none";
    shadowed = -1;
  }
}

function properties_window(id) {  //анимация окна со свойствами и его наполнение. надо разделить
  if (!right_visible) {
    right_visible = true;
    let rightmenu = document.getElementById("text_input_properties");
    let pos = -300;
    let id = setInterval(frame,1);
    function frame() {
    if (pos == 0) {
            clearInterval(id);
        } else {
            pos+=10;
            rightmenu.style.right = pos + 'px';
        }
    }
  }
  if (elements[id].type == "input") {
    let ph = document.getElementById("ph");
    let elem = document.getElementById("el" + id);
    ph.value = elements[id].text;
    ph.oninput = function() {
      elem.setAttribute("placeholder",ph.value);
      elements[id].text = ph.value;
      elementscode[id].placeholder = "placeholder = \"" + ph.value + "\"";
      document.getElementById("tree" + id).innerHTML = "> " + ph.value;
    }
  } else if (elements[id].type == "text") {
    let texttext = document.getElementById("texttext");
    let elem = document.getElementById("el" + id);
    texttext.value = elements[id].text;
    texttext.oninput = function() {
      let inserted = texttext.value.replace(/\n/g, "<br>");
      let inserted_to_tree = texttext.value.replace(/\n/g, " ");
      elem.innerHTML = inserted;
      elements[id].text = texttext.value;
      elementscode[id].text = "> " + inserted;
      document.getElementById("tree" + id).innerHTML = "> " + inserted_to_tree;
    } 
  } else if (elements[id].type == "button") {
    let buttontext = document.getElementById("buttontext");
    let elem = document.getElementById("el" + id);
    buttontext.value = elements[id].text;
    buttontext.oninput = function() {
      let inserted = buttontext.value.replace(/\n/g, "<br>");
      let inserted_to_tree = buttontext.value.replace(/\n/g, " ");
      elem.innerHTML = inserted;
      elements[id].text = buttontext.value;
      elementscode[id].text = "> " + inserted;
      document.getElementById("tree" + id).innerHTML = "> " + inserted_to_tree;
    }
  } else if (elements[id].type == "table") {
    let table = document.getElementById("el" + id);
    let headers_list = document.getElementById("table_headers");
    headers_list.innerHTML = "";
    for (let i = 0; i < table.rows[0].cells.length; i++) {
      headers_list.insertAdjacentHTML('beforeend', "<input id=\"header" + i + "\" value=\"" +  table.rows[0].cells[i].innerHTML + "\">" + "<br>");
      document.getElementById("header" + i).oninput = function() {
        let index1 = original_header[id].indexOf(table.rows[0].cells[i].innerHTML);
        let index2 = altered_header[id].indexOf(table.rows[0].cells[i].innerHTML);
        table.rows[0].cells[i].innerHTML = document.getElementById("header" + i).value;
        altered_header[id][index2] = document.getElementById("header" + i).value;
        console.table("insert" + altered_header[id]);
      }
    }
  }

  document.getElementById("delet").onclick = function() {
    document.getElementById('el' + id).remove();
    document.getElementById('tree' + id).remove();
    shadowed = -1;
    elements[id].type = "deleted";
    right_visible = false;
    let rightmenu = document.getElementById("text_input_properties");
    if (rightmenu.style.right == "0px") {
        let pos = 0;
        let id = setInterval(frame,1);
        function frame() {
        if (pos == -300) {
                clearInterval(id);
            } else {
                pos-=10;
                rightmenu.style.right = pos + 'px';
            }
        }
    }
    document.getElementById("textfieldproperties").style.visibility = "hidden";
    document.getElementById("buttonproperties").style.visibility = "hidden";
    document.getElementById("textproperties").style.visibility = "hidden";
    document.getElementById("tableproperties").style.visibility = "hidden";
    document.getElementById("pageproperties").style.visibility = "hidden";
  }

}

//сброс свойств при нажатии на свободное место
substrate.addEventListener("mousedown", close_properties);

function close_properties() {
    drop_shadow();
    right_visible = false;
    let rightmenu = document.getElementById("text_input_properties");
    if (rightmenu.style.right == "0px") {
        let pos = 0;
        let id = setInterval(frame,1);
        function frame() {
        if (pos == -300) {
                clearInterval(id);
            } else {
                pos-=10;
                rightmenu.style.right = pos + 'px';
            }
        }
    }
    document.getElementById("textfieldproperties").style.visibility = "hidden";
    document.getElementById("buttonproperties").style.visibility = "hidden";
    document.getElementById("textproperties").style.visibility = "hidden";
    document.getElementById("tableproperties").style.visibility = "hidden";
    document.getElementById("pageproperties").style.visibility = "hidden";
}

let temp_left = false;
let temp_right = false;
let temp_settings = false;

function temp_hide() { //скрытие интерфейса при драге
  let rightmenu = document.getElementById("text_input_properties");
  if (rightmenu.style.right == "0px") {
    temp_right = true;
      let pos = 0;
      let id = setInterval(frame,1);
      function frame() {
      if (pos == -300) {
              clearInterval(id);
          } else {
              pos-=10;
              rightmenu.style.right = pos + 'px';
          }
      }
  }

  let textmenu = document.getElementById("textmenu");
  if (textmenu.style.left == "0px") {
    temp_left = true;
        let pos = 0;
        let id = setInterval(frame,1);
        function frame() {
        if (pos == -200) {
                clearInterval(id);
            } else {
                pos-=5;
                textmenu.style.left = pos + 'px';
            }
        }
      }
      let leftbutt = document.getElementById("left");
      let leftback = document.getElementById("leftback");
      if (leftbutt.style.left == "65px") {
        let pos2 = 65;
        let id = setInterval(frame,1);
        function frame() {
        if (pos2 == -200) {
                clearInterval(id);
            } else {
                pos2-=5;
                leftbutt.style.left = pos2 + 'px';
                leftback.style.left = pos2 + 'px';
            }
        }
      }
      let settings = document.getElementById("settings");
      if (settings.style.right == "0px") {
        temp_settings = true;
          let pos = 0;
          let pos2 = 125;
          let id = setInterval(frame,1);
          function frame() {
          if (pos == -300) {
                  clearInterval(id);
              } else {
                  pos-=10;
                  pos2-=10;
                  settings.style.right = pos + 'px';
              }
          }
      }


      let rightbutt = document.getElementById("right");
      let rightback = document.getElementById("rightback");
      if (rightbutt.style.right == "125px") {
        let pos1 = 125;
        let id1 = setInterval(frame1,1);
        function frame1() {
        if (pos1 == -305) {
                clearInterval(id1);
            } else {
                pos1-=10;
                rightbutt.style.right = pos1 + 'px';
                rightback.style.right = pos1 + 'px';
            }
        }
      }

      

}

function temp_return() {  //возвращение интерфейса на место
  let rightmenu = document.getElementById("text_input_properties");
  if (temp_right == true) {
      temp_right = false;
      let pos = -300;
      let id = setInterval(frame,1);
      function frame() {
      if (pos == 0) {
              clearInterval(id);
          } else {
              pos+=10;
              rightmenu.style.right = pos + 'px';
          }
      }
  }

  if (temp_left == true) {
    temp_left = false;
    let textmenu = document.getElementById("textmenu");
        let pos = -200;
        let id = setInterval(frame,1);
        function frame() {
        if (pos == 0) {
                clearInterval(id);
            } else {
                pos+=5;
                textmenu.style.left = pos + 'px';
            }
        }
      }
    let leftbutt = document.getElementById("left");
    let leftback = document.getElementById("leftback");
        let pos2 = -135;
        let id = setInterval(frame,1);
        function frame() {
        if (pos2 == 65) {
                clearInterval(id);
            } else {
                pos2+=5;
                leftbutt.style.left = pos2 + 'px';
                leftback.style.left = pos2 + 'px';
            }
        }

      if (temp_settings == true) {
        temp_settings = false;
        let settings = document.getElementById("settings");
          let pos = -300;
          let id = setInterval(frame,1);
          function frame() {
          if (pos == 0) {
                  clearInterval(id);
              } else {
                  pos+=10;
                  settings.style.right = pos + 'px';
              }
          }
      }

      let rightbutt = document.getElementById("right");
      let rightback = document.getElementById("rightback");
        let pos1 = -175;
        let id1 = setInterval(frame1,1);
        function frame1() {
        if (pos1 == 125) {
                clearInterval(id1);
            } else {
                pos1+=10;
                rightbutt.style.right = pos1 + 'px';
                rightback.style.right = pos1 + 'px';
            }
        }
}



let textfield = document.getElementById("textfield");
let buttonbutton = document.getElementById("button");
let editabletext = document.getElementById("editabletext");
let table = document.getElementById("table");
textfield.addEventListener("mousedown", mousedown2);
buttonbutton.addEventListener("mousedown", mousedown2);
editabletext.addEventListener("mousedown", mousedown2);
table.addEventListener("mousedown", mousedown2);


let modify = 1; //шаг
let modifyper = 1;
let horisonal = 1;
let vertical = 1;

document.getElementById("pixrange").oninput = function() {
  document.getElementById("pixeditid").value = document.getElementById("pixrange").value;
  modify = document.getElementById("pixrange").value;
}

document.getElementById("prerange").oninput = function() {
  document.getElementById("perdeitid").value = document.getElementById("prerange").value;
  modifyper = document.getElementById("prerange").value;
}

document.getElementById("vper").oninput = function() {
  vertical = 0;
  alert("пока не работает");
}
document.getElementById("vpix").oninput = function() {
  vertical = 1;
}
document.getElementById("hper").oninput = function() {
  horisonal = 0;
}
document.getElementById("hpix").oninput = function() {
  horisonal = 1;
}






function mousedown2(b) {  //добавление элементов в2точка0

    let div = document.createElement('div');
    if (this.id == "textfield") {
      div.innerHTML = "<input class=\"defaultclass\" style=\"left: 200px; top: 100px;\" placeholder=\"Текстовое поле " + count + "\" class=\"item\" id=\"el" + count + "\">";
      document.body.append(div);

      elements[count] = {
          id: count,
          type: "input",
          text: "Текстовое поле " + count,
          page: cur_page,
          style: 0,
          x: 200 + "px",
          y: 100 + "px"
      }

      elementscode[count] = {
        begin: "<input",
        left: "left: 200px;",
        top: "top: 100px;",
        placeholder: "placeholder = \"Текстовое поле " + count + "\" ",
        end: "class=\"item\">"
      }

      document.getElementById("tree").insertAdjacentHTML('beforeend', "<div id = \"tree" + count + "\">> Текстовое поле " + count + "</div>");

    } else if (this.id == "button") {
      div.innerHTML = "<button class=\"defaultclass\" style=\"left: 200px; top: 130px;\" class=\"item\" id=\"el" + count + "\">Кнопка " + count + "</button>";
      document.body.append(div);

      elements[count] = {
        id: count,
        type: "button",
        text: "Кнопка " + count,
        page: cur_page,
        style: 0,
        x: 200 + "px",
        y: 130 + "px"
      }

      elementscode[count] = { //заменить
        begin: "<button class=\"item\"",
        left: "left: 200px;",
        top: "top: 130px;",
        text: "> Кнопка " + count,
        end: "</button>"
      }

      document.getElementById("tree").insertAdjacentHTML('beforeend', "<div id = \"tree" + count + "\">> Кнопка " + count + "</div>");
    } else if (this.id == "editabletext") {
      div.innerHTML = "<div class=\"defaultclass\" style=\"left: 200px; top: 160px;\" class=\"item\" id=\"el" + count + "\"> Вставить текст " + count + " </div>";
      document.body.append(div);
      elements[count] = {
        id: count,
        type: "text",
        text: "Вставить текст " + count,
        page: cur_page,
        style: 0,
        x: 200 + "px",
        y: 160 + "px"
      }

      elementscode[count] = { //это тоже
        begin: "<div class=\"item\"",
        left: "left: 200px;",
        top: "top: 160px;",
        text: "> Вставить текст " + count,
        end: "</div>"
      }


      document.getElementById("tree").insertAdjacentHTML('beforeend', "<div id = \"tree" + count + "\">> Вставить текст " + count + "</div>");
    } else if (this.id == "table") {
      div.innerHTML = "<table  border=\"1\" class=\"defaultclass\" style=\"left: 200px; top: 160px;\" class=\"item\" id=\"el" + count + "\"><tr><th>Таблица</th></tr><td> " + count + " </td></table>";
      document.body.append(div);
      elements[count] = {
        id: count,
        type: "table",
        text: "Таблица " + count,
        page: cur_page,
        style: 0,
        x: 200 + "px",
        y: 160 + "px"
      }

      elementscode[count] = { //это тоже
        begin: "<table border=\"1\" class=\"item\"",
        left: "left: 200px;",
        top: "top: 160px;",
        text: "> Вставить текст " + count,
        end: "</table>"
      }

      // original_header[count][0] = "Таблица";
      // altered_header[count][0] = "Таблица";

      document.getElementById("tree").insertAdjacentHTML('beforeend', "<div id = \"tree" + count + "\">> Таблица " + count + "</div>");

      for (let i = 0; i < blocks; i++) {
          let insert = "<h3>Вывести данные в таблицу:</h3>" + "<select onchange=\"regular_select(this.value, " + i + ")\"> <option> Не выбрано </option> ";
          for (let j = 0; j < elements.length; j++) {
              if (elements[j].type.localeCompare("table") == 0) {
                  if (sql_blocks[i].selected == j) {
                    insert = insert + "<option value=\"" + j + "\" selected>";
                  } else {
                    insert = insert + "<option value=\"" + j + "\">";
                  }
                  insert = insert + elements[j].text;
                  insert = insert + "</option>";
              }
          }
          insert = insert + "</select> <div id='connect_out" + i + "' style='right: -10px; top: 40px;' class='connect'> </div>";
          if((sql_blocks[i].purpose.localeCompare("deleted") != 0)&&(document.getElementById("block" + i).innerHTML.indexOf("<h3>Вывести данные в таблицу:</h3>") > -1)) {
              document.getElementById("block" + i).innerHTML = insert;
              document.getElementById("connect_out" + i).addEventListener("mousedown",draw_line.bind(null,i));
              document.getElementById("connect_out" + i).addEventListener("mouseover",colorfy_out.bind(null,i));
              document.getElementById("connect_out" + i).addEventListener("mouseout",uncolorfy_out.bind(null,i));
          }
      }
    }

    let newtreeelement = document.getElementById("tree" + count);
    newtreeelement.addEventListener("mousedown", treeselect.bind(null,count));
    function treeselect(elemid,e) {
      drop_shadow();
      if (cur_page != elements[elemid].page) {
        goto_page(elements[elemid].page)
        cur_page = elements[elemid].page;
      }
      document.getElementById("textfieldproperties").style.visibility = "hidden";
      document.getElementById("buttonproperties").style.visibility = "hidden";
      document.getElementById("textproperties").style.visibility = "hidden";
      document.getElementById("tableproperties").style.visibility = "hidden";
      document.getElementById("pageproperties").style.visibility = "hidden";
      properties_window(elemid);
      styles_window(elemid);
      generate_shadow(elemid);
      if (elements[elemid].type == "input") document.getElementById("textfieldproperties").style.visibility = "visible";
      if (elements[elemid].type == "button") document.getElementById("buttonproperties").style.visibility = "visible";
      if (elements[elemid].type == "text") document.getElementById("textproperties").style.visibility = "visible";
      if (elements[elemid].type == "table") document.getElementById("tableproperties").style.visibility = "visible";
    }

    let elem = document.getElementById("el" + count);
    elem.addEventListener("mousedown", mousedown.bind(null,count));
    count++;

  function mousedown(elemid,e) {
    let properties = true;
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {
        properties = false;
        temp_hide();
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;
        modify = parseInt(modify); //ненавижу жс
        modifyper = parseInt(modifyper); //ненавижу жс, но сейчас проблема не в этом

        const rect = elem.getBoundingClientRect();

          if (horisonal == 0) {
            if ((((rect.left - newX) / document.documentElement.clientWidth * 100)%modifyper) < modifyper/2) {
              elem.style.left = ((rect.left - newX) / document.documentElement.clientWidth * 100) - (((rect.left - newX) / document.documentElement.clientWidth * 100)%modifyper) + "%";  //(rect.left - newX) - (rect.left - newX)%modify + "px";
              elements[elemid].x = (rect.left - newX) - ((rect.left - newX)%modifyper);// - (rect.left - newX)%modify;
              elementscode[elemid].left = "left: " +  elem.style.left + ";";
              prevX = (e.clientX) - ((e.clientX)%modifyper);// - (e.clientX)%modify;
            } else {
              elem.style.left = (rect.left - newX) / document.documentElement.clientWidth * 100 + (modifyper - (((rect.left - newX) / document.documentElement.clientWidth * 100)%modifyper)) + "%";  //(rect.left - newX) + (modify - (rect.left - newX)%modify) + "px";
              elements[elemid].x = (rect.left - newX) + (modifyper - ((rect.left - newX)%modifyper));// + (modify - (rect.left - newX)%modify);
              elementscode[elemid].left = "left: " +  elem.style.left + ";";
              prevX = (e.clientX) + (modifyper - ((e.clientX)%modifyper));// + (modify - (e.clientX)%modify);
            }
          } else {
            let costyl = true;
            if ((rect.left - newX)%modify < modify/2) {
              if (costyl && Math.abs(e.clientX - (rect.left - newX) - (rect.left - newX)%modify) > modify/2) {
                
                elem.style.left = (rect.left - newX) - (rect.left - newX)%modify + "px";
                elements[elemid].x = (rect.left - newX) - (rect.left - newX)%modify + "px";
                elementscode[elemid].left = "left: " +  elem.style.left + ";";
                prevX = (e.clientX) - (e.clientX)%modify;
              } else {
                costyl = false;
                elem.style.left = (rect.left - newX) - (rect.left - newX)%modify  - modify + "px";
                elements[elemid].x = (rect.left - newX) - (rect.left - newX)%modify  - modify + "px";
                elementscode[elemid].left = "left: " +  elem.style.left + ";";
                prevX = (e.clientX) - (e.clientX)%modify  - modify;
              }
            } else {
              if (costyl && Math.abs(e.clientX - ((rect.left - newX) + (modify - (rect.left - newX)%modify)) > modify/2)) {
                
                elem.style.left = (rect.left - newX) + (modify - (rect.left - newX)%modify) + "px";
                elements[elemid].x = (rect.left - newX) + (modify - (rect.left - newX)%modify) + "px";
                elementscode[elemid].left = "left: " + elem.style.left + ";";
                prevX = (e.clientX) + (modify - (e.clientX)%modify);
              } else {
                costyl = false;
                elem.style.left = (rect.left - newX) + (modify - (rect.left - newX)%modify) - modify + "px";
                elements[elemid].x = (rect.left - newX) + (modify - (rect.left - newX)%modify) - modify + "px";
                elementscode[elemid].left = "left: " + elem.style.left + ";";
                prevX = (e.clientX) + (modify - (e.clientX)%modify) - modify;
              }
            }
          }


          if (vertical == 1) {
            let costyl = true;
            if ((rect.top - newY)%modify < modify/2) {
              if (costyl && Math.abs(e.clientY - (rect.top - newY) - (rect.top - newY)%modify) > modify/2) {
                costyl = false;
                elem.style.top = (rect.top - newY) - (rect.top - newY)%modify + modify + "px";
                elements[elemid].y = (rect.top - newY) - (rect.top - newY)%modify + modify + "px";
                elementscode[elemid].top = "top: " +  elem.style.top;
                prevY = (e.clientY) - (e.clientY)%modify + modify;
              } else {
                elem.style.top = (rect.top - newY) - (rect.top - newY)%modify + "px";
                elements[elemid].y = (rect.top - newY) - (rect.top - newY)%modify + "px";
                elementscode[elemid].top = "top: " +  elem.style.top;
                prevY = (e.clientY) - (e.clientY)%modify;
              }
            } else {
              if (costyl && Math.abs(e.clientY - ((rect.top - newY) + (modify - (rect.top - newY)%modify)) > modify/2)) {
                costyl = false;
                elem.style.top = (rect.top - newY) + (modify - (rect.top - newY)%modify) + modify + "px";
                elements[elemid].y = (rect.top - newY) + (modify - (rect.top - newY)%modify) + modify + "px";
                elementscode[elemid].top = "top: " + elem.style.top;
                prevY = (e.clientY) + (modify - (e.clientY)%modify) + modify;
              } else {
                elem.style.top = (rect.top - newY) + (modify - (rect.top - newY)%modify) + "px";
                elements[elemid].y = (rect.top - newY) + (modify - (rect.top - newY)%modify) + "px";
                elementscode[elemid].top = "top: " + elem.style.top;
                prevY = (e.clientY) + (modify - (e.clientY)%modify);
              }
            }
          } else {

          }

        
    }

    function mouseup() {
      document.getElementById("textfieldproperties").style.visibility = "hidden";
      document.getElementById("buttonproperties").style.visibility = "hidden";
      document.getElementById("textproperties").style.visibility = "hidden";
      document.getElementById("tableproperties").style.visibility = "hidden";
      document.getElementById("pageproperties").style.visibility = "hidden";
      if (properties) properties_window(elemid);
      if (properties) styles_window(elemid);
      if (properties) drop_shadow();
      if (properties) generate_shadow(elemid);
      if (elements[elemid].type == "input") document.getElementById("textfieldproperties").style.visibility = "visible";
      if (elements[elemid].type == "button") document.getElementById("buttonproperties").style.visibility = "visible";
      if (elements[elemid].type == "text") document.getElementById("textproperties").style.visibility = "visible";
      if (elements[elemid].type == "table") document.getElementById("tableproperties").style.visibility = "visible";
      if (!properties) temp_return();
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
  
  change_style(0);
}

let title = "untitled"

let textarea = document.getElementById('untitled');
textarea.addEventListener('input', (e) => {
  title = textarea.value;
});
    
function table_substitution() {
    for(let id = 0; id < elements.length; id++) {
      if(elements[id].type.localeCompare("table") == 0) {
        let table = document.getElementById("el" + id);
        for (let i = 0; i < table.rows[0].cells.length; i++) {
          if(original_header[id] === undefined) {
            continue;
          }
            let index = original_header[id].indexOf(table.rows[0].cells[i].innerHTML);
            let index2 = altered_header[id].indexOf(table.rows[0].cells[i].innerHTML);
            if ((index == -1)&&(index2 == -1)) {
                original_header[id].push(table.rows[0].cells[i].innerHTML);
                altered_header[id].push(table.rows[0].cells[i].innerHTML);
                console.table("add original " + original_header[id]);
                console.table("add altered " + altered_header[id]);
            } else {
                if (index == -1) {
                    index = index2;
                }
                table.rows[0].cells[i].innerHTML = altered_header[id][index];
                console.table("change original " + original_header[id]);
                console.table("change altered " + altered_header[id]);
            }
        }
      }
    }
}

