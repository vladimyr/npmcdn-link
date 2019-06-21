import injectDevtoolsHook, { getProps } from './reactHook.js';
import { SidebarSectionLink, VersionLink } from './components';
import { getMetadata, getLastSidebarSection, getVersions } from './ui';

let activeTab;

const insertBefore = (el, ref) => ref.parentElement.insertBefore(el, ref);
const isComponent = el => Boolean(el.dataset.nanocomponent);

const unpkgUrl = (name, version) => `https://unpkg.com/${name}@${version}/`;
const anvakaUrl = (name, version) => `https://npm.anvaka.com/#/view/2d/${name}/${version}`;
const humanizeUrl = url => url.replace(/^https?:\/\/(?:www\.)?/, '');

injectDevtoolsHook((_, root) => {
  const { activeTab: newActiveTab = 'readme' } = getProps(root);
  if (newActiveTab === activeTab) return;
  let oldActiveTab;
  [activeTab, oldActiveTab] = [newActiveTab, activeTab];
  onTabSelect(newActiveTab, oldActiveTab);
});

function onTabSelect(activeTab, oldActiveTab) {
  if (!oldActiveTab) decorateSidebar();
  if (activeTab === 'versions') decorateVersions();
}

function decorateSidebar() {
  const { name, version } = getMetadata();
  const unpkgSection = new SidebarSectionLink().render({
    label: 'view contents',
    href: unpkgUrl(name, version),
    text: humanizeUrl(unpkgUrl(name, version))
  });
  const anvakaSection = new SidebarSectionLink().render({
    label: 'visualize dependencies',
    href: anvakaUrl(name, version),
    text: humanizeUrl(anvakaUrl(name, version))
  });
  insertBefore(unpkgSection, getLastSidebarSection());
  insertBefore(anvakaSection, getLastSidebarSection());
}

function decorateVersions() {
  getVersions().forEach(el => {
    const spacer = el.nextElementSibling;
    if (isComponent(spacer)) return;
    const { name } = getMetadata();
    const version = el.textContent.trim();
    const link = new VersionLink().render({
      text: '[browse files]',
      href: unpkgUrl(name, version)
    });
    insertBefore(link, spacer);
  });
}
