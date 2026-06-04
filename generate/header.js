import { getJSON } from "../cool.js";

var foundCoollibDir=false;
if (typeof coollibDir !== "undefined") foundCoollibDir=true;

try {
    var logoImgUrl="";
    var logoUrl="";
    var headerLinks=[];
    var burgerMenuEnabled=false;
    var themeBtnEnabled=false;
    var logoText="";
    var burgerMenuIcon="";
    var themeSystem="";
    var themeLight="";
    var themeDark="";
    var burgerXMark="";
    console.log("cool-lib (generate/header.js): Trying to fetch config json");
    const parse=function(err, data) {
        var logoImgUrl="";
        var logoUrl="";
        var headerLinks=[];
        var burgerMenuEnabled=false;
        var themeBtnEnabled=false;
        var logoText="";
        var burgerMenuIcon="";
        var themeSystem="";
        var themeLight="";
        var themeDark="";
        var burgerXMark="";
        if(err !== 200) {
          console.log('cool-lib (generate/header.js): Couldn\'t fetch json: ' + err);
        } else {
            if(data.hasOwnProperty("logo")) {
                logoUrl=data.logo.url;
                if(data.logo.hasOwnProperty("img")) logoImgUrl=data.logo.img;
                if(data.logo.hasOwnProperty("text")) logoText=data.logo.text;
            }
            if(data.hasOwnProperty("links")) {
                for(let i=0;i<data.links.length;i++)
                    headerLinks.push(data.links[i]);
            }
            if(data.hasOwnProperty("features")) {
                if(data.features.hasOwnProperty("burger")) {
                    if(data.features.burger.hasOwnProperty("enabled")) burgerMenuEnabled=data.features.burger.enabled;
                    if(data.features.burger.hasOwnProperty("icon")) burgerMenuIcon=data.features.burger.icon;
                    if(data.features.burger.hasOwnProperty("x_mark")) burgerXMark=data.features.burger.x_mark;
                }
                if(data.features.hasOwnProperty("theme")) {
                    if(data.features.theme.hasOwnProperty("enabled")) themeBtnEnabled=data.features.theme.enabled;
                    if(data.features.theme.hasOwnProperty("system")) themeSystem=data.features.theme.system;
                    if(data.features.theme.hasOwnProperty("light")) themeLight=data.features.theme.light;
                    if(data.features.theme.hasOwnProperty("dark")) themeDark=data.features.theme.dark;
                }
            }
        }
        return [err!==200,logoImgUrl,logoUrl,headerLinks,burgerMenuEnabled,themeBtnEnabled,logoText,burgerMenuIcon,themeSystem,themeLight,themeDark,burgerXMark];
    };
    var config=await getJSON('header.json', parse);
    if(foundCoollibDir) config=await getJSON(coollibDir, parse);
    if(config[0]) config=await getJSON('../header.json', parse);
    if(config[0]) config=await getJSON('../../header.json', parse);
    if(config[0]) config=await getJSON('../../../header.json', parse);
    logoImgUrl=config[1];
    logoUrl=config[2];
    headerLinks=config[3];
    burgerMenuEnabled=config[4];
    themeBtnEnabled=config[5];
    logoText=config[6];
    burgerMenuIcon=config[7];
    themeSystem=config[8];
    themeLight=config[9];
    themeDark=config[10];
    burgerXMark=config[11];
    console.log("cool-lib (generate/header.js): Generating header");
    //Inject header
    let header=document.createElement("header");
    //Logo
    let span1Header=document.createElement("span");
    span1Header.classList.add("flex");
    let hasValidText=logoText!=""&&logoText!=undefined;
    let hasValidLogo=logoImgUrl!==""&&logoImgUrl!=undefined;
    if(hasValidText || hasValidLogo) {
        let linkLogoHeader=document.createElement("a");
        linkLogoHeader.id="header_logo";
        linkLogoHeader.href=logoUrl;
        if(hasValidText) {
            let textHeader=document.createElement("h1");
            textHeader.innerText=logoText;
            linkLogoHeader.append(textHeader);
        }
        if(hasValidLogo) {
            let imgHeader=document.createElement("img");
            imgHeader.src=logoImgUrl;
            imgHeader.classList.add("select-none");
            imgHeader.id="header-ico";
            linkLogoHeader.append(imgHeader);
        }
        span1Header.appendChild(linkLogoHeader);
    }
    //Navigation
    let navHeader=document.createElement("nav");
    navHeader.id="header-nav-large";
    for(let i=0;i<headerLinks.length;i++) {
        let headerLink=document.createElement("a");
        headerLink.href=headerLinks[i].link;
        headerLink.id=headerLinks[i].id+"-hl";
        headerLink.innerText=headerLinks[i].name;
        navHeader.appendChild(headerLink);
    }
    //Append
    span1Header.appendChild(navHeader);
    header.appendChild(span1Header);
    //Other
    let otherHO=document.createElement("span");
    otherHO.id="acc-h";
    //Theme button
    if(themeBtnEnabled) {
        let themeBtn=document.createElement("button");
        themeBtn.id="theme-switcher";
        let themeImg=document.createElement("object");
        themeImg.type="image/svg+xml";
        themeImg.classList.add("header-ico");
        let val=localStorage.getItem(strKey);
        if(!val || !schemes.includes(val)) val="system";
        if(val=="system") themeImg.data=themeSystem;
        else if(val=="light") themeImg.data=themeLight;
        else if(val=="dark") themeImg.data=themeDark;
        themeBtn.appendChild(themeImg);
        themeBtn.onclick = function() {
            switchColorScheme();
            let val=document.documentElement.style.getPropertyValue("--theme");
            let themeImg=document.getElementById("theme-switcher").getElementsByTagName("object")[0];
            if(val=="system") themeImg.data=themeSystem;
            else if(val=="light") themeImg.data=themeLight;
            else if(val=="dark") themeImg.data=themeDark;
        };
        otherHO.appendChild(themeBtn);
    }
    //Burger menu
    if(burgerMenuEnabled) {
        let burgerBtn=document.createElement("button");
        burgerBtn.id="burger-hb";
        burgerBtn.onclick=function() {
            document.getElementById("burger-menu").classList.remove("burger-hidden");
            document.documentElement.classList.add("hide-y-overflow");
        };
        let burgerImg=document.createElement("object");
        burgerImg.type="image/svg+xml";
        burgerImg.data=burgerMenuIcon;
        burgerImg.classList.add("header-ico");
        burgerBtn.appendChild(burgerImg);
        otherHO.appendChild(burgerBtn);
    }
    header.appendChild(otherHO);
    //Append to body
    document.body.insertBefore(header, document.body.children[0]);
    //Real burger menu
    if(burgerMenuEnabled) {
        let burgerMenu=document.createElement("div");
        burgerMenu.id="burger-menu";
        burgerMenu.classList.add("burger-hidden");
        let burgerMenuBody=document.createElement("div");
        burgerMenuBody.id="burger-menu-body";
        let burgerElementsSpan=document.createElement("span");
        burgerElementsSpan.id="burger-elements";
        //Hider button
        let burgerHiderBtn=document.createElement("button");
        burgerHiderBtn.id="burger-menu-hider";
        burgerHiderBtn.onclick=function() {
            document.getElementById("burger-menu").classList.add("burger-hidden");
            document.documentElement.classList.remove("hide-y-overflow");
        };
        let burgerHiderImg=document.createElement("object");
        burgerHiderImg.type="image/svg+xml";
        burgerHiderImg.data=burgerXMark;
        burgerHiderImg.classList.add("header-ico");
        burgerHiderBtn.appendChild(burgerHiderImg);
        burgerElementsSpan.appendChild(burgerHiderBtn);
        //Links
        let burgerLinks=document.createElement("ul");
        for(let i=0;i<headerLinks.length;i++) {
            let burgerLinkBtn=document.createElement("li");
            burgerLinkBtn.onclick=function(){
                window.open(headerLinks[i].link, "_self");
            };
            let burgerLink=document.createElement("a");
            burgerLink.id="burger-"+headerLinks[i].id+"-l";
            burgerLink.href=headerLinks[i].link;
            burgerLink.innerText=headerLinks[i].name;
            burgerLinkBtn.appendChild(burgerLink);
            burgerLinks.appendChild(burgerLinkBtn);
        }
        //Join links together
        burgerElementsSpan.appendChild(burgerLinks);
        burgerMenuBody.appendChild(burgerElementsSpan);
        //Connect everything together
        burgerMenu.appendChild(burgerMenuBody);
        document.body.insertBefore(burgerMenu, document.body.children[1]);
    }
    console.log('cool-lib (generate/header.js): Header fully generated');
} catch (error) {
    console.log('cool-lib (generate/header.js): Couldn\'t create header: ' + error);
}