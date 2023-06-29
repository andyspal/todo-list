class Task {
    constructor(id, title, date, priority) {
        this.id = id;
        this.title = title;
        this.date = new Date();
        this.priority = priority;
        this.completed = false;
    }
    
    setPriority(priority) {
        if (priority === '!' || priority === '!!' || priority === '!!!') {
            this.priority = priority;
        }
    }

    setStatus() {
        this.completed = !this.completed;
    }
    setId(newId){
        if (newId === '') {
            throw 'The Id cannot be empty';
        }
        this.id = newId;
    }
}

export { Task };
