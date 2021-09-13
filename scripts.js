var currTheme = "theme=light";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    }

function createCookie() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        currTheme = "theme=dark";
    }
    document.cookie = currTheme;
}

function darkToggle() {
    console.log("dark toggle!");
    if (currTheme == "theme=light") {
        currTheme = "theme=dark"
        document.cookie = "theme=dark"
        document.body.classList.add("dark_theme");
    } else {
        currTheme = "theme=light"
        document.cookie = "theme=light"
        document.body.classList.remove("dark_theme");
    }
}

function openPage() {
    if (getCookie("theme") != undefined) {
        currTheme = "theme=" + getCookie("theme");
    }
    else {
        createCookie();
    }
    if (currTheme == "theme=dark") {
        document.body.classList.add("dark_theme");
    } else {
        document.body.classList.remove("dark_theme");
    }
}
