/*
    Ez a js kód felel a háttér és menü létrehozásáért.
    Azért van erre szükség, hogy ne keljen minden új oldalnál beágyazni és, hogy csak egyszer kelljen módosítani azokat ha kell.
*/

window.addEventListener('DOMContentLoaded', async () => {
    bgLineColors = await get_bgLinesColors()
    console.log(bgLineColors)  

    menu = document.createElement('div');
    menu.className = 'menuParent';
    menu.innerHTML = await httpGet('tpl/menu.html');
    document.body.appendChild(menu);
    
    bg = document.createElement('div');
    bg.className = 'bgParent';
    document.body.appendChild(bg);
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

function get_bgLinesColors() {
    return new Promise(async (resolve, reject) => {
        bg = await Array.from(document.styleSheets)
        .filter(
            sheet =>
            sheet.href === null || sheet.href.startsWith(window.location.origin)
        )
        .reduce(
            (acc, sheet) =>
            (acc = [
                ...acc,
                ...Array.from(sheet.cssRules).reduce(
                (def, rule) =>
                    (def =
                        rule.selectorText === ":root"
                        ? [
                            ...def,
                            ...Array.from(rule.style).filter(name =>
                                name.startsWith("--bg-line")
                            )
                        ]
                        : def),
                []
                )
            ]),
            []
        );
        
        bgLineColors = [];
        for (i = 0; i < bg.length; i++) {
            bgLineColors.push({name: bg[0], value: getComputedStyle(document.documentElement).getPropertyValue(bg[0])});
        }

        resolve(bgLineColors);
    });
}