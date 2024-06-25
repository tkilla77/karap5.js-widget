(()=>{"use strict";var t={927:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.MAX_RUN_TIME=e.HEIGHT=e.PREVIEW_WIDTH=e.P5_VERSION=void 0,e.P5_VERSION="1.9.4",e.PREVIEW_WIDTH=250,e.HEIGHT=350,e.MAX_RUN_TIME=1e3}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}(()=>{var t,e,r=n(927),i="p5-widget.js",o="p5-widget.html",a=["width: 100%","background-color: white","border: 1px solid #ec245e","box-sizing: border-box"],s=document.currentScript||document.querySelectorAll("script[src$='"+i+"']")[0],d=(t=s.src,e=t.slice(0,-12),"http:"===window.location.protocol&&/^https:/.test(e)&&(e=e.replace("https:","http:")),e),u=!s.hasAttribute("data-manual"),c=1;function l(t){var e=parseInt(t.getAttribute("data-height"));return isNaN(e)&&(e=r.HEIGHT),e}function p(t){var e,n=document.createElement("iframe"),r=l(t),i=parseInt(t.getAttribute("data-preview-width")),s=function(t){var e=document.createElement("a");return e.setAttribute("href",t),e.href}(t.getAttribute("data-base-url")),u=t.getAttribute("data-p5-version"),c=parseInt(t.getAttribute("data-max-run-time")),p=t.hasAttribute("data-autoplay"),h=["id="+encodeURIComponent(t.getAttribute("data-id"))],m=a.slice();function v(i){h.push("sketch="+encodeURIComponent(i)),m.push("min-height: "+r+"px"),e=d+o+"?"+h.join("&"),n.setAttribute("src",e),n.setAttribute("style",m.join("; ")),t.parentNode.replaceChild(n,t)}if(!isNaN(i)&&i>=0&&h.push("previewWidth="+i),!isNaN(c)&&c>=0&&h.push("maxRunTime="+c),s&&h.push("baseSketchURL="+encodeURIComponent(s)),u&&h.push("p5version="+encodeURIComponent(u)),p&&h.push("autoplay=on"),t.src&&t.textContent&&t.textContent.trim())return v(['// Your widget includes both a "src" attribute and inline script',"// content, which makes no sense. Please remove one of them."].join("\n"));t.src?function(t,e){var n=function(n){var r=["// p5.js-widget failed to retrieve "+t+"."];n&&"string"==typeof n&&r.push("// "+n),e(r.join("\n"))},r=new XMLHttpRequest;r.open("GET",t),r.onload=function(){200==r.status?e(r.responseText):n("Server returned HTTP "+r.status+".")},r.onerror=n,r.send(null)}(t.src,v):v(t.textContent)}function h(t){var e=l(t);t.style.display="block",t.style.fontSize="0",t.style.width="100%",t.style.minHeight=e+"px",t.style.background="#f0f0f0",t.hasAttribute("data-id")||(t.setAttribute("data-id",c.toString()),c++),function(t,e){var n;function r(){(function(t){var e=t.getBoundingClientRect();return e.bottom>=0&&e.right>=0&&e.top<=(window.innerHeight||document.documentElement.clientHeight)&&e.left<=(window.innerWidth||document.documentElement.clientWidth)})(t)&&(clearInterval(n),window.removeEventListener("scroll",r,!1),window.removeEventListener("resize",r,!1),e(t))}n=setInterval(r,1e3),window.addEventListener("scroll",r,!1),window.addEventListener("resize",r,!1),r()}(t,p)}function m(){var t=document.querySelectorAll("script[type='text/p5']");[].slice.call(t).forEach((function(t){h(t)}))}u&&("complete"===document.readyState?m():window.addEventListener("load",m,!1)),window.p5Widget={baseURL:d,url:d+i,replaceScript:h,replaceAll:m,defaults:r}})()})();
//# sourceMappingURL=p5-widget.js.map