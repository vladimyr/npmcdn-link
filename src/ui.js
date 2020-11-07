const $query = (selector, context = document) => context.querySelector(selector);
const $queryAll = (selector, context = document) => context.querySelectorAll(selector);

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

export function getSidebarSection(title) {
  const pattern = new RegExp(`^${title}$`, 'i');
  const $sidebar = $query(selector.sidebar);
  const $firstSection = $sidebar.children[3];
  const sectionTitles = [classname($firstSection), 'h3'].join(' ');
  const $sectionTitle = Array.from($queryAll(sectionTitles)).find($title => {
    return pattern.test($title.textContent);
  });
  return $sectionTitle && $sectionTitle.parentElement;
}

export function getVersions() {
  const $versions = $query(selector.versions);
  const $firstVersion = $query('a:first-child', $versions);
  return Array.from($queryAll(classname($firstVersion), $versions));
}

export default {
  getSidebarSection,
  getVersions
};
