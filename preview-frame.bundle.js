(()=>{"use strict";var e={3894:(e,t,n)=>{n.d(t,{A:()=>c});var r=n(1354),o=n.n(r),a=n(6314),i=n.n(a)()(o());i.push([e.id,"html, body {\n  height: 100%;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n\n  /* This centers our sketch horizontally. */\n  justify-content: center;\n\n  /* This centers our sketch vertically. */\n  align-items: center;\n}\n","",{version:3,sources:["webpack://./css/preview-frame.css"],names:[],mappings:"AAAA;EACE,YAAY;AACd;;AAEA;EACE,SAAS;EACT,aAAa;;EAEb,0CAA0C;EAC1C,uBAAuB;;EAEvB,wCAAwC;EACxC,mBAAmB;AACrB",sourcesContent:["html, body {\n  height: 100%;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n\n  /* This centers our sketch horizontally. */\n  justify-content: center;\n\n  /* This centers our sketch vertically. */\n  align-items: center;\n}\n"],sourceRoot:""}]);const c=i},6314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var u=0;u<e.length;u++){var l=[].concat(e[u]);r&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),t.push(l))}},t}},1354:e=>{e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(o," */");return[t].concat([a]).join("\n")}return[t].join("\n")}},6865:(e,t,n)=>{n.r(t),n.d(t,{default:()=>y});var r=n(5072),o=n.n(r),a=n(7825),i=n.n(a),c=n(7659),s=n.n(c),u=n(5056),l=n.n(u),d=n(540),p=n.n(d),f=n(1113),m=n.n(f),v=n(3894),h={};h.styleTagTransform=m(),h.setAttributes=l(),h.insert=s().bind(null,"head"),h.domAPI=i(),h.insertStyleElement=p(),o()(v.A,h);const y=v.A&&v.A.locals?v.A.locals:void 0},5072:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},i=[],c=0;c<e.length;c++){var s=e[c],u=r.base?s[0]+r.base:s[0],l=a[u]||0,d="".concat(u," ").concat(l);a[u]=l+1;var p=n(d),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)t[p].references++,t[p].updater(f);else{var m=o(f,r);r.byIndex=c,t.splice(c,0,{identifier:d,updater:m,references:1})}i.push(d)}return i}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var c=n(a[i]);t[c].references--}for(var s=r(e,o),u=0;u<a.length;u++){var l=n(a[u]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}a=s}}},7659:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},5056:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},7825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},1113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},265:(e,t,n)=>{e.exports=n.p+"mykara.js"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,exports:{}};return e[r](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&(!e||!/^http(s?):/.test(e));)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.nc=void 0,(()=>{n(6865);var e=n(265),t=window;t.startSketch=function(n,r,o,a,i,c){var s,u,l,d=document.createElement("script"),p=function(e,n,r){var o={wasTriggered:!1,getLineNumber:function(){for(var t=i[0],n=1,r=0;r<t;r++)"\n"===e[r]&&n++;return n}},a=Date.now(),i=null;return t[n]=function(e){if(Date.now()-a>r)throw o.wasTriggered=!0,i=e,new Error("Loop took over "+r+" ms to run")},setInterval((function(){a=Date.now()}),r/2),o}(n,a,o);i&&(s=i,(u=document.createElement("base")).setAttribute("href",s),document.head.appendChild(u)),d.textContent=n,t.addEventListener("error",(function(e){var t=e.message;e.error&&(t=e.error.message);var n=void 0;if(p.wasTriggered)t="Your loop is taking too long to run.",n=p.getLineNumber();else if(e.error&&e.error.stack){var r=e.error.stack.match(/my_kara \(<anonymous>:(\d+):\d+\)/);r&&r.length>1&&(n=parseInt(r[1]))}else"number"!=typeof e.lineno||""!==e.filename&&e.filename!==window.location.href||(n=e.lineno);c(t,n)})),t.addEventListener("unhandledrejection",(function(e){reportError(e.reason)})),function(e,t){t=t||function(){};var n=0,r=function(){if(n===e.length)return t();!function(e,t){var n=document.createElement("script");t=t||function(){},n.onload=t,n.onerror=function(){console.log("Failed to load script: "+e)},n.setAttribute("src",e),document.body.appendChild(n)}(e[n++],r)};r()}([(l=r,"//cdnjs.cloudflare.com/ajax/libs/p5.js/".concat(l,"/p5.js")),e],(function(){document.body.appendChild(d),"complete"===document.readyState&&new t.p5}))}})()})();
//# sourceMappingURL=preview-frame.bundle.js.map