import { Task } from './task';


class Project {
    constructor(name) {
        this.name = name;
        this.items = [];
    }
    
    addTask(id, title, date, priority) {
        if (!id || !title || !date || !priority) {
            throw new Error('Todos los campos son obligatorios para agregar una tarea.');
        }
        const task = new Task(id, title, date, priority);
        this.items.push(task);
    }
    
    removeTask(taskId) {
        const index = this.items.findIndex(task => task.id === taskId);
        if (index !== -1) {
            this.items.splice(index, 1);
        } else {
            throw new Error('No se encontró ninguna tarea con el ID especificado.');
        }
    }
    findTaskById(taskId) {
        const task = this.items.find(task => task.id === taskId);
        if (task) {
          return task;
        } else {
          throw new Error('No se encontró ninguna tarea con el ID especificado.');
        }
      }
      
    printTask(taskId) {
        const task = this.items.find(task => task.id === taskId);
        if (task) {
            console.log('Tarea:');
            console.log('ID:', task.id);
            console.log('Título:', task.title);
            console.log('Fecha:', task.date);
            console.log('Prioridad:', task.priority);
            console.log('Completada:', task.completed);
        } else {
            throw new Error('No se encontró ninguna tarea con el ID especificado.');
        }
    }
}

export{Project};


