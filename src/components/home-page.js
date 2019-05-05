import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  updateFirstLoad,
} from '../actions/app.js'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import{ w3css } from './w3-css.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner';
// import './firebase-img.js';

class HomePage extends connect(store)(PageViewElement) {
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
      p {
          text-align: justify;
          text-justify: inter-word;
        }
      paper-button.indigo {
          background-color: var(--paper-indigo-500);
          color: white;
          --paper-button-raised-keyboard-focus: {
              background-color: var(--paper-pink-a200) !important;
              color: white !important;
          };
      }
      /* Full height image header */
      .bgimg {
        background-image: url("https://www.w3schools.com/w3images/mac.jpg");
        background-position: center;
        background-size: cover;
        min-height: 100%;
      }
      span {
        font-family: 'Muli' sans-serif;
        font-weight: 400;
        font-style: normal;
      }
      paper-card{
        --paper-card-header-color: white;
      }
      @keyframes animatetop{
        from{top:-300px;opacity:0} to{top:0;opacity:1}
      }
      @keyframes fade-in {
        from {opacity: 0; transform: scale(.7,.7)}
        to {opacity: 1;}
    }
      .fade-in-element {
        animation: fade-in 1.4s;
      }
      .animateTop {
        animation:animatetop 1.0s
      }
      .hidden, .hiddenSingle, .hiddenLeftRight, .hiddenUpDown {
        opacity: 0;
      }
    </style>
  <div style="overflow-x: hidden;">
    <div class="w3-card-4" style="margin-top:32px;">
      <section class="hiddenSingle" style="padding-bottom: 0 !important;">
        <h1 class="w3-center" style="text-transform: uppercase;font-family: 'ICSFont';color:#283593;">Specialist legal services to businesses.  </h1>
      </section>
      <!--First row  -->
      <!-- Shown on larger screen sizes -->
      <div class="w3-row-padding w3-section w3-stretch w3-hide-small">
        <div class="w3-col w3-container l6 m6 w3-padding hiddenLeftRight">
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAF7AjoDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECA//EACUQAQEBAAEEAgIDAAMAAAAAAAABERICITFRQXFhgZGhscHR8P/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDQmyM3qoN9p5Tl6Y0ygttReLWAsE2EBRQEFAQUBAAAAAAAAAAAAAAUAAAAAAAAAHPqjDr1Ts5AAAAAAAAAAoILi4DK412S0DFxnQF01ADRFBFEBUUBFAAQBUUBFEBVkb/QCTpXtE2mAu+k71cUEkUAURQAAAQFQAURQAAQVAAAAAAAFQBQAAAAAAAK43y7OfVPkGBZGgZxcUBFAGcXF2JaC4bGQFtTViAL5QADyABgCLgAAgKigIoACAAoCL2AHVDVBFAAAAAAAAAAAAUBBQBABRAAVAAAAAAAFQBQAAAAAAAZsRepICCgM3UaSghEAWosMBF8nYoBggL4DyAHkwAA8gAgKinYEUPIAgCooCKAOmKAAAAAAAAAAoAAAIAAAAAAoIKgAAAqAAAAAKigAAAAIJQSsqgNarm3KAKgM4jbNgIigIsADDEXQAwADDQRcADQAPIL2BlS9gC4IAqAALi4DoAAAAAAAAqAAAAAAAAAAoCKAAAAAAACKAgACooAAAIAlVAZABEUBqVXNuX4BUUBisujNgIAAABoigSlgviewQAF8T2mkpYAAB9i4uAyY2AzigAKA0AAAAAAAAAAAAAAoAAACAKAAAAAAAAAAACCoCiKAgAIqAyAAigMqIDcqsNygAAxYjozZ+O4MgAuTOyE7Lm94CE7BlBc+YjUmLgMd2pGgGcVQEFAQUBBUAABoAAAAAAAAAAFBAAVAAABQAAAAAAAAAAAAAAAEUBAQFQQBFQAABFAZWUQHSVXOVuUAUBixl0AYyrJjQCYoAAAAAAAAAAAAAgoCgAA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" class="w3-round w3-image applicationEle w3-card-4" crossorigin="anonymous" alt="Contract" style="width:100%">
        </div>

