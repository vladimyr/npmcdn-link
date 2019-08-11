import injectHook, { getProps } from './reactHook.js';
import { SidebarSectionLink, VersionLink } from './components';
import { getMetadata, getLastSidebarSection, getVersions } from './ui';

let unpkgSection = null;
let anvakaSection = null;
let versionLinks = [];

const insertBefore = (el, ref) => ref.parentElement.insertBefore(el, ref);

const unpkgUrl = (name, version) => `https://unpkg.com/${name}@${version}/`;
const anvakaUrl = (name, version) => `https://npm.anvaka.com/#/view/2d/${name}/${version}`;
const humanizeUrl = url => url.replace(/^https?:\/\/(?:www\.)?/, '');

injectHook(function onTabRender(_, root) {
  const { activeTab = 'readme', package: pkg } = getProps(root);
  if (!pkg) {
    unpkgSection = null;
    anvakaSection = null;
    versionLinks = [];
    return;
  }
  const metadata = getMetadata();
  decorateSidebar(metadata);
  if (activeTab === 'versions') {
    decorateVersions(metadata);
  } else {
    versionLinks = [];
  }
});

function decorateSidebar({ name, version }) {
  const $lastSection = getLastSidebarSection();
  unpkgSection = render(unpkgSection, SidebarSectionLink, {
    label: 'view contents',
    href: unpkgUrl(name, version),
    text: humanizeUrl(unpkgUrl(name, version))
  }, $lastSection);
  anvakaSection = render(anvakaSection, SidebarSectionLink, {
    label: 'visualize dependencies',
    href: anvakaUrl(name, version),
    text: humanizeUrl(anvakaUrl(name, version))
  }, $lastSection);
}

function decorateVersions({ name }) {
  getVersions().forEach(($el, index) => {
    const version = $el.textContent.trim();
    versionLinks[index] = render(versionLinks[index], VersionLink, {
      text: '[browse files]',
      href: unpkgUrl(name, version)
    }, $el.nextElementSibling);
  });
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
