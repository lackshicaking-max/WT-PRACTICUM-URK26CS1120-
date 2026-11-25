
/* =========================================
   CONFERENCE MANAGEMENT SYSTEM
   COMPLETE JAVASCRIPT - PRACTICUM 15
   ========================================= */


/* ---------- NAVIGATION FUNCTIONS ---------- */

function toggleMenu() {
    let nav = document.querySelector("nav");
    nav.classList.toggle("active");
}

function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ---------- HOME INFORMATION ---------- */

let infoBtn = document.getElementById("infoBtn");
let infoCard = document.getElementById("infoCard");
let notification = document.getElementById("notification");

if (infoBtn) {
    infoBtn.addEventListener("click", function () {

        if (infoCard.style.display === "block") {
            infoCard.style.display = "none";
            infoBtn.textContent = "Show Information";
        } else {
            infoCard.style.display = "block";
            infoBtn.textContent = "Hide Information";

            notification.textContent =
                "Information displayed successfully!";
        }

    });
}


/* ---------- ABOUT READ MORE / LESS ---------- */

let readMoreBtn = document.getElementById("readMoreBtn");
let moreText = document.getElementById("moreText");

if (readMoreBtn && moreText) {

    readMoreBtn.addEventListener("click", function () {

        if (moreText.style.display === "block") {
            moreText.style.display = "none";
            readMoreBtn.textContent = "Read More";
        } else {
            moreText.style.display = "block";
            readMoreBtn.textContent = "Read Less";
        }

    });

}


/* =========================================
   EVENT MANAGEMENT
   ========================================= */

let eventForm = document.getElementById("eventForm");
let eventList = document.getElementById("eventList");
let clearBtn = document.getElementById("clearBtn");
let emptyMessage = document.getElementById("emptyMessage");

let events = [];
let editIndex = -1;


/* ---------- ADD OR EDIT EVENTS ---------- */

if (eventForm) {

    eventForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let eventName =
            document.getElementById("eventName").value.trim();

        let eventDate =
            document.getElementById("eventDate").value;

        let eventVenue =
            document.getElementById("eventVenue").value.trim();

        if (!eventName || !eventDate || !eventVenue) {
            alert("Please fill all event details.");
            return;
        }

        let eventData = {
            name: eventName,
            date: eventDate,
            venue: eventVenue
        };

        if (editIndex === -1) {

            events.push(eventData);
            alert("Event added successfully!");

        } else {

            events[editIndex] = eventData;
            editIndex = -1;
            alert("Event updated successfully!");

        }

        eventForm.reset();
        displayEvents();

    });

}


/* ---------- DISPLAY EVENTS ---------- */

function displayEvents() {

    eventList.innerHTML = "";

    if (events.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    events.forEach(function (event, index) {

        let eventCard = document.createElement("div");
        eventCard.className = "event-card";

        let name = document.createElement("h3");
        name.textContent = event.name;

        let date = document.createElement("p");
        date.textContent = "Date: " + event.date;

        let venue = document.createElement("p");
        venue.textContent = "Venue: " + event.venue;

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-button";

        editButton.addEventListener("click", function () {

            document.getElementById("eventName").value =
                event.name;

            document.getElementById("eventDate").value =
                event.date;

            document.getElementById("eventVenue").value =
                event.venue;

            editIndex = index;

        });

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function () {

            events.splice(index, 1);
            displayEvents();

        });

        eventCard.appendChild(name);
        eventCard.appendChild(date);
        eventCard.appendChild(venue);
        eventCard.appendChild(editButton);
        eventCard.appendChild(deleteButton);

        eventList.appendChild(eventCard);

    });

}


/* ---------- CLEAR ALL EVENTS ---------- */

if (clearBtn) {

    clearBtn.addEventListener("click", function () {

        if (events.length > 0) {

            events = [];
            editIndex = -1;

            eventForm.reset();
            displayEvents();

            alert("All events cleared successfully!");

        } else {

            alert("No events available to clear.");

        }

    });

}


/* =========================================
   CONFERENCE REGISTRATION
   ========================================= */

let registrationForm =
    document.getElementById("registrationForm");

let successMessage =
    document.getElementById("successMessage");

let errorMessage =
    document.getElementById("errorMessage");


