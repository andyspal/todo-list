import "./../styles/reset.css";
import "./../styles/website.css";
import {
  createText,
  createDiv,
  createGithubLink,
  createButton,
} from "./domHelpers";

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
  const createHome = () => {
    const emptyFunction = () => {};
    return createDiv(
      "home",
      createText("Home", "home-title", "h2"),
      createButton("All Tasks", "home-btn", emptyFunction),
      createButton("Today", "home-btn", emptyFunction),
      createButton("This week", "home-btn", emptyFunction)
    );
  };

  const createProject = () => {
    return createDiv(
      "projects",
      createText("Projects", "menu-title", "h2"),
      createButton("Add project", "project-btn", () => {})
    );
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
