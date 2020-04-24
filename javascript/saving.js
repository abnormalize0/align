const save_baton = document.querySelector(".save_baton");
save_baton.addEventListener("mousedown", saving);

function saving(b) { //скачивание документов
    for (let pages = 1; pages <= number_of_pages; pages++) {
        let file = document.createElement('a');
        file.style.display = 'none';

        let text = "<!DOCTYPE html>\n<html lang=\"ru\">\n\t<head>\n\t\t<meta charset=\"UTF-8\" />\n\t\t<title>"+ title +"</title>\n\t\t<link rel=\"stylesheet\" href=\"style.css\" />\n\t</head>\n\t<body>\n";
        for(let i = 0; i < count; i++) {
            if ((elements[i].type.localeCompare("deleted") == 0) || (pages != elements[i].page)) {
                continue;
            }
            text = text + "\t\t" + elementscode[i].begin + " style = \"";
            if (elementscode[i].left != undefined) text = text + elementscode[i].left;
            if (elementscode[i].top != undefined) text = text + elementscode[i].top + "\"";
            if (elementscode[i].placeholder != undefined) text = text + elementscode[i].placeholder;
            if (elementscode[i].text != undefined) text = text + elementscode[i].text;
            text = text + elementscode[i].end + "\n";
        }
        text = text + "\t</body>\n</html>";

        //let filename = title + ".html";
        let filename = document.getElementById("page" + pages).innerHTML + ".html";
        file.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        file.setAttribute('download', filename);
        file.click();
        file.remove();
    }
    let file = document.createElement('a');
    file.style.display = 'none';
    let text = ".item {\n\tposition: absolute;\n}"
    let filename = "style.css";
    file.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    file.setAttribute('download', filename);
    file.click();
    file.remove();
}