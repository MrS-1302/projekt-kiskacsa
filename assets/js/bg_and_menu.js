/*
    Ez a js kód felel a háttér és menü létrehozásáért.
    Azért van erre szükség, hogy ne keljen minden új oldalnál beágyazni és, hogy csak egyszer kelljen módosítani azokat ha kell.
*/

window.addEventListener('DOMContentLoaded', async () => {
    /* Ez kelle ahhoz, hogy be importáljam a saját függvényeket. */
    await $.getScript("/assets/js/bg_and_menu_helper.js");

    /* Ez hozza létre a menüt */
    menu = document.createElement('div');
    menu.className = 'menuParent';
    menu.innerHTML = await httpGet('/pages/tpl/menu.html');
    document.body.appendChild(menu);
    
    /* CSS ből kiolvasom a változókat*/
    bgLineColors = await get_bgLinesColors();
    console.log(bgLineColors);

    /* Ez meg létrehozza a hátteret */
    bg = document.createElement('div');
    bg.className = 'bgParent';
    document.body.appendChild(bg);
/* 
    for (a = 0; a < Math.floor(bgLineColors.find(item => item.name === '--bg-lines').value / (bgLineColors.length - 1)); a++) {
        for (b = 0; b < bgLineColors.length - 1; b++) {
            line = document.createElement('div');
            line.className = 'lines';
            line.style.backgroundColor = bgLineColors[b].value;
            line.style.height = window.innerWidth * 2 + 'px';
            szam = Math.floor(Math.random() * 100);
            line.style.transform = 'rotate(' + szam + 'deg)';
            line.style.left = szam + '%';
            line.style.top = szam + '%';
            document.querySelector('.bgParent').appendChild(line);
        }
    } */
});