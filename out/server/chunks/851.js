"use strict";
exports.id = 851;
exports.ids = [851];
exports.modules = {

/***/ 8851:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3258);
// import { TokenRefresh } from "api/auth";

// import { ROOT_API } from "constants/api";
// NOTE: api 별도 처리를 위한 임시 파일
const apiInstance = axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.create({
    baseURL: "http://3.37.206.141:8080/",
    timeout: 5000
});
apiInstance.interceptors.request.use(async (config)=>{
    // store에서 토큰 가져오기
    return config;
}, (error)=>{
    return Promise.reject(error);
});
apiInstance.interceptors.response.use((response)=>{
    const res = response.data;
    return res;
}, async function(err) {
    // 유효하지 않은 토큰
    if (err.response && err.response.status === 400) {}
    // 인증실패
    if (err.response && err.response.status === 401) {
        // 토큰 재발급 요청, apiInstance가 아닌 axios로 요청하기
        // store 갱신
        // 헤더에 담긴 토큰 값 변경
        err.config.headers = {
            "Content-Type": "application/json"
        };
        // 재요청
        const originalResponse = await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.request(err.config);
        return originalResponse.data;
    }
    return Promise.reject(err);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiInstance);


/***/ })

};
;