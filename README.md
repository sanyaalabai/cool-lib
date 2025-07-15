# cool-lib
Cool and Simple Web Library for (mostly) styling

## Contents
- **cool.css**  
    Helpful styling one-liners. Useful if you don't use tailwindcss or anything like that.
- **cool.js**  
    Some simple but useful functions (delay, copy to clipboard, etc.)+
- **theme.js**
    Basic siteside color scheme switcher. Provides customizable selector. Also has function to switch to the next color scheme.
- **header.js**  
    Authomatic sticky header.
- **generate/header.js**
	Automatically creates header from configured `header.json` in the same directory.
Works best if it's placed right after `<body>`.
- **generate/footer.js**
	Automatically creates footer from configured `footer.json` in the same directory.
Works best if it's placed right before `</body>`.
- **generate/sidebar.js**
	Automatically creates sidebar from configured `sidebar.json` in the same directory.
Only works if it's placed in first place in `<main>` and other page content is in second place
in `<span>`, `<div>` or anything other you may want.
- **import/<font\>.js**  
    Imports <font\> from [Google Fonts](https://fonts.google.com/) and makes it base font family for the document.
    Supported fonts:
    - Inter
    - Roboto
    - Rubik
    - Ubuntu

## TODO
- Basic color styles
- Wiki-esque stylesheet with theme support
- Interactions with URL
- Add more TODOs