      <div class="w3-col w3-container l6 m6 hiddenLeftRight">
          <div style="padding-right:24px;">
          <h3 class="w3-center">About integral</h3>
            <h5 class="w3-center">Excellence is our standard</h5>
            <p class="w3-large">Integral Company Services provides expert legal and compliance services to companies. As a business owner, legal compliance is one of your company’s many concerns.
        Unfortunately, many companies are not aware of the many laws and regulations with which they must comply, and the penalties for non-compliance can be significant. Our
        experience in labour and commercial law enable us to provide excellent service and advice to your company, enabling you to focus on growth with the peace of mind knowing that
        your compliance concerns are covered.</p>
            <p class="w3-large w3-text-grey w3-hide-medium">
            We are also backed by commercial and litigation attorneys, allowing us to offer your company debt
        collection and litigation (court) services.
            </p>
          </div>
      </div>
    </div>
    <!-- When we have a phone screen display this -->
    <div class="w3-row-padding w3-section w3-stretch w3-hide-medium w3-hide-large">
        <div class="w3-col w3-container l6 m6 w3-padding-large hiddenLeftRight">
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAF7AjoDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECA//EACUQAQEBAAEEAgIDAAMAAAAAAAABERICITFRQXFhgZGhscHR8P/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDQmyM3qoN9p5Tl6Y0ygttReLWAsE2EBRQEFAQUBAAAAAAAAAAAAAAUAAAAAAAAAHPqjDr1Ts5AAAAAAAAAAoILi4DK412S0DFxnQF01ADRFBFEBUUBFAAQBUUBFEBVkb/QCTpXtE2mAu+k71cUEkUAURQAAAQFQAURQAAQVAAAAAAAFQBQAAAAAAAK43y7OfVPkGBZGgZxcUBFAGcXF2JaC4bGQFtTViAL5QADyABgCLgAAgKigIoACAAoCL2AHVDVBFAAAAAAAAAAAAUBBQBABRAAVAAAAAAAFQBQAAAAAAAZsRepICCgM3UaSghEAWosMBF8nYoBggL4DyAHkwAA8gAgKinYEUPIAgCooCKAOmKAAAAAAAAAAoAAAIAAAAAAoIKgAAAqAAAAAKigAAAAIJQSsqgNarm3KAKgM4jbNgIigIsADDEXQAwADDQRcADQAPIL2BlS9gC4IAqAALi4DoAAAAAAAAqAAAAAAAAAAoCKAAAAAAACKAgACooAAAIAlVAZABEUBqVXNuX4BUUBisujNgIAAABoigSlgviewQAF8T2mkpYAAB9i4uAyY2AzigAKA0AAAAAAAAAAAAAAoAAACAKAAAAAAAAAAACCoCiKAgAIqAyAAigMqIDcqsNygAAxYjozZ+O4MgAuTOyE7Lm94CE7BlBc+YjUmLgMd2pGgGcVQEFAQUBBUAABoAAAAAAAAAAFBAAVAAABQAAAAAAAAAAAAAAAEUBAQFQQBFQAABFAZWUQHSVXOVuUAUBixl0AYyrJjQCYoAAAAAAAAAAAAAgoCgAA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" class="w3-round w3-image applicationEle w3-card-4" crossorigin="anonymous" alt="Contract" style="width:100%">
        </div>

