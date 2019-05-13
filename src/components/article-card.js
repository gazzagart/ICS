import { LitElement, html } from 'lit-element';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import{ w3css } from './w3-css.js';

import '@polymer/paper-button/paper-button.js';


    class ArticleCard extends LitElement {
    static get styles() {
    return [
        SharedStyles,
        w3css
    ];
    }
    static get properties() {
        return {
            data: { type: Object }
        };
    }

    render() {
    return html`
    <style>
        section {
            padding: 20px;
        }
        paper-spinner {
            --paper-spinner-stroke-width: 6px;
        }
        .center {
            position: relative;
        }

        .center .imgCon {
            margin: 0;
            position: absolute;
            top: 50%;
            -ms-transform: translate(0%, -50%);
            transform: translate(0%, -50%);
        }
    </style>
    <!-- SINGLE ROW ARTICLE LARGE MEDIUM SCREEN-->
    <div class="w3-row w3-section w3-stretch w3-center w3-card-4 w3-hide-small" style="padding-bottom:16px; margin-right: 32px; margin-left: 32px;">
        <div class="w3-container w3-col l8 m6">
            <h4>${this.data.title}</h4>
            <p class="w3-medium w3-left-align w3-text-grey w3-margin-left">${this.data.subTitle}</p>
            <p class="w3-large w3-margin-left w3-margin-right w3-margin-bottom w3-hide-medium w3-hide-small" style="text-align: justify !important;">${this.data.body.substring(0, 400).replace(/\\n/g, '\n') + "..."}</p>
            <p class="w3-large w3-margin-left w3-margin-right w3-margin-bottom w3-hide-large w3-hide-small" style="text-align: justify !important;">${this.data.body.substring(0, 300).replace(/\\n/g, '\n') + "..."}</p>
            <div class="w3-center">
                <paper-button @click="${() => {window.location.href = "/single-article#" + this.data.Id;}}" raised class="w3-indigo">open article</paper-button>
            </div>
        </div>
        <div class="w3-container w3-col l4 m6">
            <div class="loader" style="text-align:center!important;margin-top:32px;">
                <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
            </div>
            <div class="w3-center w3-margin">
                <img src="" crossorigin="anonymous" class="w3-image w3-round-large img" style="max-height:220px;">
            </div>
        </div>
    </div>
    <!-- END OF SINGLE ROW ARTICLE LARGE MEDIUM SCREEN-->
    <!-- SINGLE ROW ARTICLE SMALL SCREEN-->
    <div class="w3-row w3-section w3-stretch w3-center w3-card-4 w3-hide-medium w3-hide-large" style="padding-bottom:16px; margin-right: 16px; margin-left: 16px;">
        <div class="w3-container w3-col s12">
            <div class="loader" style="text-align:center!important;margin-top:32px;">
                <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
            </div>
            <div class="w3-margin" style="text-align:center!important;">
                <img src="" crossorigin="anonymous" class="w3-image w3-round-large img" style="max-height:220px;">
            </div>
        </div>
        <div class="w3-container w3-col s12">
            <h4>${this.data.title}</h4>
            <p class="w3-medium w3-left-align w3-text-grey w3-margin-left">${this.data.subTitle}</p>
            <p class="w3-large w3-margin-left w3-margin-right w3-margin-bottom" style="text-align: justify !important;">${this.data.body.substring(0, 200).replace(/\\n/g, '\n') + "..."}</p>
            <div class="w3-center">
                <paper-button @click="${() => {window.location.href = "/single-article#" + this.data.Id;}}" raised class="w3-indigo">open article</paper-button>
            </div>
        </div>
    </div>
    <!-- END OF SINGLE ROW ARTICLE SMALL SCREEN-->
    `;
    }

    constructor () {
        super();
        this.numOfPics = 0;
    }

    firstUpdated () {
        var storage = firebase.storage();
        var eleArray = this.shadowRoot.querySelectorAll('.img');
        var loaderArray = this.shadowRoot.querySelectorAll(".loader");
        var imgRef = storage.ref('articleImages/'+this.data.image);
        imgRef.getDownloadURL().then((url) => {
            eleArray.forEach(element => {
                element.src = url;
                element.onload = () => {
                    element.style.display = 'block';
                };
                loaderArray.forEach(elem => {
                    elem.style.display = "none";
                });
            });
        }).catch(error => {
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    console.error("File doesn't exist");
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    console.error("User doesn't have permission to access the object");
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    console.error("User canceled the upload?");
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    console.error("Unknown error occurred, inspect the server response");
                    break;
            }
        });
    }

}

window.customElements.define('article-card', ArticleCard);
