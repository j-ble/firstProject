const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

inputBox.addEventListener("keydown", function(event) {
    // Check if the key pressed is 'Enter'
    if (event.key === "Enter") {
        event.preventDefault();  // Prevent the default action to avoid any form submission, if applicable
        addTask();  // Call the addTask function when Enter is pressed
    }
});

function addTask() {
    if (inputBox.value === '') {
        alert("You Must Add Task!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value; // Changed from innerHTML for security reasons

        // Get priority from the dropdown
        let priority = document.getElementById("priority-selector").value;
        li.classList.add(priority); // Add class based on priority

        listContainer.appendChild(li);

        // Add delete button
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        span.classList.add("close");
        span.onclick = function() {
            this.parentElement.remove();
            saveData();
        };
        li.appendChild(span);

        inputBox.value = "";
        saveData();
    }
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