if (registrationForm) {

    registrationForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let name =
            document.getElementById("name").value.trim();

        let email =
            document.getElementById("email").value.trim();

        let phone =
            document.getElementById("phone").value.trim();

        let age =
            Number(document.getElementById("age").value);

        let conferenceDate =
            document.getElementById("conferenceDate").value;

        let category =
            document.getElementById("category").value;

        let valid = true;

        successMessage.textContent = "";
        errorMessage.textContent = "";


        /* NAME VALIDATION */

        if (name.length < 3) {

            errorMessage.textContent =
                "Name must contain at least 3 characters.";

            valid = false;

        }


        /* EMAIL VALIDATION */

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            errorMessage.textContent =
                "Please enter a valid email address.";

            valid = false;

        }


        /* PHONE VALIDATION */

        let phonePattern = /^[0-9]{10}$/;

        if (!phonePattern.test(phone)) {

            errorMessage.textContent =
                "Phone number must contain exactly 10 digits.";

            valid = false;

        }


        /* AGE VALIDATION */

        if (age < 18 || age > 100 || !age) {

            errorMessage.textContent =
                "Age must be between 18 and 100.";

            valid = false;

        }


        /* DATE VALIDATION */

        let today = new Date().toISOString().split("T")[0];

        if (!conferenceDate || conferenceDate < today) {

            errorMessage.textContent =
                "Please select a valid conference date.";

            valid = false;

        }


        /* CATEGORY VALIDATION */

        if (category === "") {

            errorMessage.textContent =
                "Please select a participant category.";

            valid = false;

        }


        /* DISPLAY RESULT */

        if (valid) {

            successMessage.textContent =
                "Registration completed successfully! Welcome to the conference.";

            registrationForm.reset();

        }

    });


    registrationForm.addEventListener("reset", function () {

        successMessage.textContent = "";
        errorMessage.textContent = "";

    });

}


/* =========================================
   PRACTICUM 12: API INTEGRATION
   ========================================= */

let fetchBtn = document.getElementById("fetchBtn");
let retryBtn = document.getElementById("retryBtn");
let loadingMessage = document.getElementById("loadingMessage");
let apiError = document.getElementById("apiError");
let updatesBody = document.getElementById("updatesBody");

let apiURL =
    "https://jsonplaceholder.typicode.com/posts?_limit=10";


/* ---------- FETCH CONFERENCE UPDATES ---------- */

async function fetchConferenceUpdates() {

    updatesBody.innerHTML = "";
    apiError.textContent = "";

    loadingMessage.textContent =
        "Loading conference updates...";

    fetchBtn.disabled = true;
    retryBtn.style.display = "none";

    try {

        let response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("Unable to fetch data from server.");
        }

        let data = await response.json();

        if (data.length === 0) {
            throw new Error("No updates available.");
        }

        data.forEach(function (item) {

            let row = document.createElement("tr");

            let idCell = document.createElement("td");
            idCell.textContent = item.id;

            let titleCell = document.createElement("td");
            titleCell.textContent = item.title;

            let descriptionCell = document.createElement("td");
            descriptionCell.textContent = item.body;

            row.appendChild(idCell);
            row.appendChild(titleCell);
            row.appendChild(descriptionCell);

            updatesBody.appendChild(row);

        });

        loadingMessage.textContent =
            "Conference updates loaded successfully!";

    } catch (error) {

        apiError.textContent = "Error: " + error.message;

        loadingMessage.textContent =
            "Unable to load conference updates.";

        retryBtn.style.display = "block";

    } finally {

        fetchBtn.disabled = false;

    }

}


/* ---------- API BUTTON EVENTS ---------- */

if (fetchBtn) {

    fetchBtn.addEventListener("click", function () {
        fetchConferenceUpdates();
    });

}

if (retryBtn) {

    retryBtn.addEventListener("click", function () {
        fetchConferenceUpdates();
    });

}


/* =========================================
   PRACTICUM 13: TASK MANAGER
   ========================================= */

let taskForm = document.getElementById("taskForm");
let taskTitle = document.getElementById("taskTitle");
let taskDescription = document.getElementById("taskDescription");
let taskPriority = document.getElementById("taskPriority");
let taskStatus = document.getElementById("taskStatus");
let taskList = document.getElementById("taskList");
let noTasksMessage = document.getElementById("noTasksMessage");
let taskSubmitBtn = document.getElementById("taskSubmitBtn");
let taskResetBtn = document.getElementById("taskResetBtn");


/* ---------- LOAD TASKS FROM LOCAL STORAGE ---------- */

let tasks = [];

