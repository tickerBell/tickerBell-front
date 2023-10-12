"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[865],{1865:function(e,t,r){r.d(t,{cI:function(){return eh}});var a=r(2265),s=e=>"checkbox"===e.type,i=e=>e instanceof Date,l=e=>null==e;let u=e=>"object"==typeof e;var n=e=>!l(e)&&!Array.isArray(e)&&u(e)&&!i(e),o=e=>n(e)&&e.target?s(e.target)?e.target.checked:e.target.value:e,d=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,f=(e,t)=>e.has(d(t)),c=e=>{let t=e.constructor&&e.constructor.prototype;return n(t)&&t.hasOwnProperty("isPrototypeOf")},y="undefined"!=typeof window&&void 0!==window.HTMLElement&&"undefined"!=typeof document;function m(e){let t;let r=Array.isArray(e);if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else if(!(!(y&&(e instanceof Blob||e instanceof FileList))&&(r||n(e))))return e;else if(t=r?[]:{},r||c(e))for(let r in e)e.hasOwnProperty(r)&&(t[r]=m(e[r]));else t=e;return t}var h=e=>Array.isArray(e)?e.filter(Boolean):[],v=e=>void 0===e,p=(e,t,r)=>{if(!t||!n(e))return r;let a=h(t.split(/[,[\].]+?/)).reduce((e,t)=>l(e)?e:e[t],e);return v(a)||a===e?v(e[t])?r:e[t]:a},g=e=>"boolean"==typeof e;let b={BLUR:"blur",FOCUS_OUT:"focusout"},_={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},V={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"};a.createContext(null);var A=(e,t,r,a=!0)=>{let s={defaultValues:t._defaultValues};for(let i in e)Object.defineProperty(s,i,{get:()=>(t._proxyFormState[i]!==_.all&&(t._proxyFormState[i]=!a||_.all),r&&(r[i]=!0),e[i])});return s},w=e=>n(e)&&!Object.keys(e).length,x=(e,t,r,a)=>{r(e);let{name:s,...i}=e;return w(i)||Object.keys(i).length>=Object.keys(t).length||Object.keys(i).find(e=>t[e]===(!a||_.all))},F=e=>Array.isArray(e)?e:[e],S=e=>"string"==typeof e,k=(e,t,r,a,s)=>S(e)?(a&&t.watch.add(e),p(r,e,s)):Array.isArray(e)?e.map(e=>(a&&t.watch.add(e),p(r,e))):(a&&(t.watchAll=!0),r),D=e=>/^\w*$/.test(e),O=e=>h(e.replace(/["|']|\]/g,"").split(/\.|\[/));function C(e,t,r){let a=-1,s=D(t)?[t]:O(t),i=s.length,l=i-1;for(;++a<i;){let t=s[a],i=r;if(a!==l){let r=e[t];i=n(r)||Array.isArray(r)?r:isNaN(+s[a+1])?{}:[]}e[t]=i,e=e[t]}return e}var T=(e,t,r,a,s)=>t?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[a]:s||!0}}:{};let E=(e,t,r)=>{for(let a of r||Object.keys(e)){let r=p(e,a);if(r){let{_f:e,...a}=r;if(e&&t(e.name)){if(e.ref.focus){e.ref.focus();break}if(e.refs&&e.refs[0].focus){e.refs[0].focus();break}}else n(a)&&E(a,t)}}};var L=e=>({isOnSubmit:!e||e===_.onSubmit,isOnBlur:e===_.onBlur,isOnChange:e===_.onChange,isOnAll:e===_.all,isOnTouch:e===_.onTouched}),U=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some(t=>e.startsWith(t)&&/^\.\w+/.test(e.slice(t.length)))),B=(e,t,r)=>{let a=h(p(e,r));return C(a,"root",t[r]),C(e,r,a),e},j=e=>"file"===e.type,N=e=>"function"==typeof e,M=e=>{if(!y)return!1;let t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},q=e=>S(e),P=e=>"radio"===e.type,R=e=>e instanceof RegExp;let I={value:!1,isValid:!1},$={value:!0,isValid:!0};var H=e=>{if(Array.isArray(e)){if(e.length>1){let t=e.filter(e=>e&&e.checked&&!e.disabled).map(e=>e.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!v(e[0].attributes.value)?v(e[0].value)||""===e[0].value?$:{value:e[0].value,isValid:!0}:$:I}return I};let W={isValid:!1,value:null};var z=e=>Array.isArray(e)?e.reduce((e,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:e,W):W;function G(e,t,r="validate"){if(q(e)||Array.isArray(e)&&e.every(q)||g(e)&&!e)return{type:r,message:q(e)?e:"",ref:t}}var J=e=>n(e)&&!R(e)?e:{value:e,message:""},K=async(e,t,r,a,i)=>{let{ref:u,refs:o,required:d,maxLength:f,minLength:c,min:y,max:m,pattern:h,validate:b,name:_,valueAsNumber:A,mount:x,disabled:F}=e._f,k=p(t,_);if(!x||F)return{};let D=o?o[0]:u,O=e=>{a&&D.reportValidity&&(D.setCustomValidity(g(e)?"":e||""),D.reportValidity())},C={},E=P(u),L=s(u),U=(A||j(u))&&v(u.value)&&v(k)||M(u)&&""===u.value||""===k||Array.isArray(k)&&!k.length,B=T.bind(null,_,r,C),I=(e,t,r,a=V.maxLength,s=V.minLength)=>{let i=e?t:r;C[_]={type:e?a:s,message:i,ref:u,...B(e?a:s,i)}};if(i?!Array.isArray(k)||!k.length:d&&(!(E||L)&&(U||l(k))||g(k)&&!k||L&&!H(o).isValid||E&&!z(o).isValid)){let{value:e,message:t}=q(d)?{value:!!d,message:d}:J(d);if(e&&(C[_]={type:V.required,message:t,ref:D,...B(V.required,t)},!r))return O(t),C}if(!U&&(!l(y)||!l(m))){let e,t;let a=J(m),s=J(y);if(l(k)||isNaN(k)){let r=u.valueAsDate||new Date(k),i=e=>new Date(new Date().toDateString()+" "+e),l="time"==u.type,n="week"==u.type;S(a.value)&&k&&(e=l?i(k)>i(a.value):n?k>a.value:r>new Date(a.value)),S(s.value)&&k&&(t=l?i(k)<i(s.value):n?k<s.value:r<new Date(s.value))}else{let r=u.valueAsNumber||(k?+k:k);l(a.value)||(e=r>a.value),l(s.value)||(t=r<s.value)}if((e||t)&&(I(!!e,a.message,s.message,V.max,V.min),!r))return O(C[_].message),C}if((f||c)&&!U&&(S(k)||i&&Array.isArray(k))){let e=J(f),t=J(c),a=!l(e.value)&&k.length>+e.value,s=!l(t.value)&&k.length<+t.value;if((a||s)&&(I(a,e.message,t.message),!r))return O(C[_].message),C}if(h&&!U&&S(k)){let{value:e,message:t}=J(h);if(R(e)&&!k.match(e)&&(C[_]={type:V.pattern,message:t,ref:u,...B(V.pattern,t)},!r))return O(t),C}if(b){if(N(b)){let e=await b(k,t),a=G(e,D);if(a&&(C[_]={...a,...B(V.validate,a.message)},!r))return O(a.message),C}else if(n(b)){let e={};for(let a in b){if(!w(e)&&!r)break;let s=G(await b[a](k,t),D,a);s&&(e={...s,...B(a,s.message)},O(s.message),r&&(C[_]=e))}if(!w(e)&&(C[_]={ref:D,...e},!r))return C}}return O(!0),C};function Q(e,t){let r=Array.isArray(t)?t:D(t)?[t]:O(t),a=1===r.length?e:function(e,t){let r=t.slice(0,-1).length,a=0;for(;a<r;)e=v(e)?a++:e[t[a++]];return e}(e,r),s=r.length-1,i=r[s];return a&&delete a[i],0!==s&&(n(a)&&w(a)||Array.isArray(a)&&function(e){for(let t in e)if(e.hasOwnProperty(t)&&!v(e[t]))return!1;return!0}(a))&&Q(e,r.slice(0,-1)),e}function X(){let e=[];return{get observers(){return e},next:t=>{for(let r of e)r.next&&r.next(t)},subscribe:t=>(e.push(t),{unsubscribe:()=>{e=e.filter(e=>e!==t)}}),unsubscribe:()=>{e=[]}}}var Y=e=>l(e)||!u(e);function Z(e,t){if(Y(e)||Y(t))return e===t;if(i(e)&&i(t))return e.getTime()===t.getTime();let r=Object.keys(e),a=Object.keys(t);if(r.length!==a.length)return!1;for(let s of r){let r=e[s];if(!a.includes(s))return!1;if("ref"!==s){let e=t[s];if(i(r)&&i(e)||n(r)&&n(e)||Array.isArray(r)&&Array.isArray(e)?!Z(r,e):r!==e)return!1}}return!0}var ee=e=>"select-multiple"===e.type,et=e=>P(e)||s(e),er=e=>M(e)&&e.isConnected,ea=e=>{for(let t in e)if(N(e[t]))return!0;return!1};function es(e,t={}){let r=Array.isArray(e);if(n(e)||r)for(let r in e)Array.isArray(e[r])||n(e[r])&&!ea(e[r])?(t[r]=Array.isArray(e[r])?[]:{},es(e[r],t[r])):l(e[r])||(t[r]=!0);return t}var ei=(e,t)=>(function e(t,r,a){let s=Array.isArray(t);if(n(t)||s)for(let s in t)Array.isArray(t[s])||n(t[s])&&!ea(t[s])?v(r)||Y(a[s])?a[s]=Array.isArray(t[s])?es(t[s],[]):{...es(t[s])}:e(t[s],l(r)?{}:r[s],a[s]):a[s]=!Z(t[s],r[s]);return a})(e,t,es(t)),el=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:a})=>v(e)?e:t?""===e?NaN:e?+e:e:r&&S(e)?new Date(e):a?a(e):e;function eu(e){let t=e.ref;return(e.refs?e.refs.every(e=>e.disabled):t.disabled)?void 0:j(t)?t.files:P(t)?z(e.refs).value:ee(t)?[...t.selectedOptions].map(({value:e})=>e):s(t)?H(e.refs).value:el(v(t.value)?e.ref.value:t.value,e)}var en=(e,t,r,a)=>{let s={};for(let r of e){let e=p(t,r);e&&C(s,r,e._f)}return{criteriaMode:r,names:[...e],fields:s,shouldUseNativeValidation:a}},eo=e=>v(e)?e:R(e)?e.source:n(e)?R(e.value)?e.value.source:e.value:e,ed=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function ef(e,t,r){let a=p(e,r);if(a||D(r))return{error:a,name:r};let s=r.split(".");for(;s.length;){let a=s.join("."),i=p(t,a),l=p(e,a);if(i&&!Array.isArray(i)&&r!==a)break;if(l&&l.type)return{name:a,error:l};s.pop()}return{name:r}}var ec=(e,t,r,a,s)=>!s.isOnAll&&(!r&&s.isOnTouch?!(t||e):(r?a.isOnBlur:s.isOnBlur)?!e:(r?!a.isOnChange:!s.isOnChange)||e),ey=(e,t)=>!h(p(e,t)).length&&Q(e,t);let em={mode:_.onSubmit,reValidateMode:_.onChange,shouldFocusError:!0};function eh(e={}){let t=a.useRef(),r=a.useRef(),[u,d]=a.useState({isDirty:!1,isValidating:!1,isLoading:N(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:{},defaultValues:N(e.defaultValues)?void 0:e.defaultValues});t.current||(t.current={...function(e={},t){let r,a={...em,...e},u={submitCount:0,isDirty:!1,isLoading:N(a.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:{}},d={},c=(n(a.defaultValues)||n(a.values))&&m(a.defaultValues||a.values)||{},V=a.shouldUnregister?{}:m(c),A={action:!1,mount:!1,watch:!1},x={mount:new Set,unMount:new Set,array:new Set,watch:new Set},D=0,O={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},T={values:X(),array:X(),state:X()},q=e.resetOptions&&e.resetOptions.keepDirtyValues,P=L(a.mode),R=L(a.reValidateMode),I=a.criteriaMode===_.all,$=e=>t=>{clearTimeout(D),D=setTimeout(e,t)},H=async e=>{if(O.isValid||e){let e=a.resolver?w((await es()).errors):await ev(d,!0);e!==u.isValid&&T.state.next({isValid:e})}},W=e=>O.isValidating&&T.state.next({isValidating:e}),z=(e,t)=>{C(u.errors,e,t),T.state.next({errors:u.errors})},G=(e,t,r,a)=>{let s=p(d,e);if(s){let i=p(V,e,v(r)?p(c,e):r);v(i)||a&&a.defaultChecked||t?C(V,e,t?i:eu(s._f)):eb(e,i),A.mount&&H()}},J=(e,t,r,a,s)=>{let i=!1,l=!1,n={name:e};if(!r||a){O.isDirty&&(l=u.isDirty,u.isDirty=n.isDirty=ep(),i=l!==n.isDirty);let r=Z(p(c,e),t);l=p(u.dirtyFields,e),r?Q(u.dirtyFields,e):C(u.dirtyFields,e,!0),n.dirtyFields=u.dirtyFields,i=i||O.dirtyFields&&!r!==l}if(r){let t=p(u.touchedFields,e);t||(C(u.touchedFields,e,r),n.touchedFields=u.touchedFields,i=i||O.touchedFields&&t!==r)}return i&&s&&T.state.next(n),i?n:{}},ea=(t,a,s,i)=>{let l=p(u.errors,t),n=O.isValid&&g(a)&&u.isValid!==a;if(e.delayError&&s?(r=$(()=>z(t,s)))(e.delayError):(clearTimeout(D),r=null,s?C(u.errors,t,s):Q(u.errors,t)),(s?!Z(l,s):l)||!w(i)||n){let e={...i,...n&&g(a)?{isValid:a}:{},errors:u.errors,name:t};u={...u,...e},T.state.next(e)}W(!1)},es=async e=>a.resolver(V,a.context,en(e||x.mount,d,a.criteriaMode,a.shouldUseNativeValidation)),eh=async e=>{let{errors:t}=await es(e);if(e)for(let r of e){let e=p(t,r);e?C(u.errors,r,e):Q(u.errors,r)}else u.errors=t;return t},ev=async(e,t,r={valid:!0})=>{for(let s in e){let i=e[s];if(i){let{_f:e,...s}=i;if(e){let s=x.array.has(e.name),l=await K(i,V,I,a.shouldUseNativeValidation&&!t,s);if(l[e.name]&&(r.valid=!1,t))break;t||(p(l,e.name)?s?B(u.errors,l,e.name):C(u.errors,e.name,l[e.name]):Q(u.errors,e.name))}s&&await ev(s,t,r)}}return r.valid},ep=(e,t)=>(e&&t&&C(V,e,t),!Z(ex(),c)),eg=(e,t,r)=>k(e,x,{...A.mount?V:v(t)?c:S(e)?{[e]:t}:t},r,t),eb=(e,t,r={})=>{let a=p(d,e),i=t;if(a){let r=a._f;r&&(r.disabled||C(V,e,el(t,r)),i=M(r.ref)&&l(t)?"":t,ee(r.ref)?[...r.ref.options].forEach(e=>e.selected=i.includes(e.value)):r.refs?s(r.ref)?r.refs.length>1?r.refs.forEach(e=>(!e.defaultChecked||!e.disabled)&&(e.checked=Array.isArray(i)?!!i.find(t=>t===e.value):i===e.value)):r.refs[0]&&(r.refs[0].checked=!!i):r.refs.forEach(e=>e.checked=e.value===i):j(r.ref)?r.ref.value="":(r.ref.value=i,r.ref.type||T.values.next({name:e,values:{...V}})))}(r.shouldDirty||r.shouldTouch)&&J(e,i,r.shouldTouch,r.shouldDirty,!0),r.shouldValidate&&ew(e)},e_=(e,t,r)=>{for(let a in t){let s=t[a],l=`${e}.${a}`,u=p(d,l);!x.array.has(e)&&Y(s)&&(!u||u._f)||i(s)?eb(l,s,r):e_(l,s,r)}},eV=(e,r,a={})=>{let s=p(d,e),i=x.array.has(e),n=m(r);C(V,e,n),i?(T.array.next({name:e,values:{...V}}),(O.isDirty||O.dirtyFields)&&a.shouldDirty&&T.state.next({name:e,dirtyFields:ei(c,V),isDirty:ep(e,n)})):!s||s._f||l(n)?eb(e,n,a):e_(e,n,a),U(e,x)&&T.state.next({...u}),T.values.next({name:e,values:{...V}}),A.mount||t()},eA=async e=>{let t=e.target,s=t.name,i=!0,l=p(d,s);if(l){let n,f;let c=t.type?eu(l._f):o(e),y=e.type===b.BLUR||e.type===b.FOCUS_OUT,m=!ed(l._f)&&!a.resolver&&!p(u.errors,s)&&!l._f.deps||ec(y,p(u.touchedFields,s),u.isSubmitted,R,P),h=U(s,x,y);C(V,s,c),y?(l._f.onBlur&&l._f.onBlur(e),r&&r(0)):l._f.onChange&&l._f.onChange(e);let v=J(s,c,y,!1),g=!w(v)||h;if(y||T.values.next({name:s,type:e.type,values:{...V}}),m)return O.isValid&&H(),g&&T.state.next({name:s,...h?{}:v});if(!y&&h&&T.state.next({...u}),W(!0),a.resolver){let{errors:e}=await es([s]),t=ef(u.errors,d,s),r=ef(e,d,t.name||s);n=r.error,s=r.name,f=w(e)}else n=(await K(l,V,I,a.shouldUseNativeValidation))[s],(i=Number.isNaN(c)||c===p(V,s,c))&&(n?f=!1:O.isValid&&(f=await ev(d,!0)));i&&(l._f.deps&&ew(l._f.deps),ea(s,f,n,v))}},ew=async(e,t={})=>{let r,s;let i=F(e);if(W(!0),a.resolver){let t=await eh(v(e)?e:i);r=w(t),s=e?!i.some(e=>p(t,e)):r}else e?((s=(await Promise.all(i.map(async e=>{let t=p(d,e);return await ev(t&&t._f?{[e]:t}:t)}))).every(Boolean))||u.isValid)&&H():s=r=await ev(d);return T.state.next({...!S(e)||O.isValid&&r!==u.isValid?{}:{name:e},...a.resolver||!e?{isValid:r}:{},errors:u.errors,isValidating:!1}),t.shouldFocus&&!s&&E(d,e=>e&&p(u.errors,e),e?i:x.mount),s},ex=e=>{let t={...c,...A.mount?V:{}};return v(e)?t:S(e)?p(t,e):e.map(e=>p(t,e))},eF=(e,t)=>({invalid:!!p((t||u).errors,e),isDirty:!!p((t||u).dirtyFields,e),isTouched:!!p((t||u).touchedFields,e),error:p((t||u).errors,e)}),eS=(e,t,r)=>{let a=(p(d,e,{_f:{}})._f||{}).ref;C(u.errors,e,{...t,ref:a}),T.state.next({name:e,errors:u.errors,isValid:!1}),r&&r.shouldFocus&&a&&a.focus&&a.focus()},ek=(e,t={})=>{for(let r of e?F(e):x.mount)x.mount.delete(r),x.array.delete(r),t.keepValue||(Q(d,r),Q(V,r)),t.keepError||Q(u.errors,r),t.keepDirty||Q(u.dirtyFields,r),t.keepTouched||Q(u.touchedFields,r),a.shouldUnregister||t.keepDefaultValue||Q(c,r);T.values.next({values:{...V}}),T.state.next({...u,...t.keepDirty?{isDirty:ep()}:{}}),t.keepIsValid||H()},eD=({disabled:e,name:t,field:r,fields:a})=>{if(g(e)){let s=e?void 0:p(V,t,eu(r?r._f:p(a,t)._f));C(V,t,s),J(t,s,!1,!1,!0)}},eO=(e,t={})=>{let r=p(d,e),s=g(t.disabled);return C(d,e,{...r||{},_f:{...r&&r._f?r._f:{ref:{name:e}},name:e,mount:!0,...t}}),x.mount.add(e),r?eD({field:r,disabled:t.disabled,name:e}):G(e,!0,t.value),{...s?{disabled:t.disabled}:{},...a.progressive?{required:!!t.required,min:eo(t.min),max:eo(t.max),minLength:eo(t.minLength),maxLength:eo(t.maxLength),pattern:eo(t.pattern)}:{},name:e,onChange:eA,onBlur:eA,ref:s=>{if(s){eO(e,t),r=p(d,e);let a=v(s.value)&&s.querySelectorAll&&s.querySelectorAll("input,select,textarea")[0]||s,i=et(a),l=r._f.refs||[];(i?l.find(e=>e===a):a===r._f.ref)||(C(d,e,{_f:{...r._f,...i?{refs:[...l.filter(er),a,...Array.isArray(p(c,e))?[{}]:[]],ref:{type:a.type,name:e}}:{ref:a}}}),G(e,!1,void 0,a))}else(r=p(d,e,{}))._f&&(r._f.mount=!1),(a.shouldUnregister||t.shouldUnregister)&&!(f(x.array,e)&&A.action)&&x.unMount.add(e)}}},eC=()=>a.shouldFocusError&&E(d,e=>e&&p(u.errors,e),x.mount),eT=(e,t)=>async r=>{r&&(r.preventDefault&&r.preventDefault(),r.persist&&r.persist());let s=m(V);if(T.state.next({isSubmitting:!0}),a.resolver){let{errors:e,values:t}=await es();u.errors=e,s=t}else await ev(d);Q(u.errors,"root"),w(u.errors)?(T.state.next({errors:{}}),await e(s,r)):(t&&await t({...u.errors},r),eC(),setTimeout(eC)),T.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:w(u.errors),submitCount:u.submitCount+1,errors:u.errors})},eE=(r,a={})=>{let s=r?m(r):c,i=m(s),l=r&&!w(r)?i:c;if(a.keepDefaultValues||(c=s),!a.keepValues){if(a.keepDirtyValues||q)for(let e of x.mount)p(u.dirtyFields,e)?C(l,e,p(V,e)):eV(e,p(l,e));else{if(y&&v(r))for(let e of x.mount){let t=p(d,e);if(t&&t._f){let e=Array.isArray(t._f.refs)?t._f.refs[0]:t._f.ref;if(M(e)){let t=e.closest("form");if(t){t.reset();break}}}}d={}}V=e.shouldUnregister?a.keepDefaultValues?m(c):{}:m(l),T.array.next({values:{...l}}),T.values.next({values:{...l}})}x={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},A.mount||t(),A.mount=!O.isValid||!!a.keepIsValid,A.watch=!!e.shouldUnregister,T.state.next({submitCount:a.keepSubmitCount?u.submitCount:0,isDirty:a.keepDirty?u.isDirty:!!(a.keepDefaultValues&&!Z(r,c)),isSubmitted:!!a.keepIsSubmitted&&u.isSubmitted,dirtyFields:a.keepDirtyValues?u.dirtyFields:a.keepDefaultValues&&r?ei(c,r):{},touchedFields:a.keepTouched?u.touchedFields:{},errors:a.keepErrors?u.errors:{},isSubmitting:!1,isSubmitSuccessful:!1})},eL=(e,t)=>eE(N(e)?e(V):e,t);return{control:{register:eO,unregister:ek,getFieldState:eF,handleSubmit:eT,setError:eS,_executeSchema:es,_getWatch:eg,_getDirty:ep,_updateValid:H,_removeUnmounted:()=>{for(let e of x.unMount){let t=p(d,e);t&&(t._f.refs?t._f.refs.every(e=>!er(e)):!er(t._f.ref))&&ek(e)}x.unMount=new Set},_updateFieldArray:(e,t=[],r,a,s=!0,i=!0)=>{if(a&&r){if(A.action=!0,i&&Array.isArray(p(d,e))){let t=r(p(d,e),a.argA,a.argB);s&&C(d,e,t)}if(i&&Array.isArray(p(u.errors,e))){let t=r(p(u.errors,e),a.argA,a.argB);s&&C(u.errors,e,t),ey(u.errors,e)}if(O.touchedFields&&i&&Array.isArray(p(u.touchedFields,e))){let t=r(p(u.touchedFields,e),a.argA,a.argB);s&&C(u.touchedFields,e,t)}O.dirtyFields&&(u.dirtyFields=ei(c,V)),T.state.next({name:e,isDirty:ep(e,t),dirtyFields:u.dirtyFields,errors:u.errors,isValid:u.isValid})}else C(V,e,t)},_updateDisabledField:eD,_getFieldArray:t=>h(p(A.mount?V:c,t,e.shouldUnregister?p(c,t,[]):[])),_reset:eE,_resetDefaultValues:()=>N(a.defaultValues)&&a.defaultValues().then(e=>{eL(e,a.resetOptions),T.state.next({isLoading:!1})}),_updateFormState:e=>{u={...u,...e}},_subjects:T,_proxyFormState:O,get _fields(){return d},get _formValues(){return V},get _state(){return A},set _state(value){A=value},get _defaultValues(){return c},get _names(){return x},set _names(value){x=value},get _formState(){return u},set _formState(value){u=value},get _options(){return a},set _options(value){a={...a,...value}}},trigger:ew,register:eO,handleSubmit:eT,watch:(e,t)=>N(e)?T.values.subscribe({next:r=>e(eg(void 0,t),r)}):eg(e,t,!0),setValue:eV,getValues:ex,reset:eL,resetField:(e,t={})=>{p(d,e)&&(v(t.defaultValue)?eV(e,p(c,e)):(eV(e,t.defaultValue),C(c,e,t.defaultValue)),t.keepTouched||Q(u.touchedFields,e),t.keepDirty||(Q(u.dirtyFields,e),u.isDirty=t.defaultValue?ep(e,p(c,e)):ep()),!t.keepError&&(Q(u.errors,e),O.isValid&&H()),T.state.next({...u}))},clearErrors:e=>{e&&F(e).forEach(e=>Q(u.errors,e)),T.state.next({errors:e?u.errors:{}})},unregister:ek,setError:eS,setFocus:(e,t={})=>{let r=p(d,e),a=r&&r._f;if(a){let e=a.refs?a.refs[0]:a.ref;e.focus&&(e.focus(),t.shouldSelect&&e.select())}},getFieldState:eF}}(e,()=>d(e=>({...e}))),formState:u});let c=t.current.control;return c._options=e,!function(e){let t=a.useRef(e);t.current=e,a.useEffect(()=>{let r=!e.disabled&&t.current.subject&&t.current.subject.subscribe({next:t.current.next});return()=>{r&&r.unsubscribe()}},[e.disabled])}({subject:c._subjects.state,next:e=>{x(e,c._proxyFormState,c._updateFormState,!0)&&d({...c._formState})}}),a.useEffect(()=>{e.values&&!Z(e.values,r.current)?(c._reset(e.values,c._options.resetOptions),r.current=e.values):c._resetDefaultValues()},[e.values,c]),a.useEffect(()=>{c._state.mount||(c._updateValid(),c._state.mount=!0),c._state.watch&&(c._state.watch=!1,c._subjects.state.next({...c._formState})),c._removeUnmounted()}),t.current.formState=A(u,c),t.current}}}]);