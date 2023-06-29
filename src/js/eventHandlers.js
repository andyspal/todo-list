import { createProjectForm, createTaskForm } from "./main";
import { createButton, createDiv, createText } from "./domHelpers";
import { myLibrary } from "./library";
const { format } = require('date-fns');

const projectButtonFunction = () => {
  let formContainer = document.querySelector(".projects");
  let existingForm = formContainer.querySelector("#project-form");
  if (!existingForm) {
    formContainer.appendChild(createProjectForm());
  }
};

const addButttonFunction = () => {
  let input = document.querySelector(".project-input");
  let title = input.value;
  if (title.trim() !== "") {
    let content = document.querySelector(".content");
    const existingProject = content.querySelector(`[data-project="${title}"]`);
    if (existingProject) {
      console.log("Ya existe un proyecto con el mismo nombre.");
      return;
    }
    let deleteProjectBtn = createButton(
      "Delete project",
      "delete-project",
      function () {
        const projectTitle = this.getAttribute("data-project");
        const projectContainer = document.querySelector(
          `[data-project="${projectTitle}"]`
        );
        if (projectContainer) {
          projectContainer.remove();
          myLibrary.removeProject(projectTitle);
        }
      }
    );
    deleteProjectBtn.setAttribute("data-project", `${title}`);
    let projectContainer = createDiv(
      "project",
      createText(`${title}`, "project-title", "h2"),
      createButton("Add task", "add-task", () => {
        let projectContainer = document.querySelector(
          `[data-project="${title}"]`
        );

        let taskForm = createTaskForm(title);
        if (taskForm) {
          projectContainer.appendChild(taskForm);
        }
      }),
      deleteProjectBtn
    );
    projectContainer.setAttribute("data-project", `${title}`);
    content.appendChild(projectContainer);
    myLibrary.addProject(title);
    myLibrary.printProject(title);
    let form = document.getElementById("project-form");
    form.reset();
    form.display = "none";
  } else {
    console.log("El título no puede estar vacío");
  }
};

const cancelButtonFunction = () => {
  const form = document.querySelector("#project-form");
  if (form) {
    form.remove();
  }
};

const taskButtonFunction = (event) => {
  const form = document.querySelector(".task-form");
  const button = event.target;
  const projectName = button.dataset.project;
  const taskTitleInput = document.querySelector(".title-input");
  const taskDateInput = document.querySelector(".date-input");
  const taskPrioritySelect = document.querySelector(".priority-select");

  const taskTitle = taskTitleInput.value;
  const taskDate = taskDateInput.value;
  const taskPriority = taskPrioritySelect.value;

  if (!taskTitle || !taskDate || !taskPriority) {
    console.log("Faltan datos");
    return; // No se agregará la tarea si faltan datos
  }

  const project = myLibrary.findProjectByName(projectName);
  if (project) {
    const taskId = Date.now();
    project.addTask(taskId, taskTitle, taskDate, taskPriority);
    project.printTask(taskId);
    displayTask(projectName, taskId);
    form.remove();
  } else {
    console.log("No se encontró el proyecto con el nombre especificado.");
  }
};

const displayTask = (projectName, taskId) => {
  //Buscar proyecto en myLibrary y verificar que exista
  const project = myLibrary.findProjectByName(projectName);
  if (project) {
    //Buscar contenedor del proyecto seleccionado
    const projectContainer = document.querySelector(`[data-project="${projectName}"]`);

    //Buscar task y verificar que exista
    const task = project.findTaskById(taskId);
    if (task){
      const taskTitle = createText(task.title, 'task-title', 'h3');
      const formattedDate = format(task.date, 'dd/MM/yyyy');
      const taskDate = createText(formattedDate, 'task-date', 'p');
      
      const taskPriority = createText(task.priority, 'task-priority', 'p');
      const deleteTaskButton = createButton('Delete Task','delete-task-button', deleteTaskButtonFunction)
      deleteTaskButton.setAttribute('data-task-id', taskId)
      deleteTaskButton.setAttribute('data-project-name', projectName);
  
  
      let taskContainer = createDiv('task', taskTitle, taskDate, taskPriority,deleteTaskButton);
      taskContainer.setAttribute('data-task-id', taskId);
      projectContainer.appendChild(taskContainer);
    }
    else{
      console.log('No se encontró la task con el id especificado.');
    }

  } else {
    console.log('No se encontró el proyecto con el nombre especificado.');
  }
};
const deleteTaskButtonFunction = (event) => {
  const button = event.target;
  const taskId = parseInt(button.getAttribute('data-task-id'));
  const projectName = button.getAttribute('data-project-name');
  const project = myLibrary.findProjectByName(projectName);
  project.removeTask(taskId);
  const taskContainer = document.querySelector(`[data-task-id="${taskId}"]`);
  taskContainer.remove();
};




export {
  projectButtonFunction,
  addButttonFunction,
  cancelButtonFunction,
  taskButtonFunction,
};
