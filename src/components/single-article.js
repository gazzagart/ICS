import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import{ w3css } from './w3-css.js';

import '@polymer/paper-spinner/paper-spinner';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
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
            colourSnack: {type: String},
            user: {type: Boolean}
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
        paper-icon-button:hover {
            color: #009688;
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
                    <p class="w3-justify w3-margin w3-large w3-hide-large w3-hide-medium body" style="white-space: pre-wrap;padding-left:20px;padding-right:20px;">
                    </p>
                    <p class="w3-justify w3-margin w3-large w3-hide-large w3-hide-small body" style="white-space: pre-wrap;padding-left:50px;padding-right:50px;">
                    </p>
                    <p class="w3-justify w3-margin w3-large w3-hide-small w3-hide-medium body" style="white-space: pre-wrap;padding-left:100px;padding-right:100px;">
                    </p>
                </div>
            </div>
            <div class="w3-center"><paper-button @click="${this._contactPage}" class="w3-indigo w3-margin">contact page</paper-button></div>
        </div>
        <!-- END OF ARTICLE -->
        <snack-bar ?active="${this.toastOpened}" style="background-color: ${this.colourSnack};">
            ${this.articleMessage}
        </snack-bar>
            `;
    }

    firstUpdated () {
        if(window.location.hash.substr(1)) {
            var ID = window.location.hash.substr(1);
            var db = firebase.firestore();
            var bodyElems = this.shadowRoot.querySelectorAll(".body");
            db.collection("articles").doc(ID).get().then((doc) => {
                if (doc.exists) {
                    let articleData = doc.data();
                    this.title = articleData.title;
                    this.subTitle = articleData.subTitle;
                    this.body = articleData.body;
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
                const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
                const phoneNumbersRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/gi;
                const boldRegex = /\*[\n\t\r\\\.!?@#$%()/"'&[\]<>~_-\w\d\s]+\*/;
                const italicsRegex = /__[\n\t\r\\\.\*!?@#$%()/"'&[\]<>~-\w\d\s]+__/;
                const underlineRegex = /~[\n\t\r\\\.\*!?@#$%()/"'&[\]<>_-\w\d\s]+~/;
                var body = this.body.replace(emailRegex,'<span class="w3-text-blue w3-hover-opacity"><a href="mailto:$1">$1</a></span>');
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
                body = body.replace(/\\n/g, '\n');
                bodyElems.forEach(element => {
                    element.innerHTML = body;
                });
                this.shadowRoot.querySelector('#articles').style.display = "block";
                this.shadowRoot.querySelector('#loader').style.display = "none";
            }).catch((error) => {
                console.error(error);
                this.colourSnack = "#f44336";
                this.articleMessage = "This article does not exist.";
                this.toastOpened = true;
                setTimeout(() => {this.toastOpened = false;window.location.href = "/article-page";}, 2000);
            });
            firebase.auth().onAuthStateChanged((user) => {
                if(!user) { // If it is not Wazza or me
                    // if(localStorage.getItem("viewArticle"+ID) == undefined) {}
                    //? We don't need to make sure if they have seen this before?
                    var viewsPass = 0;
                    db.collection("articles").doc(ID).get().then((doc) => {
                        viewsPass = doc.data().views + 1;
                    }).then(() => {
                        db.collection("articles").doc(ID).update({
                            views: viewsPass
                        })
                    });
                    this.user = false;
                } else {
                    this.user = true;
                }
                });
                if(localStorage.getItem("article"+ID) != undefined) {
                    this.shadowRoot.querySelector("#likeButton").style.color = "#009688";
                }
        } else {
            this.colourSnack = "#f44336";
            this.articleMessage = "No article selected... Rerouting.";
            this.toastOpened = true;
            setTimeout(() => {this.toastOpened = false;window.location.href = "/article-page";}, 2000);
        }
    }

    _contactPage() {
        window.location.href = "/contact-us";
    }

}

window.customElements.define('single-article', SingleArticle);