try {

    let savedTasks = localStorage.getItem("conferenceTasks");

    tasks = savedTasks ? JSON.parse(savedTasks) : [];

    if (!Array.isArray(tasks)) {
        tasks = [];
    }

} catch (error) {

    tasks = [];

}

let editingTaskId = null;


/* ---------- SAVE TASKS ---------- */

function saveTasks() {

    localStorage.setItem(
        "conferenceTasks",
        JSON.stringify(tasks)
    );

}


/* ---------- DISPLAY TASKS ---------- */

function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        noTasksMessage.style.display = "block";
    } else {
        noTasksMessage.style.display = "none";
    }

    tasks.forEach(function (task) {

        let taskCard = document.createElement("div");
        taskCard.className = "task-card";

        let title = document.createElement("h3");
        title.textContent = task.title;

        let description = document.createElement("p");
        description.textContent =
            "Description: " + task.description;

        let priority = document.createElement("p");
        priority.textContent =
            "Priority: " + task.priority;

        let statusText = document.createElement("p");
        statusText.textContent = "Status: ";

        let statusBadge = document.createElement("span");
        statusBadge.textContent = task.status;

        statusBadge.className =
            "task-status " +
            task.status.toLowerCase().replace(" ", "-");

        statusText.appendChild(statusBadge);


        /* STATUS SELECT */

        let statusSelect = document.createElement("select");

        let statusOptions = [
            "Pending",
            "In Progress",
            "Completed"
        ];

        statusOptions.forEach(function (status) {

            let option = document.createElement("option");

            option.value = status;
            option.textContent = status;

            if (task.status === status) {
                option.selected = true;
            }

            statusSelect.appendChild(option);

        });


        /* UPDATE STATUS */

        let updateButton = document.createElement("button");

        updateButton.textContent = "Update Status";
        updateButton.className = "task-update-button";

        updateButton.addEventListener("click", function () {

            let selectedTask = tasks.find(function (item) {
                return item.id === task.id;
            });

            if (selectedTask) {

                selectedTask.status = statusSelect.value;

                saveTasks();
                displayTasks();

            }

        });


        /* EDIT TASK */

        let editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.className = "task-edit-button";

        editButton.addEventListener("click", function () {

            let selectedTask = tasks.find(function (item) {
                return item.id === task.id;
            });

            if (selectedTask) {

                taskTitle.value = selectedTask.title;

                taskDescription.value =
                    selectedTask.description;

                taskPriority.value =
                    selectedTask.priority;

                taskStatus.value =
                    selectedTask.status;

                editingTaskId = selectedTask.id;

                taskSubmitBtn.textContent = "Update Task";

                document.getElementById("taskManager")
                    .scrollIntoView({ behavior: "smooth" });

            }

        });


        /* DELETE TASK */

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "task-delete-button";

        deleteButton.addEventListener("click", function () {

            let confirmDelete = confirm(
                "Are you sure you want to delete this task?"
            );

            if (confirmDelete) {

                tasks = tasks.filter(function (item) {
                    return item.id !== task.id;
                });

                saveTasks();
                displayTasks();

            }

        });


        /* ADD ELEMENTS TO CARD */

        taskCard.appendChild(title);
        taskCard.appendChild(description);
        taskCard.appendChild(priority);
        taskCard.appendChild(statusText);
        taskCard.appendChild(statusSelect);
        taskCard.appendChild(updateButton);
        taskCard.appendChild(editButton);
        taskCard.appendChild(deleteButton);

        taskList.appendChild(taskCard);

    });

}


/* ---------- ADD OR UPDATE TASK ---------- */

if (taskForm) {

    taskForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let title = taskTitle.value.trim();
        let description = taskDescription.value.trim();
        let priority = taskPriority.value;
        let status = taskStatus.value;

        if (!title || !description || !priority || !status) {

            alert("Please fill all task details.");
            return;

        }

        if (editingTaskId !== null) {

            let existingTask = tasks.find(function (task) {
                return task.id === editingTaskId;
            });

            if (existingTask) {

                existingTask.title = title;
                existingTask.description = description;
                existingTask.priority = priority;
                existingTask.status = status;

                alert("Task updated successfully!");

            }

            editingTaskId = null;
            taskSubmitBtn.textContent = "Add Task";

        } else {

            let newTask = {

                id: Date.now(),
                title: title,
                description: description,
                priority: priority,
                status: status

            };

            tasks.push(newTask);

            alert("Task added successfully!");

        }

        saveTasks();
        displayTasks();
        taskForm.reset();

    });

}


