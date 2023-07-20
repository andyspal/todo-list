// import format from "date-fns/format";


// function createHeader (text, menuIcon) {
//   let header, title, menuButton, menuImage;

//   header = document.createElement("header");
//   title = document.createElement("h2");
//   title.textContent = text;
//   title.classList.add("header-title");

//   menuButton = document.createElement("button");
//   menuButton.classList.add("header-button");

//   menuImage = new Image();
//   menuImage.src = menuIcon;
//   menuImage.classList.add("header-button-image");
//   menuImage.alt = "menu";

//   menuButton.appendChild(menuImage);
//   header.appendChild(menuButton);
//   header.appendChild(title);
//   return header;
// };

// function createMain () {
//   let container, aside, content;

//   container = document.createElement("main");
//   container.classList.add("main-container");

//   aside = document.createElement("aside");
//   aside.classList.add("main-aside");

//   content = document.createElement("section");
//   content.classList.add("content");

//   container.append(aside, content);
//   return container;
// };
// function createFooter  (author, link, logo)  {
//   let footer, p, anchor, img;

//   footer = document.createElement("footer");

//   p = document.createElement("p");
//   p.classList.add("footer-title");
//   p.textContent = author;

//   anchor = document.createElement("a");
//   anchor.classList.add("footer-anchor");
//   anchor.href = link;
//   anchor.target = "_blank";

//   img = new Image();
//   img.classList.add("footer-image");
//   img.src = logo;
//   img.alt = "logo";

//   anchor.appendChild(img);
//   footer.appendChild(p);
//   footer.appendChild(anchor);
//   return footer;
// };
// function createList (title, items) {
//   let listContainer, listTitle, list, listItem;

//   listContainer = document.createElement("div");
//   listContainer.classList.add("list-container");

//   listTitle = document.createElement("h3");
//   listTitle.classList.add("list-title");
//   listTitle.textContent = title;
//   listContainer.appendChild(listTitle);

//   list = document.createElement("ul");
//   list.classList.add("list");

//   items.forEach((item) => {
//     listItem = document.createElement("li");
//     listItem.classList.add("list-item");
//     listItem.textContent = item;
//     listItem.dataset.section = item.toLowerCase().replace(/\s/g, "-");
//     list.appendChild(listItem);
//   });

//   listContainer.appendChild(list);

//   return listContainer;
// };
// function createProjectList (title, items)  {
//   let listContainer, listTitle, list, listItem, removeButton;

//   listContainer = document.createElement("div");
//   listContainer.classList.add("list-container");

//   listTitle = document.createElement("h3");
//   listTitle.classList.add("list-title");
//   listTitle.textContent = title;
//   listContainer.appendChild(listTitle);

//   list = document.createElement("ul");
//   list.classList.add("list");

//   items.forEach((item) => {
//     listItem = document.createElement("li");
//     listItem.classList.add("list-item");
//     listItem.classList.add("project-list-item");
//     listItem.dataset.projectId = item.id;
//     listItem.textContent = item.name; // Assuming each item has a 'name' property
//     removeButton = document.createElement("button");
//     removeButton.classList.add("remove-button");
//     removeButton.textContent = "X";
//     listItem.addEventListener("click", () => {
//       let content = document.querySelector(".content");
//       content.innerHTML = "";

//       let title = document.createElement("h2");
//       title.textContent = `${item.name}`;
//       title.classList.add("content-title");
//       content.appendChild(title);

//       console.log(item);

//       let tasks = item.getTasks();
//       console.log(tasks);
//       tasks.forEach((task) => {
//         let taskContainer = document.createElement("div");
//         taskContainer = displayTask(task);
//         content.appendChild(taskContainer);
//       });
//     });
//     listItem.appendChild(removeButton); // Add the remove button to the list item
//     list.appendChild(listItem);
//   });

//   listContainer.appendChild(list);

//   return listContainer;
// };

// function createButton (logo, buttonClassName, imageClassName) {
//   let button, image;
//   button = document.createElement("button");
//   button.classList.add(buttonClassName);
//   image = new Image();
//   image.classList.add(imageClassName);
//   image.alt = "button-image";
//   image.src = logo;
//   button.appendChild(image);
//   return button;
// };

// function createForm(inputConfig) {
//   // Create the form element
//   const form = document.createElement("form");

//   // Create input element
//   const inputElement = document.createElement("input");
//   inputElement.type = inputConfig.type;
//   inputElement.name = inputConfig.name;
//   inputElement.classList.add(inputConfig.className);
//   inputElement.placeholder = inputConfig.placeholder;
//   inputElement.maxLength = inputConfig.maxLength;
//   if (inputConfig.required) {
//     inputElement.required = true;
//   }

//   let submitElement = document.createElement("button");
//   submitElement.type = "button";
//   submitElement.classList.add("submit-button");
//   submitElement.textContent = "Add";
//   form.appendChild(inputElement);
//   form.appendChild(submitElement);

//   // Return the form element
//   return form;
// }
// const displayTask = (task) => {
//   let taskContainer = document.createElement("div");
//   taskContainer.classList.add("task-container");

//   let taskTitle = document.createElement("p");
//   taskTitle.classList.add("task-title");
//   taskTitle.textContent = task.name;

//   let taskDate = document.createElement("p");
//   taskDate.classList.add("task-date");
//   taskDate.textContent = `Date: ${format(task.date, "dd/MM/yyyy")}`;

//   let taskPriority = document.createElement("p");
//   taskPriority.classList.add("task-priority");
//   taskPriority.textContent = `Priority: ${task.priority}`;

//   let taskCompleted = document.createElement("input");
//   taskCompleted.type = "checkbox";
//   taskCompleted.setAttribute("data-task-id", task.id);
//   taskCompleted.addEventListener("change", function() {
//     if (this.checked) {
//       let project = myLibrary.getProjectById(task.projectId);
//       project.removeTask(task.id);
//       this.parentNode.remove();
//     }
//   });

//   taskContainer.appendChild(taskTitle);
//   taskContainer.appendChild(taskDate);
//   taskContainer.appendChild(taskPriority);
//   taskContainer.appendChild(taskCompleted);
//   return taskContainer;
// };

// export {createHeader, createMain,createFooter,createButton,createList,createProjectList,createForm};

