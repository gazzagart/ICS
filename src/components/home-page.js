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
        <h2 class="webFont">Welcome <br> Integral Commercial Services</h2>
      </section>
      <!--First row  -->
      <!-- Shown on larger screen sizes -->
      <div class="w3-row-padding w3-section w3-stretch w3-hide-small">
        <div class="w3-col w3-container l6 m6 w3-padding hiddenLeftRight">
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAF7AjoDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECA//EACUQAQEBAAEEAgIDAAMAAAAAAAABERICITFRQXFhgZGhscHR8P/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDQmyM3qoN9p5Tl6Y0ygttReLWAsE2EBRQEFAQUBAAAAAAAAAAAAAAUAAAAAAAAAHPqjDr1Ts5AAAAAAAAAAoILi4DK412S0DFxnQF01ADRFBFEBUUBFAAQBUUBFEBVkb/QCTpXtE2mAu+k71cUEkUAURQAAAQFQAURQAAQVAAAAAAAFQBQAAAAAAAK43y7OfVPkGBZGgZxcUBFAGcXF2JaC4bGQFtTViAL5QADyABgCLgAAgKigIoACAAoCL2AHVDVBFAAAAAAAAAAAAUBBQBABRAAVAAAAAAAFQBQAAAAAAAZsRepICCgM3UaSghEAWosMBF8nYoBggL4DyAHkwAA8gAgKinYEUPIAgCooCKAOmKAAAAAAAAAAoAAAIAAAAAAoIKgAAAqAAAAAKigAAAAIJQSsqgNarm3KAKgM4jbNgIigIsADDEXQAwADDQRcADQAPIL2BlS9gC4IAqAALi4DoAAAAAAAAqAAAAAAAAAAoCKAAAAAAACKAgACooAAAIAlVAZABEUBqVXNuX4BUUBisujNgIAAABoigSlgviewQAF8T2mkpYAAB9i4uAyY2AzigAKA0AAAAAAAAAAAAAAoAAACAKAAAAAAAAAAACCoCiKAgAIqAyAAigMqIDcqsNygAAxYjozZ+O4MgAuTOyE7Lm94CE7BlBc+YjUmLgMd2pGgGcVQEFAQUBBUAABoAAAAAAAAAAFBAAVAAABQAAAAAAAAAAAAAAAEUBAQFQQBFQAABFAZWUQHSVXOVuUAUBixl0AYyrJjQCYoAAAAAAAAAAAAAgoCgAA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" class="w3-round w3-image applicationEle w3-card-4" crossorigin="anonymous" alt="Contract" style="width:100%">
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
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAF7AjoDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECA//EACUQAQEBAAEEAgIDAAMAAAAAAAABERICITFRQXFhgZGhscHR8P/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDQmyM3qoN9p5Tl6Y0ygttReLWAsE2EBRQEFAQUBAAAAAAAAAAAAAAUAAAAAAAAAHPqjDr1Ts5AAAAAAAAAAoILi4DK412S0DFxnQF01ADRFBFEBUUBFAAQBUUBFEBVkb/QCTpXtE2mAu+k71cUEkUAURQAAAQFQAURQAAQVAAAAAAAFQBQAAAAAAAK43y7OfVPkGBZGgZxcUBFAGcXF2JaC4bGQFtTViAL5QADyABgCLgAAgKigIoACAAoCL2AHVDVBFAAAAAAAAAAAAUBBQBABRAAVAAAAAAAFQBQAAAAAAAZsRepICCgM3UaSghEAWosMBF8nYoBggL4DyAHkwAA8gAgKinYEUPIAgCooCKAOmKAAAAAAAAAAoAAAIAAAAAAoIKgAAAqAAAAAKigAAAAIJQSsqgNarm3KAKgM4jbNgIigIsADDEXQAwADDQRcADQAPIL2BlS9gC4IAqAALi4DoAAAAAAAAqAAAAAAAAAAoCKAAAAAAACKAgACooAAAIAlVAZABEUBqVXNuX4BUUBisujNgIAAABoigSlgviewQAF8T2mkpYAAB9i4uAyY2AzigAKA0AAAAAAAAAAAAAAoAAACAKAAAAAAAAAAACCoCiKAgAIqAyAAigMqIDcqsNygAAxYjozZ+O4MgAuTOyE7Lm94CE7BlBc+YjUmLgMd2pGgGcVQEFAQUBBUAABoAAAAAAAAAAFBAAVAAABQAAAAAAAAAAAAAAAEUBAQFQQBFQAABFAZWUQHSVXOVuUAUBixl0AYyrJjQCYoAAAAAAAAAAAAAgoCgAA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" class="w3-round w3-image applicationEle w3-card-4" crossorigin="anonymous" alt="Contract" style="width:100%">
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
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAFlAiIDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECA//EACwQAQEAAQMEAQMEAgMBAQAAAAABESExUQISQWFxgZGhIrHh8DLRUnLxQoL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABcRAQEBAQAAAAAAAAAAAAAAAAARASH/2gAMAwEAAhEDEQA/AKAAAAAAy0xdwVWVRWhFBLMsOjNnkGBaioAAN3WSsLNrAXfF5bmjM/ZsHPq3ZW71ABUAb6dmGoDRlABABYuEjQCKAjNaS0GUVAAAAAAAAAAAAAURQQABvp8sNdINASUBuTBJhQRUAAAQyM38+AXMGM+oA2CAoICiKA53d0c6BFJsS+PqCytMLKitKgCWZ+XN2Zsz8qOYpiiIsMeDyDXT5auzHTuvVtgGAAURQRvpZb6dgBQGcGGsGAZ2ajPVCUG0MgJhMFTAJUWoAAAAAAAAAAAAAACoADpOIxNXWTAEigAIAomQAyn9+P4TOZmePALn78M2y+qluU0oGQx7gDooIIGDAIqgJdnO7umE7Z7UZ8I3iJekpGGksAblVhqVFVUUGbM6zdh1Z6p5ioxquPJKuQLpcs25q4z5O32DI32+zt9lGBvtnK9s5KMOk2ids5rUmAAAAAZ6vDLXV4AFRQGbeFtiaAwNYyYBkXBgEFwYBBrB2gyNdvs7fYMjfb7O32DA32+zt9gwN9vs7cgw3OjluSTZQJJNgQFQQDJUszrN2c3yDWczMSXxzsmcG+wLaSLIAM2NbJeoGBrM4AdMDQkGRoIM4GkoqIqagBrwYoM1lvFZsvCokqpi8Lig1KrCyoras5UGOqY1R0Z7QAxgQUAFAUAAAQEzIuY5Co6XwkZjQNZZyu64BnCWYbYoLFWTRcIrJhrCY9gzgax7MUGVXFO32CC9vs7fYIL2+17fYIL2+zAJJloFQDKAIAIzcxTMu4J3VdL6qWTwScgYy1sCKAIq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" class="w3-round w3-image labourEle w3-card-4" crossorigin="anonymous" alt="Labour Law" id="imgHeightRef" style="width:100%">
        </div>
    </div>
    <!-- END OF SECOND ROW -->
  </div>
    <!-- Contact me  -->
    <div class="w3-container w3-card-4 w3-padding hiddenSingle" id="contact">
      <h3 class="w3-center">Contact Us</h3>
      <p class="w3-large">We offer full-service law servies for any business, large or small. We understand your needs and we will find solutions to your problems. Do not hesitate to contact us.</p>
      <p class="w3-large">For a free review of your company’s employment contract, email from here: <span class="w3-text-blue w3-hover-opacity">
      <a href="mailto:admin@integralservices.co.za">admin@integralservices.co.za</a></span>, or you can contact us at:
      <span class="w3-text-blue-grey w3-large"><b><a class="w3-hide-large w3-hide-medium" href="010-500-0960">(010) 500 0960</a><span class="w3-hide-small">(010) 500 0960</span>.</b></span></p>
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
