import "./../styles/reset.css";
import "./../styles/website.css";
import {
  createText,
  createDiv,
  createGithubLink,
} from "./domHelpers";
import {createHome,createProject, createProjectForm, createTaskForm} from "./main";
(() => {
  const createHeader = () => {
    let header = document.createElement("header");
    let headerTitle = createText("To-do", "header-title", "h2");
    header.appendChild(headerTitle);
    return header;
  };

  const createMain = () => {
    let main = document.createElement("main");
    main.appendChild(createDiv("menu", createHome(), createProject()));
		main.appendChild(createDiv('content'));

    return main;
  };

  const createFooter = () => {
    let footer = document.createElement("footer");
    let footerTitle = createText(
      "Copyright 2023 andyspal",
      "footer-title",
      "p"
    );
    let githubLink = createGithubLink();
    footer.appendChild(footerTitle);
    footer.appendChild(githubLink);
    return footer;
  };

  const headerElement = createHeader();
  const mainElement = createMain();
  const footerElement = createFooter();

  document.body.appendChild(headerElement);
  document.body.appendChild(mainElement);
  document.body.appendChild(footerElement);
})();
