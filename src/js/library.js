import { Project } from "./proyect";

class Library {
    constructor(){
        this.projects = [];
    }
    
    findProjectByName(projectName) {
        return this.projects.find(project => project.name === projectName);
    }
    
    addProject(name){
        if(!name){
            throw new Error('Todos los campos son obligatorios para agregar un Projecto.');
        }
        const existingProject = this.projects.find(project => project.name === name);

        if(existingProject){
            throw new Error('Ya existe el proyecto.');
        }
        const project = new Project(name);
        this.projects.push(project);
    }
    removeProject(projectName){
        const index = this.projects.findIndex(project => project.name === projectName);
        if(index !== -1){
            this.projects.splice(index,1);
        }
        else{
            throw new Error('No se encontró ningun projecto con el nombre especificado.');
        }
    }

    printProject(projectName){
        const index = this.projects.findIndex(project => project.name === projectName);
        if(index !== -1){
            console.log('Proyecto: ')
            console.log(this.projects[index]);
        }
        else{
            throw new Error('No se encontró ningun projecto con el nombre especificado.');
        }
    }
}


const myLibrary = new Library();
export {myLibrary};

