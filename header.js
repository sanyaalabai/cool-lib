window.addEventListener("scroll", function () {
    var header = document.getElementsByTagName("header")[0];
    header.classList.toggle("sticky", window.scrollY > 1);
});