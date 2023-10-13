exports.id = 620;
exports.ids = [620];
exports.modules = {

/***/ 7620:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9367);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9610);
/* harmony import */ var _button_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4964);
/* harmony import */ var _button_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_button_module_scss__WEBPACK_IMPORTED_MODULE_4__);





const buttonSize = {
    small: "text-xs",
    medium: "text-base",
    large: "text-lg"
};
const buttonTheme = {
    primary: "bg-primary text-white",
    secondary: "hover:bg-gray-400 text-black",
    border: "border border-transparent hover:saturate-10"
};
const Button = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(({ children, size = "medium", theme = "primary", className, full, onClick, ...attr }, ref)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        ref: ref,
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()((0,tailwind_merge__WEBPACK_IMPORTED_MODULE_3__/* .twMerge */ .m)(`${buttonTheme[theme]} ${buttonSize[size]} px-10 py-4 box-border cursor-pointer whitespace-pre rounded-4
      `, className), {
            [(_button_module_scss__WEBPACK_IMPORTED_MODULE_4___default().is_full)]: full
        }),
        onClick: onClick,
        ...attr,
        children: children
    });
});
// forwardRef 의 react/display-name 에러 해제
// https://stackoverflow.com/questions/67992894/component-definition-is-missing-display-name-for-forwardref
Button.displayName = "Button";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);


/***/ }),

/***/ 4964:
/***/ ((module) => {

// Exports
module.exports = {
	"is_full": "button_is_full__aExWg"
};


/***/ })

};
;