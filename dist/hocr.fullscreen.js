!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=9)}([function(e,n,t){"use strict";e.exports=t(1)},function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0}),n.HocrjsViewer=n.defaultConfig=void 0;var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),i=t(2),a=r(t(3)),s=r(t(4)),l=n.defaultConfig={root:"body",debugLevel:1,fonts:{"sans-serif":{},serif:{},monospace:{},UnifrakturCook:{cssUrl:"https://fonts.googleapis.com/css?family=UnifrakturCook:700"},UnifrakturMaguntia:{cssUrl:"https://fonts.googleapis.com/css?family=UnifrakturMaguntia"},"Old Standard TT":{cssUrl:"https://fonts.googleapis.com/css?family=Old+Standard+TT"},Cardo:{cssUrl:"https://fonts.googleapis.com/css?family=Cardo"},"Noto Serif":{cssUrl:"https://fonts.googleapis.com/css?family=Noto+Serif:400,400i,700&subset=latin-ext"},"Libre Baskerville":{cssUrl:"https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700&subset=latin-ext"}},features:{layout:{enabled:!0},backgroundImage:{enabled:!1},scaleFont:{enabled:!1,maxFontSize:128,minFontSize:2,wrapClass:"hocr-viewer-wrap"},disableEmStrong:{enabled:!1},contentEditable:{enabled:!1},tooltips:{enabled:!0,styleId:"hocr-viewer-tooltip-style"},transparentText:{enabled:!1},highlight:{enabled:!0},highlightNotPage:{enabled:!1},highlightInline:{enabled:!1},highlightLine:{enabled:!1},highlightPar:{enabled:!1},highlightCarea:{enabled:!1}},expandToolbar:!0,enableToolbar:!0,rootClass:"hocr-viewer"},c=function(){function e(n){var t=this;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.config=l,Object.keys(n||{}).forEach(function(e){t.config[e]=n[e]}),this.root=this.config.root,"string"==typeof this.root&&(this.root=document.querySelector(this.root)),this.parser=new i.HocrParser(this.config),Object.keys(this.config.fonts).forEach(function(e){var n=t.config.fonts[e].cssUrl;n&&a.default.addCssFragment("hocr-view-font-styles",'@import "'+n+'";\n')}),this.cache={scaleFont:{}}}return o(e,[{key:"log",value:function(e){var n;if(!(e>this.config.debugLevel)){for(var t=arguments.length,r=Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];(n=console)[["info","debug","log"][e]].apply(n,r)}}},{key:"findByOcrClass",value:function(e){(e=e||{}).tag=e.tag||"*",e.clauses=e.clauses||"",e.title&&(e.clauses+='[title*="'+e.title+'"]'),e.class=e.class||"","string"==typeof e.class&&(e.class=[e.class]);var n=e.class.map(function(e){return 0===e.indexOf("ocr")?e:""===e?"ocr":0!==e.indexOf("x_")?"ocr_"+e:"ocr"+e}).map(function(n){return":scope "+e.tag+'[class^="'+n+'"]'+e.clauses}).join(",");this.log(1,"findByOcrClass:",n);var t=e.context||document.querySelector("."+this.config.rootClass),r=Array.prototype.slice.call(t.querySelectorAll(n));return e.terminal&&(r=r.filter(function(e){if(!e.querySelector('*[class^="ocr"]'))return e})),e.container&&(r=r.filter(function(e){if(e.querySelector('*[class^="ocr"]'))return e})),e.filter&&(r=r.filter(e.filter)),r}},{key:"placeOcrElements",value:function(){var e=this;this.findByOcrClass({title:"bbox"}).forEach(function(n){var t=e.parser.bbox(n);n.style.left=t[0]+"px",n.style.top=t[1]+"px",n.style.width=t[2]-t[0]+"px",n.style.height=t[3]-t[1]+"px"});var n=this.parser.bbox(document.querySelector(".ocr_page"));document.querySelector("body").style.minHeight=n[2]+"px"}},{key:"toggleScaleFont",value:function(e){var n=this;console.time("toggleScaleFont");var t=document.querySelector("."+this.config.features.scaleFont.wrapClass);t||((t=document.createElement("span")).classList.add(this.config.features.scaleFont.wrapClass),this.root.appendChild(t)),e?this.findByOcrClass({terminal:!0}).forEach(function(e){return n.scaleFont(e,t)}):this.findByOcrClass({terminal:!0}).forEach(function(e){return e.style.fontSize="initial"}),console.timeEnd("toggleScaleFont")}},{key:"scaleFont",value:function(e,n){if(0!==e.textContent.trim().length){if(!(e.textContent in this.cache.scaleFont)){n.style.fontFamily=e.style.fontFamily,n.innerHTML=e.textContent;var t="offsetWidth",r="offsetHeight",o=Math.min(e[t],e[r]),i=this.config.features.scaleFont.minFontSize;for(n.style.fontSize=o+"px",o>i&&n[r]>e[r]&&(o-=n[r]-e[r],n.style.fontSize=o+"px");o>i&&n[t]>e[t];)o-=1,n.style.fontSize=o+"px";this.cache.scaleFont[e.textContent]=o}e.style.fontSize=this.cache.scaleFont[e.textContent]+"px"}}},{key:"toggleTooltips",value:function(e){var n=this,t=document.querySelector("#"+this.config.features.tooltips.styleId);if(e){var r={},o=!0,i=!1,a=void 0;try{for(var s,l=this.findByOcrClass()[Symbol.iterator]();!(o=(s=l.next()).done);o=!0){r[s.value.getAttribute("class")]=!0}}catch(e){i=!0,a=e}finally{try{!o&&l.return&&l.return()}finally{if(i)throw a}}this.log(0,"Detected OCR classes",Object.keys(r)),t||(t=document.createElement("style")).setAttribute("id",this.config.features.tooltips.styleId),t.appendChild(document.createTextNode(Object.keys(r).map(function(e){return"."+n.config.rootClass+" ."+e+':hover::before { content: "'+e+'"; }\n'}).join("\n"))),document.head.appendChild(t)}else t&&t.remove()}},{key:"toggleBackgroundImage",value:function(e){var n=this,t=this.root.querySelector(".ocr_page");e?this.findByOcrClass({title:"image"}).forEach(function(e){var r=n.parser.image(e);t.style.backgroundImage="url("+r+")"}):t.style.backgroundImage=""}},{key:"toggleContentEditable",value:function(e){var n=this,t=function(e){console.warn("Scaling of contentEditable is broken right now"),n.config.features.scaleFont.enabled&&(n.scaleFont(e.target),n.findByOcrClass({context:e.target}).forEach(function(e){n.scaleFont(e)}))};this.findByOcrClass({class:["line","x_word"],clauses:""}).forEach(function(n){e?(n.setAttribute("contentEditable","true"),n.addEventListener("input",t)):(n.removeAttribute("contentEditable"),n.removeEventListener("input",t))})}},{key:"toggleFeature",value:function(e,n){this.root.classList.toggle("feature-"+e,n);var t="toggle"+e.substr(0,1).toUpperCase()+e.substring(1);t in this&&(this.log(0,"Calling this."+t),this[t](n))}},{key:"addToolbar",value:function(){this.toolbar=this.root.querySelector("hocr-toolbar"),this.toolbar||(this.toolbar=new s.default({root:document.createElement("div"),$parent:this,config:this.config}),document.body.appendChild(this.toolbar.dom))}},{key:"scaleTo",value:function(e){var n=this.root.querySelector(".ocr_page"),t=this.parser.bbox(document.querySelector(".ocr_page"));"height"===e?e=window.innerHeight/t[3]:"width"===e?e=window.innerWidth/t[2]:"original"===e&&(e=1),n.style.transform="scale("+e+")",n.style.transformOrigin="top left",this.toolbar.dom.querySelector("span.zoom").innerHTML=Math.floor(1e4*e)/100}},{key:"onConfigChange",value:function(){var e=this;Object.keys(this.config.features).forEach(function(n){e.toggleFeature(n,e.config.features[n].enabled)})}},{key:"init",value:function(){var e=this;this.root.classList.add(this.config.rootClass),this.config.enableToolbar&&this.addToolbar(),this.placeOcrElements(),this.onConfigChange(),window.addEventListener("resize",function(){return e.onConfigChange()})}}]),e}();n.HocrjsViewer=c},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();n.HocrParser=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return r(e,[{key:"parseTitle",value:function(e){e=this._titleString(e);for(var n=0;n<e.length;n++);}},{key:"bbox",value:function(e){return this._titleString(e).match(/bbox\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/).slice(1).map(function(e){return parseInt(e)})}},{key:"image",value:function(e){return this._titleString(e).match(/image\s+"([^"]+)"/)[1]}},{key:"_titleString",value:function(e){return"string"==typeof e?e:e.getAttribute("title")}}]),e}()},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),o=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return r(e,null,[{key:"addCssFragment",value:function(e,n){var t=document.querySelector("#"+e);t||((t=document.createElement("style")).id=e,document.head.appendChild(t)),t.appendChild(document.createTextNode(n))}}]),e}();n.default=o},function(e,n,t){"use strict";e.exports=t(5)},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),o=function(e){return e&&e.__esModule?e:{default:e}}(t(6)),i=function(){function e(n){var t=this,r=n.root,i=n.$parent,a=n.config;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),r.innerHTML=o.default,(r=this.dom=r.querySelector("div")).querySelector(".toggler").addEventListener("click",function(e){a.expandToolbar=!a.expandToolbar,t.toggle(a.expandToolbar)});var s=r.querySelector("select.fontlist");console.log(s),Object.keys(a.fonts).forEach(function(e){var n=document.createElement("option");n.innerHTML=e,n.style.fontSize="large",n.style.fontFamily=e,s.appendChild(n)}),s.addEventListener("change",function(e){var n=e.target.options[e.target.selectedIndex].innerHTML;i.findByOcrClass().forEach(function(e){e.style.fontFamily=n}),i.onConfigChange()}),Object.keys(a.features).forEach(function(e){var n=document.createElement("li"),t=document.createElement("input"),o=document.createElement("label");n.appendChild(t),n.appendChild(o),r.querySelector(".features").appendChild(n),o.innerHTML=e,t.setAttribute("type","checkbox"),t.checked=a.features[e].enabled,n.classList.toggle("checked",t.checked);n.addEventListener("click",function(r){t.checked=!t.checked,n.classList.toggle("checked"),a.features[e].enabled=t.checked,i.toggleFeature(e,t.checked)}),t.addEventListener("change",function(r){n.classList.toggle("checked",t.checked),a.features[e].enabled=t.checked,i.toggleFeature(e,t.checked)})});r.querySelector('input[type="range"].zoom').addEventListener("input",function(e){return i.scaleTo(e.target.value/100)});var l=!0,c=!1,d=void 0;try{for(var u,f=r.querySelectorAll("button.zoom")[Symbol.iterator]();!(l=(u=f.next()).done);l=!0){u.value.addEventListener("click",function(e){return i.scaleTo(e.target.dataset.scaleFactor)})}}catch(e){c=!0,d=e}finally{try{!l&&f.return&&f.return()}finally{if(c)throw d}}}return r(e,[{key:"toggle",value:function(e){this.dom.classList.toggle("expanded",e)}}]),e}();n.default=i},function(e,n){e.exports='<div class="hocrjs-toolbar">\n  <div class="toggler">\n    <div class="toggler-inner toggler-show">\n      &gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>\n    </div>\n    <div class="toggler-inner toggler-hide">\n      &lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>\n    </div>\n  </div>\n  <div class="wrapper">\n    <h2>Font</h2>\n    <select class="fontlist"></select>\n    <h2>Features</h2>\n    <ul class="features">\n    </ul>\n    <h2>Zoom</h2>\n    <input type="range" class="zoom" min="0" max="500" step="2" value="100"/>\n    <span class="zoom">100</span>%\n    <p>\n      <button class="zoom" data-scale-factor="height">Fit height</button>\n      <button class="zoom" data-scale-factor="width">Fit width</button>\n      <button class="zoom" data-scale-factor="original">100 %</button>\n    </p>\n  </div>\n</div>\n\n'},function(e,n){function t(e,n){var t=e[1]||"",r=e[3];if(!r)return t;if(n&&"function"==typeof btoa){var o=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),i=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[t].concat(i).concat([o]).join("\n")}return[t].join("\n")}e.exports=function(e){var n=[];return n.toString=function(){return this.map(function(n){var r=t(n,e);return n[2]?"@media "+n[2]+"{"+r+"}":r}).join("")},n.i=function(e,t){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(t&&!a[2]?a[2]=t:t&&(a[2]="("+a[2]+") and ("+t+")"),n.push(a))}},n}},function(e,n,t){function r(e,n){for(var t=0;t<e.length;t++){var r=e[t],o=u[r.id];if(o){o.refs++;for(a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(c(r.parts[a],n))}else{for(var i=[],a=0;a<r.parts.length;a++)i.push(c(r.parts[a],n));u[r.id]={id:r.id,refs:1,parts:i}}}}function o(e,n){for(var t=[],r={},o=0;o<e.length;o++){var i=e[o],a=n.base?i[0]+n.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):t.push(r[a]={id:a,parts:[s]})}return t}function i(e,n){var t=h(e.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=b[b.length-1];if("top"===e.insertAt)r?r.nextSibling?t.insertBefore(n,r.nextSibling):t.appendChild(n):t.insertBefore(n,t.firstChild),b.push(n);else if("bottom"===e.insertAt)t.appendChild(n);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=h(e.insertInto+" "+e.insertAt.before);t.insertBefore(n,o)}}function a(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var n=b.indexOf(e);n>=0&&b.splice(n,1)}function s(e){var n=document.createElement("style");return e.attrs.type="text/css",l(n,e.attrs),i(e,n),n}function l(e,n){Object.keys(n).forEach(function(t){e.setAttribute(t,n[t])})}function c(e,n){var t,r,o,c;if(n.transform&&e.css){if(!(c=n.transform(e.css)))return function(){};e.css=c}if(n.singleton){var u=p++;t=g||(g=s(n)),r=d.bind(null,t,u,!1),o=d.bind(null,t,u,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=function(e){var n=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",l(n,e.attrs),i(e,n),n}(n),r=function(e,n,t){var r=t.css,o=t.sourceMap,i=void 0===n.convertToAbsoluteUrls&&o;(n.convertToAbsoluteUrls||i)&&(r=m(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,t,n),o=function(){a(t),t.href&&URL.revokeObjectURL(t.href)}):(t=s(n),r=function(e,n){var t=n.css,r=n.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}.bind(null,t),o=function(){a(t)});return r(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;r(e=n)}else o()}}function d(e,n,t,r){var o=t?"":r.css;if(e.styleSheet)e.styleSheet.cssText=v(n,o);else{var i=document.createTextNode(o),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(i,a[n]):e.appendChild(i)}}var u={},f=function(e){var n;return function(){return void 0===n&&(n=e.apply(this,arguments)),n}}(function(){return window&&document&&document.all&&!window.atob}),h=function(e){var n={};return function(e){if(void 0===n[e]){var t=function(e){return document.querySelector(e)}.call(this,e);if(t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}}(),g=null,p=0,b=[],m=t(12);e.exports=function(e,n){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(n=n||{}).attrs="object"==typeof n.attrs?n.attrs:{},n.singleton||(n.singleton=f()),n.insertInto||(n.insertInto="head"),n.insertAt||(n.insertAt="bottom");var t=o(e,n);return r(t,n),function(e){for(var i=[],a=0;a<t.length;a++){var s=t[a];(l=u[s.id]).refs--,i.push(l)}if(e){r(o(e,n),n)}for(a=0;a<i.length;a++){var l=i[a];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete u[l.id]}}}};var v=function(){var e=[];return function(n,t){return e[n]=t,e.filter(Boolean).join("\n")}}()},function(e,n,t){"use strict";t(10),t(13);var r=t(0);window.hocrViewer=new r.HocrjsViewer({root:document.querySelector("body")}),window.hocrViewer.init()},function(e,n,t){var r=t(11);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0};o.transform=void 0;t(8)(r,o);r.locals&&(e.exports=r.locals)},function(e,n,t){(e.exports=t(7)(void 0)).push([e.i,'/*\n * Copyright (c) normalize.css v5.0.0 github.com/necolas/normalize.css\n *\n * This software may be modified and distributed under the terms\n * of the MIT license.  See the LICENSE file for details.\n */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0; }\n\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0; }\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type="button"],\n[type="reset"],\n[type="submit"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type="button"]::-moz-focus-inner,\n[type="reset"]::-moz-focus-inner,\n[type="submit"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type="button"]:-moz-focusring,\n[type="reset"]:-moz-focusring,\n[type="submit"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type="checkbox"],\n[type="radio"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type="number"]::-webkit-inner-spin-button,\n[type="number"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type="search"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type="search"]::-webkit-search-cancel-button,\n[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block; }\n\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none; }\n\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none; }\n',""])},function(e,n){e.exports=function(e){var n="undefined"!=typeof window&&window.location;if(!n)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var t=n.protocol+"//"+n.host,r=t+n.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,n){var o=n.trim().replace(/^"(.*)"$/,function(e,n){return n}).replace(/^'(.*)'$/,function(e,n){return n});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(o))return e;var i;return i=0===o.indexOf("//")?o:0===o.indexOf("/")?t+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}},function(e,n,t){var r=t(14);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0};o.transform=void 0;t(8)(r,o);r.locals&&(e.exports=r.locals)},function(e,n,t){(e.exports=t(7)(void 0)).push([e.i,'@charset "UTF-8";\n/*\n * Copyright (c) 2016-2017 Konstantin Baierer\n *\n * This software may be modified and distributed under the terms\n * of the MIT license.  See the LICENSE file for details.\n */\n.hocr-viewer {\n  height: 100vh;\n  position: relative; }\n  .hocr-viewer .ocr_page {\n    position: relative !important;\n    -webkit-transform: rotate(0deg);\n    -ms-transform: rotate(0deg);\n    transform: rotate(0deg);\n    /* .transform(scale(0.7)); */\n    /* position: relative !important; */\n    overflow: scroll; }\n  .hocr-viewer.feature-layout *[class^="ocr"] {\n    position: fixed;\n    white-space: nowrap;\n    justify-content: left;\n    /* align horizontal */\n    align-items: center;\n    /* align vertical */ }\n    .hocr-viewer.feature-layout *[class^="ocr"]:hover::before {\n      display: block;\n      background: white;\n      color: black !important;\n      border: 1px solid black;\n      font-family: monospace;\n      position: absolute;\n      font-size: 12px;\n      font-weight: bold;\n      line-height: 100%;\n      height: 15px;\n      top: -15px; }\n  .hocr-viewer.feature-highlight {\n    margin: -1px; }\n    .hocr-viewer.feature-highlight.feature-highlightNotPage *[class^="ocr"]:not(.ocr_page) {\n      border: 3px solid red; }\n      .hocr-viewer.feature-highlight.feature-highlightNotPage *[class^="ocr"]:not(.ocr_page):hover {\n        background: rgba(255, 153, 153, 0.2); }\n    .hocr-viewer.feature-highlight.feature-highlightInline .ocr_line *[class^="ocr"] {\n      border: 3px solid green; }\n      .hocr-viewer.feature-highlight.feature-highlightInline .ocr_line *[class^="ocr"]:hover {\n        background: rgba(26, 255, 26, 0.2); }\n    .hocr-viewer.feature-highlight.feature-highlightLine *[class^="ocr"][class*="line"] {\n      border: 3px solid gold; }\n      .hocr-viewer.feature-highlight.feature-highlightLine *[class^="ocr"][class*="line"]:hover {\n        background: rgba(255, 239, 153, 0.2); }\n    .hocr-viewer.feature-highlight.feature-highlightPar .ocr_par {\n      border: 3px solid purple; }\n      .hocr-viewer.feature-highlight.feature-highlightPar .ocr_par:hover {\n        background: rgba(255, 26, 255, 0.2); }\n    .hocr-viewer.feature-highlight.feature-highlightCarea .ocr_carea {\n      border: 3px solid blue; }\n      .hocr-viewer.feature-highlight.feature-highlightCarea .ocr_carea:hover {\n        background: rgba(153, 153, 255, 0.2); }\n  .hocr-viewer.feature-backgroundImage {\n    background-repeat: no-repeat; }\n    .hocr-viewer.feature-backgroundImage .ocr_page {\n      background-size: contain; }\n  .hocr-viewer.feature-disableEmStrong em {\n    font-style: normal; }\n  .hocr-viewer.feature-disableEmStrong strong {\n    font-weight: normal; }\n  .hocr-viewer.feature-transparentText .ocr_page {\n    color: transparent; }\n  .hocr-viewer .hocrjs-toolbar {\n    position: fixed;\n    top: 0;\n    height: 100%;\n    border: none; }\n    .hocr-viewer .hocrjs-toolbar .toggler {\n      float: left;\n      font-family: monospace;\n      color: white;\n      background: #333;\n      height: 100vh;\n      width: 1em; }\n      .hocr-viewer .hocrjs-toolbar .toggler .toggler-inner {\n        font-size: 1.5em;\n        top: 40vh;\n        position: fixed; }\n      .hocr-viewer .hocrjs-toolbar .toggler .toggler-hide {\n        display: none; }\n      .hocr-viewer .hocrjs-toolbar .toggler .toggler-show {\n        display: block; }\n    .hocr-viewer .hocrjs-toolbar .wrapper {\n      position: fixed;\n      margin-left: 1em;\n      background-color: rgba(180, 180, 190, 0.85);\n      width: 0em;\n      overflow: hidden;\n      transition: all 0.5s ease;\n      height: 100vh; }\n    .hocr-viewer .hocrjs-toolbar.expanded {\n      border-right: 3px solid #333; }\n      .hocr-viewer .hocrjs-toolbar.expanded .wrapper {\n        padding-left: 1em;\n        width: 15em; }\n      .hocr-viewer .hocrjs-toolbar.expanded .toggler-show {\n        display: none; }\n      .hocr-viewer .hocrjs-toolbar.expanded .toggler-hide {\n        display: block; }\n    .hocr-viewer .hocrjs-toolbar ul.features {\n      list-style-type: none;\n      padding: 0; }\n      .hocr-viewer .hocrjs-toolbar ul.features li {\n        background-color: #ffcccc;\n        margin-bottom: 2px;\n        padding: 5px 0; }\n        .hocr-viewer .hocrjs-toolbar ul.features li:before {\n          content: \'\\2717   \'; }\n        .hocr-viewer .hocrjs-toolbar ul.features li.checked {\n          background-color: #ccffcc; }\n          .hocr-viewer .hocrjs-toolbar ul.features li.checked:before {\n            content: \'\\2713   \'; }\n        .hocr-viewer .hocrjs-toolbar ul.features li input[type=\'checkbox\'] {\n          display: none; }\n        .hocr-viewer .hocrjs-toolbar ul.features li label {\n          width: 100%; }\n',""])}]);