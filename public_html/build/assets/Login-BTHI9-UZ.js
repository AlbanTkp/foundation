import{j as e,W as p,r as f,Y as g,a as h}from"./app-C3PXmaM_.js";import{G as j,P as b}from"./PrimaryButton--r5ZHuxq.js";import{T as l,I as n}from"./InputError-UNtSL6RG.js";import{I as i}from"./InputLabel-C-IZqC6a.js";import"./ApplicationLogo-BOhayj_1.js";function w({className:a="",...r}){return e.jsx("input",{...r,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+a})}function E({status:a,canResetPassword:r}){const{data:t,setData:o,post:c,processing:d,errors:m,reset:u}=p({email:"",password:"",remember:!1});f.useEffect(()=>()=>{u("password")},[]);const x=s=>{s.preventDefault(),c(route("login"))};return e.jsxs(j,{pageTitle:"Connexion",children:[e.jsx(g,{title:"Log in"}),a&&e.jsx("div",{className:"mb-4 text-sm font-medium text-green-600",children:a}),e.jsxs("form",{className:"flex flex-col mt-10 space-y-8 text-start",onSubmit:x,children:[e.jsxs("div",{children:[e.jsx(i,{htmlFor:"email",className:"",value:"Email"}),e.jsx(l,{id:"email",type:"email",name:"email",placeholder:"Email",value:t.email,className:"block w-full mt-1",autoComplete:"username",isFocused:!0,onChange:s=>o("email",s.target.value)}),e.jsx(n,{message:m.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"password",value:"Password"}),e.jsx(l,{id:"password",type:"password",name:"password",placeholder:"Password",value:t.password,className:"block w-full mt-1",autoComplete:"current-password",onChange:s=>o("password",s.target.value)}),e.jsx(n,{message:m.password,className:"mt-2"})]}),e.jsx("div",{className:"block mt-4",children:e.jsxs("label",{className:"flex items-center",children:[e.jsx(w,{name:"remember",checked:t.remember,onChange:s=>o("remember",s.target.checked)}),e.jsx("span",{className:"text-sm text-gray-600 ms-2",children:"Remember me"})]})}),e.jsxs("div",{className:"flex items-center justify-end mt-4",children:[r&&e.jsx(h,{href:route("password.request"),className:"text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e.jsx(b,{className:"ms-4",disabled:d,children:"Log in"})]})]})]})}export{E as default};
