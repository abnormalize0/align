const save_baton = document.querySelector(".save_baton");
save_baton.addEventListener("mousedown", saving);

function saving(b) { //скачивание файл
    sql_exec();
    let zip = new JSZip();
    let content = zip.folder("content");
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
            //if (elementscode[i].text != undefined) text = text + elementscode[i].text;
            if ((elementscode[i].text != undefined) && (elements[i].type.localeCompare("table") == 0)) {
                text = text + "<?php include \"content/" + elements[i].type + elements[i].id + "_content.php\"; ?>";

                let content_text = elementscode[i].text;
                let filename = elements[i].type + elements[i].id + "_content.php";
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
    alert("here");
}