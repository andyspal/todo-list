import { displayTask, website } from "./website";
import "../styles/reset.css";
import "../styles/style.css";
import { getProjectLS, getTaskLS, removeProjectLS, removeTaskLS } from "./localStorage";
import { Project, Task } from "./dataModels";
import myLibrary from "./dataModels";
import { displayHome } from "./website";
import { displayTaskOnly,displayProject } from "./website";
import { el } from "date-fns/locale";
website();
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if(key.startsWith("project_")){
    const projectData = getProjectLS(key);
    const project = new Project(projectData.id, projectData.name);
    myLibrary.addProject(project);
  }
}
let completedTasks = [];
for (let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);
    if (key.startsWith("task_")){
      const taskData = getTaskLS(key);
      const task = new Task(taskData.id, taskData.name, taskData.date, taskData.priority, taskData.completed, taskData.projectId);
      if(task.completed){
        completedTasks.push(task);
        console.log(completedTasks);
      }
      else{
        const project = myLibrary.getProjectById(task.projectId)
        project.addTask(task);
        console.log(project);
      }
    }
}
if(completedTasks.length !== 0){
  const completedSection = document.querySelector(".completed-tasks");
  const completedButton = document.querySelector(".clear-task-button")
  completedButton.style.display = "flex";
  const completedSubtitle = document.querySelector(".completed-subtitle");
  completedSubtitle.remove();

  completedTasks.forEach(task => {
    completedSection.appendChild(displayTaskOnly(task));
  });
}


const projects = myLibrary.getProjects();
const list = document.querySelector(".list.project-list");
projects.forEach(project => {
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
    removeButton.addEventListener("click", (event)=>{
        event.stopPropagation();
        const projectTasks = project.getTasks();
        projectTasks.forEach(task => {
          removeTaskLS(task.id);
        });
        myLibrary.removeProject(project.id);
        removeProjectLS(project.id);
        projectLi.remove();
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
    })
    projectLi.append(projectContent,removeButton)
    list.appendChild(projectLi);
});

const homeLi = document.querySelector("[data-section= all-tasks]");
homeLi.classList.add("active");
const home = document.querySelector(".home");
const homeTitle = document.createElement("h2");
homeTitle.classList.add("home-title");
homeTitle.setAttribute("data-section","all-tasks");
homeTitle.textContent = "All Tasks";
home.appendChild(homeTitle);
const allTasks = myLibrary.getAllTasks()
if(allTasks.length !== 0){
  allTasks.forEach( task => {
    home.appendChild(displayTask(task));
  });
}
else{
  const noTasks = document.createElement("p");
  noTasks.textContent = "No tasks available";
  noTasks.classList.add("no-tasks");
  home.appendChild(noTasks);
}


const projectSection = document.querySelector(".projects");
const noProjectsSelected = document.createElement("h2");
noProjectsSelected.textContent = "No projects selected";
noProjectsSelected.classList.add("content-project-title");
projectSection.appendChild(noProjectsSelected);