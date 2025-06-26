import{j as t}from"./index-CH4I69IT.js";const o={title:"AI Appointment Assistant",summary:"Full-stack AI assistant deployed via WhatsApp.",techStack:["LangChain","FastAPI","Docker"],media:[{type:"image",src:"/src/assets/Demo_SS.png",alt:"Demo screenshot"}],repo:"https://github.com/shyguyrymakesai/whatsapp-ai-assistant"};function s(e){const n={code:"code",p:"p",pre:"pre",...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(n.p,{children:"A powerful assistant that manages appointments and client communication."}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-python",children:`from fastapi import FastAPI\r
app = FastAPI()
`})})]})}function c(e={}){const{wrapper:n}=e.components||{};return n?t.jsx(n,{...e,children:t.jsx(s,{...e})}):s(e)}export{c as default,o as meta};
