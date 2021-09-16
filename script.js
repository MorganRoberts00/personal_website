/* Typewriter */
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

function typewriting(color) {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  var bar = (color) ? "#fff" : "#000"; /* !!! */
  css.innerHTML = ".typewrite > .wrap { border-right: 0.03em solid " + bar + "}";
  document.body.appendChild(css);
};


// load webpage
window.onload = function () {
  setStyle(getStyle());
  document.getElementById("darkswitch").checked = (getStyle() == "dark");
  typewriting(true);
};

// gets style and sets default if null
function getStyle() {
  color = localStorage.getItem("color");
  if (color == null) {
    color = "light";
    localStorage.setItem("color", color);
  }
  return color;
}

// sets style and stores in local storage
function setStyle(color) {
  localStorage.setItem("color", color);

  var glassy = document.querySelectorAll(".glass");
  if (color == "light") {
    for (var i = 0; i < glassy.length; i++) {
      glassy[i].classList.add("text-dark", "glass-dark");
      glassy[i].classList.remove("text-light");
    }
  } else {

    for (var i = 0; i < glassy.length; i++) {
      glassy[i].classList.add("text-light");
      glassy[i].classList.remove("text-dark", "glass-dark");
    }
  }

  var page = document.getElementById("page");
  var bar = document.getElementById("bar");
  if (color == "light") {
    bar.classList.add("bg-light", "navbar-light");
    bar.classList.remove("bg-dark", "navbar-dark");

    page.classList.add("bg-light");
    page.classList.remove("bg-dark");
  } else {
    bar.classList.add("bg-dark", "navbar-dark");
    bar.classList.remove("bg-light", "navbar-light");

    page.classList.add("bg-dark");
    page.classList.remove("bg-light");
  }
};

// inverts style
function flipStyle() {
  color = (getStyle() == "light") ? "dark" : "light";
  setStyle(color);
}