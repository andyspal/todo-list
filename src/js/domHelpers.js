import githubSvg from "./../images/github.svg";

const createDiv = (className, ...content) => {
  let div = document.createElement("div");
  div.classList.add(className);
  for (let item of content) {
    if (typeof item === "string") {
      div.appendChild(document.createTextNode(item));
    } else {
      div.appendChild(item);
    }
  }
  return div;
};
const createText = (content, className, textType) => {
  let text = document.createElement(textType);
  text.textContent = content;
  text.classList.add(className);
  return text;
};
const createGithubLink = () => {
  const link = document.createElement("a");
  link.href = "https://github.com/andyspal";
  link.target = "_blank";
  const image = document.createElement("img");
  image.src = githubSvg;
  image.alt = "GitHub";
  image.width = "28";
  image.height = "28";
  link.appendChild(image);
  return link;
};
const createButton = (text, className, onClick) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    button.addEventListener('click', onClick);
    return button;
  };


const displayProject = (title) => {
  createDiv('project',createText(`${title}`,'project-title','h2'),createButton('Add task','add-task',()=>{}))
}
export{createDiv,createText,createGithubLink,createButton};