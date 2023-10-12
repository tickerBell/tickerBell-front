"use strict";
(() => {
var exports = {};
exports.id = 15;
exports.ids = [15];
exports.modules = {

/***/ 9491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 2361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 2781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 6224:
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ 7310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 9796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 9276:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/api/path/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  GET: () => (GET)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(2394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(9513);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 46 modules
var axios = __webpack_require__(3078);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(9335);
;// CONCATENATED MODULE: ./src/app/api/path/route.ts
// 'use client'


async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams;
    const start = searchParams.get("start");
    const goal = searchParams.get("goal");
    const option = searchParams.get("option");
    const response = await axios/* default */.Z.get("https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving", {
        params: {
            start: start,
            goal: goal,
            option: option
        },
        headers: {
            "X-NCP-APIGW-API-KEY-ID": "ugm16gkcw2",
            "X-NCP-APIGW-API-KEY": "mDTqyhP8j8bw0IPW8dOaPDG0Wm2VRiSzyqvMotRw"
        }
    });
    const data = await response.data;
    return next_response/* default */.Z.json({
        data
    });
} // export async function GET(request: NextRequest) {
 //   const searchParams = request.nextUrl.searchParams
 //   const query = searchParams.get('query')
 //   return new Response(`Hello, Next.js! ${query}`);
 // }

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fpath%2Froute&name=app%2Fapi%2Fpath%2Froute&pagePath=private-next-app-dir%2Fapi%2Fpath%2Froute.ts&appDir=D%3A%5Ccode%5CtickerBell-front%5Csrc%5Capp&appPaths=%2Fapi%2Fpath%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/path/route",
        pathname: "/api/path",
        filename: "route",
        bundlePath: "app/api/path/route"
    },
    resolvedPagePath: "D:\\code\\tickerBell-front\\src\\app\\api\\path\\route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/path/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [587,501,760], () => (__webpack_exec__(9276)));
module.exports = __webpack_exports__;

})();