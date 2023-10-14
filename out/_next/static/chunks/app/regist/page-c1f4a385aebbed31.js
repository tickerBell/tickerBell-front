(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[329],{7898:function(e,s,t){Promise.resolve().then(t.bind(t,1422))},1422:function(e,s,t){"use strict";t.r(s);var a=t(7437),r=t(922),n=t(4440),i=t.n(n),l=t(2265),c=t(1865),o=t(4033),d=t(913),u=t(1161);s.default=()=>{let[e,s]=(0,l.useState)(-1),[t,n]=(0,l.useState)(""),m=(0,o.useRouter)(),{register:h,handleSubmit:p,reset:x,watch:g,formState:{isSubmitting:f,isDirty:j,errors:b}}=(0,c.cI)({mode:"onChange"}),v=e=>{n(e.target.value)};return(0,a.jsx)("div",{className:"flex h-screen max-w-400 m-auto flex-col justify-center items-center",children:(0,a.jsxs)("div",{className:"h-320 flex items-center flex-col relative",children:[(0,a.jsxs)("nav",{className:"flex gap-8",children:[(0,a.jsx)(d.Y,{name:"userType",id:"예매자",label:"예매자",value:"isRegistrationTrue",checked:"isRegistrationTrue"===t,onChange:v}),(0,a.jsx)(d.Y,{name:"userType",id:"등록자",label:"등록자",value:"isRegistrationFalse",checked:"isRegistrationFalse"===t,onChange:v})]}),(0,a.jsxs)("nav",{className:"flex gap-10 mt-10",children:[(0,a.jsx)(r.Z,{onClick:()=>{m.push("https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=8fd7a1f394d9bbd09fdfdd3827146d73&redirect_uri=\nhttp://localhost:3000/oauth/kakao")},className:i()("bg-[#fae100] text-white",{}),children:"카카오 회원가입"}),(0,a.jsx)(r.Z,{theme:"border",onClick:()=>s(1),className:i()("border-primary",{"bg-primary text-white":1===e}),children:"일반 회원가입"})]}),(0,a.jsx)(u.Z,{tab:e,isRegistration:"isRegistrationTrue"===t})]})})}},922:function(e,s,t){"use strict";var a=t(7437),r=t(4440),n=t.n(r),i=t(2265),l=t(3986),c=t(6536),o=t.n(c);let d={small:"text-xs",medium:"text-base",large:"text-lg"},u={primary:"bg-primary text-white",secondary:"hover:bg-gray-400 text-black",border:"border border-transparent hover:saturate-10"},m=(0,i.forwardRef)((e,s)=>{let{children:t,size:r="medium",theme:i="primary",className:c,full:m,onClick:h,...p}=e;return(0,a.jsx)("button",{ref:s,className:n()((0,l.m)("".concat(u[i]," ").concat(d[r]," px-10 py-4 box-border cursor-pointer whitespace-pre rounded-4\n      "),c),{[o().is_full]:m}),onClick:h,...p,children:t})});m.displayName="Button",s.Z=m},913:function(e,s,t){"use strict";t.d(s,{Y:function(){return r}});var a=t(7437);t(2265);let r=e=>{let{label:s,...t}=e;return(0,a.jsx)("div",{children:(0,a.jsxs)("label",{htmlFor:t.id,className:"cursor-pointer flex items-center gap-4",children:[(0,a.jsx)("span",{children:s}),(0,a.jsx)("input",{type:"radio",...t,className:"cursor-pointer"})]})})}},1161:function(e,s,t){"use strict";t.d(s,{Z:function(){return d}});var a=t(7437),r=t(2265),n=t(922),i=t(1865),l=t(913),c=t(2181);async function o(e){let s=await c.Z.post("/api/join/sms-validation",{phone:e});return s}var d=e=>{let{tab:s,registType:t="regist",isRegistration:c}=e,[d,u]=(0,r.useState)({inputnumber:0,sendsms:0,vertifysms:0}),{register:m,handleSubmit:h,reset:p,watch:x,formState:{isSubmitting:g,isDirty:f,errors:j}}=(0,i.cI)({mode:"onChange"}),b=()=>{console.log("dd",d),o(d.inputnumber).then(e=>{console.log("res",e),u(s=>({...s,sendsms:e.data}))})},v=e=>{let s=e.target.value;u(e=>({...e,inputnumber:s}))};return console.log("isSubmitting",g),(0,a.jsx)("div",{children:(0,a.jsx)("form",{className:"mt-40 w-full",onSubmit:h(e=>{console.log("form : ",e)}),children:1===s&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"mb-10",children:[(0,a.jsxs)("div",{className:"flex gap-6",children:[(0,a.jsx)("label",{children:1===s?"아이디":"이름"}),(0,a.jsx)("input",{type:"text",id:"username",placeholder:1===s?"아이디를 입력해주세요":"이름을 입력해주세요",maxLength:5,...m("username",{required:"이름은 필수 입력입니다.",minLength:{value:2,message:"2자리 이상 입력해주세요."}})})]}),j.username&&(0,a.jsx)("small",{role:"alert",children:j.username.message})]}),(0,a.jsxs)("div",{className:"mb-10",children:[(0,a.jsxs)("div",{className:"flex gap-6",children:[(0,a.jsx)("label",{children:"비밀번호"}),(0,a.jsx)("input",{type:"password",id:"password",placeholder:"비밀번호를 입력해주세요",minLength:6,...m("password",{required:"비밀번호는 필수 입력입니다.",minLength:{value:6,message:"6자리 이상 입력해주세요."},pattern:{value:/^[A-Za-z0-9]*$/,message:"영어 또는 숫자만 입력해주세요"}})})]}),j.password&&(0,a.jsx)("small",{role:"alert",children:j.password.message})]}),(0,a.jsxs)("div",{className:"flex gap-6 mb-10",children:["성인 여부",(0,a.jsxs)("nav",{className:"flex gap-8",children:[(0,a.jsx)(l.Y,{name:"adultchk",id:"미성년",label:"미성년"}),(0,a.jsx)(l.Y,{name:"adultchk",id:"성년",label:"성년"})]})]}),(0,a.jsx)("div",{className:"mb-10",children:(0,a.jsxs)("div",{className:"flex items-center gap-6 whitespace-pre",children:["전화번호",(0,a.jsx)("input",{type:"text",name:"",id:"",placeholder:"- 을 제외한 11자리입력",onChange:v,maxLength:11}),(0,a.jsx)(n.Z,{size:"small",onClick:b,children:"문자인증"})]})}),0!==d.sendsms&&(0,a.jsx)("div",{className:"mb-10",children:(0,a.jsxs)("div",{className:"flex items-center gap-6 whitespace-pre",children:["인증번호",(0,a.jsx)("input",{type:"text",name:"",id:"",placeholder:"문자로 수신된 인증버호 입력",onChange:v,maxLength:4}),(0,a.jsx)(n.Z,{size:"small",onClick:b,children:"확인"})]})}),(0,a.jsx)(n.Z,{className:"absolute bottom-0",full:!0,type:"submit",disabled:!g,children:"login"===t?"로그인":"회원 가입"})]})})})}},2181:function(e,s,t){"use strict";var a=t(9222);let r=a.Z.create({baseURL:"http://3.37.206.141:8080/",timeout:5e3});r.interceptors.request.use(async e=>e,e=>Promise.reject(e)),r.interceptors.response.use(e=>{let s=e.data;return s},async function(e){if(e.response&&e.response.status,e.response&&401===e.response.status){e.config.headers={"Content-Type":"application/json"};let s=await a.Z.request(e.config);return s.data}return Promise.reject(e)}),s.Z=r},6536:function(e){e.exports={is_full:"button_is_full__aExWg"}}},function(e){e.O(0,[750,589,540,971,596,744],function(){return e(e.s=7898)}),_N_E=e.O()}]);