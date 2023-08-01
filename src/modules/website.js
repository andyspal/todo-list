import menuSvg from "../images/menu.svg";
import githubSvg from "../images/github.svg";
import addSvg from "../images/add.svg";
import {toggleDisplay, handleProjectFormSubmit} from "./eventListeners";
import '../styles/aside.css'
import myLibrary, { Task } from "./dataModels";
import moment from "moment";
import { saveTaskLS, removeTaskLS, getProjectLS, saveProjectLS, updateProjectLS, getTaskLS } from "./localStorage";
const website = () => {

  const createHeader = (text, menuIcon) => {
    let header, title, menuButton, menuImage;

    header = document.createElement("header");
    title = document.createElement("h2");
    title.textContent = text;
    title.classList.add("header-title");

    menuButton = document.createElement("button");
    menuButton.classList.add("header-toggle-button");

    menuImage = new Image();
    menuImage.src = menuIcon;
    menuImage.classList.add("header-toggle-image");
    menuImage.alt = "menu";

    menuButton.appendChild(menuImage);
    header.appendChild(menuButton);
    header.appendChild(title);
    return header;
  };
  const createMain = () => {
    let container, aside, content, home, projects, completedTasks;

    container = document.createElement("main");
    container.classList.add("main");

    aside = document.createElement("aside");
    aside.classList.add("aside");

    content = document.createElement("div");
    content.classList.add("content");

    home = document.createElement("section");
    home.classList.add("home");

    projects = document.createElement("section");
    projects.classList.add("projects");

    completedTasks = document.createElement("section");
    completedTasks.classList.add("completed-tasks");

    content.append(home,projects, completedTasks);
    container.append(aside, content);
    return container;
  };
  const createFooter = (author, link, logo) => {
    let footer, p, anchor, img;

    footer = document.createElement("footer");

    p = document.createElement("p");
    p.classList.add("footer-title");
    p.textContent = author;

    anchor = document.createElement("a");
    anchor.classList.add("footer-anchor");
    anchor.href = link;
    anchor.target = "_blank";

    img = new Image();
    img.classList.add("footer-image");
    img.src = logo;
    img.alt = "logo";

    anchor.appendChild(img);
    footer.appendChild(p);
    footer.appendChild(anchor);
    return footer;
  };
  const createList = (title,className, items) => {
    let listContainer, listTitle, list, listItem;
    listContainer = document.createElement("div");
    listContainer.classList.add("list-container");
    listContainer.classList.add(`${className}-container`);

    listTitle = document.createElement("h3");
    listTitle.classList.add("list-title");
    listTitle.textContent = title;
    listContainer.appendChild(listTitle);

    list = document.createElement("ul");
    list.classList.add("list");
    list.classList.add(className);
    if(items){
      items.forEach((item) => {
        listItem = document.createElement("li");
        listItem.classList.add("list-item");
        listItem.textContent = item;
        listItem.dataset.section = item.toLowerCase().replace(/\s/g, "-");
        list.appendChild(listItem);
      });
    }
  
    listContainer.appendChild(list);

    return listContainer;
  };
  const createButton = (buttonConfig) => { 
  // let buttonConfig = {type:"",src:"",className:"",alt:"",textContent:}
  const button = document.createElement("button");
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add(`${buttonConfig.className}-container`)
  button.classList.add(`${buttonConfig.className}-button`);
  button.type = buttonConfig.type;
  
  let icon = new Image();
  icon.src = buttonConfig.src;
  icon.alt = buttonConfig.alt;
  icon.classList.add(`${buttonConfig.className}-icon`);
  button.appendChild(icon);

  let content = document.createElement("p")
  content.classList.add(`${buttonConfig.className}-content`)
  content.textContent = buttonConfig.content;
  button.appendChild(content);
  buttonContainer.appendChild(button)
  return buttonContainer;
  }
  const createForm = (inputConfig) => {
    // let inputConfig = {type:"",name:"",placeholder:"", className:"", required:}
    // FORM
    const form = document.createElement('form'); 
    form.classList.add(`${inputConfig.className}-form`);
    form.addEventListener('submit', function(event) {
      event.preventDefault();
    });

    // INPUT
    const input = document.createElement('input'); 
    input.classList.add(`${inputConfig.className}-input`)
    input.type = inputConfig.type;
    input.name = inputConfig.name;
    input.maxLength = 28;
    input.placeholder = inputConfig.placeholder;
    input.required = inputConfig.required;

    // BUTTON
    const button = document.createElement("button");
    button.classList.add(`${inputConfig.className}-button`)
    button.type = "submit";
    button.textContent = "+";

    // APPEND & RETURN
    form.append(input,button);
    return form;
  }

  //header main (aside, content) footer
  const header = createHeader("TodoList", menuSvg);
  const main = createMain();
  const footer = createFooter( "@andyspal", "https://github.com/andyspal", githubSvg);
  document.body.append(header, main, footer);

  // homeList (all tasks, today, this week, important), projectList ()
  const aside = document.querySelector('.aside');
  aside.appendChild(createList("Home","home-list",["all tasks", "today", "this week", "important"]));
  aside.appendChild(createList("Projects","project-list"),[]);

  // toggleProjectFormButton
  aside.appendChild(createButton({type: "button",className: "aside-toggle", src: addSvg, alt: "add-icon", content:"Add Project"}));

  // AddProjectForm
  aside.appendChild(createForm({type:"text",name:"name",placeholder:"Name", className:"add-project", required:true}));

  //header-button ToggleDisplay
  const headerButton = document.querySelector('.header-toggle-button') 
  toggleDisplay(headerButton,aside,"flex","flex");

  //toggleProjectButton toggleDisplay
  const toggleProjectButton = document.querySelector('.aside-toggle-button');
  const addProjectform = document.querySelector('.add-project-form');
  toggleDisplay(toggleProjectButton, addProjectform,"flex","none");

  //handleProjectFormSubmit
  const addProjectForm = document.querySelector(".add-project-form");
  const addProjectInput = document.querySelector(".add-project-input");
  const projectList = document.querySelector(".list.project-list");
  const content = document.querySelector(".content");
  handleProjectFormSubmit(addProjectForm,addProjectInput,projectList, content);
  

  // Handle home aside events
  const homeList = document.querySelector(".list.home-list");
  homeList.addEventListener("click",toggleHomeItem);

  function toggleHomeItem(event){
    const listItem = event.target.closest(".list-item");
    if(!listItem)
      return;
    const homeItems = homeList.querySelectorAll(".list-item")
    homeItems.forEach(item => {
      if(item !== listItem){
        item.classList.remove("active");
      }
    })
    
    listItem.classList.add("active");
    displayHome(listItem);
  }
  function displayHome(item) {
    const home = document.querySelector(".home");
    home.innerHTML = "";

    const dataSection = item.getAttribute("data-section");
  
    // Create home title
    let homeTitle = document.createElement("h2");
    homeTitle.classList.add("home-title");
    homeTitle.textContent = item.textContent;
    homeTitle.setAttribute("data-section", dataSection);
    home.appendChild(homeTitle);
  
    let tasks = [];
    switch (dataSection) {
      case "all-tasks":
        // Get all tasks from myLibrary
        tasks = myLibrary.getAllTasks();
        // Display each task in the home section
        checkTasks(tasks);
        break;
      case "today":
        // Get today's tasks from myLibrary
        tasks = myLibrary.getTodayTasks();
        // Display each task in the home section
        checkTasks(tasks);
        break;
      case "this-week":
        // Get this week's tasks from myLibrary
        tasks = myLibrary.getThisWeekTasks();
        // Display each task in the home section
        checkTasks(tasks);
        break;
      case "important":
        // Get important tasks from myLibrary
        tasks = myLibrary.getImportantTasks();
        // Display each task in the home section
        checkTasks(tasks);
        break;
      default:
        break;
    }
  }

  // Handle project aside events
  projectList.addEventListener("click", toggleProjectItem)
  console.log(projectList);
  function toggleProjectItem(event){
    const listItem = event.target.closest(".list-item");
    if(!listItem)
      return;
    const isRemoveButton = event.target.closest(".aside-remove-button");
    if (isRemoveButton)
      return;
    const projectItems = projectList.querySelectorAll(".list-item.project");
    projectItems.forEach(item =>{
      if(item !== listItem){
        item.classList.remove("active");
      }
    })
    listItem.classList.add("active");
    displayProject(listItem);

  }

  function displayProject(item){
    const projects = content.querySelector(".projects");
    projects.innerHTML = "";
    const projectTitle = document.createElement("h2");
    projectTitle.classList.add("content-project-title");
    projectTitle.textContent = item.querySelector("p").textContent;
    projects.dataset.projectId = item.getAttribute("project-id");
    


    let addTaskButton = document.createElement("button");
    addTaskButton.textContent = "+ Add Task";
    addTaskButton.classList.add("add-task-btn");
    projectTitle.appendChild(addTaskButton);

    projects.appendChild(projectTitle);
    let project = myLibrary.getProjectById(item.getAttribute("project-id"));
    let tasks = project.getTasks();
    let completedTasks = document.querySelector(".completed-tasks")
    let completedSubtitle = document.querySelector(".completed-subtitle");
    if(tasks.length === 0){
      const noTasks = document.createElement("p");
      noTasks.textContent = "No tasks available";
      noTasks.classList.add("project-no-tasks")
      projects.appendChild(noTasks);
    }
    else{
      tasks.forEach(task => {
        if(!task.completed){
          projects.appendChild(displayTask(task));
        }
        else{
          if(completedSubtitle){
            completedSubtitle.remove();
            completedTasks.appendChild(displayTaskOnly(task));
          }
        }
      });
    }

    const form = taskForm();
    toggleDisplay(addTaskButton,form,"block","none");
    
    projects.appendChild(form)

    // Handle submit task tutton
    form.addEventListener("submit", handleTask)
  }

function taskForm() {
  // Create the form element
  const form = document.createElement("form");
  form.classList.add("task-form");

  // Create input element
  const nameLabel = document.createElement("label");
  nameLabel.htmlFor = "name";
  nameLabel.textContent = "Name";
  const nameInput = document.createElement("input");
  nameInput.name = "name";
  nameInput.id = "name";
  nameInput.classList.add("task-input-name");
  nameInput.type = "text";
  nameInput.placeholder = "name";
  nameInput.required = true;
  
  const dateLabel = document.createElement("label");
  dateLabel.htmlFor = "date";
  dateLabel.textContent = "Due date";
  const dateInput = document.createElement("input");
  dateInput.name = "date";
  dateInput.id = "date";
  dateInput.classList.add("task-input-date");
  dateInput.type = "date";
  dateInput.placeholder = "duedate";
  dateInput.required = true;

  const priorityLabel = document.createElement("label");
  priorityLabel.htmlFor = "priority";
  priorityLabel.textContent = "Set priority";
  const prioritySelect = document.createElement("select");
  prioritySelect.classList.add("task-select-priority");
  prioritySelect.id = "priority";
  prioritySelect.name = "priority";

  const options = ["high", "medium", "low"];
  options.forEach(element => {
    const option = document.createElement("option");
    option.value = `${element}`;
    option.textContent = `${element}`
    prioritySelect.appendChild(option);
  });

  const submitElement = document.createElement("button");
  submitElement.type = "submit";
  submitElement.classList.add("submit-task-button");
  submitElement.textContent = "+";

  form.append(nameLabel, nameInput, dateLabel, dateInput, priorityLabel, prioritySelect, submitElement);
  // Return the form element
  return form;
}
  
function handleTask(event){
  event.preventDefault();
  const projectContainer = document.querySelector(".projects");
  const projectId = projectContainer.getAttribute("data-project-id")
  const noTasks = document.querySelector(".project-no-tasks")
  if(noTasks){
    noTasks.remove();
  }
  console.log(projectId);
  const form = document.querySelector('.task-form');
  const data = new FormData(form);

  form.reset();
  form.style.display = "none";
  const taskDate = data.get("date");

  const newDate = new Date(taskDate);
  newDate.setDate(newDate.getDate() + 1);
  const task = new Task(`task_${new Date().getTime()}`,data.get("name"),newDate, data.get("priority"),false, projectId);
  saveTaskLS(task);
  const project = myLibrary.getProjectById(projectId);
  project.addTask(task);
  const projectLS = getProjectLS(projectId);
  console.log(projectLS);
  projectLS.tasks = project.tasks;
  updateProjectLS(projectLS)
  
  const allTaskDisplayed = document.querySelectorAll(".task-container");
  allTaskDisplayed.forEach(task => {
      task.remove();
  });
  const tasks = project.getTasks();
  tasks.forEach(task => {
    if(!task.completed){
      projectContainer.appendChild(displayTask(task));
    }
  });
  const section = document.querySelector(".home-title");
  displayHome(section);
  // const completedTasks = myLibrary.getCompletedTasks();
  // const completedTasksContainer = document.querySelector(".completed-tasks");
  // completedTasks.forEach(task => {
  //   completedTasksContainer.appendChild(displayTaskOnly(task));
  // });
}

//completed Tasks section
const completedTasksContainer = document.querySelector(".completed-tasks");
const completedTitle = document.createElement("h2");
completedTitle.append("Completed Tasks");
completedTitle.classList.add("content-title");
completedTasksContainer.appendChild(completedTitle);

const clearTaskButton = document.createElement("button");
clearTaskButton.type = "button";
clearTaskButton.classList.add("clear-task-button");
clearTaskButton.append("x Clear")
clearTaskButton.style.display = "none";

clearTaskButton.addEventListener("click",() => {
  const completedTasks = completedTasksContainer.querySelectorAll(".task-container-completed");
  completedTasks.forEach(task => {
    let taskId = task.getAttribute("task-id");
    removeTaskLS(taskId);
    task.remove();
    clearTaskButton.style.display = "none";
  });

  myLibrary.clearCompletedTaskList()
  const noTasks = document.createElement("p");
  noTasks.textContent = "No tasks available";
  noTasks.classList.add("completed-subtitle");
  completedTasksContainer.append(noTasks);
})
completedTitle.appendChild(clearTaskButton);

const noTasks = document.createElement("p");
noTasks.textContent = "No tasks available";
noTasks.classList.add("completed-subtitle");
completedTasksContainer.append(noTasks);



}



