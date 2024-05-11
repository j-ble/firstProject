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
    const priority = document.getElementById("priority-selector").value;
    const dueDate = document.getElementById("due-date-selector").value;

    if (!taskText) {
        alert("You must add a task!");
        return;
    }
    if (!dueDate) {
        alert("Please enter a due date for the task.");
        return;
    }

    const categoryContainer = document.getElementById(category + "-container");
    const categoryUl = categoryContainer.querySelector("ul");
    categoryContainer.style.display = '';

    const li = document.createElement("li");
    li.classList.add(priority, "task-item");
    li.textContent = `${taskText} (Due: ${dueDate})`;

    const span = document.createElement("span");
    span.textContent = "x";
    span.classList.add("close");
    span.onclick = function() {
        this.parentElement.remove();
        saveData();
    };
    li.appendChild(span);
    categoryUl.appendChild(li);

    inputBox.value = "";
    // Do not clear the due date selector
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
document.querySelector('.to-do-list').addEventListener('click', function(e) {
    // Check if the clicked element is a list item (LI)
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    }
    // Check if the clicked element is a close button (SPAN)
    else if (e.target.classList.contains('close')) {
        e.target.parentElement.remove();
        saveData();
    }
});
