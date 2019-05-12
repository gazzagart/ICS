import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import{ w3css } from './w3-css.js';

import '@polymer/paper-spinner/paper-spinner';
import './snack-bar.js';


class SingleArticle extends PageViewElement {
    static get styles() {
        return [
            SharedStyles,
            w3css
        ];
    }
    static get properties() {
        return {
            title: { type: String},
            subTitle: { type: String},
            body: { type: String},
            articleMessage: { type: String},
            toastOpened: {type: Boolean},
            colourSnack: {type: String}
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
        img {
            max-height:250px;
        }
        p {
            padding-left:50px;
            padding-right:50px;
        }
        /* Extra small devices (phones, 600px and down) */
        @media only screen and (max-width: 600px) {
            img {
                max-height:200px;
            }
        }
        /* Small devices (portrait tablets and large phones, 600px and up) */
        @media only screen and (min-width: 600px) {
            img {
                max-height:250px;
            }
        }

        /* Medium devices (landscape tablets, 768px and up) */
        @media only screen and (min-width: 768px) {
            img {
                max-height:300px;
            }
        }

        /* Large devices (laptops/desktops, 992px and up) */
        @media only screen and (min-width: 992px) {
            img {
                max-height:350px;
            }
        }

        /* Extra large devices (large laptops and desktops, 1200px and up) */
        @media only screen and (min-width: 1200px) {
            img {
                max-height:400px;
            }
        }
    </style>
        <!-- Article section -->
        <div id="loader" style="text-align:center!important;margin-top:32px;">
            <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
        </div>
        <div id="articles" style="display:none;">
            <h3 class="w3-center w3-container">${this.title}</h3>
            <section><div class="w3-center w3-text-grey w3-xlarge" style="font-style: italic;">${this.subTitle}</div></section>
            <div class="w3-row-padding">
                <div class="w3-col l12 m12 s12">
                        <div id="imgLoader" style="text-align:center!important;margin-top:32px;">
                            <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
                        </div>
                        <div class="w3-center" id="imgContainer" style="display:none;">
                            <img src="" crossorigin="anonymous" class="w3-image articleImg w3-round-large" id="img">
                        </div>
                </div>
                <div class="w3-col l12 m12 s12">
                    <p class="w3-justify w3-margin w3-large w3-hide-large w3-hide-medium" style="white-space: pre-wrap;padding-left:20px;padding-right:20px;">${this.body}
                    </p>
                    <p class="w3-justify w3-margin w3-large w3-hide-large w3-hide-small" style="white-space: pre-wrap;padding-left:50px;padding-right:50px;">${this.body}
                    </p>
                    <p class="w3-justify w3-margin w3-large w3-hide-small w3-hide-medium" style="white-space: pre-wrap;padding-left:100px;padding-right:100px;">${this.body}
                    </p>
                </div>
            </div>
        </div>
        <!-- END OF ARTICLE -->
        <snack-bar ?active="${this.toastOpened}" colour="${this.colourSnack}">
            ${this.articleMessage}
        </snack-bar>
            `;
    }

    firstUpdated () {
        if(window.location.hash.substr(1)) {
            var ID = window.location.hash.substr(1);
            var db = firebase.firestore();
            db.collection("articles").doc(ID).get().then((doc) => {
                if (doc.exists) {
                    // console.log("Document data:", doc.data());
                    let articleData = doc.data();
                    this.title = articleData.title;
                    this.subTitle = articleData.subTitle;
                    // Make sure that we apply the right styles here:
                    this.body = articleData.body;
                    this.body =  this.body.replace(/\\n/g, '\n');
                    // Get the img that is with the article
                    var ele = this.shadowRoot.querySelector('#img');
                    var storage = firebase.storage();
                    var imgRef = storage.ref('articleImages/'+articleData.image);
                    imgRef.getDownloadURL().then((url) => {
                        ele.src = url;
                        ele.onload = () => {
                            this.shadowRoot.querySelector('#imgLoader').style.display = 'none';
                            this.shadowRoot.querySelector('#imgContainer').style.display = 'block';
                        };
                    });
                } else {
                    this.colourSnack = "#f44336";
                    this.articleMessage = "This article does not exist.";
                    this.toastOpened = true;
                    setTimeout(() => {this.toastOpened = false;window.location.href = "/article-page";}, 2000);
                }
            }).then(() => {
                this.shadowRoot.querySelector('#articles').style.display = "block";
                this.shadowRoot.querySelector('#loader').style.display = "none";
            }).catch((error) => {
                this.colourSnack = "#f44336";
                this.articleMessage = "This article does not exist.";
                this.toastOpened = true;
                setTimeout(() => {this.toastOpened = false;window.location.href = "/article-page";}, 2000);
            });
        } else {
            this.colourSnack = "#f44336";
            this.articleMessage = "No article selected... Rerouting.";
            this.toastOpened = true;
            setTimeout(() => {this.toastOpened = false;window.location.href = "/article-page";}, 2000);
        }
    }

}

window.customElements.define('single-article', SingleArticle);
