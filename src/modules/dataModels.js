import moment from "moment";

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
  
  removeProject(projectId) {
    this.projects.delete(projectId);
  }
  
  clearCompletedTaskList(){
    this.taskCompleted = new Map();
  }
  getTodayTasks() {
    const today = new Date();
    const todayTasks = [];
    this.projects.forEach((project) => {
      const projectTasks = project.getTasks();
      const projectTodayTasks = projectTasks.filter((task) => {
        const taskDate = new Date(task.date);
        return taskDate.toDateString() === today.toDateString();
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
let today = new Date();
const project1 = new Project("project1", "Study React");
const project2 = new Project("project2", "Make laundry");
const task1 = new Task(new Date().getTime(),"Read fundamentals",today,"high",false,project1.id);
project1.addTask(task1);
myLibrary.addProject(project2);
myLibrary.addProject(project1);


export default myLibrary;

