(function() {

  var T = this.T = {};

  T.iter = function(arr, func, params) {

    var startTime = new Date();

    params = params || {};

    if (typeof params == "function") {
      params = {
        cb: params
      };
    }

    params.cb = params.cb || console.log;
    params.timeout = params.timeout || 1;
    params.index = params.index || params.i || 0;
    params.len = params.len || arr.length;
    params.consoleRound = params.consoleRound || Math.floor(params.len / 20);
    params.verbose = (typeof params.verbose == "boolean") ? params.verbose : true;

    var finalArr = [];

    launchNextLine();

    function launchNextLine() {
      if (params.verbose) {
        if ((params.index == 1) || ((params.index !== 0) && (params.index % params.consoleRound === 0))) logStatusMessage();
      }

      if ((params.index < params.len)) {
        setTimeout(function() {
          func(arr[params.index], midCallback, params);
        }, params.timeout);
      } else {
        params.cb(finalArr);
      }
    }

    function midCallback(res) {
      if (res) finalArr = finalArr.concat(res);
      params.index++;
      launchNextLine();
    }

    function logStatusMessage() {
      var currTime = new Date();
      var timeDiff = (currTime - startTime) / 1000;
      var percCompl = params.index / params.len;

      console.log((percCompl * 100).toFixed(0) + "% completed, " + (timeDiff / percCompl - timeDiff).toFixed(0) + " seconds to finish");
    }
  };


  T.livereload = function() {
    var servUrl = 'http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1';
    var headMode = document.querySelector("head");
    var script = document.createElement("script");
    script.scr = servUrl;
    headMode.appendChild(script);
  };


  T.setPageTitle = function(sel, func) {
    var pagePath = window.location.pathname;
    var pageTitle = document.querySelector("title");
    if (pageTitle && pagePath) pageTitle.innerHTML = pagePath.split("/").pop();
  };


  T.getLS = function(path, message, placeholder) {
    var data;
    message = message || "Enter data for " + path;
    placeholder = placeholder || "";
    if (!localStorage[path] || (localStorage[path].length === 0)) {
      data = prompt(message, placeholder);
      localStorage[path] = data;
    } else data = localStorage[path];
    return data;
  };


  T.addHit = function(key, obj) {
    if (obj[key] === undefined) obj[key] = 1;
    else obj[key]++;
  };


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = T;
    T.rp = require("request-promise");

  } else T.rp = function(params) {

    if (typeof params == "string") params = {
      url: params
    };

    if (params.url || params.uri) throw Error("no url");

    params.url = params.url || params.uri;
    params.method = params.method || "GET";
    params.timeout = params.timeout || 15000;
    params.json = params.json || true;

    return new Promise(function(resolve, reject) {

      var req = new XMLHttpRequest();
      req.open(params.method, params.url);

      if (params.headers) {
        for (var key in params.headers) {
          req.setRequestHeader(key, params.headers[key]);
        }
      }

      req.onload = function() {
        if ((req.status === 200) && (req.response !== "")) {
          if (params.json) {
            try {
              resolve(JSON.parse(req.response));
            } catch (e) {
              resolve(req.response);
            }
          }
        } else if (req.response === "") {
          reject(Error("empty answer"));
        } else {
          reject(Error(req.statusText));
        }
      };

      req.timeout = params.timeout;
      req.ontimeout = function() {
        console.log("getRequest timed out: " + req.timeout);
        reject(Error(req.statusText));
      };
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      req.send(params.body && JSON.stringify(params.body));
    });
  };


})();