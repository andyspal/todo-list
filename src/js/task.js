class Task {
    constructor(id, title, date, priority) {
        this.id = id;
        this.title = title;
        this.date = date;
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
}


export { Task };