function displayHome(item) {
  const home = document.querySelector(".home");
  home.innerHTML = "";

  const dataSection = item.getAttribute("data-section");

  // Create home title
  let homeTitle = document.createElement("h2");
  homeTitle.classList.add("home-title");
  homeTitle.textContent = item.textContent;
  homeTitle.setAttribute("data-section", dataSection);
  home.appendChild(homeTitle);

  let tasks = [];
  switch (dataSection) {
    case "all-tasks":
      // Get all tasks from myLibrary
      tasks = myLibrary.getAllTasks();
      // Display each task in the home section
      checkTasks(tasks);
      break;
    case "today":
      // Get today's tasks from myLibrary
      tasks = myLibrary.getTodayTasks();
      // Display each task in the home section
      checkTasks(tasks);
      break;
    case "this-week":
      // Get this week's tasks from myLibrary
      tasks = myLibrary.getThisWeekTasks();
      // Display each task in the home section
      checkTasks(tasks);
      break;
    case "important":
      // Get important tasks from myLibrary
      tasks = myLibrary.getImportantTasks();
      // Display each task in the home section
      checkTasks(tasks);
      break;
    default:
      break;
  }
}

function checkTasks(tasks) {
  const home = document.querySelector(".home");
  const title = home.querySelector("h2");

  // Eliminamos el contenido anterior antes de volver a mostrar las tareas o el mensaje
  home.innerHTML = "";

  if (tasks.length === 0) {
    const noTasks = document.createElement("p");
    noTasks.textContent = "No tasks available";
    home.appendChild(title);
    home.appendChild(noTasks);
  } else {
    let allCompleted = true; // Variable para indicar si todas las tareas están completadas
    home.appendChild(title);
    tasks.forEach(task => {
      if (!task.completed) {
        allCompleted = false; // Si alguna tarea no está completada, marcamos la variable como false
        home.appendChild(displayTask(task));
      }
    });

    // Comprobamos si no se agregaron tareas a la página o si todas las tareas están completadas
    if (home.children.length === 0 || allCompleted) {
      const noTasks = document.createElement("p");
      noTasks.textContent = "No tasks available";
      home.appendChild(noTasks);
    }
  }

  // Volvemos a insertar el título en .home
}


