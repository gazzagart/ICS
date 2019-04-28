import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the shared styles needed by this element.
import{ w3css } from './w3-css.js';

import '@polymer/paper-spinner/paper-spinner';


class FirebaseGetImg extends connect(store)(PageViewElement) {
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
    <canvas id="canvas"></canvas>
        `;
}

_getBase64Image(img) {
    var canvas = this.shadowRoot.querySelector("#canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var dataURL = canvas.toDataURL("image/jpeg");
    return dataURL.replace(/data:image[^;]+;base64,/,'');
}

// This is called every time something is updated in the store.
stateChanged(state) {
    this._items = cartItemsSelector(state);
    this._total = cartTotalSelector(state);
    if(this.SOMESTATE == "poop") {
        //Next few lines goes and fetches the pictures from either cloud storage, or local storage.
        var storage = firebase.storage();
        var applicationJpg = storage.ref(this.imgType);
        // Get the download URL
        applicationJpg.getDownloadURL().then((url) => {
            // Insert url into an <img> tag to "download"
            applicationPic.src = url;
            //  Here we get the picture and get the base64 string to then store it client side.
            //  We wait for the acutal image to load first before grabbing it.
            //? Remember to replicate this in other apps, you must ensure CORS policy is correctly done.
            //? https://firebase.google.com/docs/storage/web/download-files#cors_configuration
            applicationPic.onload = () => {
                var imgData = this._getBase64Image(applicationPic);
                localStorage.setItem("applicationImage", imgData);
            };
        }).catch(function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                console.error("Not found");
                break;

                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                console.error("No permission");
                break;

                case 'storage/canceled':
                // User canceled the upload
                break;

                case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                console.error("Unknown error");
                break;
            }
        });
    }
}

}

window.customElements.define('firebase-getimg', FirebaseGetImg);
