"use strict";
exports.id = 86;
exports.ids = [86];
exports.modules = {

/***/ 3416:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ Radio)
/* harmony export */ });
/* unused harmony export Text */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Radio = ({ label, ...attr })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
            htmlFor: attr.id,
            className: "cursor-pointer flex items-center gap-4",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    children: label
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    type: "radio",
                    ...attr,
                    className: "cursor-pointer"
                })
            ]
        })
    });
};
const Text = ({ label, ...attr })=>{
    return /*#__PURE__*/ _jsxs("div", {
        className: "flex",
        children: [
            label && /*#__PURE__*/ _jsx("label", {
                htmlFor: attr.id,
                className: "m-w-80",
                children: label
            }),
            /*#__PURE__*/ _jsx("input", {
                type: "text",
                ...attr,
                className: "h-26"
            })
        ]
    });
};


/***/ }),

/***/ 1086:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ form_RegistForm)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: ./src/components/button/Button.tsx
var Button = __webpack_require__(7620);
// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(6558);
// EXTERNAL MODULE: ./src/components/form/Input.tsx
var Input = __webpack_require__(3416);
// EXTERNAL MODULE: ./src/util/useInterceptor.ts
var useInterceptor = __webpack_require__(8851);
;// CONCATENATED MODULE: ./src/api/users.ts

// 회원가입시 문자 인증
async function vertifySMSApi(number) {
    const res = await useInterceptor/* default */.Z.post("/api/join/sms-validation", {
        phone: number
    });
    return res;
}
// 회원가입
async function userRegistApi({ username, password, phone, isRegistration, isKakaoJoin }) {
    const res = await apiInstance.post("/api/members", {
        username: username,
        password: password,
        phone: phone,
        isRegistration: isRegistration,
        isKakaoJoin: isKakaoJoin
    });
    return res;
}

;// CONCATENATED MODULE: ./src/components/form/RegistForm.tsx






const RegistForm = ({ tab, registType = "regist", isRegistration })=>{
    // const [sms, setSms] = useState(0);
    const [sms, setSms] = (0,react_.useState)({
        inputnumber: 0,
        sendsms: 0,
        vertifysms: 0
    });
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty, errors } } = (0,index_esm/* useForm */.cI)({
        mode: "onChange"
    });
    // 인증번호 발송
    const vertifySms = ()=>{
        console.log("dd", sms);
        vertifySMSApi(sms.inputnumber).then((res)=>{
            console.log("res", res);
            setSms((prevState)=>({
                    ...prevState,
                    sendsms: res.data
                }));
        });
    };
    // 인증번호 확인
    const okSms = ()=>{
        if (sms.sendsms === sms.vertifysms) {}
    };
    const onChange = (e)=>{
        const key = e.target.value;
        setSms((prevState)=>({
                ...prevState,
                inputnumber: key
            }));
    };
    const chkonChange = (e)=>{
        const key = e.target.value;
        setSms((prevState)=>({
                ...prevState,
                vertifysms: key
            }));
    };
    // console.log('회원가입 폼 : ', watch(), isRegistration)
    console.log("isSubmitting", isSubmitting);
    const onSubmit = (data)=>{
        // userRegistApi()
        console.log("form : ", data);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/ jsx_runtime_.jsx("form", {
            className: "mt-40 w-full",
            onSubmit: handleSubmit(onSubmit),
            children: tab === 1 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mb-10",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex gap-6",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        children: tab === 1 ? "아이디" : "이름"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "text",
                                        id: "username",
                                        placeholder: tab === 1 ? "아이디를 입력해주세요" : "이름을 입력해주세요",
                                        maxLength: 5,
                                        ...register("username", {
                                            required: "이름은 필수 입력입니다.",
                                            minLength: {
                                                value: 2,
                                                message: "2자리 이상 입력해주세요."
                                            }
                                        })
                                    })
                                ]
                            }),
                            errors.username && /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                role: "alert",
                                children: errors.username.message
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mb-10",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex gap-6",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        children: "비밀번호"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "password",
                                        id: "password",
                                        placeholder: "비밀번호를 입력해주세요",
                                        minLength: 6,
                                        ...register("password", {
                                            required: "비밀번호는 필수 입력입니다.",
                                            minLength: {
                                                value: 6,
                                                message: "6자리 이상 입력해주세요."
                                            },
                                            pattern: {
                                                value: /^[A-Za-z0-9]*$/,
                                                message: "영어 또는 숫자만 입력해주세요"
                                            }
                                        })
                                    })
                                ]
                            }),
                            errors.password && /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                role: "alert",
                                children: errors.password.message
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex gap-6 mb-10",
                        children: [
                            "성인 여부",
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
                                className: "flex gap-8",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(Input/* Radio */.Y, {
                                        name: "adultchk",
                                        id: "미성년",
                                        label: "미성년"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(Input/* Radio */.Y, {
                                        name: "adultchk",
                                        id: "성년",
                                        label: "성년"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "mb-10",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex items-center gap-6 whitespace-pre",
                            children: [
                                "전화번호",
                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                    type: "text",
                                    name: "",
                                    id: "",
                                    placeholder: "- 을 제외한 11자리입력",
                                    onChange: onChange,
                                    maxLength: 11
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                    size: "small",
                                    onClick: vertifySms,
                                    children: "문자인증"
                                })
                            ]
                        })
                    }),
                    sms.sendsms !== 0 && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "mb-10",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex items-center gap-6 whitespace-pre",
                            children: [
                                "인증번호",
                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                    type: "text",
                                    name: "",
                                    id: "",
                                    placeholder: "문자로 수신된 인증버호 입력",
                                    onChange: onChange,
                                    maxLength: 4
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                    size: "small",
                                    onClick: vertifySms,
                                    children: "확인"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                        className: "absolute bottom-0",
                        full: true,
                        type: "submit",
                        disabled: !isSubmitting,
                        children: registType === "login" ? "로그인" : "회원 가입"
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const form_RegistForm = (RegistForm);


/***/ })

};
;