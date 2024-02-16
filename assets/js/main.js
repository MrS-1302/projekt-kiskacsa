/*
    Ez a js kód felel a háttér és menü létrehozásáért.
    Azért van erre szükség, hogy ne keljen minden új oldalnál beágyazni és, hogy csak egyszer kelljen módosítani azokat ha kell.
*/

window.addEventListener('DOMContentLoaded', async () => {
    /* Ez hozza létre a menüt */
    menu = document.createElement('div');
    menu.className = 'menuParent';
    menu.innerHTML = await httpGet('/pages/tpl/menu.html');
    document.body.appendChild(menu);

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
async function redirection(url, title) {
    document.querySelector('main').innerHTML = '<div class="container">' + await httpGet(url) + '</div>'; //beszerzem az oldal tartalmát
    document.title = 'Gábor Dénes Óvoda, Általánis Iskola, Gimnázium és Technikum | ' + title; //Be állítom a navét, hogy az mindehol más lehessen
    if (document.querySelector('.menu-btn')) document.querySelector('.menu-btn').click(); //Rákattintok az X re, hogy a menüt bezárjam
}