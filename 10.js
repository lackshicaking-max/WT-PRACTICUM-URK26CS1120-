
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


// ========================================
// PRACTICUM 10 - DOM MANIPULATION
// ========================================

// GET HTML ELEMENTS

let eventForm = document.getElementById("eventForm");

let eventName = document.getElementById("eventName");

let eventDescription =
    document.getElementById("eventDescription");

let eventDate = document.getElementById("eventDate");

let eventList = document.getElementById("eventList");

let clearBtn = document.getElementById("clearBtn");

let emptyMessage = document.getElementById("emptyMessage");


// DISPLAY EMPTY MESSAGE

function checkEmpty() {

    if (eventList.querySelectorAll(".event-card").length === 0) {

        emptyMessage.style.display = "block";

    }
    else {

        emptyMessage.style.display = "none";

    }

}


// ADD NEW EVENT

eventForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // CREATE NEW DIV

    let eventCard = document.createElement("div");

    eventCard.classList.add("event-card");

    // CREATE EVENT HEADING

    let heading = document.createElement("h3");

    heading.textContent = eventName.value;

    // CREATE DESCRIPTION

    let description = document.createElement("p");

    description.textContent = eventDescription.value;

    // CREATE DATE

    let date = document.createElement("p");

    date.textContent = "Date: " + eventDate.value;

    // CREATE EDIT BUTTON

    let editBtn = document.createElement("button");

    editBtn.textContent = "Edit";

    editBtn.setAttribute("class", "edit-button");

    // CREATE DELETE BUTTON

    let deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.setAttribute("class", "delete-button");

    // ADD ELEMENTS TO EVENT CARD

    eventCard.appendChild(heading);

    eventCard.appendChild(description);

    eventCard.appendChild(date);

    eventCard.appendChild(editBtn);

    eventCard.appendChild(deleteBtn);

    // ADD EVENT CARD TO WEBPAGE

    eventList.appendChild(eventCard);

    // EDIT EVENT FUNCTION

    editBtn.addEventListener("click", function() {

        let newName = prompt(
            "Enter updated event name:",
            heading.textContent
        );

        if (newName !== null && newName.trim() !== "") {

            heading.textContent = newName.trim();

        }

        let newDescription = prompt(
            "Enter updated description:",
            description.textContent
        );

        if (newDescription !== null &&
            newDescription.trim() !== "") {

            description.textContent = newDescription.trim();

        }

        let newDate = prompt(
            "Enter updated date (YYYY-MM-DD):",
            date.textContent.replace("Date: ", "")
        );

        if (newDate !== null && newDate.trim() !== "") {

            date.textContent = "Date: " + newDate.trim();

        }

    });

    // DELETE EVENT FUNCTION

    deleteBtn.addEventListener("click", function() {

        eventCard.remove();

        checkEmpty();

    });

    // CLEAR FORM

    eventForm.reset();

    checkEmpty();

    // SHOW NOTIFICATION

    notification.textContent = "New conference event added successfully!";

    notification.classList.add("show");

    setTimeout(function() {

        notification.classList.remove("show");

    }, 3000);

});


// REMOVE ALL ADDED EVENTS

clearBtn.addEventListener("click", function() {

    let cards = eventList.querySelectorAll(".event-card");

    cards.forEach(function(card) {

        card.remove();

    });

    checkEmpty();

    notification.textContent = "All added events have been removed!";

    notification.classList.add("show");

    setTimeout(function() {

        notification.classList.remove("show");

    }, 3000);

});


// INITIAL CHECK

checkEmpty();
