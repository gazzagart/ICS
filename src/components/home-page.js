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
    <div class="w3-card-4" style="margin-top:32px;">
      <section class="hiddenSingle" style="padding-bottom: 0 !important;">
        <h2>Welcome <br> Integral Commercial Services</h2>
      </section>
      <!--First row  -->
      <!-- Shown on larger screen sizes -->
      <div class="w3-row-padding w3-section w3-stretch w3-hide-small">
        <div class="w3-col w3-container l6 m6 w3-padding hiddenLeftRight">
          <img src="" class="w3-round w3-image applicationEle w3-card-4" crossorigin="anonymous" alt="Contract" style="width:100%">
        </div>

      <div class="w3-col w3-container l6 m6 hiddenLeftRight">
          <div style="padding-right:24px;">
          <h3 class="w3-center">About ICS</h3>
            <h5 class="w3-center">Excellence is our standard</h5>
            <p class="w3-large">Integral handles your company’s legal concerns, allowing you to focus on what matters – growth and profit.</p>
            <p class="w3-large w3-text-grey w3-hide-medium">
              Labour relations, commercial contracts, company registrations and maintenance, BEE and more.
            </p>
            <div class="w3-center"><paper-button @click="${this._aboutUs}" class="w3-indigo">more</paper-button></div>
          </div>
      </div>
    </div>
    <!-- When we have a phone screen display this -->
    <div class="w3-row-padding w3-section w3-stretch w3-hide-medium w3-hide-large">
        <div class="w3-col w3-container l6 m6 w3-padding-large hiddenLeftRight">
            <img src="" class="w3-round w3-image applicationEle w3-card-4" crossorigin="anonymous" alt="Contract" style="width:100%">
        </div>

        <div class="w3-col l6 m6 hiddenLeftRight">
            <div style="padding-left:24px;padding-right:24px;">
              <h3 class="w3-center">About ICS</h3>
              <h5 class="w3-center">Excellence is our standard</h5>
              <p class="w3-large">Integral handles your company’s legal concerns, allowing you to focus on what matters – growth and profit.</p>
              <p class="w3-large w3-text-grey">
                Labour relations, commercial contracts, company registrations and maintenance, BEE and more.
              </p>
              <div class="w3-center"><paper-button @click="${this._aboutUs}" class="w3-indigo">more</paper-button></div>
            </div>
      </div>
    </div>
    <!-- END OF FIRST ROW -->
    <!-- Second Row -->
    <div class="w3-row-padding w3-section w3-stretch w3-padding">
        <div class="w3-col l6 m6 hiddenUpDown" style="padding-left:24px;">
              <h3 class="w3-center">Our Offices</h3>
              <p class="w3-large">Our offices are located in Johannesburg.</p><br>
        </div>

        <div class="w3-col l6 m6 w3-padding-large hiddenUpDown">
            <img src="" class="w3-round w3-image labourEle w3-card-4" crossorigin="anonymous" alt="Labour Law" id="imgHeightRef" style="width:100%">
        </div>
    </div>
    <!-- END OF SECOND ROW -->
  </div>
    <!-- Contact me  -->
    <div class="w3-container w3-card-4 w3-padding hiddenSingle" id="contact">
      <h3>Contact Us</h3>
      <p class="w3-large">We offer full-service law servies for any business, large or small. We understand your needs and we will find solutions to your problems. Do not hesitate to contact us.</p>
      <!-- <p class="w3-text-blue-grey w3-large"><b>Law Service, 41 Redge Drive, 0081 Faerie Glen, PTA</b></p> -->
      <p class="w3-large">You can also contact us by email <span class="w3-text-blue w3-hover-opacity"><a href="mailto:admin@integralservices.co.za">admin@integralservices.co.za</a></span>, or you can send us an email from here:</p>
      <div class="w3-center"><paper-button @click="${this._contactPage}" class="w3-indigo">contact page</paper-button></div>
    </div>
    <canvas id="canvas"></canvas>
    `;
  }

  _contactPage() {
    window.location.href = "/contact-us";
  }

  _aboutUs () {
    window.location.href='/about-us';
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
  }

}

window.customElements.define('home-page', HomePage);
