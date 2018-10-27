import ui, { getActiveTab } from './ui';

let url;

export function onNavigate(listener) {
  url = window.location.href;
  window.addEventListener('scroll', debounce(() => {
    if (url === window.location.href) return;
    const oldUrl = url;
    url = window.location.href;
    listener(url, oldUrl);
  }, 250));
}

export function onTabSelect(listener) {
  document.addEventListener('click', e => {
    if (!e.target || !ui.tabs.contains(e.target)) return;
    setTimeout(() => listener(getActiveTab()), 0);
  });
}

function debounce(fn, timeout) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(fn, timeout, ...args);
  };
}