function displayTask(task) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  taskContainer.setAttribute("task-id", task.id);
  const taskTitle = document.createElement("h2");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = task.name;

  const taskDisplayInfo = document.createElement("button");
  taskDisplayInfo.classList.add("task-display-info");
  taskDisplayInfo.textContent = "+"

  const taskInfo = document.createElement("div");
  taskInfo.classList.add("task-info");
  taskInfo.style.display = "none";

  toggleDisplay(taskDisplayInfo,taskInfo,"flex","none");

  const taskDate = document.createElement("p");
  taskDate.classList.add("task-date");
  taskDate.textContent = "Date: " + moment(task.date).format('DD/MM/YY');

  const taskPriority = document.createElement("p");
  taskPriority.classList.add("task-priority");
  taskPriority.textContent = "Priority: " + task.priority; 

  const taskCompleted = document.createElement("input");
  taskCompleted.classList.add("task-completed");
  taskCompleted.type = "checkbox";
  taskCompleted.checked = task.completed; 
  taskCompleted.addEventListener("change",() => {
    myLibrary.addCompletedTask(task);
    task.completed = true;
    const taskData = getTaskLS(task.id);
    if(taskData){
      console.log(taskData);
      taskData.completed = true;
      localStorage.setItem(taskData.id, JSON.stringify(taskData));
    }

    const taskContainers = document.querySelectorAll(`[task-id="${task.id}"]`);
    taskContainers.forEach(task => {
      task.remove();
    });
    
    const completedTasksContainer = document.querySelector(".completed-tasks");
    const completedSubtitle = document.querySelector(".completed-subtitle");
    const completedButton = document.querySelector(".clear-task-button")
    completedButton.style.display = "flex";
    if(completedSubtitle){
      completedSubtitle.remove();
    }
    
    completedTasksContainer.appendChild(displayTaskOnly(task));
    
    
    
    const section = document.querySelector(".home-title");
    const project = myLibrary.getProjectById(task.projectId);
    project.removeTask(task.id);
    displayHome(section);

    const projectTasks = document.querySelectorAll('section.projects .task-container');
    if(projectTasks.length === 0){
      const noTasks = document.createElement("p");
      noTasks.textContent = "No tasks available";
      noTasks.classList.add("project-no-tasks");
      const projects = document.querySelector(".projects");
      projects.appendChild(noTasks);
    }

    
    
  })

  const removeButton = document.createElement("button");
  removeButton.classList.add("task-remove-button");
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    const project = myLibrary.getProjectById(task.projectId);
    removeTaskLS(task.id);
    project.removeTask(task.id);
    taskContainer.remove();
  });

  taskInfo.append(taskDate, taskPriority, taskCompleted);
  taskTitle.appendChild(taskDisplayInfo);
  taskContainer.append(taskTitle, taskInfo, removeButton);
  return taskContainer;
  }

export function displayTaskOnly(task){
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container-completed");
  taskContainer.setAttribute("task-id", task.id);
  const taskTitle = document.createElement("h2");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = task.name;

  const taskDisplayInfo = document.createElement("button");
  taskDisplayInfo.classList.add("task-display-info");
  taskDisplayInfo.textContent = "+"

  const taskInfo = document.createElement("div");
  taskInfo.classList.add("task-info");
  taskInfo.style.display = "none";

  toggleDisplay(taskDisplayInfo,taskInfo,"flex","none");

  const taskDate = document.createElement("p");
  taskDate.classList.add("task-date");
  taskDate.textContent = "Date: " + moment(task.date).format('DD/MM/YY');

  const taskPriority = document.createElement("p");
  taskPriority.classList.add("task-priority");
  taskPriority.textContent = "Priority: " + task.priority; 

  taskInfo.append(taskDate, taskPriority);
  taskTitle.appendChild(taskDisplayInfo);
  taskContainer.append(taskTitle, taskInfo);

  return taskContainer;
}
export {displayHome,checkTasks,displayTask, website};