        <div class="w3-col l6 m6 hiddenLeftRight">
            <div style="padding-left:24px;padding-right:24px;">
              <h3 class="w3-center">About integral</h3>
              <h5 class="w3-center">Excellence is our standard</h5>
              <p class="w3-large">Integral Company Services provides expert legal and compliance services to companies. As a business owner, legal compliance is one of your company’s many concerns.
        Unfortunately, many companies are not aware of the many laws and regulations with which they must comply, and the penalties for non-compliance can be significant. Our
        experience in labour and commercial law enable us to provide excellent service and advice to your company, enabling you to focus on growth with the peace of mind knowing that
        your compliance concerns are covered.</p>
              <p class="w3-large w3-text-grey">
              We are also backed by commercial and litigation attorneys, allowing us to offer your company debt
        collection and litigation (court) services.
              </p>
            </div>
      </div>
    </div>
    <section>
        <h2 class="w3-animate-top">Expertise</h2>
    </section>
    <div id="loader" style="text-align:center!important;margin-top:32px;">
        <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
    </div>
    <!-- START OF CARDS -->
        <div id="cardRegion" class="w3-animate-opacity" style="display:none; padding:32px;">
            <div class="w3-margin w3-row-padding w3-section w3-stretch w3-hide-medium hiddenUpDown">
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
                <div class="w3-container w3-col l4 s12">
                    <div class="w3-center w3-card-4 cardHeight">
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
            <div class="w3-margin w3-row-padding w3-section w3-stretch w3-hide-medium hiddenUpDown">
            <!-- START OF SECOND ROW LARGE AND SMALL -->
                    <div class="w3-container w3-col l4 s12 w3-margin-bottom" id="cardHeightRef">
                        <div class="w3-center w3-card-4">
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
            <div class="w3-margin w3-row-padding w3-section w3-stretch w3-hide-small w3-hide-large hiddenLeftRight">
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
            <div class="w3-margin w3-row-padding w3-section w3-stretch w3-hide-small w3-hide-large hiddenLeftRight">
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
    <!-- END OF FIRST ROW -->
  </div>
    <!-- Contact me  -->
    <div class="w3-container w3-card-4 w3-padding hiddenSingle" id="contact">
      <h3 class="w3-center">Contact Us</h3>
      <p class="w3-large">We offer full-service law services for any business, large or small. We understand your needs and we will find solutions to your problems. Do not hesitate to contact us.</p>
      <p class="w3-large">For a free review of your company’s employment contract, email from here: <span class="w3-text-blue w3-hover-opacity">
      <a href="mailto:admin@integralservices.co.za">admin@integralservices.co.za</a></span>, or you can contact us at:
      <span class="w3-text-blue-grey w3-large"><b><a class="w3-hide-large w3-hide-medium" href="tel:010-500-0960">(010) 500 0960</a><span class="w3-hide-small">(010) 500 0960</span>.</b></span></p>
      <div class="w3-center"><paper-button @click="${this._contactPage}" class="w3-indigo">contact page</paper-button></div>
    </div>
  </div>
    <canvas id="canvas"></canvas>
    `;
  }

  _contactPage() {
    window.location.href = "/contact-us";
  }

  _resizeCard () {
    var imgHeightRef = this.shadowRoot.querySelector("#imgHeightRef");
    var imgStyle = window.getComputedStyle(imgHeightRef);
    var imgHeight = imgStyle.height;
    var imgsToChange = this.shadowRoot.querySelectorAll(".applicationEle");
    imgsToChange.forEach(element => {
        element.style.maxHeight = imgHeight;
    });
    var cardsToChange = this.shadowRoot.querySelectorAll(".cardHeight");
    cardsToChange.forEach(element => {
        element.style.minHeight = imgHeight;
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

  firstUpdated() {
    //Next few lines goes and fetches the pictures from either cloud storage, or local storage.
    var applicationJpgBase64 = localStorage.getItem('applicationImage');
    if (applicationJpgBase64 == undefined || applicationJpgBase64 == null){
      var storage = firebase.storage();
      var applicationJpg = storage.ref('images/application.jpg');
      var labourJpg = storage.ref('images/labour.jpg');
      // Get the download URL
      applicationJpg.getDownloadURL().then((url) => {
      // Insert url into an <img> tag to "download"
        var applicationPicArray = this.shadowRoot.querySelectorAll('.applicationEle');
        applicationPicArray.forEach(element => {
          element.src = url;
        });
        //  Here we get the picture and get the base64 string to then store it client side.
        //  We wait for the acutal image to load first before grabbing it.
        //? Remember to replicate this in other apps, you must ensure CORS policy is correctly done.
        //? https://firebase.google.com/docs/storage/web/download-files#cors_configuration
        applicationPicArray[0].onload = () => {
          var imgData = this._getBase64Image(applicationPicArray[0]);
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
      labourJpg.getDownloadURL().then((url) => {
        // Insert url into an <img> tag to "download"
          var labourArray = this.shadowRoot.querySelectorAll('.labourEle');
          labourArray.forEach(element => {
            element.src = url;
          });
          labourArray[0].onload = () => {
            var imgData = this._getBase64Image(labourArray[0]);
            localStorage.setItem("labourImage", imgData);
          };
        }).catch(function(error) {

          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
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
    } else {
      var dataApplicationImage = localStorage.getItem('applicationImage');
      var dataLabourImage = localStorage.getItem('labourImage');

      var applicationPicArray = this.shadowRoot.querySelectorAll('.applicationEle');
      applicationPicArray.forEach(element => {
        element.src = "data:image/jpeg;base64, " + dataApplicationImage;
      });
      var labourArray = this.shadowRoot.querySelectorAll('.labourEle');
      labourArray.forEach(element => {
        element.src = "data:image/jpeg;base64, " + dataLabourImage;
      });
    }


    store.dispatch(updateFirstLoad());
    var animateHTML = () => {
      var hiddenLeftRightElems;
      var hiddenSingleElems;
      var hiddenUpDown;
      var windowHeight;
      var init = () => {
        hiddenSingleElems = this.shadowRoot.querySelectorAll('.hiddenSingle');
        hiddenLeftRightElems = this.shadowRoot.querySelectorAll('.hiddenLeftRight');
        hiddenUpDown = this.shadowRoot.querySelectorAll('.hiddenUpDown');
        windowHeight = window.innerHeight;
        addEventHandlers();
        checkPosition();
      }
      function addEventHandlers() {
        window.addEventListener('scroll', checkPosition);
        window.addEventListener('resize', init);
      }
      function checkPosition() {
        for (var a = 0; a < hiddenSingleElems.length; a++) {
          var positionFromTop = hiddenSingleElems[a].getBoundingClientRect().top;
          if (positionFromTop - windowHeight <= -220) {
            hiddenSingleElems[a].className = hiddenSingleElems[a].className.replace(
              'hiddenSingle',
              'fade-in-element'
            );
          }
        }
        for (var b = 0; b < hiddenLeftRightElems.length; b++) {
          var positionFromTop = hiddenLeftRightElems[b].getBoundingClientRect().top;
          if (positionFromTop - windowHeight <= -220) {
            if((b % 2) == 0) {
              hiddenLeftRightElems[b].className = hiddenLeftRightElems[b].className.replace(
                'hiddenLeftRight',
                'fade-in-element w3-animate-right'
              );
            } else {
              hiddenLeftRightElems[b].className = hiddenLeftRightElems[b].className.replace(
                'hiddenLeftRight',
                'fade-in-element w3-animate-left'
              );
            }
          }
        }
        for (var i = 0; i < hiddenUpDown.length; i++) {
          var positionFromTop = hiddenUpDown[i].getBoundingClientRect().top;
          if (positionFromTop - windowHeight <= -220) {
            if((i % 2) == 0) {
              hiddenUpDown[i].className = hiddenUpDown[i].className.replace(
                'hiddenUpDown',
                'fade-in-element w3-animate-top'
              );
            } else {
              hiddenUpDown[i].className = hiddenUpDown[i].className.replace(
                'hiddenUpDown',
                'fade-in-element  w3-animate-bottom'
              );
            }
          }
        }
      }
      return {
        init: init
      };
    };
    animateHTML().init();
    // About us section
    window.addEventListener("resize", () => {
        this._resizeCardAboutUs();
    });
    if(localStorage.getItem('auditImage') == undefined || localStorage.getItem('auditImage') == null) {
        var storage = firebase.storage();
        this._getPics(storage,'construction.jpg',this.shadowRoot.querySelector('#imgHeightRef'),'construction');
        this._getPics(storage,'commercial1.jpg',this.shadowRoot.querySelector('#commercialJpg'),'commercial');
        this._getPics(storage,'contract1.jpg',this.shadowRoot.querySelector('#contractJpg'),'contract');
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
            this._resizeCardAboutUs();
        }, 100);
    }
  }

  _resizeCardAboutUs () {
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

_getPics(ref,name,ele,storageName) {
    var appJpg = ref.ref('images/'+name);
    appJpg.getDownloadURL().then((url) => {
        ele.src = url;
        ele.onload = () => {
            this.numOfPics++;
            var mediumPics = this.shadowRoot.querySelectorAll('.' + storageName + 'Jpg');
            mediumPics.forEach(element => {
                element.src = url;
            });
            var imgData = this._getBase64Image(ele);
            localStorage.setItem(storageName + 'Image', imgData);
            if (this.numOfPics == 6) {
                setTimeout(() => {
                    this.shadowRoot.querySelector("#loader").style.display = "none";
                    this.shadowRoot.querySelector("#cardRegion").style.display = "block";
                    this._resizeCardAboutUs();
                }, 500);
            }
        };
    });
}

}

window.customElements.define('home-page', HomePage);
