import Nanocomponent from 'nanocomponent';
import html from 'nanohtml';

const unpkgUrl = (name, version) => `https://unpkg.com/${name}@${version}/`;

class BaseComponent extends Nanocomponent {
  update({ name, version } = {}) {
    return this.name !== name || this.version !== version;
  }
}

export class SidebarSection extends BaseComponent {
  createElement({ name, version }) {
    const label = 'view contents';
    const href = unpkgUrl(name, version);
    const text = `unpkg.com/${name}@${version}/`;
    return html`
      <div class="dib w-50 bb b--black-10 pr2 w-100 truncate">
        <h3 class="f5 mt2 pt2 mb0 black-50">${label}</h3>
        <p class="fw6 mb3 mt2 truncate black-80 f4">
          <a class="link black-80" href="${href}">${text}</a>
        </p>
      </div>
    `;
  }
}

export class Link extends BaseComponent {
  createElement({ name, version }) {
    const href = unpkgUrl(name, version);
    const text = '[browse files]';
    return html`
      <a
        class="black-40 code lh-copy link underline-hover"
        style="margin-left: 0.5rem"
        href="${href}">
        ${text}
      </a>
    `;
  }
}
