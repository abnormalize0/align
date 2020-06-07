let styles = [];

new_style(0,"По умолчанию");

function new_style(number,title) {
    if (number == null) {
        number = styles.length;
    }
    if (title == null) {
        title = "новый стиль " + styles.length;
    }
    styles[number] = {
        title: title,
        width: "",
        height: "",
        zindex: "",
        overflow_x: "visible",
        overflow_y: "visible",
        font_family: "Times New Roman",   //шрифты
        font_weight: "400",
        font_style: "normal",
        font_size: "16px",
        color: "#000000", //цвет
        text_align: "left", //css-текст
        text_indent: null,
        background_color: "#FFFFFF", //css фон
        border_style: "solid", //css рамка
        border_color: "#000000",
        border_width: "1px",
        border_radius: "0%"
    }
}

function styles_window(id) {
    let style_list = document.getElementById("style_list");
    let style_list_insertion;
    style_list_insertion = "<h2>Настройка стиля элемента</h2><div><div style='display: inline-block;'>Стиль: <select style='width:130px;' onchange='elements[" + id + "].style = this.value; change_style(this.value);selector_fill(this.value);'>";
    for (let i = 0; i < styles.length; i++) {
        if (elements[id].style == i) {
            style_list_insertion = style_list_insertion + "<option selected value='" + i + "'>" + styles[i].title + "</option>";
        } else {
            style_list_insertion = style_list_insertion + "<option value='" + i + "'>" + styles[i].title + "</option>";
        }
    }
    style_list_insertion = style_list_insertion + "</select>";
    style_list.innerHTML = style_list_insertion + "</div><div onclick='rename_styles(" + id + ")' style='background-color:orange; width: 120px; display: inline-block;'>Переименовать</div><div onclick='new_style(null, null); elements[" + id + "].style=" + styles.length + "; styles_window(" + id + "); change_style(" + styles.length + ")' style='background-color:orange; width: 120px; display: inline-block;'>Новый стиль</div></div>";
    selector_fill(elements[id].style, id);
}

function rename_styles(id) {
    let setup_field = document.getElementById("style_list");
    let insertion = "<h2>Настройка стиля элемента</h2>Название:<input id='rename_field' style='width:150px;' value='" + styles[elements[id].style].title + "'>";
    insertion = insertion + "<div><div onclick='rename_confirm(" + elements[id].style + ")' style='display: inline-block; width: 120px; background-color: orange;'>Принять</div><div onclick='styles_window(" + elements[id].style + ");' style='display: inline-block; width: 120px; background-color: red;'>Отмена</div></div>"
    setup_field.innerHTML = insertion;
}

function rename_confirm(id) {
    styles[id].title = document.getElementById("rename_field").value;
    styles_window(id);
}

function change_style(style) {
    for(let i = 0; i < elements.length; i++) {
        if(elements[i].style == style) {
            let chahgable = document.getElementById("el" + i);
            if (styles[style].width != null) {
                chahgable.style.width = styles[style].width;
            }
            if (styles[style].height != null) {
                chahgable.style.height = styles[style].height;
            }
            if (styles[style].zindex != null) {
                chahgable.style.zIndex = styles[style].zindex;
            }
            if (styles[style].overflow_x != null) {
                chahgable.style.overflowX = styles[style].overflow_x;
            }
            if (styles[style].overflow_y != null) {
                chahgable.style.overflowY = styles[style].overflow_y;
            }
            if (styles[style].font_family != null) {
                chahgable.style.fontFamily = styles[style].font_family;
            }
            if (styles[style].font_weight != null) {
                chahgable.style.fontWeight = styles[style].font_weight;
            }
            if (styles[style].font_style != null) {
                chahgable.style.fontStyle = styles[style].font_style;
            }
            if (styles[style].font_size != null) {
                chahgable.style.fontSize = styles[style].font_size;
            }
            if (styles[style].color != null) {
                chahgable.style.color = styles[style].color;
            }
            if (styles[style].text_align != null) {
                chahgable.style.textAlign = styles[style].text_align;
            }
            if (styles[style].text_align_last != null) {
                chahgable.style.textAlignLast = styles[style].text_align_last;
            }
            if (styles[style].text_indent != null) {
                chahgable.style.textIndent = styles[style].text_indent;
            }
            if (styles[style].background_color != null) {
                chahgable.style.backgroundColor = styles[style].background_color;
            }
            if (styles[style].border_style != null) {
                chahgable.style.borderStyle = styles[style].border_style;
            }
            if (styles[style].border_color != null) {
                chahgable.style.borderColor = styles[style].border_color;
            }
            if (styles[style].border_width != null) {
                chahgable.style.borderWidth = styles[style].border_width;
            }
            if (styles[style].border_radius != null) {
                chahgable.style.borderRadius = styles[style].border_radius;
            }
        }
    }
}

