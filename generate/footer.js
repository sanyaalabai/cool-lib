import { getJSON } from "../cool.js";

var foundCoollibDir=false;
if (typeof coollibDir !== "undefined") foundCoollibDir=true;

try {
    var logoImgUrl="";
    var logoUrl="";
    var footerLinks=[];
    var logoText="";
    var footerSocials=[];
    console.log("cool-lib (generate/footer.js): Trying to fetch config json");
    const parse=function(err, data) {
        var logoImgUrl="";
        var logoUrl="";
        var footerLinks=[];
        var logoText="";
        var footerSocials=[];
        if(err!==200) {
          console.log('cool-lib (generate/footer.js): Couldn\'t fetch json: ' + err);
        } else {
            if(data.hasOwnProperty("logo")) {
                logoUrl=data.logo.url;
                if(data.logo.hasOwnProperty("img")) logoImgUrl=data.logo.img;
                if(data.logo.hasOwnProperty("text")) logoText=data.logo.text;
            }
            if(data.hasOwnProperty("links"))
                for(let i=0;i<data.links.length;i++)
                    footerLinks.push(data.links[i]);
            if(data.hasOwnProperty("socials")) {
                    for(let i=0;i<data.socials.length;i++)
                        footerSocials.push(data.socials[i]);
                }
        }
        return [err!==200,logoImgUrl,logoUrl,footerLinks,logoText,footerSocials];
    };
    var config=await getJSON('footer.json', parse);
    if(foundCoollibDir) config=await getJSON(coollibDir, parse);
    if(config[0]) config=await getJSON('../footer.json', parse);
    if(config[0]) config=await getJSON('../../footer.json', parse);
    if(config[0]) config=await getJSON('../../../footer.json', parse);
    logoImgUrl=config[1];
    logoUrl=config[2];
    footerLinks=config[3];
    logoText=config[4];
    footerSocials=config[5];
    console.log("cool-lib (generate/footer.js): Generating footer");
    //Create footer itself
    let footer=document.createElement("footer");
    //Logo+social
    let navLogo=document.createElement("nav");
    navLogo.style.display="flex";
    navLogo.style.alignItems="center";
    navLogo.style.textAlign="center";
    //Logo
    if(logoText!=undefined&&logoText!="") {
        let logoTxt=document.createElement("h2");
        logoTxt.innerText=logoText;
        navLogo.appendChild(logoTxt);
    }
    if(logoImgUrl!=undefined&&logoImgUrl!="") {
        let imgHeader=document.createElement("img");
        imgHeader.src=logoImgUrl;
        imgHeader.classList.add("select-none");
        imgHeader.id="footer-logo";
        navLogo.append(imgHeader);
    }
    //Socials
    let socials=document.createElement("span");
    socials.classList.add("needs-align");
    for(let i=0;i<footerSocials.length;i++) {
        let fLink=document.createElement("a");
        fLink.href=footerSocials[i].link;
        fLink.target="_blank";
        let fLogoLink=document.createElement("object");
        fLogoLink.type="image/svg+xml";
        fLogoLink.data=footerSocials[i].img;
        fLogoLink.classList.add("footer-ico");
        fLink.appendChild(fLogoLink);
        socials.appendChild(fLink);
    }
    //Conect it to footer
    navLogo.appendChild(socials);
    footer.appendChild(navLogo);
    //Footer links
    let navLinks=document.createElement("nav");
    navLinks.id="footer-links";
    for(let i=0;i<footerLinks.length;i++) {
        let footerLink=document.createElement("a");
        footerLink.href=footerLinks[i].link;
        footerLink.id=footerLinks[i].id+"-fl";
        footerLink.innerText=footerLinks[i].name;
        navLinks.appendChild(footerLink);
    }
    //Conect it to footer
    footer.appendChild(navLinks);
    document.body.appendChild(footer);
    console.log('cool-lib (generate/footer.js): Footer fully generated');
}
catch (error) {
    console.log('cool-lib (footer.js): Couldn\'t fetch json: ' + error);
}
