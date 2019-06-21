/* global chrome */

injectScript('script.js');

function injectScript(scriptPath) {
  const script = document.createElement('script');
  script.src = chrome.extension.getURL(scriptPath);
  script.onload = function () { return this.remove(); };
  (document.head || document.documentElement).appendChild(script);
}