function selector_fill(style) {
    let style_edit = document.getElementById("style_edit");
    let insert = "<div><h3>Настройка контейнера</h3><div><div style='width: 120px; display: inline-block;'> Ширина:</div><div style='display: inline-block;'> <input value='" + styles[style].width + "' style='width: 120px;' oninput='set_width(" + style + ",this.value)' type='number'></div></div>";
    insert = insert + "<div><div><div style='width: 120px; display: inline-block;'> Высота:</div><div style='display: inline-block;'> <input value='" + styles[style].height + "' style='width: 120px;' oninput='set_height(" + style + ",this.value)' type='number'></div></div>";
    insert = insert + "<div><div><div style='width: 120px; display: inline-block;'> Порядок вывода:</div><div style='display: inline-block;'> <input value='" + styles[style].zindex + "' style='width: 120px;' oninput='set_zindex(" + style + ",this.value)' type='number'></div></div>";
    insert = insert + "<div> <a style='width: 120px;'> Прокрутка по X: </a> <select id='style_overflow_x' style='width: 120px;' onchange='set_overflow_x(" + style + ",this.value)'>"
    insert = insert + "<option value='visible'>Отображать все содержимое</option>";
    insert = insert + "<option value='auto'>Полоса прокрутки добавляется по необходимости</option>";
    insert = insert + "<option value='hidden'>Нет полосы прокрутки, выступающее содержимое скрывается</option></select></div>";
    insert = insert + "<div> Прокрутка по Y: <select id='style_overflow_y' style='width: 120px;' onchange='set_overflow_y(" + style + ",this.value)'>";
    insert = insert + "<option value='visible'>Отображать все содержимое</option>";
    insert = insert + "<option value='auto'>Полоса прокрутки добавляется по необходимости</option>";
    insert = insert + "<option value='hidden'>Нет полосы прокрутки, выступающее содержимое скрывается</option></select></div>";
    insert = insert + "<div> <div style='width: 120px; display: inline-block;'>Выравнивание:</div><div style='display: inline-block;'> <div> <select id='style_text_align' style='width: 120px;' onchange='set_text_align(" + style + ",this.value)'></div>";
    insert = insert + "<option style='text-align:center;' value='center'>По центру</option>";
    insert = insert + "<option style='text-align:justify;' value='justify'>По ширине</option>";
    insert = insert + "<option style='text-align:left;' value='left'>По левому краю</option>";
    insert = insert + "<option style='text-align:right;' value='right'>По правому краю</option></select></div></div></div>";
    insert = insert + "<div>  <div style='width: 118px; display: inline-block;'>Цвет фона: </div> <div style='display: inline-block;'><input value='" + styles[style].background_color + "' style='width: 118px;' oninput='set_background_color(" + style + ",this.value)' type='color'></div></div>";
    insert = insert + "<h3>Внешний вид текста</h3><div><div style='width: 120px; display: inline-block;'> Шрифт: </div><div style='display: inline-block;'><select id='style_font_family' style='width: 120px;' onchange='set_font_family(" + style + ",this.value)'>";
    insert = insert + "<option style='font-family:Georgia;' value='Georgia'>Georgia</option>";
    insert = insert + "<option style='font-family:Palatino Linotype;' value='Palatino Linotype'>Palatino Linotype</option>";
    insert = insert + "<option style='font-family:Book Antiqua;' value='Book Antiqua'>Book Antiqua</option>";
    insert = insert + "<option style='font-family:Times New Roman;' value='Times New Roman'>Times New Roman</option>";
    insert = insert + "<option style='font-family:Arial;' value='Arial'>Arial</option>";
    insert = insert + "<option style='font-family:Helvetica;' value='Helvetica'>Helvetica</option>";
    insert = insert + "<option style='font-family:Arial Black;' value='Arial Black'>Arial Black</option>";
    insert = insert + "<option style='font-family:Impact;' value='Impact'>Impact</option>";
    insert = insert + "<option style='font-family:Lucida Sans Unicode;' value='Lucida Sans Unicode'>Lucida Sans Unicode</option>";
    insert = insert + "<option style='font-family:Tahoma;' value='Tahoma'>Tahoma</option>";
    insert = insert + "<option style='font-family:Verdana;' value='Verdana'>Verdana</option>";
    insert = insert + "<option style='font-family:Courier New;' value='Courier New'>Courier New</option>";
    insert = insert + "<option style='font-family:Lucida Console;' value='Lucida Console'>Lucida Console</option></select></div></div>";
    insert = insert + "<div><div style='width: 120px; display: inline-block;'> Насыщенность: </div><div style='display: inline-block;'> <select id='style_font_weight' style='width: 120px;' onchange='set_font_weight(" + style + ",this.value)'>";
    insert = insert + "<option style='font-weight:100;' value='100'>100</option>";
    insert = insert + "<option style='font-weight:200;' value='200'>200</option>";
    insert = insert + "<option style='font-weight:300;' value='300'>300</option>";
    insert = insert + "<option style='font-weight:400;' value='400'>400</option>";
    insert = insert + "<option style='font-weight:500;' value='500'>500</option>";
    insert = insert + "<option style='font-weight:600;' value='600'>600</option>";
    insert = insert + "<option style='font-weight:700;' value='700'>700</option>";
    insert = insert + "<option style='font-weight:800;' value='800'>800</option>";
    insert = insert + "<option style='font-weight:900;' value='900'>900</option></select></div></div>";
    insert = insert + "<div><div style='width: 120px; display: inline-block;'> Стилизация:</div><div style='display: inline-block;'> <select id='style_font_style' style='width: 120px;' onchange='set_font_style(" + style + ",this.value)'>";
    insert = insert + "<option style='font-style:normal;' value='normal'>Обычный</option>";
    insert = insert + "<option style='font-style:italic;' value='italic'>Курсив</option>";
    insert = insert + "<option style='font-style:oblique;' value='oblique'>Наклоненный</option></select></div></div>";
    insert = insert + "<div> <div style='width: 120px; display: inline-block;'>Размер шрифта:</div><div style='display: inline-block;'> <select id='style_font_size' style='width: 120px;' onchange='set_font_size(" + style + ",this.value)'>";
    insert = insert + "<option value='8px'>8</option><option value='9px'>9</option><option value='10px'>10</option>";
    insert = insert + "<option value='11px'>11</option><option value='12px'>12</option><option value='14px'>14</option>";
    insert = insert + "<option value='16px'>16</option><option value='18px'>18</option><option value='20px'>20</option>";
    insert = insert + "<option value='22px'>22</option><option value='24px'>24</option><option value='26px'>26</option>";
    insert = insert + "<option value='28px'>28</option><option value='36px'>36</option><option value='48px'>48</option>";
    insert = insert + "<option value='72px'>72</option><option value='84px'>84</option><option value='96px'>96</option>";
    insert = insert + "<option value='108px'>108</option><option value='144px'>144</option><option value='192px'>192</option>";
    insert = insert + "<option value='216px'>216</option><option value='288px'>288</option></select></div></div>";
    insert = insert + "<div><div style='width: 118px; display: inline-block;'> Цвет текста:</div><div style='display: inline-block;'> <input value='" + styles[style].color + "' style='width: 118px;' oninput='set_color(" + style + ",this.value)' type='color'></div></div>";
    insert = insert + "<h3>Внешний вид рамки</h3><div><div style='width: 120px; display: inline-block;'> Стиль: </div><div style='display: inline-block;'><select id='style_border_style' style='width: 120px;' onchange='set_border_style(" + style + ",this.value)'>";
    insert = insert + "<option value='none'>Отсутствует</option>";
    insert = insert + "<option value='dotted'>Точки</option>";
    insert = insert + "<option value='dashed'>Тире</option>";
    insert = insert + "<option value='solid'>Сплошной цвет</option>";
    insert = insert + "<option value='double'>Сдвоенный</option>";
    insert = insert + "<option value='groove'>Паз</option>";
    insert = insert + "<option value='ridge'>Ребро</option>";
    insert = insert + "<option value='inset'>Впадина</option>";
    insert = insert + "<option value='outset'>Выступ</option></select></div></div>";
    insert = insert + "<div>  <div style='width: 118px; display: inline-block;'>Цвет рамки: </div> <div style='display: inline-block;'><input value='" + styles[style].border_color + "' style='width: 118px;' oninput='set_border_color(" + style + ",this.value)' type='color'></div></div>";
    insert = insert + "<div><div><div style='width: 120px; display: inline-block;'> Толщина рамки:</div><div style='display: inline-block;'> <input value='" + styles[style].border_width.replace("px","") + "' style='width: 120px;' oninput='set_border_width(" + style + ",this.value)' type='number'></div></div>";
    insert = insert + "<div> <div style='width: 116px; display: inline-block;'> Радиус рамки: </div> <div style='display: inline-block;'><input value='" + styles[style].border_radius.replace("%","") + "' style='width: 116px;' oninput='set_border_radius(" + style + ",this.value)' type='range' max='50'></div></div>";


    style_edit.innerHTML = insert;

    document.getElementById("style_overflow_x").value = styles[style].overflow_x;
    document.getElementById("style_overflow_y").value = styles[style].overflow_y;
    document.getElementById("style_text_align").value = styles[style].text_align;
    document.getElementById("style_font_family").value = styles[style].font_family;
    document.getElementById("style_font_weight").value = styles[style].font_weight;
    document.getElementById("style_font_style").value = styles[style].font_style;
    document.getElementById("style_font_size").value = styles[style].font_size;
    document.getElementById("style_border_style").value = styles[style].border_style;
}

