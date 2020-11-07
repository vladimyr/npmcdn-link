import injectHook, { getProps } from './reactHook.js';
import { SidebarSectionLink, VersionLink } from './components';
import { getMetadata, getSidebarSection, getVersions } from './ui';

const sidebarSections = new Map();
const versionLinks = new Map();

const humanizeUrl = url => url.replace(/^https?:\/\/(?:www\.)?/, '');
const removeElement = el => el.parentElement.removeChild(el);
const insertBefore = (el, ref) => ref.parentElement.insertBefore(el, ref);

const anvakaUrl = (name, version) => `https://npm.anvaka.com/#/view/2d/${name}/${version}`;
const npmfsUrl = (name, version) => `https://npmfs.com/package/${name}/${version}/`;
const packagephobiaUrl = (name, version) => `https://packagephobia.com/result?p=${name}@${version}`;
const unpkgUrl = (name, version) => `https://unpkg.com/browse/${name}@${version}/`;

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
  const $sizeSection = getSidebarSection('Unpacked Size');
  const $size = $sizeSection && $sizeSection.querySelector('h3 + p');
  if ($size) {
    renderSection(sidebarSections, 'packagephobia', {
      label: 'Unpacked Size',
      href: packagephobiaUrl(name, version),
      text: $size.textContent,
      width: 50
    }, $sizeSection.nextElementSibling);
    removeElement($sizeSection);
  }
  const $updatedAtSection = getSidebarSection('Last publish');
  renderSection(sidebarSections, 'unpkg', {
    label: 'View contents',
    href: unpkgUrl(name, version),
    text: humanizeUrl(unpkgUrl(name, version))
  }, $updatedAtSection);
  renderSection(sidebarSections, 'npmfs', {
    label: 'View contents',
    href: npmfsUrl(name, version),
    text: humanizeUrl(npmfsUrl(name, version))
  }, $updatedAtSection);
  renderSection(sidebarSections, 'anvaka', {
    label: 'Visualize dependencies',
    href: anvakaUrl(name, version),
    text: humanizeUrl(anvakaUrl(name, version))
  }, $updatedAtSection);
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
