(function(t){function e(e){for(var n,a,s=e[0],c=e[1],l=e[2],u=0,v=[];u<s.length;u++)a=s[u],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&v.push(r[a][0]),r[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);f&&f(e);while(v.length)v.shift()();return i.push.apply(i,l||[]),o()}function o(){for(var t,e=0;e<i.length;e++){for(var o=i[e],n=!0,a=1;a<o.length;a++){var c=o[a];0!==r[c]&&(n=!1)}n&&(i.splice(e--,1),t=s(s.s=o[0]))}return t}var n={},r={app:0},i=[];function a(t){return s.p+"js/"+({about:"about"}[t]||t)+"."+{about:"f1c131e8"}[t]+".js"}function s(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.e=function(t){var e=[],o=r[t];if(0!==o)if(o)e.push(o[2]);else{var n=new Promise((function(e,n){o=r[t]=[e,n]}));e.push(o[2]=n);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=a(t);var l=new Error;i=function(e){c.onerror=c.onload=null,clearTimeout(u);var o=r[t];if(0!==o){if(o){var n=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+n+": "+i+")",l.name="ChunkLoadError",l.type=n,l.request=i,o[1](l)}r[t]=void 0}};var u=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(e)},s.m=t,s.c=n,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(o,n,function(e){return t[e]}.bind(null,n));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/login/",s.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var f=l;i.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("2b0e"),r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("div",{attrs:{id:"nav"}},[o("router-link",{attrs:{to:"/"}},[t._v("Home")]),t._v(" | "),o("router-link",{attrs:{to:"/about"}},[t._v("About")])],1),o("router-view")],1)},i=[],a=o("2877"),s=o("6544"),c=o.n(s),l=o("7496"),u={},f=Object(a["a"])(u,r,i,!1,null,null,null),v=f.exports;c()(f,{VApp:l["a"]});var p=o("f309");o("bf40");n["a"].use(p["a"]);var m=new p["a"]({theme:{options:{customProperties:!0},themes:{light:{primary:"#ee44aa",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}}}),d=(o("d3b7"),o("8c4f")),h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticStyle:{"max-width":"960px"},attrs:{"fill-height":""}},[n("v-row",[n("v-col",{attrs:{cols:"12",md:"6","offset-md":"3"}},[n("v-card",[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"4"}},[n("v-img",{attrs:{src:o("a735"),contain:"",height:"200"}})],1),n("v-col",{attrs:{cols:"8"}},[n("v-toolbar",{attrs:{dense:"",flat:""}},[n("v-toolbar-title",[t._v(t._s(t.WelcomeMessage))]),n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.onRefreshWhoami()}}},[n("v-icon",[t._v("mdi-refresh")])],1)],1),t.isLoggedIn?[n("v-alert",{staticClass:"ml-3 mr-3 mb-0",attrs:{icon:"mdi-account",type:"warning",border:"left"},on:{click:function(e){return t.onLogout()}}},[t._v(" Not "+t._s(this.user.name)+"?"),n("br"),t._v("Click here to fix that. ")]),n("v-subheader",[t._v("PROFILE")]),n("v-list",{staticClass:"pt-0 pb-0",attrs:{"three-line":""}},[n("v-list-item",[n("v-list-item-icon",[n("v-icon",{attrs:{color:"primary"}},[t._v(t._s("mdi-"+t.user.provider))])],1),n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(t.user.profile.name.toUpperCase()))]),n("v-list-item-subtitle",[t._v("Last logged in: "),n("br"),t._v("From: ")])],1)],1)],1),n("v-subheader",[t._v("LAST ACCESSED")]),n("v-list-item-group",{attrs:{color:"primary"}},t._l(t.user.history,(function(e){return n("v-list-item",{key:e.domain,attrs:{href:"https://"+e.domain}},[n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(e.domain))])],1),n("v-list-item-icon",[n("v-icon",[t._v("mdi-chevron-right")])],1)],1)})),1)]:n("v-list",[n("v-subheader",[t._v("LOGIN")]),n("v-list-item-group",{attrs:{color:"primary"}},t._l(t.LoginOptions,(function(e){return n("v-list-item",{key:e.text,attrs:{href:e.link}},[n("v-list-item-icon",[n("v-icon",[t._v(t._s(e.icon))])],1),n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(e.text))])],1)],1)})),1)],1)],2)],1)],1)],1)],1)],1)},b=[],g=o("bc3a"),_=o.n(g),y="",w="",L={name:"HelloWorld",data:function(){return{LoginOptions:[{text:"Login with Facebook",icon:"mdi-facebook",link:w+"/login/facebook"},{text:"Login with GitHub",icon:"mdi-github",link:w+"/login/github"}],user:{}}},mounted:function(){this.onRefreshWhoami()},computed:{WelcomeMessage:function(){return this.isLoggedIn?"Welcome back!":"Hello Stranger"},isLoggedIn:function(){return this.user.profile}},methods:{onLogout:function(){location.href=w+"/logout"},onRefreshWhoami:function(){var t=this;_.a.get(y+"/whoami").then((function(e){console.log(e.data),console.log(e.data.profile),e.data.profile&&(t.user=e.data)})).catch((function(t){console.error(t)}))}}},k=L,V=o("0798"),O=o("8336"),x=o("b0af"),j=o("62ad"),C=o("a523"),I=o("132d"),S=o("adda"),F=o("8860"),P=o("da13"),T=o("5d23"),A=o("1baa"),E=o("34c3"),W=o("0fd9"),M=o("2fa4"),R=o("e0c7"),H=o("71d9"),G=o("2a7f"),$=Object(a["a"])(k,h,b,!1,null,null,null),B=$.exports;c()($,{VAlert:V["a"],VBtn:O["a"],VCard:x["a"],VCol:j["a"],VContainer:C["a"],VIcon:I["a"],VImg:S["a"],VList:F["a"],VListItem:P["a"],VListItemContent:T["a"],VListItemGroup:A["a"],VListItemIcon:E["a"],VListItemSubtitle:T["b"],VListItemTitle:T["c"],VRow:W["a"],VSpacer:M["a"],VSubheader:R["a"],VToolbar:H["a"],VToolbarTitle:G["a"]}),n["a"].use(d["a"]);var J=[{path:"/",name:"Login",component:B},{path:"/about",name:"About",component:function(){return o.e("about").then(o.bind(null,"f820"))}}],N=new d["a"]({routes:J}),q=N;n["a"].config.productionTip=!1,new n["a"]({vuetify:m,router:q,render:function(t){return t(v)}}).$mount("#app")},a735:function(t,e,o){t.exports=o.p+"img/kitten.3c2ef20a.jpg"}});
//# sourceMappingURL=app.e3a36b3d.js.map