import{c as f,h as g}from"./render.e1716fe6.js";import{e as t,c as i,h,f as l,j as m,C as y,g as _,_ as x,G as C,I as v,J as $,K as u,L as P,N as Q,U as F}from"./index.901b1b13.js";var k=f({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(a,{slots:s}){const{proxy:{$q:o}}=_(),e=l(m,t);if(e===t)return console.error("QPage needs to be a deep child of QLayout"),t;if(l(y,t)===t)return console.error("QPage needs to be child of QPageContainer"),t;const c=i(()=>{const n=(e.header.space===!0?e.header.size:0)+(e.footer.space===!0?e.footer.size:0);if(typeof a.styleFn=="function"){const d=e.isContainer.value===!0?e.containerHeight.value:o.screen.height;return a.styleFn(n,d)}return{minHeight:e.isContainer.value===!0?e.containerHeight.value-n+"px":o.screen.height===0?n!==0?`calc(100vh - ${n}px)`:"100vh":o.screen.height-n+"px"}}),r=i(()=>`q-page${a.padding===!0?" q-layout-padding":""}`);return()=>h("main",{class:r.value,style:c.value},g(s.default))}});const I=C({name:"IndexPage"});function q(a,s,o,e,p,c){const r=F("router-link");return v(),$(k,{class:"flex flex-center"},{default:u(()=>[P(r,{to:"/login"},{default:u(()=>[Q("Login")]),_:1})]),_:1})}var K=x(I,[["render",q]]);export{K as default};
