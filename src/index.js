import injectHook, { getProps } from './reactHook.js';
import { SidebarSectionLink, VersionLink } from './components';
import { getMetadata, getLastSidebarSection, getVersions } from './ui';

let unpkgSection;
let anvakaSection;

const insertBefore = (el, ref) => ref.parentElement.insertBefore(el, ref);
const isComponent = el => Boolean(el.dataset.nanocomponent);

const unpkgUrl = (name, version) => `https://unpkg.com/${name}@${version}/`;
const anvakaUrl = (name, version) => `https://npm.anvaka.com/#/view/2d/${name}/${version}`;
const humanizeUrl = url => url.replace(/^https?:\/\/(?:www\.)?/, '');

injectHook(function onTabRender(_, root) {
  const { activeTab = 'readme' } = getProps(root);
  decorateSidebar();
  if (activeTab === 'versions') decorateVersions();
});

function decorateSidebar() {
  const { name, version } = getMetadata();
  unpkgSection = render(unpkgSection, {
    label: 'view contents',
    href: unpkgUrl(name, version),
    text: humanizeUrl(unpkgUrl(name, version))
  });
  anvakaSection = render(anvakaSection, {
    label: 'visualize dependencies',
    href: anvakaUrl(name, version),
    text: humanizeUrl(anvakaUrl(name, version))
  });
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

function render(section, data) {
  if (section) {
    section.render(data);
    return section;
  }
  section = new SidebarSectionLink();
  insertBefore(section.render(data), getLastSidebarSection());
  return section;
}
