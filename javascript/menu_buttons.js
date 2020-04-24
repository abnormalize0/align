
document.onmousedown = function(e) {
    var evt = e==null ? event : e;

    if (evt.which) { // if e.which, use 2 for middle button
        if (evt.which === 2) {
            // middle button clicked
            e.preventDefault();
            //document.getElementById('field').scroll(1000, 1000);
        }
    } else if (evt.button) { // and if e.button, use 4
        if (evt.button === 4) {
            // middle button clicked
            e.preventDefault();
            //document.getElementById('field').scroll(1000, 1000);
        }
    }
}


window.addEventListener('contextmenu', function (e) { 
    // do something here... 
    e.preventDefault(); 
  }, false);


let check = true;
left.onclick = function() {
    let textmenu = document.getElementById("textmenu");
    let leftbutt = document.getElementById("left");
    if (check == true) {
        check = false;
        let pos = -200;
        let deg = 0;
        let id = setInterval(frame,1);
        let id2 = setInterval(frame2,1);
        function frame() {
        if (pos == 0) {
                clearInterval(id);
            } else {
                pos+=5;
                textmenu.style.left = pos + 'px';
            }
        }
        function frame2() {
        if (deg == 180) {
                clearInterval(id2);
            } else {
                deg+=5;
                leftbutt.style.transform = 'rotate('+ deg + 'deg)';
            }
        }
    } else {
        check = true;
        let pos = 0;
        let deg = 180;
        let id = setInterval(frame,1);
        let id2 = setInterval(frame2,1);
        function frame() {
        if (pos == -200) {
                clearInterval(id);
            } else {
                pos-=5;
                textmenu.style.left = pos + 'px';
            }
        }
        function frame2() {
        if (deg == 360  ) {
                clearInterval(id2);
            } else {
                deg+=5;
                leftbutt.style.transform = 'rotate('+ deg + 'deg)';
            }
        }
    }
    
};



let check2 = true;
right.onclick = function() {
    let textmenu = document.getElementById("settings");
    let leftbutt = document.getElementById("right");
    if (check2 == true) {
        check2 = false;
        let pos = -300;
        let deg = 0;
        let id = setInterval(frame,1);
        let id2 = setInterval(frame2,1);
        function frame() {
        if (pos == 0) {
                clearInterval(id);
            } else {
                pos+=5;
                textmenu.style.right = pos + 'px';
            }
        }
        function frame2() {
        if (deg == 180) {
                clearInterval(id2);
            } else {
                deg+=5;
                leftbutt.style.transform = 'rotate('+ deg + 'deg)';
            }
        }
    } else {
        check2 = true;
        let pos = 0;
        let deg = 180;
        let id = setInterval(frame,1);
        let id2 = setInterval(frame2,1);
        function frame() {
        if (pos == -300) {
                clearInterval(id);
            } else {
                pos-=5;
                textmenu.style.right = pos + 'px';
            }
        }
        function frame2() {
        if (deg == 360  ) {
                clearInterval(id2);
            } else {
                deg+=5;
                leftbutt.style.transform = 'rotate('+ deg + 'deg)';
            }
        }
    }
    
};
