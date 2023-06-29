import { createButton, createDiv, createText } from "./domHelpers";
import { myLibrary } from "./library";

import { projectButtonFunction, addButttonFunction, cancelButtonFunction, taskButtonFunction} from "./eventHandlers";

const createHome = () => {
  const emptyFunction = () => {};
  return createDiv(
    "home",
    createText("Home", "home-title", "h2"),
    createButton("All Tasks", "home-btn", emptyFunction),
    createButton("Today", "home-btn", emptyFunction),
    createButton("This week", "home-btn", emptyFunction)
  );
};

const createProject = () => {
  return createDiv(
    "projects",
    createText("Projects", "menu-title", "h2"),
    createButton("Add project", "project-btn", projectButtonFunction)
  );
};


const createProjectForm = () => {
  const form = document.createElement("form");
  form.id = "project-form";
  const input = createInput("text", "Project Name", "project-input");
  form.appendChild(input);

  const addBtn = createButton('Add', 'add-btn', addButttonFunction)
  addBtn.type = "button";
  addBtn.textContent = "Add";
  form.appendChild(addBtn);

  
  const cancelBtn = createButton("Cancel", "cancel-btn", cancelButtonFunction)
  cancelBtn.type = 'button';
  form.appendChild(cancelBtn);
  return form;
};

const createTaskForm = (title) =>{
  let existingForm = document.querySelector('.task-form');
  if (existingForm) {
    return null; // Devuelve null si ya existe un formulario con la clase .task-form
  }
  const form = document.createElement('form');
  form.classList.add('task-form')
  // Input para el título
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Título:';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.classList.add('title-input');
  titleLabel.appendChild(titleInput);

  // Input para la fecha
  const dateLabel = document.createElement('label');
  dateLabel.textContent = 'Fecha:';
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.classList.add('date-input');
  dateLabel.appendChild(dateInput);

  // Select para la prioridad
  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Prioridad:';
  const prioritySelect = document.createElement('select');
  prioritySelect.classList.add('priority-select');
  const options = ['!!!', '!!', '!'];
  options.forEach(option => {
    const priorityOption = document.createElement('option');
    priorityOption.value = option;
    priorityOption.textContent = option;
    prioritySelect.appendChild(priorityOption);
  });
  priorityLabel.appendChild(prioritySelect);

  // Botón para crear la tarea
  const createTaskButton = createButton('Create Task', 'create-task-btn', taskButtonFunction)
  createTaskButton.type = 'button';
  createTaskButton.setAttribute('data-project', `${title}`)

  // Agregar los elementos al formulario
  form.appendChild(titleLabel);
  form.appendChild(dateLabel);
  form.appendChild(priorityLabel);
  form.appendChild(createTaskButton);

  return form;
}



const createInput = (type, placeholder, className) => {
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  if (className) {
    input.classList.add(className);
  }
  return input;
};
export { createHome, createProject, createProjectForm, createTaskForm};
