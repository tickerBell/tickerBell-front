exports.id = 5;
exports.ids = [5];
exports.modules = {

/***/ 4983:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 954, 23))

/***/ }),

/***/ 7401:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  K: () => (/* binding */ SideBar)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(2947);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(5124);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./src/components/sidebar/SideBarItem.tsx



const SideBarItem = ({ route })=>{
    if ("title" in route) {
        return /*#__PURE__*/ jsx_runtime_.jsx("li", {
            children: route.title
        });
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("li", {
        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
            href: route.route,
            children: route.type
        })
    });
};

;// CONCATENATED MODULE: ./src/components/sidebar/SideBar.tsx



const sideData = [
    {
        type: "title",
        title: "이벤트",
        key: "title-tickerBell",
        route: ""
    },
    {
        type: "이벤트 내역",
        key: `/detail`,
        route: `/detail`
    },
    {
        type: "title",
        title: "내정보",
        key: "title-tickerBell",
        route: ""
    },
    {
        type: "정보 수정",
        key: `/users`,
        route: `/users`
    }
];
const SideBar = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("aside", {
        className: "md:flex w-2/5 md:w-1/4  h-screen flex-col items-center justify-center border-r border-gray-200  ",
        children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
            children: sideData.map((route)=>/*#__PURE__*/ jsx_runtime_.jsx(SideBarItem, {
                    route: route
                }, route.key))
        })
    });
};


/***/ })

};
;