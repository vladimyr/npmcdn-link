import injectHook, { getProps } from './reactHook.js';
import { SidebarSectionLink, VersionLink } from './components';
import { getMetadata, getLastSidebarSection, getVersions } from './ui';

const sidebarSections = new Map();
const versionLinks = new Map();

const humanizeUrl = url => url.replace(/^https?:\/\/(?:www\.)?/, '');
const insertBefore = (el, ref) => ref.parentElement.insertBefore(el, ref);

const anvakaUrl = (name, version) => `https://npm.anvaka.com/#/view/2d/${name}/${version}`;
const npmfsUrl = (name, version) => `https://npmfs.com/package/${name}/${version}`;
const unpkgUrl = (name, version) => `https://unpkg.com/${name}@${version}/`;

injectHook(function onTabRender(_, root) {
  const { activeTab = 'readme', package: pkg } = getProps(root);
  if (!pkg) {
    sidebarSections.clear();
    versionLinks.clear();
    return;
  }
  const metadata = getMetadata();
  decorateSidebar(metadata);
  if (activeTab === 'versions') {
    decorateVersions(metadata);
  } else {
    versionLinks.clear();
  }
});

function decorateSidebar({ name, version }) {
  const $lastSection = getLastSidebarSection();
  renderSection(sidebarSections, 'unpkg', {
    label: 'view contents',
    href: unpkgUrl(name, version),
    text: humanizeUrl(unpkgUrl(name, version))
  }, $lastSection);
  renderSection(sidebarSections, 'npmfs', {
    label: 'view contents',
    href: npmfsUrl(name, version),
    text: humanizeUrl(npmfsUrl(name, version))
  }, $lastSection);
  renderSection(sidebarSections, 'anvaka', {
    label: 'visualize dependencies',
    href: anvakaUrl(name, version),
    text: humanizeUrl(anvakaUrl(name, version))
  }, $lastSection);
}

function decorateVersions({ name }) {
  getVersions().forEach(($el, index) => {
    const version = $el.textContent.trim();
    const key = (index === 0) ? 'current' : version;
    renderVersion(versionLinks, key, {
      text: '[browse files]',
      href: unpkgUrl(name, version)
    }, $el.nextElementSibling);
  });
}

function renderSection(components, key, data, ref) {
  const component = components.get(key);
  components.set(key, render(component, SidebarSectionLink, data, ref));
}

function renderVersion(components, key, data, ref) {
  const component = components.get(key);
  components.set(key, render(component, VersionLink, data, ref));
}

function render(component, Ctor, data, ref) {
  if (component) {
    component.render(data);
    return component;
  }
  component = new Ctor();
  insertBefore(component.render(data), ref);
  return component;
}
