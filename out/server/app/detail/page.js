"use strict";
(() => {
var exports = {};
exports.id = 654;
exports.ids = [654];
exports.modules = {

/***/ 8038:
/***/ ((module) => {

module.exports = require("next/dist/compiled/react");

/***/ }),

/***/ 8704:
/***/ ((module) => {

module.exports = require("next/dist/compiled/react-dom/server-rendering-stub");

/***/ }),

/***/ 7897:
/***/ ((module) => {

module.exports = require("next/dist/compiled/react-server-dom-webpack/client");

/***/ }),

/***/ 6786:
/***/ ((module) => {

module.exports = require("next/dist/compiled/react/jsx-runtime");

/***/ }),

/***/ 5868:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/app-render");

/***/ }),

/***/ 1844:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/get-segment-param");

/***/ }),

/***/ 6624:
/***/ ((module) => {

module.exports = require("next/dist/server/future/helpers/interception-routes");

/***/ }),

/***/ 5281:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module");

/***/ }),

/***/ 7085:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context");

/***/ }),

/***/ 199:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/hash");

/***/ }),

/***/ 6819:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context");

/***/ }),

/***/ 9569:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/hooks-client-context");

/***/ }),

/***/ 7160:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context");

/***/ }),

/***/ 893:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix");

/***/ }),

/***/ 2336:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url");

/***/ }),

/***/ 7887:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/handle-smooth-scroll");

/***/ }),

/***/ 8735:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot");

/***/ }),

/***/ 120:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url");

/***/ }),

/***/ 8231:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path");

/***/ }),

/***/ 4614:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix");

/***/ }),

/***/ 3750:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash");

/***/ }),

/***/ 982:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href");

/***/ }),

/***/ 9618:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/server-inserted-html");

/***/ }),

/***/ 8423:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 7310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 5578:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalError: () => (/* reexport default from dynamic */ next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default.a),
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   pages: () => (/* binding */ pages),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   tree: () => (/* binding */ tree)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7262);
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9513);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1823);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2502);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
// @ts-ignore this need to be imported from next/dist to be external


const AppPageRouteModule = next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__.AppPageRouteModule;
// We inject the tree and pages here so that we can use them in the route
// module.
const tree = {
        children: [
        '',
        {
        children: [
        'detail',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 9104)), "D:\\code\\tickerBell-front\\src\\app\\detail\\page.tsx"],
          
        }]
      },
        {
        
        metadata: {
    icon: [(async (props) => (await Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 3881))).default(props))],
    apple: [],
    openGraph: [],
    twitter: [],
    manifest: undefined
  }
      }
      ]
      },
        {
        'layout': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 285)), "D:\\code\\tickerBell-front\\src\\app\\layout.tsx"],
'not-found': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 5493, 23)), "next/dist/client/components/not-found-error"],
        metadata: {
    icon: [(async (props) => (await Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 3881))).default(props))],
    apple: [],
    openGraph: [],
    twitter: [],
    manifest: undefined
  }
      }
      ]
      }.children;
const pages = ["D:\\code\\tickerBell-front\\src\\app\\detail\\page.tsx"];

// @ts-expect-error - replaced by webpack/turbopack loader

const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/detail/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/detail/page",
        pathname: "/detail",
        // The following aren't used in production.
        bundlePath: "",
        filename: "",
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
});

//# sourceMappingURL=app-page.js.map

/***/ }),

/***/ 9104:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ page)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./src/dummyData/DummyData.ts
var DummyData = __webpack_require__(5070);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(2947);
;// CONCATENATED MODULE: ./src/components/DataTable/DataTableBody.tsx

const DataTableBody = ({ row })=>{
    const { startTime, place, title, speaker, maxuser, maxseats } = row;
    return /*#__PURE__*/ jsx_runtime_.jsx("tbody", {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
            className: "border-b text-sm text-gray-900 text-center",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("td", {
                    className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                    children: title
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("td", {
                    className: "px-6 py-4 whitespace-nowrap ",
                    children: speaker
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("td", {
                    className: "px-6 py-4 whitespace-nowrap",
                    children: startTime
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("td", {
                    className: "px-6 py-4 whitespace-nowrap",
                    children: place
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("td", {
                    className: "px-6 py-4 whitespace-nowrap",
                    children: maxuser
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("td", {
                    className: "px-6 py-4 whitespace-nowrap",
                    children: maxseats
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("td", {
                    className: "px-6 py-4 whitespace-nowrap",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        className: "border",
                        children: "취소하기"
                    })
                })
            ]
        })
    });
};

;// CONCATENATED MODULE: ./src/components/DataTable/DataTableHeader.tsx

const DataTableHeader = ({ column })=>{
    const { name, speaker, date, totaluser, place, maxseats, cancel } = column;
    return /*#__PURE__*/ jsx_runtime_.jsx("thead", {
        className: "bg-gray-200 border-b",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
            className: "text-sm font-medium text-gray-900 text-center",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("th", {
                    className: "px-6 py-4",
                    children: name
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("th", {
                    className: "px-6 py-4",
                    children: speaker
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("th", {
                    className: "px-6 py-4",
                    children: date
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("th", {
                    className: "px-6 py-4",
                    children: place
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("th", {
                    className: "px-6 py-4",
                    children: totaluser
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("th", {
                    className: "px-6 py-4",
                    children: maxseats
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("th", {
                    className: "px-6 py-4",
                    children: cancel
                })
            ]
        })
    });
};

;// CONCATENATED MODULE: ./src/components/DataTable/DataTable.tsx



const DataTable = ({ columns, rows })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "flex flex-col w-3/4 justify-center items-center",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "overflow-x-auto sm:mx-0.5 lg:mx-0.5",
            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "py-2 inline-block min-w-full sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("table", {
                    className: "min-w-full",
                    children: [
                        columns.map((column, key)=>/*#__PURE__*/ jsx_runtime_.jsx(DataTableHeader, {
                                column: column
                            }, key)),
                        rows.map((row, key)=>/*#__PURE__*/ jsx_runtime_.jsx(DataTableBody, {
                                row: row
                            }, key))
                    ]
                })
            })
        })
    });
};

// EXTERNAL MODULE: ./src/components/header/Header.tsx + 2 modules
var Header = __webpack_require__(8509);
// EXTERNAL MODULE: ./src/components/NavTab/NavTab.tsx
var NavTab = __webpack_require__(4355);
// EXTERNAL MODULE: ./src/components/sidebar/SideBar.tsx + 1 modules
var SideBar = __webpack_require__(7401);
;// CONCATENATED MODULE: ./src/app/detail/page.tsx








const Index = ()=>{
    const columns = (0,react_shared_subset.useMemo)(()=>DummyData/* EventColumns */.EA, []);
    const rows = (0,react_shared_subset.useMemo)(()=>DummyData/* EventRows */.sZ, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Header/* default */.Z, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(NavTab/* default */.Z, {}),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
                className: "flex",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(SideBar/* SideBar */.K, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(DataTable, {
                        columns: columns,
                        rows: rows
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const page = (Index);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [587,650,4,447,438,70,5], () => (__webpack_exec__(5578)));
module.exports = __webpack_exports__;

})();