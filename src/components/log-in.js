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
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js'
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner';
import './snack-bar.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class LoginPage extends PageViewElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      <style>
            paper-button.indigo {
                background-color: var(--paper-indigo-500);
                color: white;
                --paper-button-raised-keyboard-focus: {
                    background-color: var(--paper-pink-a200) !important;
                    color: white !important;
                };
            }
            paper-spinner {
                --paper-spinner-stroke-width: 6px;
            }
            @media only screen and (max-width: 768px) {
            /* For mobile phones: */
                #submitButton{
                    float:right;
                }
            }
        </style>
            <section>
                <h2>Admin Log In</h2>
            </section>
            <section>
                <div id="inputArea">
                    <paper-input required error-message="Email not valid" id="email" label="Email" type="email"></paper-input>
                    <paper-input required error-message="Please provide a password" id="password" label="Password" type="password"></paper-input>
                    <br>
                    <paper-button  @click="${this._sendMail}" id="submitButton" class="indigo">Login</paper-button>
                </div>
                <div id="loader" style="display: none;text-align:center!important;margin-top:32px;">
                    <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
                </div>
            </section>
            <snack-bar ?active="${this.toastOpened}" colour="${this.colourSnack}">
                Your message was ${this.sent ? 'sent' : 'not sent: please try again'}.
            </snack-bar>
    `;
  }
}

window.customElements.define('log-in', LoginPage);
