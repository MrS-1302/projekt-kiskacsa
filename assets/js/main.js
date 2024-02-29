/*
    Ez a js kód felel a háttér és menü létrehozásáért.
    Azért van erre szükség, hogy ne keljen minden új oldalnál beágyazni és, hogy csak egyszer kelljen módosítani azokat ha kell.
*/

window.addEventListener('DOMContentLoaded', async () => {
    /* Ez hozza létre a menüt */
    menu = document.createElement('div');
    menu.className = 'menuParent';
    menu.innerHTML = await httpGet('/pages/tpl/menu.html');
    document.body.prepend(menu)
    
    window.addEventListener('resize', function(event) {
        if (document.title.split(' | ')[1] == 'Főoldal') {
            document.querySelector('.kepek').style.height = window.innerHeight + 'px';
        }
    }, true);

    document.getElementById('active').addEventListener('change', async () => {
        docBody = document.body;
        bodyOverflow = docBody.style.overflow;
        if (bodyOverflow == 'hidden') {
            document.querySelector('.wrapper').style.overflow = 'hidden';
            docBody.style.overflow = 'auto';
        } else {
            document.querySelector('.wrapper').style.overflow = 'auto';
            docBody.style.overflow = 'hidden';
        }
    });
});

function httpGet(theUrl) {
    return new Promise((resolve, reject) => {
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                resolve(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", theUrl, false);
        xmlhttp.send();
    });
}

//ez cserélni <main> ben a tartalmat
async function redirection(url, title, menuClose = true, plus = 0) {
    document.querySelector('main').innerHTML = await httpGet(url); //beszerzem az oldal tartalmát
    document.title = 'Gábor Dénes Óvoda, Általánis Iskola, Gimnázium és Technikum | ' + title; //Be állítom a navét, hogy az mindehol más lehessen
    
    if (title == 'Főoldal') {
        document.querySelector('.kepek').style.height = window.innerHeight + 'px';
    }
    if (plus != 0) {
        scrollspyJump('list-item-' + plus);
    }
    
    if (document.querySelector('.menu-btn') && menuClose) document.querySelector('.menu-btn').click(); //Rákattintok az X re, hogy a menüt bezárjam
}

function scrollspyJump(id) {
    if (window.innerWidth >= 768) {
        scrollHere = document.getElementById(id).offsetTop - document.querySelector('.stickedScrollspy').clientHeight + 10;
    } else {
        scrollHere = document.getElementById(id).offsetTop - 10;
    }

    document.querySelector('.scrollspy a:nth-child(' + elozoAktiv + ')').classList.toggle('active');
    elozoAktiv = parseInt(id.split('-')[2]);
    document.querySelector('.scrollspy a:nth-child(' + elozoAktiv + ')').classList.toggle('active');

    window.scroll({
        top: scrollHere, 
        left: 0, 
        behavior: 'smooth'
    });
}

let elozoAktiv = 1;
window.addEventListener('wheel', function (scroll) {
    if (document.getElementById('list-item-1')) {
        let valtozatat = 0;
        if (scroll.deltaY > 0) {
            if (elozoAktiv < 4 && document.getElementById('list-item-' + (elozoAktiv + 1)).offsetTop - 236 < window.scrollY) {
                valtozatat = 1;
            }
        } else {
            if (elozoAktiv > 1 && document.getElementById('list-item-' + elozoAktiv).offsetTop > window.scrollY) {
                valtozatat = -1;
            }
        }

        if (valtozatat != 0) {
            document.querySelector('.scrollspy a:nth-child(' + elozoAktiv + ')').classList.toggle('active');
            document.querySelector('.scrollspy a:nth-child(' + (elozoAktiv + valtozatat) + ')').classList.toggle('active');
        }
        elozoAktiv += valtozatat;
    }
});