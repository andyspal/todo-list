import moment from "moment";
import { format } from "date-fns";
export class Task {
  constructor(id, name, date, priority, completed,projectId) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.priority = priority;
    this.completed = completed;
    this.projectId = projectId
  }
}

export class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.tasks = new Map();
  }
  addTask(task) {
    this.tasks.set(task.id, task);
  }
  removeTask(taskId) {
    this.tasks.delete(taskId);
  }
  getTasks() {
    return Array.from(this.tasks.values());
  }
}

export class Library {
  constructor() {
    this.projects = new Map();
    this.taskCompleted = new Map();
  }

  addProject(project) {
    this.projects.set(project.id, project);
  }
  
  addCompletedTask(task){
    this.taskCompleted.set(task.id, task);
  }
  getProjectById(projectId) {
    return this.projects.get(projectId);
  }
  getProjects() {
    return Array.from(this.projects.values());
  }
  getCompletedTasks(){
    return Array.from(this.taskCompleted.values());
  }
  
  removeProject(projectId) {
    this.projects.delete(projectId);
  }
  
  clearCompletedTaskList(){
    this.taskCompleted = new Map();
  }

  getTodayTasks() {
    const todayDate = new Date();
    const todayDateFormat = format(todayDate, "MM/dd/yyyy");
    const todayTasks = [];
    this.projects.forEach((project) => {
      const projectTasks = project.getTasks();
      const projectTodayTasks = projectTasks.filter((task) => {
        const taskDate = new Date(task.date);
        console.log(taskDate);
        const taskDateFormat = format(taskDate, "MM/dd/yyyy");
        console.log(taskDateFormat);
        return taskDateFormat === todayDateFormat;
      });
      todayTasks.push(...projectTodayTasks);
    });
  
    return todayTasks;
  }
  
  

  getAllTasks() {
    const tasks = [];
    this.projects.forEach((project) => {
      const projectTasks = project.getTasks();
      tasks.push(...projectTasks);
    });
    return tasks;
  }

  getThisWeekTasks() {
    const today = moment();
    const startOfWeek = today.clone().startOf("week");
    const endOfWeek = today.clone().endOf("week");

    const thisWeekTasks = [];
    this.projects.forEach((project) => {
      const projectTasks = project.getTasks();
      const projectThisWeekTasks = projectTasks.filter((task) => {
        const taskDate = moment(task.date);
        return taskDate.isBetween(startOfWeek, endOfWeek, "day", "[]");
      });

      thisWeekTasks.push(...projectThisWeekTasks);
    });

    return thisWeekTasks;
  }

  getImportantTasks() {
    const importantTasks = [];

    // Itera sobre cada proyecto en la biblioteca
    this.projects.forEach((project) => {
      const projectTasks = project.getTasks();

      // Filtra las tareas importantes en el proyecto
      const projectImportantTasks = projectTasks.filter(
        (task) => task.priority === "high"
      );

      // Agrega las tareas importantes al arreglo de tareas importantes
      importantTasks.push(...projectImportantTasks);
    });

    return importantTasks;
  }
}

let myLibrary = new Library();

// Save library to localStorage



export default myLibrary;

