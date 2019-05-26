import { LitElement, html } from 'lit-element';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import{ w3css } from './w3-css.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';


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
            <p class="w3-large w3-margin-left w3-margin-right w3-margin-bottom w3-hide-medium w3-hide-small body" style="text-align: justify !important;"></p>
            <p class="w3-large w3-margin-left w3-margin-right w3-margin-bottom w3-hide-large w3-hide-small body" style="text-align: justify !important;"></p>
            <div class="w3-center">
                <paper-button @click="${() => {window.location.href = "/single-article#" + this.data.Id;}}" raised class="w3-indigo">open article</paper-button>
            </div>
        </div>
        <div class="w3-container w3-col l4 m6">
            <div class="loader" style="text-align:center!important;margin-top:32px;">
                <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
            </div>
            <div class="w3-center w3-margin">
                <img src="" crossorigin="anonymous" class="w3-image w3-round-large img" style="height:inherit;">
            </div>
        </div>
    </div>
    <!-- END OF SINGLE ROW ARTICLE LARGE MEDIUM SCREEN-->
    <!-- SINGLE ROW ARTICLE SMALL SCREEN-->
    <div class="w3-row-padding w3-section w3-stretch w3-center w3-card-4 w3-hide-medium w3-hide-large" style="padding-bottom:16px; margin-right: 16px; margin-left: 16px;">
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
            <p class="w3-large w3-margin-left w3-margin-right w3-margin-bottom body" style="text-align: justify !important;"></p>
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
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        const phoneNumbersRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/gi;
        const boldRegex = /\*[\n\t\r\\\.!?@#$%()/"'&[\]<>~_-\w\d\s]+\*/;
        const italicsRegex = /__[\n\t\r\\\.\*!?@#$%()/"'&[\]<>~-\w\d\s]+__/;
        const underlineRegex = /~[\n\t\r\\\.\*!?@#$%()/"'&[\]<>_-\w\d\s]+~/;
        var body = this.data.body.substring(0, 400).replace(/\\n/g, '\n') + "...";
        body = body.replace(emailRegex,'<span class="w3-text-blue w3-hover-opacity"><a href="mailto:$1">$1</a></span>');
        //! We are still hard coding the number. We need to find a reliable number regex.
        body = body.replace(phoneNumbersRegex, '<span class="w3-text-blue-grey w3-large"><b><a class="w3-hide-large w3-hide-medium" href="tel:010-500-0960">(010) 500 0960</a><span class="w3-hide-small">(010) 500 0960</span></b></span>');
        //Now we need to add bold, underline, italics
        var indexStart = 0;
        while(body.indexOf("~", indexStart) != -1) {
            var indexOne = 0;
            var indexTwo = 0;
            var stringExtract = "";
            indexOne = body.indexOf("~", indexStart) + 1;
            indexTwo = body.indexOf("~", indexOne);
            if(indexOne != 0 && indexTwo != -1) {
                stringExtract = body.substring(indexOne, indexTwo);
                body = body.replace(underlineRegex, '<span style="text-decoration: underline;">'+stringExtract+'</span>');
                indexStart = indexTwo + 1;
            } else {
                indexStart = indexTwo;
            }
        }
        indexStart = 0;
        while(body.indexOf("__", indexStart) != -1) {
            var indexOne = 0;
            var indexTwo = 0;
            var stringExtract = "";
            indexOne = body.indexOf("__", indexStart) + 2;
            indexTwo = body.indexOf("__", indexOne);
            if(indexOne != 0 && indexTwo != -1) {
                stringExtract = body.substring(indexOne, indexTwo);
                body = body.replace(italicsRegex, '<span style="font-style: italic;">'+stringExtract+'</span>');
                indexStart = indexTwo + 2;
            } else {
                indexStart = indexTwo;
            }
        }
        indexStart = 0;
        while(body.indexOf("\*", indexStart) != -1) {
            var indexOne = 0;
            var indexTwo = 0;
            var stringExtract = "";
            indexOne = body.indexOf("\*", indexStart) + 1;
            indexTwo = body.indexOf("\*", indexOne);
            if(indexOne != 0 && indexTwo != -1) {
                stringExtract = body.substring(indexOne, indexTwo);
                body = body.replace(boldRegex, '<span style="font-weight: bold;">'+stringExtract+'</span>');
                indexStart = indexTwo + 1;
            } else {
                indexStart = indexTwo;
            }
        }
        var bodyArray = this.shadowRoot.querySelectorAll(".body");
        bodyArray.forEach(element => {
            element.innerHTML = body;
        });
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
