export const classname = str => `[class^=${str}]`;
const last = list => list.item(list.length - 1);

const selector = {
  packageName: classname('package__name'),
  packageVersion: classname('package__meta'),
  sidebarSection: classname('package__sidebarSection'),
  sidebarHeader: classname('package__sidebarHeader'),
  sidebarText: classname('package__sidebarText'),
  tabs: classname('tabs__tabs'),
  packageMain: classname('package__main'),
  packageContainer: classname('package__container'),
  versions: classname('versions__versions')
};

const ui = {
  packageName: document.querySelector(selector.packageName),
  packageVersion: document.querySelector(selector.packageVersion),
  lastSidebarSection: last(document.querySelectorAll(selector.sidebarSection)),
  tabs: document.querySelector(selector.tabs),
  packageMain: document.querySelector(selector.packageMain)
};

export default ui;

export function getActiveTab() {
  return ui.packageMain.querySelector(selector.packageContainer).id || 'readme';
}

export function getVersions() {
  return Array.from(ui.packageMain.querySelectorAll(selector.versions));
}

export function readMetadata() {
  const name = ui.packageName.textContent;
  const [version] = ui.packageVersion.textContent.split(/\s+/g);
  return { name, version };
}
