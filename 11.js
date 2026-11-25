
// ========================================
// RESPONSIVE MENU FUNCTION
// ========================================

function toggleMenu() {

    let nav = document.querySelector("nav");

    if (nav.style.display === "none") {
        nav.style.display = "flex";
    }
    else {
        nav.style.display = "none";
    }

}


// ========================================
// BACK TO TOP FUNCTION
// ========================================

function goToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// SCREEN SIZE DETECTION
// ========================================

window.addEventListener("resize", function() {

    let nav = document.querySelector("nav");

    if (window.innerWidth > 500) {
        nav.style.display = "flex";
    }

});


// ========================================
// INFORMATION CARD TOGGLE
// ========================================

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


// ========================================
// NOTIFICATION MESSAGE
// ========================================

let notification = document.getElementById("notification");

infoBtn.addEventListener("click", function() {

    notification.classList.add("show");

    notification.innerText =
        "Conference information updated successfully!";

    setTimeout(function() {

        notification.classList.remove("show");

    }, 3000);

});


// ========================================
// ABOUT SECTION SHOW MORE / LESS
// ========================================

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

    notification.textContent =
        "New conference event added successfully!";

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

    notification.textContent =
        "All added events have been removed!";

    notification.classList.add("show");

    setTimeout(function() {

        notification.classList.remove("show");

    }, 3000);

});


// INITIAL CHECK

checkEmpty();


// ========================================
// PRACTICUM 11 - FORM VALIDATION
// ========================================

// GET REGISTRATION FORM ELEMENTS

let registrationForm =
    document.getElementById("registrationForm");

let regName = document.getElementById("regName");

let regEmail = document.getElementById("regEmail");

let regPhone = document.getElementById("regPhone");

let regAge = document.getElementById("regAge");

let department = document.getElementById("department");

let regEvent = document.getElementById("regEvent");

let regDate = document.getElementById("regDate");

let regMessage = document.getElementById("regMessage");

let formError = document.getElementById("formError");

let successMessage =
    document.getElementById("successMessage");


// SET MINIMUM REGISTRATION DATE TO TODAY

let today = new Date().toISOString().split("T")[0];

regDate.setAttribute("min", today);


// CUSTOM VALIDATION FOR NAME

regName.addEventListener("input", function() {

    if (regName.value.trim().length < 3) {

        regName.setCustomValidity(
            "Name must contain at least 3 characters."
        );

    }
    else if (!/^[A-Za-z ]+$/.test(regName.value.trim())) {

        regName.setCustomValidity(
            "Name should contain only letters and spaces."
        );

    }
    else {

        regName.setCustomValidity("");

    }

});


// CUSTOM VALIDATION FOR PHONE NUMBER

regPhone.addEventListener("input", function() {

    if (!/^[0-9]{10}$/.test(regPhone.value)) {

        regPhone.setCustomValidity(
            "Please enter exactly 10 digits."
        );

    }
    else {

        regPhone.setCustomValidity("");

    }

});


// CUSTOM VALIDATION FOR AGE

regAge.addEventListener("input", function() {

    if (regAge.value < 16 || regAge.value > 100) {

        regAge.setCustomValidity(
            "Age must be between 16 and 100."
        );

    }
    else {

        regAge.setCustomValidity("");

    }

});


// CLEAR ERROR MESSAGES WHEN USER CHANGES INPUT

registrationForm.addEventListener("input", function() {

    formError.textContent = "";

    successMessage.classList.remove("show");

});

registrationForm.addEventListener("change", function() {

    formError.textContent = "";

    successMessage.classList.remove("show");

});


// REGISTRATION FORM SUBMISSION

registrationForm.addEventListener("submit", function(event) {

    // PREVENT PAGE RELOAD

    event.preventDefault();

    // CHECK FORM VALIDITY

    if (!registrationForm.checkValidity()) {

        formError.textContent =
            "Please correct the errors and fill in all required fields.";

        // DISPLAY BROWSER VALIDATION MESSAGE

        registrationForm.reportValidity();

        return;

    }

    // DISPLAY SUCCESS MESSAGE

    let registeredName = regName.value.trim();

    successMessage.textContent =
        "Congratulations, " + registeredName +
        "! Your conference registration was submitted successfully.";

    successMessage.classList.add("show");

    formError.textContent = "";

    // RESET FORM AFTER SUCCESSFUL SUBMISSION

    registrationForm.reset();

    // REMOVE CUSTOM VALIDATION MESSAGES

    regName.setCustomValidity("");

    regPhone.setCustomValidity("");

    regAge.setCustomValidity("");

    // SET DATE MINIMUM AGAIN AFTER RESET

    regDate.setAttribute("min", today);

});


// RESET BUTTON VALIDATION CLEANUP

registrationForm.addEventListener("reset", function() {

    formError.textContent = "";

    successMessage.classList.remove("show");

    regName.setCustomValidity("");

    regPhone.setCustomValidity("");

    regAge.setCustomValidity("");

});
