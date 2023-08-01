export function saveProjectLS(project){
    localStorage.setItem(`${project.id}`, JSON.stringify(project));
}
export function getProjectLS(projectId){
    const projectData = localStorage.getItem(projectId);
    return JSON.parse(projectData);
  }
  export function getTaskLS(taskId){
    const taskData = localStorage.getItem(taskId);
    return JSON.parse(taskData);
  }
export function updateProjectLS(project) {
    const projectId = project.id;
    removeProjectLS(projectId)
    localStorage.setItem(projectId, JSON.stringify(project));
  }
export function removeProjectLS(projectId){
    localStorage.removeItem(`${projectId}`);
}

export function saveTaskLS(task){
    localStorage.setItem(`${task.id}`, JSON.stringify(task));
}
export function removeTaskLS(taskId){
    localStorage.removeItem(`${taskId}`);
}