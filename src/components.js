import Nanocomponent from 'nanocomponent';
import html from 'nanohtml';

class BaseComponent extends Nanocomponent {
  update() {
    return true;
  }
}

export class SidebarSectionLink extends BaseComponent {
  createElement({ label, href, text }) {
    this.href = href;
    return html`
      <div class="dib w-100 bb b--black-10 pr2">
        <h3 class="f5 mt2 pt2 mb0 black-50">${label}</h3>
        <p class="fw6 mb3 mt2 truncate black-80 f4">
          <a class="fw6 mb3 mt2 truncate black-80 f4 link" href="${href}">${text}</a>
        </p>
      </div>
    `;
  }

  update({ href } = {}) {
    return href !== this.href;
  }
}

export class VersionLink extends BaseComponent {
  createElement({ href, text }) {
    return html`
      <a class="ml2 black-40 code lh-copy link underline-hover" href="${href}">${text}</a>
    `;
  }
}
