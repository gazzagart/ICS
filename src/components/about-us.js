import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import{ w3css } from './w3-css.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner';

class AboutUs extends PageViewElement {
    static get styles() {
        return [
            SharedStyles,
            w3css
        ];
    }

static get properties() {
    return {
        numOfPics: { type: Number}
    };
}

constructor () {
    super();
    this.numOfPics = 0;
    this._getPics = this._getPics.bind(this);
    this._getBase64Image = this._getBase64Image.bind(this);
    this._resizeCard = this._resizeCard.bind(this);
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

    <section>
        <h2>About Us</h2>
    </section>
    <section>
    <p class="w3-large">
        Integral Company Services provides expert legal and compliance services to companies. As a business owner, legal compliance is one of your company’s many concerns.
        Unfortunately, many companies are not aware of the many laws and regulations with which they must comply, and the penalties for non-compliance can be significant. Our
        experience in labour and commercial law enable us to provide excellent service and advice to your company, enabling you to focus on growth with the peace of mind knowing that
        your compliance concerns are covered.
    </p>
    </section>
    <section>
        <h2>Expertise</h2>
    </section>
    <div id="loader" style="text-align:center!important;margin-top:32px;">
        <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
    </div>
    <!-- START OF CARDS -->
        <div id="cardRegion" style="display:none; padding:32px;">
            <div class="w3-margin w3-row-padding w3-section w3-stretch w3-hide-medium">
            <!-- START OF FIRST ROW LARGE AND SMALL -->
                <div class="w3-container w3-col l4 s12 w3-margin-bottom">
                    <div class="w3-center w3-card-4 cardHeight">
                        <img src="" crossorigin="anonymous" class="w3-image" id="imgHeightRef">
                        <h4>Labour</h4>
                        <ul class="w3-ul">
                            <li>Disciplinary procedures and policies</li>
                            <li>CCMA consultation</li>
                            <li>Dispute resolution</li>
                        </ul>
                    </div>
                </div>
                <div class="w3-container w3-col l4 s12 w3-margin-bottom">
                    <div class="w3-center w3-card-4 cardHeight">
                        <img src="" crossorigin="anonymous" id="commercialJpg" class="w3-image imgHeight">
                        <h4>Debt Collection</h4>
                        <ul class="w3-ul">
                            <li>Including further legal action</li>
                        </ul>
                    </div>
                </div>
                <div class="w3-container w3-col l4 s12" id="cardHeightRef">
                    <div class="w3-center w3-card-4">
                        <img src="" crossorigin="anonymous" id="contractJpg" class="w3-image imgHeight">
                        <h4>Commercial contracts</h4>
                        <ul class="w3-ul">
                            <li>Contract negotiation</li>
                            <li>Employment contracts</li>
                            <li>Service Level Agreements</li>
                            <li>Lease agreements</li>
                            <li>Terms and conditions</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- END OF FIRST ROW LARGE AND SMALL -->
            <div class="w3-margin w3-row-padding w3-section w3-stretch  w3-hide-medium">
            <!-- START OF SECOND ROW LARGE AND SMALL -->
                    <div class="w3-container w3-col l4 s12 w3-margin-bottom">
                        <div class="w3-center w3-card-4 cardHeight">
                            <img src="" crossorigin="anonymous" id="policyJpg" class="w3-image imgHeight">
                            <h4>Policies and procedures</h4>
                            <ul class="w3-ul">
                                <li>Absenteeism</li>
                                <li>Alcoholism</li>
                                <li>Smoking policy</li>
                                <li>Negligence</li>
                                <li>Desertion</li>
                            </ul>
                        </div>
                    </div>
                    <div class="w3-container w3-col l4 s12 w3-margin-bottom">
                        <div class="w3-center w3-card-4 cardHeight">
                            <img src="" crossorigin="anonymous" id="auditJpg" class="w3-image imgHeight">
                            <h4>Audits</h4>
                            <ul class="w3-ul">
                                <li>Workplace audits</li>
                                <li>Website and premises disclaimers</li>
                            </ul>
                        </div>
                    </div>
                    <div class="w3-container w3-col l4 s12">
                        <div class="w3-center w3-card-4 cardHeight">
                            <img src="" crossorigin="anonymous" id="educationJpg" class="w3-image imgHeight">
                            <h4>Training and education</h4>
                            <ul class="w3-ul">
                                <li>Contract negotiation</li>
                                <li>Employment contracts</li>
                                <li>Service Level Agreements</li>
                                <li>Lease agreements</li>
                            </ul>
                        </div>
                    </div>
                </div>
            <!-- END OF SECOND ROW LARGE AND SMALL -->
            <div class="w3-margin w3-row-padding w3-section w3-stretch w3-hide-small w3-hide-large">
            <!-- START OF FIRST ROW MEDIUM -->
                    <div class="w3-container w3-col m6 w3-margin-bottom">
                        <div class="w3-center w3-card-4 cardHeightMedium">
                            <img src="" crossorigin="anonymous" class="w3-image constructionJpg" id="imgHeightRefMedium">
                            <h4>Labour</h4>
                            <ul class="w3-ul">
                                <li>Disciplinary procedures and policies</li>
                                <li>CCMA consultation</li>
                                <li>Dispute resolution</li>
                            </ul>
                            </ul>
                        </div>
                    </div>
                    <div class="w3-container w3-col m6 w3-margin-bottom">
                        <div class="w3-center w3-card-4 cardHeightMedium">
                            <img src="" crossorigin="anonymous" class="w3-image imgHeightMedium commercialJpg">
                            <h4>Debt Collection</h4>
                            <ul class="w3-ul">
                                <li>Including further legal action</li>
                            </ul>
                        </div>
                    </div>
            </div>
            <!-- END OF FIRST ROW MEDIUM -->
            <!-- START OF SECOND ROW MEDIUM -->
            <div class="w3-margin w3-row-padding w3-section w3-stretch w3-hide-small w3-hide-large">
                    <div class="w3-container w3-col m6">
                        <div class="w3-center w3-card-4 cardHeightMedium">
                            <img src="" crossorigin="anonymous" class="w3-image imgHeightMedium contractJpg">
                            <h4>Commercial contracts</h4>
                            <ul class="w3-ul">
                                <li>Contract negotiation</li>
                                <li>Employment contracts</li>
                                <li>Service Level Agreements</li>
                                <li>Lease agreements</li>
                                <li>Terms and conditions</li>
                            </ul>
                        </div>
                    </div>
                    <div class="w3-container w3-col m6 w3-margin-bottom">
                        <div class="w3-center w3-card-4" id="cardHeightRefMedium">
                            <img src="" crossorigin="anonymous" class="w3-image imgHeightMedium policyJpg">
                            <h4>Policies and procedures</h4>
                            <ul class="w3-ul">
                                <li>Absenteeism</li>
                                <li>Alcoholism</li>
                                <li>Smoking policy</li>
                                <li>Negligence</li>
                                <li>Desertion</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- END OF SECOND ROW MEDIUM -->
                <!-- START OF THIRD ROW MEDIUM -->
                <div class="w3-margin w3-row-padding w3-section w3-stretch w3-hide-small w3-hide-large">
                    <div class="w3-container w3-col m6 w3-margin-bottom">
                        <div class="w3-center w3-card-4 cardHeightMedium">
                            <img src="" crossorigin="anonymous" class="w3-image imgHeightMedium auditJpg">
                            <h4>Audits</h4>
                            <ul class="w3-ul">
                                <li>Workplace audits</li>
                                <li>Website and premises disclaimers</li>
                            </ul>
                        </div>
                    </div>
                    <div class="w3-container w3-col m6">
                        <div class="w3-center w3-card-4 cardHeightMedium">
                            <img src="" crossorigin="anonymous" class="w3-image imgHeightMedium educationJpg">
                            <h4>Training and education</h4>
                            <ul class="w3-ul">
                                <li>Contract negotiation</li>
                                <li>Employment contracts</li>
                                <li>Service Level Agreements</li>
                                <li>Lease agreements</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- END OF THIRD ROW MEDIUM -->
        </div>
        <!-- END OF CARDS -->
        <canvas id="canvas"></canvas>
        `;
    }

    firstUpdated () {
        window.addEventListener("resize", () => {
            this._resizeCard();
        });
        if(localStorage.getItem('auditImage') == undefined || localStorage.getItem('auditImage') == null) {
            var storage = firebase.storage();
            this._getPics(storage,'construction.jpg',this.shadowRoot.querySelector('#imgHeightRef'),'construction');
            this._getPics(storage,'commercial1.jpg',this.shadowRoot.querySelector('#commercialJpg'),'commercial');
            this._getPics(storage,'contract.jpg',this.shadowRoot.querySelector('#contractJpg'),'contract');
            this._getPics(storage,'education.jpg',this.shadowRoot.querySelector('#educationJpg'),'education');
            this._getPics(storage,'policy.jpg',this.shadowRoot.querySelector('#policyJpg'),'policy');
            this._getPics(storage,'audit.jpg',this.shadowRoot.querySelector('#auditJpg'),'audit');
        } else {
            var constructionImage = localStorage.getItem('constructionImage');
            var commercial1Image = localStorage.getItem('commercialImage');
            var contractImage = localStorage.getItem('contractImage');
            var educationImage = localStorage.getItem('educationImage');
            var policyImage = localStorage.getItem('policyImage');
            var auditImage = localStorage.getItem('auditImage');

            var constructionPicArray = this.shadowRoot.querySelectorAll('.constructionJpg');
            constructionPicArray.forEach(element => {
                element.src = "data:image/jpeg;base64, " + constructionImage;
            });
            var commercialArray = this.shadowRoot.querySelectorAll('.commercialJpg');
            commercialArray.forEach(element => {
                element.src = "data:image/jpeg;base64, " + commercial1Image;
            });
            var contractArray = this.shadowRoot.querySelectorAll('.contractJpg');
            contractArray.forEach(element => {
                element.src = "data:image/jpeg;base64, " + contractImage;
            });
            var educationArray = this.shadowRoot.querySelectorAll('.educationJpg');
            educationArray.forEach(element => {
                element.src = "data:image/jpeg;base64, " + educationImage;
            });
            var policyArray = this.shadowRoot.querySelectorAll('.policyJpg');
            policyArray.forEach(element => {
                element.src = "data:image/jpeg;base64, " + policyImage;
            });
            var auditArray = this.shadowRoot.querySelectorAll('.auditJpg');
            auditArray.forEach(element => {
                element.src = "data:image/jpeg;base64, " + auditImage;
            });
            this.shadowRoot.querySelector('#imgHeightRef').src = "data:image/jpeg;base64, " + constructionImage;
            this.shadowRoot.querySelector('#commercialJpg').src = "data:image/jpeg;base64, " + commercial1Image;
            this.shadowRoot.querySelector('#contractJpg').src = "data:image/jpeg;base64, " + contractImage;
            this.shadowRoot.querySelector('#educationJpg').src = "data:image/jpeg;base64, " + educationImage;
            this.shadowRoot.querySelector('#policyJpg').src = "data:image/jpeg;base64, " + policyImage;
            this.shadowRoot.querySelector('#auditJpg').src = "data:image/jpeg;base64, " + auditImage;
            setTimeout(() => {
                this.shadowRoot.querySelector("#loader").style.display = "none";
                this.shadowRoot.querySelector("#cardRegion").style.display = "block";
                this._resizeCard();
            }, 100);
        }
    }
    _resizeCard () {
        var imgHeightRef = this.shadowRoot.querySelector("#imgHeightRef");
        var imgStyle = window.getComputedStyle(imgHeightRef);
        var imgHeight = imgStyle.height;
        var imgsToChange = this.shadowRoot.querySelectorAll(".imgHeight");
        imgsToChange.forEach(element => {
            element.style.maxHeight = imgHeight;
        });
        var cardRef = this.shadowRoot.querySelector("#cardHeightRef");
        var cardStyle = window.getComputedStyle(cardRef);
        var cardHeight = cardStyle.height;
        var cardsToChange = this.shadowRoot.querySelectorAll(".cardHeight");
        cardsToChange.forEach(element => {
            element.style.minHeight = cardHeight;
        });
        var imgHeightRefMedium = this.shadowRoot.querySelector("#imgHeightRefMedium");
        imgStyle = window.getComputedStyle(imgHeightRefMedium);
        imgHeight = imgStyle.height;
        imgsToChange = this.shadowRoot.querySelectorAll(".imgHeightMedium");
        imgsToChange.forEach(element => {
            element.style.maxHeight = imgHeight;
        });
        var cardRefMedium = this.shadowRoot.querySelector("#cardHeightRefMedium");
        cardStyle = window.getComputedStyle(cardRefMedium);
        cardHeight = cardStyle.height;
        cardsToChange = this.shadowRoot.querySelectorAll(".cardHeightMedium");
        cardsToChange.forEach(element => {
            element.style.minHeight = cardHeight;
        });
    }

    _getBase64Image(img) {
        var canvas = this.shadowRoot.querySelector("#canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);

        var dataURL = canvas.toDataURL("image/jpeg");
        canvas.style.display = 'none';
        return dataURL.replace(/data:image[^;]+;base64,/,'');
    }

    _getPics(ref,name,ele,storageName) {
        var appJpg = ref.ref('images/'+name);
        appJpg.getDownloadURL().then((url) => {
            ele.src = url;
            ele.onload = () => {
                this.numOfPics++;
                var mediumPics = this.shadowRoot.querySelectorAll('.' + storageName + 'Jpg');
                console.log('storageName',storageName);
                mediumPics.forEach(element => {
                    element.src = url;
                });
                var imgData = this._getBase64Image(ele);
                localStorage.setItem(storageName + 'Image', imgData);
                console.log(this.numOfPics);
                if (this.numOfPics == 6) {
                    setTimeout(() => {
                        this.shadowRoot.querySelector("#loader").style.display = "none";
                        this.shadowRoot.querySelector("#cardRegion").style.display = "block";
                        this._resizeCard();
                    }, 500);
                }
            };
        });
    }

}

window.customElements.define('about-us', AboutUs);
