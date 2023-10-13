"use strict";
exports.id = 438;
exports.ids = [438];
exports.modules = {

/***/ 4355:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2947);


const navdata = [
    "뮤지컬",
    "콘서트",
    "연극",
    "클래식/무용",
    "스포츠"
];
const NavTab = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "flex gap-8",
        children: navdata.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                children: item
            }, index))
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavTab);


/***/ }),

/***/ 8509:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ header_Header)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(2947);
;// CONCATENATED MODULE: ./src/components/SearchBar/SearchBar.tsx


const SearchBar = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "border",
        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
            type: "text",
            placeholder: "검색"
        })
    });
};
/* harmony default export */ const SearchBar_SearchBar = (SearchBar);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(5124);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./src/components/header/Menu.tsx



const Menu = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex gap-6 text-[14px]",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/modal",
                children: "모달 임시"
            }),
            "ㅁㄴㅇㄹㄴㅇㅁㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ",
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/login",
                children: "로그인"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/regist",
                children: "회원가입"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/mypage",
                children: "마이페이지"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/reserve",
                children: "예약확인/취소"
            })
        ]
    });
};
/* harmony default export */ const header_Menu = (Menu);

;// CONCATENATED MODULE: ./src/components/header/Header.tsx
"use clent";





const Header = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
        className: "flex items-center justify-between h-40",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/",
                children: "로고"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(SearchBar_SearchBar, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(header_Menu, {})
        ]
    });
};
/* harmony default export */ const header_Header = (Header);


/***/ })

};
;