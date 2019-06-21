const last = list => list.item(list.length - 1);

export const classname = str => `[class^=${str}]`;

const selector = {
  sidebarSection: classname('_2_OuR'),
  packageMain: classname('_2HRcc'),
  versions: classname('_2MpNL')
};

export function getLastSidebarSection() {
  return last(document.querySelectorAll(selector.sidebarSection));
}

export function getVersions() {
  const packageMain = document.querySelector(selector.packageMain);
  return Array.from(packageMain.querySelectorAll(selector.versions));
}

export default {
  getLastSidebarSection,
  getVersions
};
