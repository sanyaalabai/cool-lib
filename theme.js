const strKey="preferedColorScheme";
var schemes=["system","dark",'light'];
var slctr;
function setColorScheme(val){
    slctr.value=val;
    updateColorScheme();
}
function setColorSchemeId(i){
    slctr.value=schemes[i];
    updateColorScheme();
}
function updateColorScheme() {
    document.documentElement.style.setProperty("--theme", slctr.value);
    localStorage.setItem(strKey,slctr.value);
}
function switchColorScheme() {
    let i=schemes.indexOf(slctr.value)+1
    if(i==schemes.length) i=0;
    slctr.value=schemes[i];
    updateColorScheme();
}
window.addEventListener("load", function(){
    //Create selector
    if(schemes.length<2){
        console.error("cool-lib (theme.js): Not enough color schemes.");
        return;
    }
    slctr=document.createElement("select");
    slctr.id="color-scheme";
    slctr.onchange=updateColorScheme;
    for(let i=0;i<schemes.length;i++) {
        let opt=document.createElement("option");
        opt.value=schemes[i];
        opt.innerText=schemes[i];
        slctr.appendChild(opt);
    }
    document.body.appendChild(slctr);
    //Set selector's value
    let val=localStorage.getItem(strKey);
    if(!val || !schemes.includes(val)) {
        console.error("cool-lib (theme.js): Invalid saved color scheme.");
        val="system";
    }
    slctr.value=val;
    updateColorScheme();
});