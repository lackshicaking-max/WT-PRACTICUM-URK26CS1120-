
// RESPONSIVE MENU FUNCTION

function toggleMenu() {

    let nav = document.querySelector("nav");

    if (nav.style.display === "none") {
        nav.style.display = "flex";
    }
    else {
        nav.style.display = "none";
    }

}

// BACK TO TOP FUNCTION

function goToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// SCREEN SIZE DETECTION

window.addEventListener("resize", function() {

    let nav = document.querySelector("nav");

    if (window.innerWidth > 500) {
        nav.style.display = "flex";
    }

});

// INFORMATION CARD TOGGLE

let infoBtn = document.getElementById("infoBtn");
let infoCard = document.getElementById("infoCard");

infoBtn.addEventListener("click", function() {

    infoCard.classList.toggle("show");

    if (infoCard.classList.contains("show")) {
        infoBtn.innerText = "Hide Conference Information";
    }
    else {
        infoBtn.innerText = "Show Conference Information";
    }

});

// NOTIFICATION MESSAGE

let notification = document.getElementById("notification");

infoBtn.addEventListener("click", function() {

    notification.classList.add("show");

    notification.innerText =
        "Conference information updated successfully!";

    setTimeout(function() {

        notification.classList.remove("show");

    }, 3000);

});

// ABOUT SECTION SHOW MORE / LESS

let aboutBtn = document.getElementById("aboutBtn");
let moreContent = document.getElementById("moreContent");

aboutBtn.addEventListener("click", function() {

    moreContent.classList.toggle("show");

    if (moreContent.classList.contains("show")) {

        aboutBtn.innerText = "Show Less";

    }
    else {

        aboutBtn.innerText = "Show More";

    }

});
