let sidemenu=document.createElement("div");
sidemenu.id="sidemenu";
//Sidemenu collapser
let sidemenuInfo=document.createElement("span");
sidemenuInfo.id="sidemenu-info";
let sidemenuCollapser=document.createElement("button");
sidemenuCollapser.innerText="<";
sidemenuCollapser.id="sidemenu-collapser";
sidemenuCollapser.onclick=function() {
    this.parentElement.parentElement.classList.toggle("collapsed");
    if(this.parentElement.parentElement.classList.contains("collapsed"))
        this.innerText=">";
    else this.innerText="<";
    if(window.innerWidth<=760)
        document.documentElement.classList.toggle("hide-y-overflow")
};
sidemenuInfo.appendChild(sidemenuCollapser);
//Header
let sidemenuHeader=document.createElement("h4");
sidemenuHeader.innerText="Статьи";
sidemenuHeader.classList.add("select-none");
sidemenuInfo.appendChild(sidemenuHeader);
sidemenu.appendChild(sidemenuInfo);
//Links
let wikiLinks=[
    [
        ["Сайт","sidemenu-site-h"],
        ["Карта сервера", "http://map.kaban-central.ru/","site-map"],
        ["Ключевые слова и термины", baseURL+"wiki/dictionary","site-dictionary"],
        ["Стримеры", baseURL+"wiki/streamers","site-streamers"]
    ],
    [
        ["Игра","sidemenu-game-h"],
        ["Как играть?", baseURL+"wiki/play","game-play"],
        ["Разрешённые модификации", baseURL+"wiki/modlist","game-modlist"],
        ["Гильдии", baseURL+"wiki/guilds","game-guilds"],
        ["Импорт картинок на сервер", baseURL+"wiki/imageframes","game-imageframes"],
        ["Новые рецепты", baseURL+"wiki/custom-crafts","game-custom-crafts"]
    ],
    [
        ["Юридическая информация","sidemenu-legal-h"],
        ["Пользовательское соглашение", baseURL+"wiki/legal/terms-of-use","legal-terms-of-use"],
        ["Legal inforamtion about Trademarks", baseURL+"wiki/legal/intellectual-property-notice","legal-intellectual-property-notice"]
    ]
];
for(let c=0;c<wikiLinks.length;c++) {
    const category=wikiLinks[c];
    //Create category info
    let sidemenuCtgInfo=document.createElement("span");
    sidemenuCtgInfo.classList.add("sidemenu-category-info");
    sidemenuCtgInfo.id="sidemenu-collapser-"+category[0][1];
    //Create category collapser
    let sidemenuCtgCollapser=document.createElement("button");
    sidemenuCtgCollapser.classList.add("sidemenu-header-collapser");
    sidemenuCtgCollapser.innerText=">";
    sidemenuCtgCollapser.classList.add("select-none");
    sidemenuCtgCollapser.onclick=function(){
        let idOfThis=0;
        document.getElementById("sidemenu").childNodes.forEach((node,n,parent)=>{
            if(node.id==this.parentElement.id) idOfThis=n;
        });
        let listNode=document.getElementById("sidemenu").children[idOfThis+1];
        listNode.classList.toggle("collapsed");
        this.classList.toggle("collapsed");
    };
    sidemenuCtgInfo.appendChild(sidemenuCtgCollapser);
    //Create category header
    let sidemenuCtgHeader=document.createElement("p");
    sidemenuCtgHeader.innerText=category[0][0];
    sidemenuCtgHeader.id=category[0][1];
    sidemenuCtgHeader.classList.add("select-none");
    sidemenuCtgInfo.appendChild(sidemenuCtgHeader);
    sidemenu.appendChild(sidemenuCtgInfo);
    //Write category entries
    let sidemenuCtgEntryList=document.createElement("ul");
    for(let e=1;e<category.length;e++) {
        const entry=category[e];
        //Create category entry
        let sidemenuCtgEntry=document.createElement("li");
        let sidemenuCtgEntryLink=document.createElement("a");
        sidemenuCtgEntryLink.innerText=entry[0];
        sidemenuCtgEntryLink.href=entry[1];
        sidemenuCtgEntryLink.id="sidemenu-entry-"+entry[2];
        if(entry[2]=="game-imageframes" ||
            entry[2]=="game-custom-crafts" ||
            entry[2]=="game-guilds"
        )
            sidemenuCtgEntryLink.style.color="var(--txt-unselected)";
        sidemenuCtgEntryLink.classList.add("select-none");
        //Append
        sidemenuCtgEntry.appendChild(sidemenuCtgEntryLink);
        sidemenuCtgEntryList.appendChild(sidemenuCtgEntry);
    }
    sidemenu.appendChild(sidemenuCtgEntryList);
}
if(window.innerWidth<=760) sidemenu.classList.add("collapsed");
document.body.getElementsByTagName("main")[0].appendChild(sidemenu);
//Remove script
document.body.getElementsByTagName("main")[0].removeChild(document.getElementById("sidemenu-gen"));
document.body.removeChild(document.getElementById("sidemenu-gen"));