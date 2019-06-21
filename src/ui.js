const $query = (selector, context = document) => context.querySelector(selector);
const $queryAll = (selector, context = document) => context.querySelectorAll(selector);
const last = list => list.item(list.length - 1);

export const classname = str => `[class^=${str}]`;

const selector = {
  packageName: classname('_30_rF'),
  packageVersion: classname('_3JF9p'),
  sidebarSection: classname('_2_OuR'),
  packageMain: classname('_2HRcc'),
  versions: classname('_2MpNL')
};

export function getMetadata() {
  const name = $query(selector.packageName).textContent;
  const [version] = $query(selector.packageVersion).textContent.split(/\s+/g);
  return { name, version };
}

export function getLastSidebarSection() {
  return last($queryAll(selector.sidebarSection));
}

export function getVersions() {
  const packageMain = $query(selector.packageMain);
  return Array.from($queryAll(selector.versions, packageMain));
}

export default {
  getLastSidebarSection,
  getVersions
};
