!function(){var e=this.T={};e.iter=function(e,t,n){function r(r){n.verbose&&(1==r||0!==r&&r%n.consoleRound===0)&&i();var a=e[r];t(a,function(e){setTimeout(function(){o(e,r)},n.timeout)},n)}function o(e,t){e&&(u[t]=e),c++,c==n.len?n.cb(u):n.index<n.len&&(r(n.index),n.index++)}function i(){var e=new Date,t=(e-a)/1e3,r=n.index/n.len;console.log((100*r).toFixed(0)+"% completed, "+(t/r-t).toFixed(0)+" seconds to finish")}if(!e||!e.length)return console.warn("empty arr");var a=new Date;n=n||{},"function"==typeof n&&(n={cb:n}),n.cb=n.cb||console.log,n.index=n.index||n.i||0,n.len=n.len||e.length,n.timeout=n.timeout||0,n.concurrency=n.concurrency||1,n.consoleRound=n.consoleRound||Math.floor(n.len/20),"undefined"==typeof n.verbose&&e.length>1e3&&(n.verbose=!0);var u=[],c=0;for(n.concurrency=Math.min(n.len,n.concurrency);n.index<n.concurrency;n.index++)r(n.index)},e.live=function(){var t="http://"+(location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1";e.importJs(t)},e.setPageTitle=function(){var e=window.location.pathname,t=document.querySelector("title");t&&e&&(t.innerHTML=e.split("/").pop())},e.getLS=function(e,t,n){var r;return t=t||"Enter data for "+e,n=n||"",localStorage[e]&&0!==localStorage[e].length?r=localStorage[e]:(r=prompt(t,n),localStorage[e]=r),r},e.addHit=function(e,t){void 0===t[e]?t[e]=1:t[e]++},"undefined"!=typeof module&&module.exports?e.rp=require("request-promise"):e.rp=function(e){if("string"==typeof e&&(e={url:e}),!e.url&&!e.uri)throw Error("no url");return e.url=e.url||e.uri,e.method=e.method||"GET",e.timeout=e.timeout||0,e.json=void 0===e.json||e.json,new Promise(function(t,n){var r=new XMLHttpRequest;if(r.open(e.method,e.url),e.body&&r.setRequestHeader("Content-Type","application/json"),e.headers)for(var o in e.headers)r.setRequestHeader(o,e.headers[o]);r.onload=function(){if(e.json)try{t(JSON.parse(r.response))}catch(n){t(r.response)}else t(r.response)},r.timeout=e.timeout,r.ontimeout=function(){console.log("getRequest timed out: "+r.timeout),n(r.statusText)},r.onerror=function(){n("Network Error")},r.send(e.body&&JSON.stringify(e.body))})},e.post=function(t,n){var r={url:t,body:n,method:"POST"};return e.rp(r)},e.genId=function(e){return e=e||10,Math.random().toString(36).substr(2,e)},e.importJs=function(e,t,n){function r(e,t){var n=setInterval(function(){("undefined"!=typeof e||e)&&(clearInterval(n),t())},50)}function o(e){for(var t=document.getElementsByTagName("script"),n=t.length;n--;)if(t[n].src==e)return!0;return!1}if(o(e))n&&n();else{var i=document.createElement("script");i.setAttribute("type","text/javascript"),i.setAttribute("src",e),n&&r(t,n);var a=document.getElementsByTagName("head")[0];a?a.appendChild(i):document.body.appendChild(i)}},e.importCss=function(e,t,n){function r(e,t){var n=setInterval(function(){("undefined"!=typeof e||e)&&(clearInterval(n),t())},50)}if(isMyLinkLoaded(e))n&&n();else{var o=document.createElement("link");o.setAttribute("rel","stylesheet"),o.setAttribute("href",e),n&&r(t,n);var i=document.getElementsByTagName("head")[0];i?i.appendChild(o):document.body.appendChild(o)}},e.cmprArr=function(e,t,n){var r={del:[],add:[]},o={},i=0,a=e.length;!function u(){for(var c=e[i],s=JSON.stringify(c),l=!1,d=0;d<t.length;d++){var f=t[d],p=JSON.stringify(f);if(0===i&&(o[p]=f),s==p&&(l=!0,delete o[p],0!==i))break}if(l||r.del.push(c),i++,i<a)u();else{for(var m in o){var v=o[m];r.add.push(v)}n(r)}}()},e.getTextareaArr=function(e){"string"==typeof e&&(e=document.querySelector(e));var t=e.value.trim().split(/\n\r?/).filter(function(e){return e});return t},e.getTsv=function(e,t){t=t||"\t";for(var n=[],r={},o=0;o<e.length;o++)for(var i in e[o])r[i]=!0;n.push(Object.keys(r).join(t));for(var a=0;a<e.length;a++){var u=e[a],c=[];for(var s in u){var l=u[s];c.push(l)}var d=c.join(t);n.push(d)}return n.join("\n")},e.copy2Clip=function(e){var t=document.createElement("textarea");t.value=e,t.setAttribute("value",e),t=document.body.appendChild(t),t.select();try{if(!document.execCommand("copy"))throw"Not allowed."}catch(n){t.remove(),console.log("document.execCommand('copy'); is not supported"),prompt("Copy the text (ctrl c, enter)",e)}finally{"undefined"==typeof n&&t.remove()}},e.convUpperFirst=function(e){if(e){if("string"!=typeof e)throw Error("str !== string");e=e.trim();for(var t="",n=0;n<e.length;n++){var r=e[n],o=/[а-яеґёіїє]/i,i=/[\- ]/;if(o.test(e))if(0===n)t+=r.toUpperCase();else{var a=t.slice(-1);t+=i.test(a)?r.toUpperCase():r.toLowerCase()}else t+=r}return t}},e.getWeek=function(e){var t=new Date(e.valueOf()),n=(e.getDay()+6)%7;t.setDate(t.getDate()-n+3);var r=t.valueOf();return t.setMonth(0,1),4!=t.getDay()&&t.setMonth(0,1+(4-t.getDay()+7)%7),1+Math.ceil((r-t)/6048e5)},e.getDate=function(e){if("number"==typeof e)e=new Date(e);else if("string"==typeof e){var t=/(\d{1,2})(?:\.|\-|\/)(\d{1,2})(?:\.|\-|\/)(\d{4})/,n=e.match(t);e=t.test(e)?new Date(n[3]+"."+n[2]+"."+n[1]):new Date(e)}else"object"!=typeof str&&(e=void 0);return e},e.getDateDeriv=function(t){var n={srcDate:t};n.year=t.getFullYear();var r=t.getMonth()+1,o=1==String(r).length?"0"+r:String(r);n.day=t.getDate();var i=1==String(n.day).length?"0"+n.day:String(n.day);n.dateDot=n.year+"."+o+"."+i,n.dateSlash=n.year+"-"+o+"-"+i,n.date=new Date(n.dateDot),n.dateNum=Number(new Date(n.dateDot));var a=e.getWeek(t),u=1==String(a).length?"0"+a:String(a);return n.yearMonth=n.year.toString().slice(-2)+"/"+o,n.yearWeek=(1==r&&[52,53].indexOf(a)!==-1?n.year-1:n.year).toString().slice(-2)+"/"+u,n},e.getJsonFromStr=function(e,t,n){function r(e){e=e.trim();for(var t={curly:0,straight:0,one:0,two:0},n=0;n<e.length;n++){var r=e[n];switch(r){case"{":t.curly++;break;case"}":t.curly--;break;case"[":t.straight++;break;case"]":t.straight--;break;case"'":t.one%2===0?t.one++:t.one--;break;case'"':t.two%2===0?t.two++:t.two--}if(n>1&&t.curly+t.straight+t.one+t.two===0){var o=e.substr(0,n+1);return o}}}var o,i=e.split(t);if(i[1]){if(o=i[1].trim(),n){var a=o.split(n);o=a[0].trim()}try{o=r(o).trim(),o="var json = "+o+"; return json";var u=new Function(o);return u()}catch(c){return c}}},e.json2qs=function(e){return"?"+Object.keys(e).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])}).join("&")},e.qs2json=function(){var e=location.search.substring(1).replace(/\/$/,"");if(e)return e=JSON.parse('{"'+e.replace(/&/g,'","').replace(/=/g,'":"')+'"}',function(e,t){return""===e?t:decodeURIComponent(t)})},"undefined"!=typeof module&&module.exports&&(module.exports=e),e.roundCoord=function(e,t){return t=t||1e6,Math.round(Number(e)*t)/t}}();