"use strict";!function(require,directRequire){"use strict";function a(a){return Object.prototype.toString.call(a).toLowerCase().slice(8,-1)}function b(b,c){"string"===a(b)&&(c=b,b=null);let d=b;const e=c||b&&b.message;return b instanceof Error||(d=new Error(e)),d.message=e,d}function c(a,b,c){c=""+c;let d="";for(let e=0;e<a;e++)d+=b;return d.substring(0,d.length-c.length)+c}function d(a,b,c){a.assert("!!! [assert expect] !!!",b,"does not satisfy",c),console.group&&console.group("!!! [assert :: STACK] !!!"),a.assert(new Error().stack),console.groupEnd&&console.groupEnd()}Object.defineProperty(exports,"__esModule",{value:!0}),exports.typeOf=a,exports.commonError=b,exports.isDev=global.appConfig&&global.appConfig.isDev,exports.isMac="darwin"===process.platform,exports.clientVersion=parseInt((global.appVersion||"-1").replace(/\./g,""),10),exports.noop=()=>{},exports.padStart=c,exports.timeStamp=function(a){const b=c.bind(null,3,"0"),d=c.bind(null,2,"0");a=a||new Date;const e=-a.getTimezoneOffset()/60;return`[GMT${0<=e?"+":"-"}${e} ${a.getFullYear()}-${d(a.getMonth()+1)}-${d(a.getDate())} ${d(a.getHours())}:${d(a.getMinutes())}:${d(a.getSeconds())}:${b(a.getMilliseconds())}]`},exports.dateStamp=function(a,b=!1){const d=c.bind(null,3,"0"),e=c.bind(null,2,"0");return a=a||new Date,b?`${a.getFullYear()}-${e(a.getMonth()+1)}-${e(a.getDate())} ${e(a.getHours())}-${e(a.getMinutes())}-${e(a.getSeconds())}-${d(a.getMilliseconds())}`:`${a.getFullYear()}-${e(a.getMonth()+1)}-${e(a.getDate())}`},exports.randomId=function(a=""){return a=a?`${a}-`:"",`${a}${Math.round(1e4*Math.random())}-${Date.now()}`},exports.logInvoke=function(a){return function(b,c,d){if(!exports.isDev)return d;const e=d.value;return d.value=function(...b){const d=this&&this.constructor&&this.constructor.name||"<N/A>";0<b.length?a.i(`${d}.${c}(`,b,")"):a.i(`${d}.${c}()`);const f=e.call(this,...b);return f},d}},exports.logStack=function(a){return function(b,c,d){if(!exports.isDev)return d;const e=d.value;return d.value=function(...b){const d=this&&this.constructor&&this.constructor.name||"<N/A>",f=new Error().stack;exports.isDev&&console.group&&console.group(`${d}.${c} :: STACK`),a.i(f),exports.isDev&&console.groupEnd&&console.groupEnd();const g=e.call(this,...b);return g},d}};const f=Symbol.for("tryCatchError");exports.tryCatch=function(a){try{const b=a();return b}catch(a){return{error:b(a),_tag:f,toString(){return"[Object TryCatchError]"}}}},exports.invalidTryCatchResult=function(a){return a&&a._tag===f},exports.jsonStringify=function(a){return JSON.stringify(a)},exports.jsonParse=function(a){return JSON.parse(a)},exports.safeGet=function(a,b,c){const d=b.split(".");let e=a;for(const f of d){const a=e[f];if(a!==void 0)e=a;else return c}return e},exports.assertNever=function(...a){console.error("!!! [assert never] !!!",...a)},exports.delayPromise=function(a){return new Promise((b)=>{setTimeout(()=>{b()},0<a?a:0)})};const e={fail:(...a)=>e,pass(a){return a.call(null),e}};exports.expectFail={fail(a){return a.call(null),exports.expectFail},pass:(...a)=>exports.expectFail},exports.expect=function(a,b){return{as(c){return c(a)?e:(d(b,a,c.toString()),exports.expectFail)},toBe(c){return Object.is(a,c)?e:(d(b,a,c),exports.expectFail)},toFuzzyEqual(c){return c==a?e:(d(b,a,c),exports.expectFail)}}}}(require("lazyload"),require);