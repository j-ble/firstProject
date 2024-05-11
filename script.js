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
    const taskText = inputBox.value.trim();
    const category = document.getElementById("category-selector").value;
    const dueDate = document.getElementById("due-date-selector").value;
    if (inputBox.value === '') {
        alert("You Must Add Task!");
    } 
    else if (!dueDate) {
        alert("Please enter a due date for the task.");
        return;
    }
    const categoryContainer = document.getElementById(category + "-container");
    const categoryUl = categoryContainer.querySelector("ul");
    categoryContainer.style.display = '';

    let li = document.createElement("li");
    li.textContent = `${taskText} (Due: ${dueDate})`;
        // Get priority from the dropdown
        let priority = document.getElementById("priority-selector").value;
        li.classList.add(priority, "task-item");

        listContainer.appendChild(li);

        // Add delete button
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        span.classList.add("close-button"); // Apply the close button style class
        span.onclick = function() {
            this.parentElement.remove();
            saveData();
        };
        categoryUl.appendChild(li);
        li.appendChild(span);

        inputBox.value = "";
        saveData();
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