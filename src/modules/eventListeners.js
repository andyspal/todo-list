import { Project, Task } from "./dataModels";
import myLibrary from "./dataModels";
import { displayHome, checkTasks, displayTask } from "./website";
import { removeProjectLS, removeTaskLS, saveProjectLS } from "./localStorage";
function toggleDisplay(button, element, display, initialDisplay) {
  element.style.display = initialDisplay;
  button.addEventListener('click', () => {
    element.style.display = (element.style.display === 'none') ? display : 'none';
  });
}
function handleProjectFormSubmit(form, input, list) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const projectName = input.value;
    if (projectName.trim() !== '') {
      form.style.display = 'none';
      input.value = '';
      const projectId = `project_${Date.now()}`;
      let project = new Project(projectId, projectName);
      saveProjectLS(project);
      myLibrary.addProject(project);

      const projectLi = document.createElement("li");
      projectLi.classList.add("list-item");
      projectLi.classList.add("project");
      projectLi.setAttribute("project-id", project.id);
      const projectContent = document.createElement("p");
      projectContent.textContent = project.name;
      projectContent.classList.add("project-title");

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.textContent = "X";
      removeButton.classList.add("aside-remove-button");
      removeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        // Remove the project and its tasks
        const project = myLibrary.getProjectById(projectId);
        const projectTasks = project.getTasks();
        projectTasks.forEach(task => {
          removeTaskLS(task.id);
        });
        myLibrary.removeProject(projectId);
        removeProjectLS(projectId);
        projectLi.remove();
        // Clear content if the removed project was active
        const projectsList = myLibrary.getProjects();
        if (projectLi.classList.contains("active") || projectsList.length === 0) {
          const projects = document.querySelector(".projects")
          projects.innerHTML = "";
          const title = document.createElement("h2");
          title.classList.add("content-project-title");
          title.textContent = "No projects selected";
          projects.appendChild(title);
          const section = document.querySelector(".home-title");
          displayHome(section);
        }
      });

      projectLi.append(projectContent, removeButton);
      list.appendChild(projectLi);
    }
  });
}




// function displayTask(task) {
//   const taskContainer = document.createElement("div");
//   taskContainer.classList.add("task-container");

//   const taskTitle = document.createElement("h2");
//   taskTitle.classList.add("task-title");
//   taskTitle.textContent = task.name;

//   const taskInfo = document.createElement("div");
//   taskInfo.classList.add("task-info");

//   const taskDate = document.createElement("p");
//   taskDate.classList.add("task-date");
//   taskDate.textContent = "Date: " + task.date; // Agrega la fecha de la tarea (propiedad "date") si la tienes disponible

//   const taskPriority = document.createElement("p");
//   taskPriority.classList.add("task-priority");
//   taskPriority.textContent = "Priority: " + task.priority; // Agrega la prioridad de la tarea (propiedad "priority") si la tienes disponible

//   const taskCompleted = document.createElement("input");
//   taskCompleted.classList.add("task-completed");
//   taskCompleted.type = "checkbox";
//   taskCompleted.checked = task.completed; // Marca la casilla de verificación si la tarea está completada (propiedad "completed")

//   const removeButton = document.createElement("button");
//   removeButton.classList.add("task-remove-button");
//   removeButton.type = "button";
//   removeButton.textContent = "Remove";
//   removeButton.addEventListener("click", () => {
//     const project = myLibrary.getProjectById(task.projectId);
//     project.removeTask(task.id);
//     taskContainer.remove();
//   });

//   taskInfo.append(taskDate, taskPriority, taskCompleted);
//   taskContainer.append(taskTitle, taskInfo, removeButton);
//   return taskContainer;
// }


console.log(myLibrary)
export { toggleDisplay, handleProjectFormSubmit,displayTask};



