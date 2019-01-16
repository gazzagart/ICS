/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class HomePage extends PageViewElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      <section>
        <h2>Welcome</h2>
        <p>This is Wazza's site and he is extremly <b>SMELLY</b>.</p>
      </section>
      <section>
        <p>ICS is kewl. Give us cash and you can be kewl too.</p>
      </section>
      <section>
        <p>You can contact us with the kewl contact page.</p>
      </section>
    `;
  }
}

window.customElements.define('home-page', HomePage);
