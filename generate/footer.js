//WIP
//Create footer itself
let footer=document.createElement("footer");
//Logo+social
let navLogo=document.createElement("nav");
navLogo.classList.add("align-ico");
//Logo
let logo=document.createElement("h2");
logo.innerText="Kaban Central";
navLogo.appendChild(logo);
//Socials
let socials=document.createElement("span");
socials.classList.add("needs-align");
//Telegram
let tgLink=document.createElement("a");
tgLink.href="https://t.me/kaban_central";
tgLink.target="_blank";
let tgLogoLink=document.createElement("object");
tgLogoLink.type="image/svg+xml";
tgLogoLink.data=baseURL+"img/tg.svg";
tgLogoLink.classList.add("icof");
tgLink.appendChild(tgLogoLink);
socials.appendChild(tgLink);
//VK
let vkLink=document.createElement("a");
vkLink.href="https://vk.com/kaban_central";
vkLink.target="_blank";
let vkLogoLink=document.createElement("object");
vkLogoLink.type="image/svg+xml";
vkLogoLink.data=baseURL+"img/vk.svg";
vkLogoLink.classList.add("icof");
vkLink.appendChild(vkLogoLink);
socials.appendChild(vkLink);
//Conect it to footer
navLogo.appendChild(socials);
footer.appendChild(navLogo);
//Footer links
let navLinks=document.createElement("nav");
navLinks.id="footer-links";
//Contacts
let contactsLink=document.createElement("a");
contactsLink.href=baseURL+"contacts";
contactsLink.innerText="Контакты";
navLinks.appendChild(contactsLink);
//TOS
let tosLink=document.createElement("a");
tosLink.href=baseURL+"wiki/legal/terms-of-use";
tosLink.innerText="Пользовательское соглашение";
navLinks.appendChild(tosLink);
//Conect it to footer
footer.appendChild(navLinks);
//Legal notice
let legalNotice=document.createElement("p");
legalNotice.style.marginTop="0.8rem";
legalNotice.innerText="Not an official Minecraft product. We are in no way affiliated with or\
    endorsed by Mojang Synergies AB, Microsoft Corporation or other\
    rightsholders.";
footer.appendChild(legalNotice);
document.body.appendChild(footer);

document.body.removeChild(document.getElementById("footer-gen"));
