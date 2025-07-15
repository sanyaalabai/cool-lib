try {
    logoImgUrl="";
    logoUrl="";
    headerLinks=[];
    burgerMenuEnabled=false;
    themeBtnEnabled=false;
    getJSON('header.json', function(err, data) {
        if(err !== null) {
          console.log('cool-lib (header.js): Couldn\'t fetch json: ' + err);
          return;
        }
        if(data.logo!==null) {
            logoUrl=data.logo.url;
            logoImgUrl=data.logo.img;
        }
        if(data.links!==null)
            for(let i=0;i<data.links.count;i++)
                headerLinks.push(data.links[i]);
        if(data.features!==null) {
            if(data.features.burger!==null) burgerMenuEnabled=data.features.burger;
            if(data.features.theme!==null) themeBtnEnabled=data.features.theme;
        }
    });
    //Inject header
    let header=document.createElement("header");
    //Logo
    let span1Header=document.createElement("span");
    span1Header.classList.add("flex");
    if(logoUrl!=="") {
        span1Header.innerHTML+="\
    <a href=\""+logoUrl+"\" style=\"padding: 0;padding-right: 1.5rem;\">\
        <img class=\"select-none\" src=\""+logoImgUrl+"\" id=\"server-ico\">\
    </a>";
    }
    //Navigation
    let navHeader=document.createElement("nav");
    navHeader.id="header-nav-large";
    for(let i=0;i<headerLinks.count;i++) {
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
        themeImg.classList.add("ico");
        themeImg.style.width="1.65rem";
        themeImg.style.height="1.65rem";
        let val=localStorage.getItem(strKey);
        if(!val || !schemes.includes(val)) val="system";
        if(val=="system") themeImg.data=assetsURL+"img/theme_system.svg";
        else if(val=="light") themeImg.data=assetsURL+"img/theme_light.svg";
        else if(val=="dark") themeImg.data=assetsURL+"img/theme_dark.svg";
        themeBtn.appendChild(themeImg);
        themeBtn.onclick = function() {
            switchColorScheme();
            let val=document.documentElement.style.getPropertyValue("--theme");
            let themeImg=document.getElementById("theme-switcher").getElementsByTagName("object")[0];
            if(val=="system") themeImg.data=assetsURL+"img/theme_system.svg";
            else if(val=="light") themeImg.data=assetsURL+"img/theme_light.svg";
            else if(val=="dark") themeImg.data=assetsURL+"img/theme_dark.svg";
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
        burgerImg.data=baseURL+"img/burger.svg";
        burgerImg.classList.add("ico");
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
        burgerHiderImg.data=baseURL+"img/xmark.svg";
        burgerHiderImg.classList.add("ico");
        burgerHiderBtn.appendChild(burgerHiderImg);
        burgerElementsSpan.appendChild(burgerHiderBtn);
        //Links
        let burgerLinks=document.createElement("ul");
        for(let i=0;i<headerLinks.count;i++) {
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
    //Remove script
    //document.body.removeChild(document.getElementById("header-gen"));
} catch (error) {
    console.log('cool-lib (header.js): Couldn\'t fetch json: ' + err);
}