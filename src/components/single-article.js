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
            views: {type: Number},
            likes: {type: Number},
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
                    <p class="w3-justify w3-margin w3-large w3-hide-large w3-hide-medium" style="white-space: pre-wrap;padding-left:20px;padding-right:20px;">${this.body}
                    </p>
                    <p class="w3-justify w3-margin w3-large w3-hide-large w3-hide-small" style="white-space: pre-wrap;padding-left:50px;padding-right:50px;">${this.body}
                    </p>
                    <p class="w3-justify w3-margin w3-large w3-hide-small w3-hide-medium" style="white-space: pre-wrap;padding-left:100px;padding-right:100px;">${this.body}
                    </p>
                </div>
            </div>
            <div class="w3-row w3-section w3-stretch w3-center w3-border-top">
                <div class="w3-col l6 m6 s6 w3-container">
                    <div class="w3-medium"><paper-icon-button icon="face"></paper-icon-button> ${this.views}</div>
                </div>
                <div class="w3-col l6 m6 s6 w3-container">
                    <div class="w3-medium">
                        <paper-icon-button @click="${this._likeArticle}" id="likeButton" icon="thumb-up"></paper-icon-button> 
                        ${this.likes}
                        <span id="likesSpin" style="display:none;"><paper-spinner active class="multi"></paper-spinner></span>
                    </div>
                </div>
            </div>
            <div class="w3-center"><paper-button @click="${this._contactPage}" class="w3-indigo w3-margin">contact page</paper-button></div>
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
                    this.likes = articleData.likes;
                    this.views = articleData.views;
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
                        }).then(() => {
                            this.views = viewsPass;
                        });
                        this.views = viewsPass;
                        console.log(viewsPass);
                        console.log(this.views);
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

    _likeArticle () {
        var ID = window.location.hash.substr(1);
        if(localStorage.getItem("article"+ID) == undefined && !this.user) {
            var likesPass = 0;
            this.shadowRoot.querySelector("#likesSpin").style.display = "block";
            var db = firebase.firestore();
            db.collection("articles").doc(ID).get().then((doc) => {
                likesPass = doc.data().likes + 1;
            }).then(() => {
                db.collection("articles").doc(ID).update({
                    likes: likesPass
                }).then(() => {
                    localStorage.setItem("article"+ID, true);
                    this.likes = likesPass;
                    this.shadowRoot.querySelector("#likesSpin").style.display = "none";
                    this.colourSnack = "#4caf50";
                    this.articleMessage = "Article liked.";
                    this.toastOpened = true;
                    setTimeout(() => {this.toastOpened = false;}, 2000);
                });
            }).catch(() => {
                this.shadowRoot.querySelector("#likesSpin").style.display = "none";
            });
        } else if (this.user) {
            this.colourSnack = "#f44336";
            this.articleMessage = "Don't like your own work... It's Tacky.";
            this.toastOpened = true;
            setTimeout(() => {this.toastOpened = false;}, 2000);
        } else {
            this.colourSnack = "#f44336";
            this.articleMessage = "You have already liked this article.";
            this.toastOpened = true;
            setTimeout(() => {this.toastOpened = false;}, 2000);
        }
    }

    _contactPage() {
        window.location.href = "/contact-us";
    }

}

window.customElements.define('single-article', SingleArticle);
