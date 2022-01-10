import{t as u,d as P,c as m,s as h,i as f,a as s,S,M as v,F as w,b as T,e as A,r as C}from"./vendor.f333e9f8.js";const M=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function l(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=l(t);fetch(t.href,r)}};M();const E="modulepreload",x={},L="/",O=function(e,l){return!l||l.length===0?e():Promise.all(l.map(n=>{if(n=`${L}${n}`,n in x)return;x[n]=!0;const t=n.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${r}`))return;const o=document.createElement("link");if(o.rel=t?"stylesheet":E,t||(o.as="script",o.crossOrigin=""),o.href=n,document.head.appendChild(o),t)return new Promise((c,g)=>{o.addEventListener("load",c),o.addEventListener("error",g)})})).then(()=>e())},j="_App_ofax1_1",q="_logo_ofax1_5",R="_header_ofax1_11",F="_link_ofax1_22",I="_Navigation_ofax1_36",W="_Tab_ofax1_67";var $={App:j,logo:q,"logo-spin":"_logo-spin_ofax1_1",header:R,link:F,Navigation:I,Tab:W,"mod-category":"_mod-category_ofax1_94"};const B=u("<nav><ul><li><button>Plugins</button></li><li><button>Modlist</button></li><li><button>Skyrim</button></li><li><button>SkyrimPrefs</button></li></ul></nav>");function D(i){return console.log("Active",i.active),(()=>{const e=B.cloneNode(!0),l=e.firstChild,n=l.firstChild,t=n.firstChild,r=n.nextSibling,o=r.firstChild,c=r.nextSibling,g=c.firstChild,_=c.nextSibling,d=_.firstChild;return t.$$click=()=>i.navigateTo("Plugins"),o.$$click=()=>i.navigateTo("Modlist"),g.$$click=()=>i.navigateTo("Skyrim"),d.$$click=()=>i.navigateTo("SkyrimPrefs"),m(a=>{const p=$.Navigation,y=i.active==="Plugins",b=i.active==="Modlist",k=i.active==="Skyrim",N=i.active==="SkyrimPrefs";return p!==a._v$&&(e.className=a._v$=p),y!==a._v$2&&h(n,"selected",a._v$2=y),b!==a._v$3&&h(r,"selected",a._v$3=b),k!==a._v$4&&h(c,"selected",a._v$4=k),N!==a._v$5&&h(_,"selected",a._v$5=N),a},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),e})()}P(["click"]);const K=u("<div><h2>Plugins</h2></div>");function U(i){return(()=>{const e=K.cloneNode(!0);return m(()=>e.className=$.App),e})()}const V=u("<div><h2>Modlist</h2><ul></ul></div>"),Z=u('<a target="_blank" rel="noopener noreferrer"></a>'),z=u("<li><span></span> <span></span></li>"),G=u("<div></div>");function H(i){return(()=>{const e=V.cloneNode(!0),l=e.firstChild,n=l.nextSibling;return f(n,s(w,{get each(){return i.mods},children:(t,r)=>(()=>{const o=z.cloneNode(!0),c=o.firstChild,g=c.nextSibling,_=g.nextSibling;return h(o,"id",`mod-${r}`),f(c,r),f(_,()=>t.category),f(o,s(S,{get fallback(){return(()=>{const d=G.cloneNode(!0);return f(d,()=>t.name),d})()},get children(){return s(v,{get when(){return t.url},get children(){const d=Z.cloneNode(!0);return f(d,()=>t.name),m(()=>h(d,"href",t.url)),d}})}}),null),m(()=>_.className=$["mod-category"]),o})()})),m(()=>e.className=$.Tab),e})()}const J=u("<div><h2>Skyrim</h2></div>");function Q(i){return(()=>{const e=J.cloneNode(!0);return m(()=>e.className=$.App),e})()}const X=u("<div><h2>SkyrimPrefs</h2></div>");function Y(i){return(()=>{const e=X.cloneNode(!0);return m(()=>e.className=$.App),e})()}var ee="/assets/skyrim_se_mods.052b6cd1.js";const te=u("<div><h1>ModWatch</h1></div>"),ne=u("<p>wtf</p>"),re=async i=>{const e=O(()=>import(ee),[]),l=fetch(`https://api.modwat.ch/api/user/${i}/file/modlist`),[{default:n},t]=await Promise.all([e,l]);return(await t.json()).map((c,g)=>{const _=n.find(d=>c.includes(d.n));return{name:c,url:_?.u?`https://www.nexusmods.com/skyrimspecialedition/mods/${_.u}`:void 0,category:_?.c??"Unknown"}})};function ie(){const[i]=T("Meji-Zenith",re),[e,l]=A("Modlist");return(()=>{const n=te.cloneNode(!0);return n.firstChild,f(n,s(D,{get active(){return e()},navigateTo:l}),null),f(n,s(S,{get fallback(){return ne.cloneNode(!0)},get children(){return[s(v,{get when(){return e()==="Plugins"},get children(){return s(U,{})}}),s(v,{get when(){return e()==="Modlist"},get children(){return s(H,{get mods(){return i()}})}}),s(v,{get when(){return e()==="Skyrim"},get children(){return s(Q,{})}}),s(v,{get when(){return e()==="SkyrimPrefs"},get children(){return s(Y,{})}})]}}),null),m(()=>n.className=$.App),n})()}C(ie,document.getElementById("root"));
