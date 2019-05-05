import { LitElement, html } from 'lit-element';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import{ w3css } from './w3-css.js';


    class ArticleRow extends LitElement {
    static get styles() {
    return [
        SharedStyles,
        w3css
    ];
    }
    static get properties() {
        return {
            data: { type: Array },
            numOfPics: { type :Number }
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
    </style>
        <div class="w3-container">
            <!-- START OF SMALL AND LARGE ROW -->
            <div class="w3-row-padding w3-section w3-stretch">
                <div class="w3-container w3-col l4 m4 s12 w3-margin-bottom">
                    <div class="w3-center w3-card-4 cardHeightRef">
                    <div class="loader" style="text-align:center!important;margin-top:32px;">
                        <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
                    </div>
                        <div class="w3-center">
                            <img src="" crossorigin="anonymous" class="w3-image cardImage" id="img1">
                        </div>
                        <h4>${this.data[0].title}</h4>
                        <p class="w3-medium w3-left-align w3-text-grey">${this.data[0].subTitle}</p>
                        <br>
                        <p class="w3-large">${this.data[0].body}</p>
                    </div>
                </div>
                <div class="w3-container w3-col l4 m4 s12 w3-margin-bottom">
                    <div class="w3-center w3-card-4 cardHeightRef">
                        <div class="loader" style="text-align:center!important;margin-top:32px;">
                            <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
                        </div>
                        <div class="w3-center">
                            <img src="" crossorigin="anonymous" class="w3-image cardImage" id="img2">
                        </div>
                        <h4>${this.data[1].title}</h4>
                        <p class="w3-medium w3-left-align w3-text-grey">${this.data[1].subTitle}</p>
                        <br>
                        <p class="w3-large">${this.data[1].body}</p>
                    </div>
                </div>
                <div class="w3-container w3-col l4 m4 s12 w3-margin-bottom">
                    <div class="w3-center w3-card-4 cardHeightRef">
                        <div class="loader" style="text-align:center!important;margin-top:32px;">
                            <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
                        </div>
                        <div class="w3-center">
                            <img src="" crossorigin="anonymous" class="w3-image cardImage" id="img3">
                        </div>
                        <h4>${this.data[2].title}</h4>
                        <p class="w3-medium w3-left-align w3-text-grey">${this.data[2].subTitle}</p>
                        <br>
                        <p class="w3-large">${this.data[2].body}</p>
                    </div>
                </div>
            </div>
            <!-- END OF SMALL AND LARGE ROW -->
            `;
    }

    constructor () {
        super();
        this.numOfPics = 0;
        this._getPics = this._getPics.bind(this);
        this._resizeCard = this._resizeCard.bind(this);
    }

    firstUpdated () {
        window.addEventListener("resize", () => {
            this._resizeCard();
        });
        var storage = firebase.storage();
        var imgRef1 = storage.ref('articleImages/'+this.data[0].image);
        var imgRef2 = storage.ref('articleImages/'+this.data[1].image);
        var imgRef3 = storage.ref('articleImages/'+this.data[2].image);
        this._getPics(imgRef1,this.shadowRoot.querySelector('#img1'));
        this._getPics(imgRef2,this.shadowRoot.querySelector('#img2'));
        this._getPics(imgRef3,this.shadowRoot.querySelector('#img3'));
    }

    _getPics (imgRef, ele) {
        imgRef.getDownloadURL().then((url) => {
            ele.src = url;
            ele.onload = () => {
                this.numOfPics++;
                ele.style.display = 'none';
                if (this.numOfPics == 3) {
                    setTimeout(() => {
                        var loaderArray = this.shadowRoot.querySelectorAll(".loader");
                        loaderArray.forEach(element => {
                            element.style.display = "none";
                        });
                        this._resizeCard();
                    }, 100);
                }
            };
        });
    }
    _resizeCard(){
        this.shadowRoot.querySelector('#img1').style.display = "block";
        this.shadowRoot.querySelector('#img2').style.display = "block";
        this.shadowRoot.querySelector('#img3').style.display = "block";
        var cardArray = this.shadowRoot.querySelectorAll(".cardHeightRef");
        var cardHeight = 0;
        cardArray.forEach(element => {
            var heightOfEle = parseFloat(window.getComputedStyle(element).height.replace('px',''));
            if(heightOfEle > cardHeight){
                cardHeight = heightOfEle;
            }
        });
        cardArray.forEach(element => {
            element.style.minHeight = cardHeight + 'px';
        });
    }

}

window.customElements.define('article-row', ArticleRow);
