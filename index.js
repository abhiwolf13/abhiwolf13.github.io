var current_Panel = null;
var current_Color = null;
var panelnum = 0;
function show(panel) {
  if (panel == 1) {
    if (current_Panel != null) {
      current_Panel.style.top = "-100%";
    }
    current_Panel = document.getElementById("about");
    current_Color = current_Panel.style.backgroundColor;
    current_Panel.style.top = "0";
    current_Panel.style.backgroundColor = "black";
  } else if (panel == 2) {
    if (current_Panel != null) {
      current_Panel.style.top = "-100%";
    }
    current_Panel = document.getElementById("work");
    current_Color = current_Panel.style.backgroundColor;
    current_Panel.style.top = "0";
    current_Panel.style.backgroundColor = "black";
  } else if (panel == 3) {
    if (current_Panel != null) {
      current_Panel.style.top = "-100%";
      current_Panel.style.backgroundColor = current_Color;
    }
    current_Panel = document.getElementById("skills");
    current_Color = current_Panel.style.backgroundColor;
    current_Panel.style.top = "0";
    current_Panel.style.backgroundColor = "black";
  } else if (panel == 4) {
    if (current_Panel != null) {
      current_Panel.style.top = "-100%";
    }
    current_Panel = document.getElementById("projects");
    current_Color = current_Panel.style.backgroundColor;
    current_Panel.style.top = "0";
    current_Panel.style.backgroundColor = "black";
  }
  if (navigator.userAgentData.mobile == true) {
    document.getElementById("menu").style.top = "-100%";
  }
}

function openmenu() {
  document.getElementById("menu").style.top = "0";
}
if (navigator.userAgentData.mobile == true) {
  document.getElementById("info").style.left = "0";
  document.getElementById("info").style.width = "100vw";
  document.getElementById("info").style.position = "relative";
  document.getElementById("projects").style.left = "0";
  document.getElementById("projects").style.width = "100vw";
  document.getElementById("projects").style.position = "relative";
  document.getElementById("skills").style.left = "0";
  document.getElementById("skills").style.width = "100vw";
  document.getElementById("skills").style.position = "relative";
  document.getElementById("work").style.left = "0";
  document.getElementById("work").style.width = "100vw";
  document.getElementById("work").style.position = "relative";
  document.getElementById("about").style.left = "0";
  document.getElementById("about").style.width = "100vw";
  document.getElementById("about").style.position = "relative";
  document.getElementById("menu").style.top = "-100%";
  document.getElementById("menu").style.width = "100vw";
  document.getElementById("ham").style.display = "block";
} else {
}

jQuery(document).ready(function () {
  $("body").mousemove(function (e) {
    var rXP = e.pageX - this.offsetLeft - $(this).width() / 2;
    var rYP = e.pageY - this.offsetTop - $(this).height() / 2;
    $("h1").css(
      "text-shadow",
      +rYP / 10 +
        "px " +
        rXP / 80 +
        "px rgba(227,6,19,.8), " +
        rYP / 8 +
        "px " +
        rXP / 60 +
        "px rgba(255,237,0,1), " +
        rXP / 70 +
        "px " +
        rYP / 12 +
        "px rgba(0,159,227,.7)"
    );
  });
});

document.body.addEventListener("mousemove", (evt) => {
  const mouseX = evt.clientX;
  const mouseY = evt.clientY;

  gsap.set(".cursor", {
    x: mouseX,
    y: mouseY,
  });

  gsap.to(".shape", {
    x: mouseX,
    y: mouseY,
    stagger: -0.1,
  });
});
