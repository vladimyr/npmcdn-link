import injectDevtoolsHook, { getProps } from './reactHook.js';
import { Link, SidebarSection } from './components';
import { getLastSidebarSection, getVersions } from './ui';

let activeTab;

const getPackument = () => window.__context__.context.packument;
const insertBefore = (el, ref) => ref.parentElement.insertBefore(el, ref);
const isComponent = el => Boolean(el.dataset.nanocomponent);

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
  const sidebarSection = new SidebarSection();
  insertBefore(sidebarSection.render(getPackument()), getLastSidebarSection());
}

function decorateVersions() {
  getVersions().forEach(el => {
    const spacer = el.nextElementSibling;
    if (isComponent(spacer)) return;
    const link = new Link();
    const { name } = getPackument();
    const version = el.textContent.trim();
    insertBefore(link.render({ name, version }), spacer);
  });
}