/* ---------- RESET TASK FORM ---------- */

if (taskResetBtn) {

    taskResetBtn.addEventListener("click", function () {

        editingTaskId = null;
        taskSubmitBtn.textContent = "Add Task";

    });

}


/* ---------- DISPLAY SAVED TASKS ---------- */

displayTasks();


/* =========================================
   PRACTICUM 14: GALLERY SEARCH AND FILTER
   ========================================= */

let gallerySearch = document.querySelector("#gallerySearch");

let galleryCategory =
    document.querySelector("#galleryCategory");

let clearGalleryFilter =
    document.querySelector("#clearGalleryFilter");

let galleryItems = document.querySelectorAll(
    "#filteredGallery .gallery-item"
);

let galleryResultMessage =
    document.querySelector("#galleryResultMessage");

let noGalleryResults =
    document.querySelector("#noGalleryResults");


/* ---------- FILTER GALLERY ---------- */

function filterGallery() {

    let searchValue =
        gallerySearch.value.toLowerCase().trim();

    let categoryValue = galleryCategory.value;

    let visibleCount = 0;

    galleryItems.forEach(function (item) {

        let title =
            item.querySelector("h3").textContent.toLowerCase();

        let description =
            item.querySelector("p").textContent.toLowerCase();

        let category = item.dataset.category;

        let matchesSearch =
            title.includes(searchValue) ||
            description.includes(searchValue);

        let matchesCategory =
            categoryValue === "all" ||
            category === categoryValue;

        if (matchesSearch && matchesCategory) {

            item.classList.remove("hide");
            visibleCount++;

        } else {

            item.classList.add("hide");

        }

    });

    if (visibleCount === 0) {

        noGalleryResults.style.display = "block";

        galleryResultMessage.textContent =
            "No matching conference activities found.";

    } else {

        noGalleryResults.style.display = "none";

        galleryResultMessage.textContent =
            "Showing " + visibleCount +
            " conference activities.";

    }

}


/* ---------- SEARCH EVENT ---------- */

if (gallerySearch) {

    gallerySearch.addEventListener("input", filterGallery);

}


/* ---------- CATEGORY FILTER EVENT ---------- */

if (galleryCategory) {

    galleryCategory.addEventListener("change", filterGallery);

}


/* ---------- CLEAR FILTER ---------- */

if (clearGalleryFilter) {

    clearGalleryFilter.addEventListener("click", function () {

        gallerySearch.value = "";
        galleryCategory.value = "all";

        galleryItems.forEach(function (item) {
            item.classList.remove("hide");
        });

        galleryResultMessage.textContent =
            "Showing all conference activities.";

        noGalleryResults.style.display = "none";

    });

}


/* ---------- INITIAL GALLERY DISPLAY ---------- */

if (gallerySearch && galleryCategory) {
    filterGallery();
}


/* =========================================
   PRACTICUM 15: CONFERENCE ALERT TOGGLE
   ========================================= */


/* GET HTML ELEMENTS */

let alertToggle = document.querySelector("#alertToggle");

let alertSettingStatus =
    document.querySelector("#alertSettingStatus");


/* LOAD SAVED SETTING FROM LOCAL STORAGE */

let conferenceAlertsEnabled =
    localStorage.getItem("conferenceAlertsEnabled") === "true";


/* UPDATE THE SETTING ON THE PAGE */

function updateConferenceAlertSetting() {

    alertToggle.checked = conferenceAlertsEnabled;

    document.body.classList.toggle(
        "alerts-enabled",
        conferenceAlertsEnabled
    );

    if (conferenceAlertsEnabled) {

        alertSettingStatus.textContent =
            "Conference alerts are enabled.";

    } else {

        alertSettingStatus.textContent =
            "Conference alerts are disabled.";

    }

}


/* SAVE SETTING WHEN TOGGLE CHANGES */

if (alertToggle && alertSettingStatus) {

    updateConferenceAlertSetting();

    alertToggle.addEventListener("change", function () {

        conferenceAlertsEnabled = alertToggle.checked;

        localStorage.setItem(
            "conferenceAlertsEnabled",
            conferenceAlertsEnabled
        );

        updateConferenceAlertSetting();

    });

}


/* =========================================
   END OF PRACTICUM 15 JAVASCRIPT
   ========================================= */
