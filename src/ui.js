const $query = (selector, context = document) => context.querySelector(selector);
const $queryAll = (selector, context = document) => context.querySelectorAll(selector);
const last = list => list.item(list.length - 1);

export const classname = el => `[class^=${el.classList.item(0)}]`;

const selector = {
  packageName: '#top > :nth-child(1) > h2',
  sidebar: '#top > :nth-child(4)',
  versions: '#versions'
};

export function getMetadata() {
  const $name = $query(selector.packageName);
  const name = $name.textContent;
  const [version] = $name.nextElementSibling.textContent.split(/\s+/g);
  return { name, version };
}

export function getLastSidebarSection() {
  const $sidebar = $query(selector.sidebar);
  const $firstSection = $sidebar.children[3];
  return last($queryAll(classname($firstSection), $sidebar));
}

export function getVersions() {
  const $versions = $query(selector.versions);
  const $firstVersion = $query('a:first-child', $versions);
  return Array.from($queryAll(classname($firstVersion), $versions));
}

export default {
  getLastSidebarSection,
  getVersions
};
