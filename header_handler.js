window.addEventListener("load", function () {
    window.addEventListener("scroll", function () {
        var header = document.getElementsByTagName("header")[0];
        header.classList.toggle("fixed", window.scrollY > 1);
    });
});