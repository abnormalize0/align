let cur_page = 1;
let number_of_pages = 0;
let hovering = 0;
let cur_hovering = 0;
let previous_page = 1;


document.getElementById("for_hover").onmouseover = show_paging;
document.getElementById("paging_panel").onmouseover = still_here;
document.getElementById("paging_panel").onmouseleave = hide_paging;

function show_paging() {
    hovering = 1;
    cur_hovering = 0;
    let paging = document.getElementById("paging_panel");
    let bottom = -120;
    let id = setInterval(frame,1);
    function frame() {
    if (bottom == 0) {
            clearInterval(id);
        } else {
            bottom+=30;
            paging.style.bottom = bottom + 'px';
        }
    }
}

function still_here() {
    hovering = 1;
    cur_hovering++;
}

function hide_paging(event) {
    let hover = cur_hovering;
    console.log(cur_hovering);
    hovering = 0;
    let paging = document.getElementById("paging_panel");
    let bottom = 0;
    let id;
    setTimeout(() => {
        if ((hovering)||(hover != cur_hovering)){
            return;
        } else {
            id = setInterval(frame,1);
        }
    }, 2000);
    function frame() {
        if (bottom == -120) {
                clearInterval(id);
            } else {
                bottom-=30;
                paging.style.bottom = bottom + 'px';
            }
        }
}

function redraw_elements(page) {
    for (let i = 0; i < count; i++) {
        let exist = document.getElementById("el" + i);
        if (exist != null) {
            document.getElementById('el' + i).style.visibility = "hidden";
            if (elements[i].page == page) {
              document.getElementById('el' + i).style.visibility = "visible";
            }
        }
    }
}

document.getElementById("add_block").addEventListener("mousedown", create_page);
create_page();
highlight(1);

function create_page() {
    document.getElementById("pages_part").insertAdjacentHTML('beforeend',"<div class=\"page_block\" style=\"left: " + (10 + (90 * number_of_pages)) + "px\" id=\"page" + (number_of_pages + 1) + "\">Page_" + (number_of_pages + 1) + "</div>");
    document.getElementById("page" + (number_of_pages + 1)).addEventListener("mousedown", goto_page.bind(1,number_of_pages + 1));
    number_of_pages++;
}

function goto_page(page,e) {
    if (page == previous_page) {
        page_properties(page);
        return;
    }
    if (e != null) {
        close_properties();
    }
    redraw_elements(page);
    cur_page = page;
    highlight(page);
}

function highlight(page) {
    document.getElementById("page" + previous_page).style.backgroundColor = "orange";
    document.getElementById("page" + page).style.backgroundColor = "orangered";
    previous_page = page;
}

function page_properties(id) {  //анимация окна со свойствами и его наполнение. надо разделить
    console.log(right_visible);
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
    document.getElementById("textfieldproperties").style.visibility = "hidden";
    document.getElementById("buttonproperties").style.visibility = "hidden";
    document.getElementById("textproperties").style.visibility = "hidden";
    document.getElementById("pageproperties").style.visibility = "visible";
    let pagename = document.getElementById("pagename");
    pagename.value = document.getElementById("page" + id).innerHTML;
    let elem = document.getElementById("page" + id);
    pagename.oninput = function() {
        elem.innerHTML = pagename.value;
    }
}


(function() {
    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.getElementById('pages_part').scrollLeft -= (delta*40); // Multiplied by 40
        e.preventDefault();
    }
    if (document.getElementById('pages_part').addEventListener) {
        // IE9, Chrome, Safari, Opera
        document.getElementById('pages_part').addEventListener("mousewheel", scrollHorizontally, false);
        // Firefox
        document.getElementById('pages_part').addEventListener("DOMMouseScroll", scrollHorizontally, false);
    } else {
        // IE 6/7/8
        document.getElementById('pages_part').attachEvent("onmousewheel", scrollHorizontally);
    }
})();
