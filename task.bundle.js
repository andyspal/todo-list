"use strict";
(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["task"],{

/***/ "./src/js/task.js":
/*!************************!*\
  !*** ./src/js/task.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
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




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/js/task.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZ0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvanMvdGFzay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKGlkLCB0aXRsZSwgZGF0ZSwgcHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldFByaW9yaXR5KHByaW9yaXR5KSB7XHJcbiAgICAgICAgaWYgKHByaW9yaXR5ID09PSAnIScgfHwgcHJpb3JpdHkgPT09ICchIScgfHwgcHJpb3JpdHkgPT09ICchISEnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhdHVzKCkge1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gIXRoaXMuY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgc2V0SWQobmV3SWQpe1xyXG4gICAgICAgIGlmIChuZXdJZCA9PT0gJycpIHtcclxuICAgICAgICAgICAgdGhyb3cgJ1RoZSBJZCBjYW5ub3QgYmUgZW1wdHknO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlkID0gbmV3SWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRhc2sgfTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9