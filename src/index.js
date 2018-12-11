import { onNavigate, onTabSelect } from './events';
import { SidebarSection, Link } from './components';
import ui, { getVersions, readMetadata } from './ui';

const insertBefore = (el, ref) => ref.parentElement.insertBefore(el, ref);
const isComponent = el => Boolean(el.dataset.nanocomponent);

const sidebarSection = new SidebarSection();
onNavigate(() => sidebarSection.render(readMetadata()));
insertBefore(sidebarSection.render(readMetadata()), ui.lastSidebarSection);

onTabSelect(tab => {
  if (tab !== 'versions') return;
  const { name } = readMetadata();
  getVersions().forEach(el => {
    const spacer = el.nextElementSibling;
    if (isComponent(spacer)) return;
    const version = el.textContent.trim();
    const link = new Link();
    insertBefore(link.render({ name, version }), spacer);
  });
});
