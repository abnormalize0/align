function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const save_baton = document.querySelector(".save_baton");
save_baton.addEventListener("mousedown", saving);

async function saving(b) { //скачивание файл
    sql_exec();
    let zip = new JSZip();
    let content = zip.folder("content");
    let reference_tables = [];
    let reference_elements_pages = [];
    let redirecter = [];
    let counter = 0;
    let recounter = 0;
    for(let prepare = 0; prepare < count; prepare++) {
        if((elements[prepare].action == 1)&&(elements[prepare].type.localeCompare("button") == 0)&&(elements[prepare].table_rel != -1)&&(!reference_tables.includes(elements[prepare].table_rel))) {
            reference_tables[counter] = elements[prepare].table_rel;
            reference_elements_pages[counter] = elements[prepare].page;
            counter++;
        } else if ((elements[prepare].action == 2)&&(elements[prepare].type.localeCompare("button") == 0)&&(elements[prepare].page_rel != -1)&&(!reference_tables.includes(elements[prepare].page_rel))) {
            redirecter[recounter] = prepare;
            recounter++;
        }
    }
    document.getElementById("loading_screen").innerHTML = "<div style='position: absolute;z-index:100000;top:0px;bottom:0px;left:0px;right:0px;background-color: rgba(128, 128, 128, .5);'><img class='center' src='css/img/loading.gif'></div>";
    await sleep(1000);
    document.getElementById("loading_screen").innerHTML = "";
    for (let pages = 1; pages <= number_of_pages; pages++) {
        let file = document.createElement('a');
        file.style.display = 'none';

        let text = "<!DOCTYPE html>\n<html lang=\"ru\">\n\t<head>\n\t\t<meta charset=\"UTF-8\" />\n\t\t<title>"+ title +"</title>\n\t\t<link rel=\"stylesheet\" href=\"style.css\" />\n\t</head>\n\t<body>\n";
        
        for(let fill_forms = 0; fill_forms < counter; fill_forms++) {
            if (reference_elements_pages[fill_forms] != pages) {
                continue;
            }
            text = text + "<form action='" + document.getElementById("page" + elements[reference_tables[fill_forms]].page).innerHTML + ".php'>\n";
            for(let i = 0; i < count; i++) {
                if ((elements[i].type.localeCompare("deleted") != 0) && (pages == elements[i].page) && (elements[i].table_rel == reference_tables[fill_forms])) {
                    text = text + "\t\t" + elementscode[i].begin + " style = \"";
                    if (elementscode[i].left != undefined) text = text + elementscode[i].left;
                    if (elementscode[i].top != undefined) text = text + elementscode[i].top + "\"";
                    if (elementscode[i].placeholder != undefined) text = text + elementscode[i].placeholder;
                    text = text + " name='" + elements[i].type + i +"' ";
                    if (elementscode[i].text != undefined) text = text + elementscode[i].text;
                    text = text + elementscode[i].end + "\n";
                    elements[i].type = elements[i].type + "formed";
                }
            }
            text = text + "</form>\n";
        }

        for(let redirect = 0; redirect < recounter; redirect++) {
            if ((elements[redirecter[redirect]].type.includes("formed") == 1) && (pages == elements[redirecter[redirect]].page)) {
                let new_type = elements[redirecter[redirect]].type.replace("formed","");
                elements[redirecter[redirect]].type = new_type;
                continue;
            }
            if ((elements[redirecter[redirect]].type.localeCompare("deleted") == 0) || (pages != elements[redirecter[redirect]].page)) {
                continue;
            }
            text = text + "<form action='" + document.getElementById("page" + elements[redirecter[redirect]].page_rel).innerHTML + ".php'>\n";
            text = text + "\t\t" + elementscode[redirecter[redirect]].begin + " style = \"";
            if (elementscode[redirecter[redirect]].left != undefined) text = text + elementscode[redirecter[redirect]].left;
            if (elementscode[redirecter[redirect]].top != undefined) text = text + elementscode[redirecter[redirect]].top + "\"";
            if (elementscode[redirecter[redirect]].placeholder != undefined) text = text + elementscode[redirecter[redirect]].placeholder;
            text = text + " name='" + elements[redirecter[redirect]].type + redirecter[redirect] +"' ";
            if (elementscode[redirecter[redirect]].text != undefined) text = text + elementscode[redirecter[redirect]].text;
            text = text + elementscode[redirecter[redirect]].end + "\n";
            elements[redirecter[redirect]].type = elements[redirecter[redirect]].type + "formed";
            text = text + "</form>\n";
        }

        for(let i = 0; i < count; i++) {
            if ((elements[i].type.includes("formed") == 1) && (pages == elements[i].page)) {
                let new_type = elements[i].type.replace("formed","");
                elements[i].type = new_type;
                continue;
            }
            if ((elements[i].type.localeCompare("deleted") == 0) || (pages != elements[i].page)) {
                continue;
            }
            text = text + "\t\t" + elementscode[i].begin + " style = \"";
            if (elementscode[i].left != undefined) text = text + elementscode[i].left;
            if (elementscode[i].top != undefined) text = text + elementscode[i].top + "\"";
            if (elementscode[i].placeholder != undefined) text = text + elementscode[i].placeholder;
            if ((elementscode[i].text != undefined) && (elements[i].type.replace("formed","").localeCompare("table") == 0)) {
                let variables = "";
                for(let vars = 0; vars < count; vars++) {
                    if((elements[vars].table_rel == i)&&(elements[vars].type.localeCompare("input") == 0)) {
                        variables = variables + "if (isset($_GET['" + elements[vars].type.replace("formed","") + vars + "'])) {\n";
                        variables = variables + "$" + elements[vars].type.replace("formed","") + vars + " = $_GET['" + elements[vars].type.replace("formed","") + vars + "'];\n";
                        variables = variables + "} else {\n";
                        variables = variables + "$" + elements[vars].type.replace("formed","") + vars + " = 0;\n}\n"
                    }
                }
                text = text + "<?php include \"content/" + elements[i].type.replace("formed","") + elements[i].id + "_content.php\"; ?>";
                let content_text = "<?php\n " + variables + " ?>" + elementscode[i].text;
                content_text = content_text.replace("?><?php","");
                let filename = elements[i].type.replace("formed","") + elements[i].id + "_content.php";
                content.file(filename, content_text)
            } else if (elementscode[i].text != undefined) text = text + elementscode[i].text;
            text = text + elementscode[i].end + "\n";
        }
        text = text + "\t</body>\n</html>";
        let filename = document.getElementById("page" + pages).innerHTML + ".php";
        zip.file(filename, text)
    }
    let text = "";
    for(let i = 0; i < styles.length; i++) {
        text = text + ".style" + i + " {\n\tposition: absolute;\n";
        if(styles[i].width != "") text = text + "\twidth: " + styles[i].width + "px;\n";
        if(styles[i].height != "") text = text + "\theight: " + styles[i].height + "px;\n";
        if(styles[i].zindex != "") text = text + "\tz-index: " + styles[i].zindex + ";\n";
        text = text + "\toverflow-x: " + styles[i].overflow_x + ";\n";
        text = text + "\toverflow-y: " + styles[i].overflow_y + ";\n";
        text = text + "\tfont-family: \"" + styles[i].font_family + "\";\n";
        text = text + "\tfont-weight: " + styles[i].font_weight + ";\n";
        text = text + "\tfont-style: " + styles[i].font_style + ";\n";
        text = text + "\tfont-size: " + styles[i].font_size + ";\n";
        text = text + "\tcolor: " + styles[i].color + ";\n";
        text = text + "\ttext-align: " + styles[i].text_align + ";\n";
        text = text + "\tbackground-color: " + styles[i].background_color + ";\n";
        text = text + "\tborder-style: " + styles[i].border_style + ";\n";
        text = text + "\tborder-color: " + styles[i].border_color + ";\n";
        text = text + "\tborder-width: " + styles[i].border_width + ";\n";
        text = text + "\tborder-radius: " + styles[i].border_radius + ";\n}\n\n";
    }
    zip.file("style.css", text);

    zip.generateAsync({type:"base64"})
    .then(function(content) {
        let file = document.createElement('a');
        file.style.display = 'none';
        let filename = "test.zip";
        file.setAttribute('href','data:application/zip;base64,' + content);
        file.setAttribute('download', filename);
        file.click();
        file.remove();
    });
}