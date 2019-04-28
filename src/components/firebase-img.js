import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the shared styles needed by this element.
import{ w3css } from './w3-css.js';

import '@polymer/paper-spinner/paper-spinner';
import './firebase-getimg.js';


class FirebaseImg extends connect(store)(PageViewElement) {
static get styles() {
    return [
    w3css
    ];
}

static get properties() {
    return {
        alt: { type: String},
        imgName: {type: String},
        imgType: {type: String}
    };
}

constructor() {
    super();
    this.alt = "";
    this.imgName = "";
    this.imgType = "";
}

render() {
    return html`
    <style>
    paper-spinner {
            --paper-spinner-stroke-width: 6px;
        }
    </style>
    <div id="loader" style="text-align:center!important;margin-top:32px;">
        <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
    </div>
    <img src="" class="w3-round w3-image" id="applicationEle" crossorigin="anonymous" alt=${this.alt} style="width:100%">
    <firebase-getimg></firebase-getimg>
        `;
}


firstUpdated () {
    //Next few lines goes and fetches the pictures from either cloud storage, or local storage.
    var applicationJpgBase64 = localStorage.getItem(this.imgName);
    var applicationPic = this.shadowRoot.querySelector('#applicationEle');
    if (applicationJpgBase64 == undefined || applicationJpgBase64 == null){
        //! GO GET THE PICTURE WITH firebase-getimg
    } else {
        var dataApplicationImage = localStorage.getItem('applicationImage');
        applicationPic.src = "data:image/jpeg;base64, " + dataApplicationImage;
    }
}
// This is called every time something is updated in the store.
stateChanged(state) {
    this._items = cartItemsSelector(state);
    this._total = cartTotalSelector(state);
}

}

window.customElements.define('firebase-img', FirebaseImg);