function set_height(style, value) {
    styles[style].height = value;
    change_style(style);
}

function set_width(style, value) {
    styles[style].width = value;
    change_style(style);
}

function set_zindex(style, value) {
    styles[style].zindex = value;
    change_style(style);
}

function set_overflow_x(style, value) {
    styles[style].overflow_x = value;
    change_style(style);
}

function set_overflow_y(style, value) {
    styles[style].overflow_y = value;
    change_style(style);
}

function set_font_family(style, value) {
    styles[style].font_family = value;
    change_style(style);
}

function set_font_weight(style, value) {
    styles[style].font_weight = value;
    change_style(style);
}

function set_font_style(style, value) {
    styles[style].font_style = value;
    change_style(style);
}

function set_font_size(style, value) {
    styles[style].font_size = value;
    change_style(style);
}

function set_color(style, value) {
    styles[style].color = value;
    change_style(style);
}

function set_text_align(style, value) {
    styles[style].text_align = value;
    change_style(style);
}

function set_background_color(style, value) {
    styles[style].background_color = value;
    change_style(style);
}

function set_border_style(style, value) {
    styles[style].border_style = value;
    change_style(style);
}

function set_border_color(style, value) {
    styles[style].border_color = value;
    change_style(style);
}

function set_border_width(style, value) {
    styles[style].border_width = value + "px";
    change_style(style);
}

function set_border_radius(style, value) {
    styles[style].border_radius = value + "%";
    change_style(style);
}
