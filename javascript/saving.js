const save_baton = document.querySelector(".save_baton");
save_baton.addEventListener("mousedown", saving);

function saving(b) { //скачивание файл
    sql_exec();
    let zip = new JSZip();
    let content = zip.folder("content");
    let reference_tables = [];
    let reference_elements_pages = [];
        let counter = 0;
        for(let prepare = 0; prepare < count; prepare++) {
            if((elements[prepare].type.localeCompare("button") == 0)&&(elements[prepare].table_rel != -1)&&(!reference_tables.includes(elements[prepare].table_rel))) {
                reference_tables[counter] = elements[prepare].table_rel;
                reference_elements_pages[counter] = elements[prepare].page;
                counter++;
            }
        }
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
                    //if (elementscode[i].text != undefined) text = text + elementscode[i].text;
                    text = text + " name='" + elements[i].type + i +"' ";
                    alert(elements[i].type);
                    if (elementscode[i].text != undefined) text = text + elementscode[i].text;
                    text = text + elementscode[i].end + "\n";
                    elements[i].type = elements[i].type + "formed";
                }
            }
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
            //if (elementscode[i].text != undefined) text = text + elementscode[i].text;
            if ((elementscode[i].text != undefined) && (elements[i].type.replace("formed","").localeCompare("table") == 0)) {
                let variables = "";
                for(let vars = 0; vars < count; vars++) {
                    if(elements[vars].table_rel == i) {
                        //variables = variables + "$" + elements[vars].type.replace("formed","") + vars + " = $_GET['" + elements[vars].type.replace("formed","") + vars + "'];\n";
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

        //let filename = title + ".php";
        let filename = document.getElementById("page" + pages).innerHTML + ".php";
        zip.file(filename, text)
    }

    let text = ".item {\n\tposition: absolute;\n}" // тут надо будет сделать более продвинутый генератор css
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