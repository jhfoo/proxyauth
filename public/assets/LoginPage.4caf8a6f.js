import{c as W,h as K,e as Pe}from"./render.e1716fe6.js";import{c as b,h as k,w as Q,o as ie,a as se,f as Oe,g as H,Z as Ae,r as z,$ as Te,a0 as Be,a1 as ze,s as te,d as G,p as Fe,a2 as $e,i as je,v as Y,X as De,a3 as Le,k as Ne,x as ke,a4 as J,B as Qe,_ as Ue,G as Ze,I as Ke,R as He,Q as le,L as Z,K as ee}from"./index.901b1b13.js";import{Q as ge,e as Ge,f as We,h as Xe,a as Je,i as Ye,j as et,d as oe}from"./QBtn.7e59477d.js";import{u as de,a as ce}from"./use-dark.657b9b9e.js";var xe=W({name:"QCardSection",props:{tag:{type:String,default:"div"},horizontal:Boolean},setup(e,{slots:t}){const l=b(()=>`q-card__section q-card__section--${e.horizontal===!0?"horiz row no-wrap":"vert"}`);return()=>k(e.tag,{class:l.value},K(t.default))}});function tt({validate:e,resetValidation:t,requiresQForm:l}){const r=Oe(Ae,!1);if(r!==!1){const{props:c,proxy:d}=H();Object.assign(d,{validate:e,resetValidation:t}),Q(()=>c.disable,s=>{s===!0?(typeof t=="function"&&t(),r.unbindComponent(d)):r.bindComponent(d)}),ie(()=>{c.disable!==!0&&r.bindComponent(d)}),se(()=>{c.disable!==!0&&r.unbindComponent(d)})}else l===!0&&console.error("Parent QForm not found on useFormChild()!")}const Ce=/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,we=/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,Se=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,ne=/^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,ae=/^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,fe={date:e=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),time:e=>/^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),fulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),timeOrFulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),hexColor:e=>Ce.test(e),hexaColor:e=>we.test(e),hexOrHexaColor:e=>Se.test(e),rgbColor:e=>ne.test(e),rgbaColor:e=>ae.test(e),rgbOrRgbaColor:e=>ne.test(e)||ae.test(e),hexOrRgbColor:e=>Ce.test(e)||ne.test(e),hexaOrRgbaColor:e=>we.test(e)||ae.test(e),anyColor:e=>Se.test(e)||ne.test(e)||ae.test(e)},lt=[!0,!1,"ondemand"],ot={modelValue:{},error:{type:Boolean,default:null},errorMessage:String,noErrorIcon:Boolean,rules:Array,reactiveRules:Boolean,lazyRules:{type:[Boolean,String],validator:e=>lt.includes(e)}};function nt(e,t){const{props:l,proxy:r}=H(),c=z(!1),d=z(null),s=z(null);tt({validate:x,resetValidation:h});let C=0,S;const q=b(()=>l.rules!==void 0&&l.rules!==null&&l.rules.length>0),M=b(()=>l.disable!==!0&&q.value===!0),w=b(()=>l.error===!0||c.value===!0),O=b(()=>typeof l.errorMessage=="string"&&l.errorMessage.length>0?l.errorMessage:d.value);Q(()=>l.modelValue,()=>{I()}),Q(()=>l.reactiveRules,F=>{F===!0?S===void 0&&(S=Q(()=>l.rules,()=>{I(!0)})):S!==void 0&&(S(),S=void 0)},{immediate:!0}),Q(e,F=>{F===!0?s.value===null&&(s.value=!1):s.value===!1&&(s.value=!0,M.value===!0&&l.lazyRules!=="ondemand"&&t.value===!1&&A())});function h(){C++,t.value=!1,s.value=null,c.value=!1,d.value=null,A.cancel()}function x(F=l.modelValue){if(M.value!==!0)return!0;const j=++C,_=t.value!==!0?()=>{s.value=!0}:()=>{},V=(o,a)=>{o===!0&&_(),c.value=o,d.value=a||null,t.value=!1},R=[];for(let o=0;o<l.rules.length;o++){const a=l.rules[o];let i;if(typeof a=="function"?i=a(F,fe):typeof a=="string"&&fe[a]!==void 0&&(i=fe[a](F)),i===!1||typeof i=="string")return V(!0,i),!1;i!==!0&&i!==void 0&&R.push(i)}return R.length===0?(V(!1),!0):(t.value=!0,Promise.all(R).then(o=>{if(o===void 0||Array.isArray(o)===!1||o.length===0)return j===C&&V(!1),!0;const a=o.find(i=>i===!1||typeof i=="string");return j===C&&V(a!==void 0,a),a===void 0},o=>(j===C&&(console.error(o),V(!0)),!1)))}function I(F){M.value===!0&&l.lazyRules!=="ondemand"&&(s.value===!0||l.lazyRules!==!0&&F!==!0)&&A()}const A=Te(x,0);return se(()=>{S!==void 0&&S(),A.cancel()}),Object.assign(r,{resetValidation:h,validate:x}),Be(r,"hasError",()=>w.value),{isDirtyModel:s,hasRules:q,hasError:w,errorMessage:O,validate:x,resetValidation:h}}const qe=/^on[A-Z]/;function at(e,t){const l={listeners:z({}),attributes:z({})};function r(){const c={},d={};for(const s in e)s!=="class"&&s!=="style"&&qe.test(s)===!1&&(c[s]=e[s]);for(const s in t.props)qe.test(s)===!0&&(d[s]=t.props[s]);l.attributes.value=c,l.listeners.value=d}return ze(r),r(),l}let ve,re=0;const T=new Array(256);for(let e=0;e<256;e++)T[e]=(e+256).toString(16).substring(1);const rt=(()=>{const e=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{const l=new Uint8Array(t);return e.getRandomValues(l),l}}return t=>{const l=[];for(let r=t;r>0;r--)l.push(Math.floor(Math.random()*256));return l}})(),Ve=4096;function ut(){(ve===void 0||re+16>Ve)&&(re=0,ve=rt(Ve));const e=Array.prototype.slice.call(ve,re,re+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,T[e[0]]+T[e[1]]+T[e[2]]+T[e[3]]+"-"+T[e[4]]+T[e[5]]+"-"+T[e[6]]+T[e[7]]+"-"+T[e[8]]+T[e[9]]+"-"+T[e[10]]+T[e[11]]+T[e[12]]+T[e[13]]+T[e[14]]+T[e[15]]}let he=[],it=[];function ye(e){it.length===0?e():he.push(e)}function st(e){he=he.filter(t=>t!==e)}function be(e){return e===void 0?`f_${ut()}`:e}function pe(e){return e!=null&&(""+e).length>0}const dt={...de,...ot,label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,itemAligned:Boolean,counter:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,for:String,maxlength:[Number,String]},ct=["update:modelValue","clear","focus","blur","popupShow","popupHide"];function ft(){const{props:e,attrs:t,proxy:l,vnode:r}=H();return{isDark:ce(e,l.$q),editable:b(()=>e.disable!==!0&&e.readonly!==!0),innerLoading:z(!1),focused:z(!1),hasPopupOpen:!1,splitAttrs:at(t,r),targetUid:z(be(e.for)),rootRef:z(null),targetRef:z(null),controlRef:z(null)}}function vt(e){const{props:t,emit:l,slots:r,attrs:c,proxy:d}=H(),{$q:s}=d;let C=null;e.hasValue===void 0&&(e.hasValue=b(()=>pe(t.modelValue))),e.emitValue===void 0&&(e.emitValue=n=>{l("update:modelValue",n)}),e.controlEvents===void 0&&(e.controlEvents={onFocusin:v,onFocusout:m}),Object.assign(e,{clearValue:f,onControlFocusin:v,onControlFocusout:m,focus:a}),e.computedCounter===void 0&&(e.computedCounter=b(()=>{if(t.counter!==!1){const n=typeof t.modelValue=="string"||typeof t.modelValue=="number"?(""+t.modelValue).length:Array.isArray(t.modelValue)===!0?t.modelValue.length:0,y=t.maxlength!==void 0?t.maxlength:t.maxValues;return n+(y!==void 0?" / "+y:"")}}));const{isDirtyModel:S,hasRules:q,hasError:M,errorMessage:w,resetValidation:O}=nt(e.focused,e.innerLoading),h=e.floatingLabel!==void 0?b(()=>t.stackLabel===!0||e.focused.value===!0||e.floatingLabel.value===!0):b(()=>t.stackLabel===!0||e.focused.value===!0||e.hasValue.value===!0),x=b(()=>t.bottomSlots===!0||t.hint!==void 0||q.value===!0||t.counter===!0||t.error!==null),I=b(()=>t.filled===!0?"filled":t.outlined===!0?"outlined":t.borderless===!0?"borderless":t.standout?"standout":"standard"),A=b(()=>`q-field row no-wrap items-start q-field--${I.value}`+(e.fieldClass!==void 0?` ${e.fieldClass.value}`:"")+(t.rounded===!0?" q-field--rounded":"")+(t.square===!0?" q-field--square":"")+(h.value===!0?" q-field--float":"")+(j.value===!0?" q-field--labeled":"")+(t.dense===!0?" q-field--dense":"")+(t.itemAligned===!0?" q-field--item-aligned q-item-type":"")+(e.isDark.value===!0?" q-field--dark":"")+(e.getControl===void 0?" q-field--auto-height":"")+(e.focused.value===!0?" q-field--focused":"")+(M.value===!0?" q-field--error":"")+(M.value===!0||e.focused.value===!0?" q-field--highlighted":"")+(t.hideBottomSpace!==!0&&x.value===!0?" q-field--with-bottom":"")+(t.disable===!0?" q-field--disabled":t.readonly===!0?" q-field--readonly":"")),F=b(()=>"q-field__control relative-position row no-wrap"+(t.bgColor!==void 0?` bg-${t.bgColor}`:"")+(M.value===!0?" text-negative":typeof t.standout=="string"&&t.standout.length>0&&e.focused.value===!0?` ${t.standout}`:t.color!==void 0?` text-${t.color}`:"")),j=b(()=>t.labelSlot===!0||t.label!==void 0),_=b(()=>"q-field__label no-pointer-events absolute ellipsis"+(t.labelColor!==void 0&&M.value!==!0?` text-${t.labelColor}`:"")),V=b(()=>({id:e.targetUid.value,editable:e.editable.value,focused:e.focused.value,floatingLabel:h.value,modelValue:t.modelValue,emitValue:e.emitValue})),R=b(()=>{const n={for:e.targetUid.value};return t.disable===!0?n["aria-disabled"]="true":t.readonly===!0&&(n["aria-readonly"]="true"),n});Q(()=>t.for,n=>{e.targetUid.value=be(n)});function o(){const n=document.activeElement;let y=e.targetRef!==void 0&&e.targetRef.value;y&&(n===null||n.id!==e.targetUid.value)&&(y.hasAttribute("tabindex")===!0||(y=y.querySelector("[tabindex]")),y&&y!==n&&y.focus({preventScroll:!0}))}function a(){ye(o)}function i(){st(o);const n=document.activeElement;n!==null&&e.rootRef.value.contains(n)&&n.blur()}function v(n){C!==null&&(clearTimeout(C),C=null),e.editable.value===!0&&e.focused.value===!1&&(e.focused.value=!0,l("focus",n))}function m(n,y){C!==null&&clearTimeout(C),C=setTimeout(()=>{C=null,!(document.hasFocus()===!0&&(e.hasPopupOpen===!0||e.controlRef===void 0||e.controlRef.value===null||e.controlRef.value.contains(document.activeElement)!==!1))&&(e.focused.value===!0&&(e.focused.value=!1,l("blur",n)),y!==void 0&&y())})}function f(n){te(n),s.platform.is.mobile!==!0?(e.targetRef!==void 0&&e.targetRef.value||e.rootRef.value).focus():e.rootRef.value.contains(document.activeElement)===!0&&document.activeElement.blur(),t.type==="file"&&(e.inputRef.value.value=null),l("update:modelValue",null),l("clear",t.modelValue),G(()=>{O(),s.platform.is.mobile!==!0&&(S.value=!1)})}function g(){const n=[];return r.prepend!==void 0&&n.push(k("div",{class:"q-field__prepend q-field__marginal row no-wrap items-center",key:"prepend",onClick:Y},r.prepend())),n.push(k("div",{class:"q-field__control-container col relative-position row no-wrap q-anchor--skip"},p())),M.value===!0&&t.noErrorIcon===!1&&n.push(D("error",[k(ge,{name:s.iconSet.field.error,color:"negative"})])),t.loading===!0||e.innerLoading.value===!0?n.push(D("inner-loading-append",r.loading!==void 0?r.loading():[k(Ge,{color:t.color})])):t.clearable===!0&&e.hasValue.value===!0&&e.editable.value===!0&&n.push(D("inner-clearable-append",[k(ge,{class:"q-field__focusable-action",tag:"button",name:t.clearIcon||s.iconSet.field.clear,tabindex:0,type:"button","aria-hidden":null,role:null,onClick:f})])),r.append!==void 0&&n.push(k("div",{class:"q-field__append q-field__marginal row no-wrap items-center",key:"append",onClick:Y},r.append())),e.getInnerAppend!==void 0&&n.push(D("inner-append",e.getInnerAppend())),e.getControlChild!==void 0&&n.push(e.getControlChild()),n}function p(){const n=[];return t.prefix!==void 0&&t.prefix!==null&&n.push(k("div",{class:"q-field__prefix no-pointer-events row items-center"},t.prefix)),e.getShadowControl!==void 0&&e.hasShadow.value===!0&&n.push(e.getShadowControl()),e.getControl!==void 0?n.push(e.getControl()):r.rawControl!==void 0?n.push(r.rawControl()):r.control!==void 0&&n.push(k("div",{ref:e.targetRef,class:"q-field__native row",tabindex:-1,...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0},r.control(V.value))),j.value===!0&&n.push(k("div",{class:_.value},K(r.label,t.label))),t.suffix!==void 0&&t.suffix!==null&&n.push(k("div",{class:"q-field__suffix no-pointer-events row items-center"},t.suffix)),n.concat(K(r.default))}function B(){let n,y;M.value===!0?w.value!==null?(n=[k("div",{role:"alert"},w.value)],y=`q--slot-error-${w.value}`):(n=K(r.error),y="q--slot-error"):(t.hideHint!==!0||e.focused.value===!0)&&(t.hint!==void 0?(n=[k("div",t.hint)],y=`q--slot-hint-${t.hint}`):(n=K(r.hint),y="q--slot-hint"));const N=t.counter===!0||r.counter!==void 0;if(t.hideBottomSpace===!0&&N===!1&&n===void 0)return;const U=k("div",{key:y,class:"q-field__messages col"},n);return k("div",{class:"q-field__bottom row items-start q-field__bottom--"+(t.hideBottomSpace!==!0?"animated":"stale"),onClick:Y},[t.hideBottomSpace===!0?U:k(De,{name:"q-transition--field-message"},()=>U),N===!0?k("div",{class:"q-field__counter"},r.counter!==void 0?r.counter():e.computedCounter.value):null])}function D(n,y){return y===null?null:k("div",{key:n,class:"q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"},y)}let L=!1;return Fe(()=>{L=!0}),$e(()=>{L===!0&&t.autofocus===!0&&d.focus()}),ie(()=>{je.value===!0&&t.for===void 0&&(e.targetUid.value=be()),t.autofocus===!0&&d.focus()}),se(()=>{C!==null&&clearTimeout(C)}),Object.assign(d,{focus:a,blur:i}),function(){const y=e.getControl===void 0&&r.control===void 0?{...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0,...R.value}:R.value;return k("label",{ref:e.rootRef,class:[A.value,c.class],style:c.style,...y},[r.before!==void 0?k("div",{class:"q-field__before q-field__marginal row no-wrap items-center",onClick:Y},r.before()):null,k("div",{class:"q-field__inner relative-position col self-stretch"},[k("div",{ref:e.controlRef,class:F.value,tabindex:-1,...e.controlEvents},g()),x.value===!0?B():null]),r.after!==void 0?k("div",{class:"q-field__after q-field__marginal row no-wrap items-center",onClick:Y},r.after()):null])}}const Me={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},ue={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},Ee=Object.keys(ue);Ee.forEach(e=>{ue[e].regex=new RegExp(ue[e].pattern)});const mt=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+Ee.join("")+"])|(.)","g"),_e=/[.*+?^${}()|[\]\\]/g,E=String.fromCharCode(1),gt={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function ht(e,t,l,r){let c,d,s,C;const S=z(null),q=z(w());function M(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}Q(()=>e.type+e.autogrow,h),Q(()=>e.mask,o=>{if(o!==void 0)x(q.value,!0);else{const a=V(q.value);h(),e.modelValue!==a&&t("update:modelValue",a)}}),Q(()=>e.fillMask+e.reverseFillMask,()=>{S.value===!0&&x(q.value,!0)}),Q(()=>e.unmaskedValue,()=>{S.value===!0&&x(q.value)});function w(){if(h(),S.value===!0){const o=j(V(e.modelValue));return e.fillMask!==!1?R(o):o}return e.modelValue}function O(o){if(o<c.length)return c.slice(-o);let a="",i=c;const v=i.indexOf(E);if(v>-1){for(let m=o-i.length;m>0;m--)a+=E;i=i.slice(0,v)+a+i.slice(v)}return i}function h(){if(S.value=e.mask!==void 0&&e.mask.length>0&&M(),S.value===!1){C=void 0,c="",d="";return}const o=Me[e.mask]===void 0?e.mask:Me[e.mask],a=typeof e.fillMask=="string"&&e.fillMask.length>0?e.fillMask.slice(0,1):"_",i=a.replace(_e,"\\$&"),v=[],m=[],f=[];let g=e.reverseFillMask===!0,p="",B="";o.replace(mt,(y,N,U,u,$)=>{if(u!==void 0){const P=ue[u];f.push(P),B=P.negate,g===!0&&(m.push("(?:"+B+"+)?("+P.pattern+"+)?(?:"+B+"+)?("+P.pattern+"+)?"),g=!1),m.push("(?:"+B+"+)?("+P.pattern+")?")}else if(U!==void 0)p="\\"+(U==="\\"?"":U),f.push(U),v.push("([^"+p+"]+)?"+p+"?");else{const P=N!==void 0?N:$;p=P==="\\"?"\\\\\\\\":P.replace(_e,"\\\\$&"),f.push(P),v.push("([^"+p+"]+)?"+p+"?")}});const D=new RegExp("^"+v.join("")+"("+(p===""?".":"[^"+p+"]")+"+)?"+(p===""?"":"["+p+"]*")+"$"),L=m.length-1,n=m.map((y,N)=>N===0&&e.reverseFillMask===!0?new RegExp("^"+i+"*"+y):N===L?new RegExp("^"+y+"("+(B===""?".":B)+"+)?"+(e.reverseFillMask===!0?"$":i+"*")):new RegExp("^"+y));s=f,C=y=>{const N=D.exec(e.reverseFillMask===!0?y:y.slice(0,f.length+1));N!==null&&(y=N.slice(1).join(""));const U=[],u=n.length;for(let $=0,P=y;$<u;$++){const X=n[$].exec(P);if(X===null)break;P=P.slice(X.shift().length),U.push(...X)}return U.length>0?U.join(""):y},c=f.map(y=>typeof y=="string"?y:E).join(""),d=c.split(E).join(a)}function x(o,a,i){const v=r.value,m=v.selectionEnd,f=v.value.length-m,g=V(o);a===!0&&h();const p=j(g),B=e.fillMask!==!1?R(p):p,D=q.value!==B;v.value!==B&&(v.value=B),D===!0&&(q.value=B),document.activeElement===v&&G(()=>{if(B===d){const n=e.reverseFillMask===!0?d.length:0;v.setSelectionRange(n,n,"forward");return}if(i==="insertFromPaste"&&e.reverseFillMask!==!0){const n=m-1;A.right(v,n,n);return}if(["deleteContentBackward","deleteContentForward"].indexOf(i)>-1){const n=e.reverseFillMask===!0?m===0?B.length>p.length?1:0:Math.max(0,B.length-(B===d?0:Math.min(p.length,f)+1))+1:m;v.setSelectionRange(n,n,"forward");return}if(e.reverseFillMask===!0)if(D===!0){const n=Math.max(0,B.length-(B===d?0:Math.min(p.length,f+1)));n===1&&m===1?v.setSelectionRange(n,n,"forward"):A.rightReverse(v,n,n)}else{const n=B.length-f;v.setSelectionRange(n,n,"backward")}else if(D===!0){const n=Math.max(0,c.indexOf(E),Math.min(p.length,m)-1);A.right(v,n,n)}else{const n=m-1;A.right(v,n,n)}});const L=e.unmaskedValue===!0?V(B):B;String(e.modelValue)!==L&&l(L,!0)}function I(o,a,i){const v=j(V(o.value));a=Math.max(0,c.indexOf(E),Math.min(v.length,a)),o.setSelectionRange(a,i,"forward")}const A={left(o,a,i,v){const m=c.slice(a-1).indexOf(E)===-1;let f=Math.max(0,a-1);for(;f>=0;f--)if(c[f]===E){a=f,m===!0&&a++;break}if(f<0&&c[a]!==void 0&&c[a]!==E)return A.right(o,0,0);a>=0&&o.setSelectionRange(a,v===!0?i:a,"backward")},right(o,a,i,v){const m=o.value.length;let f=Math.min(m,i+1);for(;f<=m;f++)if(c[f]===E){i=f;break}else c[f-1]===E&&(i=f);if(f>m&&c[i-1]!==void 0&&c[i-1]!==E)return A.left(o,m,m);o.setSelectionRange(v?a:i,i,"forward")},leftReverse(o,a,i,v){const m=O(o.value.length);let f=Math.max(0,a-1);for(;f>=0;f--)if(m[f-1]===E){a=f;break}else if(m[f]===E&&(a=f,f===0))break;if(f<0&&m[a]!==void 0&&m[a]!==E)return A.rightReverse(o,0,0);a>=0&&o.setSelectionRange(a,v===!0?i:a,"backward")},rightReverse(o,a,i,v){const m=o.value.length,f=O(m),g=f.slice(0,i+1).indexOf(E)===-1;let p=Math.min(m,i+1);for(;p<=m;p++)if(f[p-1]===E){i=p,i>0&&g===!0&&i--;break}if(p>m&&f[i-1]!==void 0&&f[i-1]!==E)return A.leftReverse(o,m,m);o.setSelectionRange(v===!0?a:i,i,"forward")}};function F(o){if(t("keydown",o),Le(o)===!0)return;const a=r.value,i=a.selectionStart,v=a.selectionEnd;if(o.keyCode===37||o.keyCode===39){const m=A[(o.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];o.preventDefault(),m(a,i,v,o.shiftKey)}else o.keyCode===8&&e.reverseFillMask!==!0&&i===v?A.left(a,i,v,!0):o.keyCode===46&&e.reverseFillMask===!0&&i===v&&A.rightReverse(a,i,v,!0)}function j(o){if(o==null||o==="")return"";if(e.reverseFillMask===!0)return _(o);const a=s;let i=0,v="";for(let m=0;m<a.length;m++){const f=o[i],g=a[m];if(typeof g=="string")v+=g,f===g&&i++;else if(f!==void 0&&g.regex.test(f))v+=g.transform!==void 0?g.transform(f):f,i++;else return v}return v}function _(o){const a=s,i=c.indexOf(E);let v=o.length-1,m="";for(let f=a.length-1;f>=0&&v>-1;f--){const g=a[f];let p=o[v];if(typeof g=="string")m=g+m,p===g&&v--;else if(p!==void 0&&g.regex.test(p))do m=(g.transform!==void 0?g.transform(p):p)+m,v--,p=o[v];while(i===f&&p!==void 0&&g.regex.test(p));else return m}return m}function V(o){return typeof o!="string"||C===void 0?typeof o=="number"?C(""+o):o:C(o)}function R(o){return d.length-o.length<=0?o:e.reverseFillMask===!0&&o.length>0?d.slice(0,-o.length)+o:o+d.slice(o.length)}return{innerValue:q,hasMask:S,moveCursorForPaste:I,updateMaskValue:x,onMaskedKeydown:F}}const Ie={name:String};function bt(e={}){return(t,l,r)=>{t[l](k("input",{class:"hidden"+(r||""),...e.value}))}}function pt(e){return b(()=>e.name||e.for)}function yt(e,t){function l(){const r=e.modelValue;try{const c="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(r)===r&&("length"in r?Array.from(r):[r]).forEach(d=>{c.items.add(d)}),{files:c.files}}catch{return{files:void 0}}}return t===!0?b(()=>{if(e.type==="file")return l()}):b(l)}const kt=/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,xt=/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,Ct=/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,wt=/[a-z0-9_ -]$/i;function St(e){return function(l){if(l.type==="compositionend"||l.type==="change"){if(l.target.qComposing!==!0)return;l.target.qComposing=!1,e(l)}else l.type==="compositionupdate"&&l.target.qComposing!==!0&&typeof l.data=="string"&&(Ne.is.firefox===!0?wt.test(l.data)===!1:kt.test(l.data)===!0||xt.test(l.data)===!0||Ct.test(l.data)===!0)===!0&&(l.target.qComposing=!0)}}var Re=W({name:"QInput",inheritAttrs:!1,props:{...dt,...gt,...Ie,modelValue:{required:!1},shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...ct,"paste","change","keydown","animationend"],setup(e,{emit:t,attrs:l}){const{proxy:r}=H(),{$q:c}=r,d={};let s=NaN,C,S,q=null,M;const w=z(null),O=pt(e),{innerValue:h,hasMask:x,moveCursorForPaste:I,updateMaskValue:A,onMaskedKeydown:F}=ht(e,t,D,w),j=yt(e,!0),_=b(()=>pe(h.value)),V=St(p),R=ft(),o=b(()=>e.type==="textarea"||e.autogrow===!0),a=b(()=>o.value===!0||["text","search","url","tel","password"].includes(e.type)),i=b(()=>{const u={...R.splitAttrs.listeners.value,onInput:p,onPaste:g,onChange:n,onBlur:y,onFocus:ke};return u.onCompositionstart=u.onCompositionupdate=u.onCompositionend=V,x.value===!0&&(u.onKeydown=F),e.autogrow===!0&&(u.onAnimationend=B),u}),v=b(()=>{const u={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:O.value,...R.splitAttrs.attributes.value,id:R.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return o.value===!1&&(u.type=e.type),e.autogrow===!0&&(u.rows=1),u});Q(()=>e.type,()=>{w.value&&(w.value.value=e.modelValue)}),Q(()=>e.modelValue,u=>{if(x.value===!0){if(S===!0&&(S=!1,String(u)===s))return;A(u)}else h.value!==u&&(h.value=u,e.type==="number"&&d.hasOwnProperty("value")===!0&&(C===!0?C=!1:delete d.value));e.autogrow===!0&&G(L)}),Q(()=>e.autogrow,u=>{u===!0?G(L):w.value!==null&&l.rows>0&&(w.value.style.height="auto")}),Q(()=>e.dense,()=>{e.autogrow===!0&&G(L)});function m(){ye(()=>{const u=document.activeElement;w.value!==null&&w.value!==u&&(u===null||u.id!==R.targetUid.value)&&w.value.focus({preventScroll:!0})})}function f(){w.value!==null&&w.value.select()}function g(u){if(x.value===!0&&e.reverseFillMask!==!0){const $=u.target;I($,$.selectionStart,$.selectionEnd)}t("paste",u)}function p(u){if(!u||!u.target)return;if(e.type==="file"){t("update:modelValue",u.target.files);return}const $=u.target.value;if(u.target.qComposing===!0){d.value=$;return}if(x.value===!0)A($,!1,u.inputType);else if(D($),a.value===!0&&u.target===document.activeElement){const{selectionStart:P,selectionEnd:X}=u.target;P!==void 0&&X!==void 0&&G(()=>{u.target===document.activeElement&&$.indexOf(u.target.value)===0&&u.target.setSelectionRange(P,X)})}e.autogrow===!0&&L()}function B(u){t("animationend",u),L()}function D(u,$){M=()=>{q=null,e.type!=="number"&&d.hasOwnProperty("value")===!0&&delete d.value,e.modelValue!==u&&s!==u&&(s=u,$===!0&&(S=!0),t("update:modelValue",u),G(()=>{s===u&&(s=NaN)})),M=void 0},e.type==="number"&&(C=!0,d.value=u),e.debounce!==void 0?(q!==null&&clearTimeout(q),d.value=u,q=setTimeout(M,e.debounce)):M()}function L(){requestAnimationFrame(()=>{const u=w.value;if(u!==null){const $=u.parentNode.style,{overflow:P}=u.style;c.platform.is.firefox!==!0&&(u.style.overflow="hidden"),$.marginBottom=u.scrollHeight-1+"px",u.style.height="1px",u.style.height=u.scrollHeight+"px",u.style.overflow=P,$.marginBottom=""}})}function n(u){V(u),q!==null&&(clearTimeout(q),q=null),M!==void 0&&M(),t("change",u.target.value)}function y(u){u!==void 0&&ke(u),q!==null&&(clearTimeout(q),q=null),M!==void 0&&M(),C=!1,S=!1,delete d.value,e.type!=="file"&&setTimeout(()=>{w.value!==null&&(w.value.value=h.value!==void 0?h.value:"")})}function N(){return d.hasOwnProperty("value")===!0?d.value:h.value!==void 0?h.value:""}se(()=>{y()}),ie(()=>{e.autogrow===!0&&L()}),Object.assign(R,{innerValue:h,fieldClass:b(()=>`q-${o.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:b(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length>0),inputRef:w,emitValue:D,hasValue:_,floatingLabel:b(()=>_.value===!0||pe(e.displayValue)),getControl:()=>k(o.value===!0?"textarea":"input",{ref:w,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...v.value,...i.value,...e.type!=="file"?{value:N()}:j.value}),getShadowControl:()=>k("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(o.value===!0?"":" text-no-wrap")},[k("span",{class:"invisible"},N()),k("span",e.shadowText)])});const U=vt(R);return Object.assign(r,{focus:m,select:f,getNativeElement:()=>w.value}),Be(r,"nativeEl",()=>w.value),U}});function qt(e,t){const l=z(null),r=b(()=>e.disable===!0?null:k("span",{ref:l,class:"no-outline",tabindex:-1}));function c(d){const s=t.value;d!==void 0&&d.type.indexOf("key")===0?s!==null&&document.activeElement!==s&&s.contains(document.activeElement)===!0&&s.focus():l.value!==null&&(d===void 0||s!==null&&s.contains(d.target)===!0)&&l.value.focus()}return{refocusTargetEl:r,refocusTarget:c}}var Vt={xs:30,sm:35,md:40,lg:50,xl:60};const Mt={...de,...Xe,...Ie,modelValue:{required:!0,default:null},val:{},trueValue:{default:!0},falseValue:{default:!1},indeterminateValue:{default:null},checkedIcon:String,uncheckedIcon:String,indeterminateIcon:String,toggleOrder:{type:String,validator:e=>e==="tf"||e==="ft"},toggleIndeterminate:Boolean,label:String,leftLabel:Boolean,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]},_t=["update:modelValue"];function Rt(e,t){const{props:l,slots:r,emit:c,proxy:d}=H(),{$q:s}=d,C=ce(l,s),S=z(null),{refocusTargetEl:q,refocusTarget:M}=qt(l,S),w=We(l,Vt),O=b(()=>l.val!==void 0&&Array.isArray(l.modelValue)),h=b(()=>{const g=J(l.val);return O.value===!0?l.modelValue.findIndex(p=>J(p)===g):-1}),x=b(()=>O.value===!0?h.value>-1:J(l.modelValue)===J(l.trueValue)),I=b(()=>O.value===!0?h.value===-1:J(l.modelValue)===J(l.falseValue)),A=b(()=>x.value===!1&&I.value===!1),F=b(()=>l.disable===!0?-1:l.tabindex||0),j=b(()=>`q-${e} cursor-pointer no-outline row inline no-wrap items-center`+(l.disable===!0?" disabled":"")+(C.value===!0?` q-${e}--dark`:"")+(l.dense===!0?` q-${e}--dense`:"")+(l.leftLabel===!0?" reverse":"")),_=b(()=>{const g=x.value===!0?"truthy":I.value===!0?"falsy":"indet",p=l.color!==void 0&&(l.keepColor===!0||(e==="toggle"?x.value===!0:I.value!==!0))?` text-${l.color}`:"";return`q-${e}__inner relative-position non-selectable q-${e}__inner--${g}${p}`}),V=b(()=>{const g={type:"checkbox"};return l.name!==void 0&&Object.assign(g,{".checked":x.value,"^checked":x.value===!0?"checked":void 0,name:l.name,value:O.value===!0?l.val:l.trueValue}),g}),R=bt(V),o=b(()=>{const g={tabindex:F.value,role:e==="toggle"?"switch":"checkbox","aria-label":l.label,"aria-checked":A.value===!0?"mixed":x.value===!0?"true":"false"};return l.disable===!0&&(g["aria-disabled"]="true"),g});function a(g){g!==void 0&&(te(g),M(g)),l.disable!==!0&&c("update:modelValue",i(),g)}function i(){if(O.value===!0){if(x.value===!0){const g=l.modelValue.slice();return g.splice(h.value,1),g}return l.modelValue.concat([l.val])}if(x.value===!0){if(l.toggleOrder!=="ft"||l.toggleIndeterminate===!1)return l.falseValue}else if(I.value===!0){if(l.toggleOrder==="ft"||l.toggleIndeterminate===!1)return l.trueValue}else return l.toggleOrder!=="ft"?l.trueValue:l.falseValue;return l.indeterminateValue}function v(g){(g.keyCode===13||g.keyCode===32)&&te(g)}function m(g){(g.keyCode===13||g.keyCode===32)&&a(g)}const f=t(x,A);return Object.assign(d,{toggle:a}),()=>{const g=f();l.disable!==!0&&R(g,"unshift",` q-${e}__native absolute q-ma-none q-pa-none`);const p=[k("div",{class:_.value,style:w.value,"aria-hidden":"true"},g)];q.value!==null&&p.push(q.value);const B=l.label!==void 0?Pe(r.default,[l.label]):K(r.default);return B!==void 0&&p.push(k("div",{class:`q-${e}__label q-anchor--skip`},B)),k("div",{ref:S,class:j.value,...o.value,onClick:a,onKeydown:v,onKeyup:m},p)}}var At=W({name:"QToggle",props:{...Mt,icon:String,iconColor:String},emits:_t,setup(e){function t(l,r){const c=b(()=>(l.value===!0?e.checkedIcon:r.value===!0?e.indeterminateIcon:e.uncheckedIcon)||e.icon),d=b(()=>l.value===!0?e.iconColor:null);return()=>[k("div",{class:"q-toggle__track"}),k("div",{class:"q-toggle__thumb absolute flex flex-center no-wrap"},c.value!==void 0?[k(ge,{name:c.value,color:d.value})]:void 0)]}return Rt("toggle",t)}}),Bt=W({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(e,{slots:t,emit:l}){const r=H(),c=z(null);let d=0;const s=[];function C(h){const x=typeof h=="boolean"?h:e.noErrorFocus!==!0,I=++d,A=(_,V)=>{l("validation"+(_===!0?"Success":"Error"),V)},F=_=>{const V=_.validate();return typeof V.then=="function"?V.then(R=>({valid:R,comp:_}),R=>({valid:!1,comp:_,err:R})):Promise.resolve({valid:V,comp:_})};return(e.greedy===!0?Promise.all(s.map(F)).then(_=>_.filter(V=>V.valid!==!0)):s.reduce((_,V)=>_.then(()=>F(V).then(R=>{if(R.valid===!1)return Promise.reject(R)})),Promise.resolve()).catch(_=>[_])).then(_=>{if(_===void 0||_.length===0)return I===d&&A(!0),!0;if(I===d){const{comp:V,err:R}=_[0];if(R!==void 0&&console.error(R),A(!1,V),x===!0){const o=_.find(({comp:a})=>typeof a.focus=="function"&&Je(a.$)===!1);o!==void 0&&o.comp.focus()}}return!1})}function S(){d++,s.forEach(h=>{typeof h.resetValidation=="function"&&h.resetValidation()})}function q(h){h!==void 0&&te(h);const x=d+1;C().then(I=>{x===d&&I===!0&&(e.onSubmit!==void 0?l("submit",h):h!==void 0&&h.target!==void 0&&typeof h.target.submit=="function"&&h.target.submit())})}function M(h){h!==void 0&&te(h),l("reset"),G(()=>{S(),e.autofocus===!0&&e.noResetFocus!==!0&&w()})}function w(){ye(()=>{if(c.value===null)return;const h=c.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||c.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||c.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(c.value.querySelectorAll("[tabindex]"),x=>x.tabIndex>-1);h!=null&&h.focus({preventScroll:!0})})}Qe(Ae,{bindComponent(h){s.push(h)},unbindComponent(h){const x=s.indexOf(h);x>-1&&s.splice(x,1)}});let O=!1;return Fe(()=>{O=!0}),$e(()=>{O===!0&&e.autofocus===!0&&w()}),ie(()=>{e.autofocus===!0&&w()}),Object.assign(r.proxy,{validate:C,resetValidation:S,submit:q,reset:M,focus:w,getValidationComponents:()=>s}),()=>k("form",{class:"q-form",ref:c,onSubmit:q,onReset:M},K(t.default))}});const Ft={true:"inset",item:"item-inset","item-thumbnail":"item-thumbnail-inset"},me={xs:2,sm:4,md:8,lg:16,xl:24};var $t=W({name:"QSeparator",props:{...de,spaced:[Boolean,String],inset:[Boolean,String],vertical:Boolean,color:String,size:String},setup(e){const t=H(),l=ce(e,t.proxy.$q),r=b(()=>e.vertical===!0?"vertical":"horizontal"),c=b(()=>` q-separator--${r.value}`),d=b(()=>e.inset!==!1?`${c.value}-${Ft[e.inset]}`:""),s=b(()=>`q-separator${c.value}${d.value}`+(e.color!==void 0?` bg-${e.color}`:"")+(l.value===!0?" q-separator--dark":"")),C=b(()=>{const S={};if(e.size!==void 0&&(S[e.vertical===!0?"width":"height"]=e.size),e.spaced!==!1){const q=e.spaced===!0?`${me.md}px`:e.spaced in me?`${me[e.spaced]}px`:e.spaced,M=e.vertical===!0?["Left","Right"]:["Top","Bottom"];S[`margin${M[0]}`]=S[`margin${M[1]}`]=q}return S});return()=>k("hr",{class:s.value,style:C.value,"aria-orientation":r.value})}}),Et=W({name:"QCardActions",props:{...Ye,vertical:Boolean},setup(e,{slots:t}){const l=et(e),r=b(()=>`q-card__actions ${l.value} q-card__actions--${e.vertical===!0?"vert column":"horiz row"}`);return()=>k("div",{class:r.value},K(t.default))}}),It=W({name:"QCard",props:{...de,tag:{type:String,default:"div"},square:Boolean,flat:Boolean,bordered:Boolean},setup(e,{slots:t}){const{proxy:{$q:l}}=H(),r=ce(e,l),c=b(()=>"q-card"+(r.value===!0?" q-card--dark q-dark":"")+(e.bordered===!0?" q-card--bordered":"")+(e.square===!0?" q-card--square no-border-radius":"")+(e.flat===!0?" q-card--flat no-shadow":""));return()=>k(e.tag,{class:c.value},K(t.default))}});const Pt=Ze({name:"LoginPage",data(){return{credentials:{username:"",password:null},isRememberMe:!1}}}),Ot={class:"row q-pt-md"},Tt=le("div",{class:"col-xs-2 col-sm-3"},"\xA0",-1),zt={class:"col-xs-8 col-sm-6"},jt=le("div",{class:"text-h6"},"SMARTAuth",-1),Dt={class:"q-mx-md"},Lt=le("div",{class:"col-xs-2 col-sm-3"},"\xA0",-1);function Nt(e,t,l,r,c,d){return Ke(),He("div",Ot,[Tt,le("div",zt,[Z(It,{class:"my-card bg-secondary text-white"},{default:ee(()=>[Z(xe,null,{default:ee(()=>[jt]),_:1}),Z(xe,null,{default:ee(()=>[Z(Bt,{onSubmit:e.onSubmit,onReset:e.onReset,class:"q-gutter-md"},{default:ee(()=>[Z(Re,{filled:"",modelValue:e.credentials.username,"onUpdate:modelValue":t[0]||(t[0]=s=>e.credentials.username=s),label:"Username",hint:"Not the one your mom gave.","lazy-rules:rules":"[ val => val && val.length > 0 || 'Please type something']"},null,8,["modelValue"]),Z(Re,{filled:"",type:"password",modelValue:e.credentials.password,"onUpdate:modelValue":t[1]||(t[1]=s=>e.credentials.password=s),label:"Password","lazy-rules":"",rules:[s=>s>0&&s<100||"Does't feel safe."]},null,8,["modelValue","rules"]),Z(At,{modelValue:e.isRememberMe,"onUpdate:modelValue":t[2]||(t[2]=s=>e.isRememberMe=s),label:"Remember me"},null,8,["modelValue"])]),_:1},8,["onSubmit","onReset"])]),_:1}),le("div",Dt,[Z(oe,{label:"Login with Facebook",color:"white",class:"full-width",outline:"",rounded:""}),Z(oe,{label:"Login with GitHub",color:"white",class:"full-width q-my-md",outline:"",rounded:""})]),Z($t,{dark:""}),Z(Et,null,{default:ee(()=>[Z(oe,{label:"Submit",type:"submit",color:"black",flat:""}),Z(oe,{label:"Reset",type:"reset",color:"black",flat:"",class:"q-ml-sm"})]),_:1})]),_:1})]),Lt])}var Ht=Ue(Pt,[["render",Nt]]);export{Ht as default};
