import { Project, Task } from "./dataModels";
import myLibrary from "./dataModels";
function toggleDisplay(button, element, display, initialDisplay) {
  element.style.display = initialDisplay;
  button.addEventListener('click', () => {
    element.style.display = (element.style.display === 'none') ? display : 'none';
  });
}
function handleProjectFormSubmit(form, input, list, content) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const projectName = input.value;

    if (projectName.trim() !== '') {
      form.style.display = 'none';
      input.value = '';

      const projectId = `id_${Date.now()}`;
      let project = new Project(projectId, projectName);
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
        myLibrary.removeProject(projectId);
        projectLi.remove();
        console.log(myLibrary);

        // Clear content if the removed project was active
        if (projectLi.classList.contains("active")) {
          const projects = document.querySelector(".projects")
          projects.innerHTML = "";
        }
      });

      // Agregar el evento click para mostrar el contenido del proyecto
      // projectLi.addEventListener("click", () => {
      //   const projectList = list.querySelectorAll(".list-item");
      //   projectList.forEach(item => {
      //     if (item !== projectLi) {
      //       item.classList.remove("active");
      //     }
      //   });

      //   projectLi.classList.add("active");
      //   content.innerHTML = "";
      // });

      projectLi.append(projectContent, removeButton);
      list.appendChild(projectLi);
      console.log(myLibrary);
    }
  });
}




function displayTask(task) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  const taskTitle = document.createElement("h2");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = task.name;

  const taskInfo = document.createElement("div");
  taskInfo.classList.add("task-info");

  const taskDate = document.createElement("p");
  taskDate.classList.add("task-date");
  taskDate.textContent = "Date: " + task.date; // Agrega la fecha de la tarea (propiedad "date") si la tienes disponible

  const taskPriority = document.createElement("p");
  taskPriority.classList.add("task-priority");
  taskPriority.textContent = "Priority: " + task.priority; // Agrega la prioridad de la tarea (propiedad "priority") si la tienes disponible

  const taskCompleted = document.createElement("input");
  taskCompleted.classList.add("task-completed");
  taskCompleted.type = "checkbox";
  taskCompleted.checked = task.completed; // Marca la casilla de verificación si la tarea está completada (propiedad "completed")

  const removeButton = document.createElement("button");
  removeButton.classList.add("task-remove-button");
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    const project = myLibrary.getProjectById(task.projectId);
    project.removeTask(task.id);
    taskContainer.remove();
  });

  taskInfo.append(taskDate, taskPriority, taskCompleted);
  taskContainer.append(taskTitle, taskInfo, removeButton);
  return taskContainer;
}


console.log(myLibrary)
export { toggleDisplay, handleProjectFormSubmit,displayTask};



