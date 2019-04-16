/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

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
      <section class="hiddenSingle" style="padding-bottom: 0 !important;">
        <h2>Welcome <br> Integral Commercial Services</h2>
      </section>
      <!--First row  -->
      <!-- Shown on larger screen sizes -->
      <div class="w3-row w3-hide-small" id="about">
        <div class="w3-col l6 m6 w3-padding hiddenLeftRight">
          <img src="/images/application.jpg" class="w3-round w3-image" alt="Contract" width="800" height="900">
        </div>

        <div class="w3-col l6 m6 hiddenLeftRight">
          <div style="padding-right:24px;">
          <h1 class="w3-center">About ICS</h1>
            <h5 class="w3-center">Excellence is our standard</h5>
            <p class="w3-large">ICS takes the hastle out of finding legal services for your business. We pride ourselves on providing solutions to your law needs</p>
            <p class="w3-large w3-text-grey w3-hide-medium">
              At ICS, we want to make sure that we are providing law services that your business needs. Whether you need labour law, BEE, contracts for your business, we will make
              sure that it is getting done.
            </p>
          </div>
      </div>
    </div>
    <!-- When we have a phone screen display this -->
    <div class="w3-row w3-hide-medium w3-hide-large" id="about">
        <div class="w3-col l6 m6 w3-padding-large hiddenLeftRight">
          <img src="/images/application.jpg" class="w3-round w3-image" alt="Contract" width="800" height="900">
        </div>

        <div class="w3-col l6 m6 hiddenLeftRight">
          <div style="padding-left:24px;padding-right:24px;">
            <h1 class="w3-center">About ICS</h1>
            <h5 class="w3-center">Excellence is our standard</h5>
            <p class="w3-large">ICS takes the hastle out of finding legal services for your business. We pride ourselves on providing solutions to your law needs</p>
            <p class="w3-large w3-text-grey">
              At ICS, we want to make sure that we are providing law services that your business needs. Whether you need labour law, BEE, contracts for your business, we will make
              sure that it is getting done.
            </p>
        </div>
      </div>
    </div>
    <!-- END OF FIRST ROW -->
    <!-- Second Row -->
    <div class="w3-row w3-padding" id="menu">
      <div class="w3-col l6 m6 hiddenUpDown" style="padding-left:24px;">
        <h1 class="w3-center">Our Offices</h1>
        <h4>Bread Basket</h4>
        <p class="w3-text-grey">We have totally KEWL offices located in Pretoria.</p><br>
      </div>

      <div class="w3-col l6 m6 w3-padding-large hiddenUpDown">
        <img src="/images/labour.jpg" class="w3-round w3-image" alt="Labour Law" style="width:100%">
      </div>
    </div>
    <!-- END OF SECOND ROW -->
    <!-- Contact me  -->
    <div class="w3-container w3-padding hiddenSingle" id="contact">
      <h1>Contact Us</h1>
      <p>We offer full-service law servies for any business, large or small. We understand your needs and we will find solutions to your problems. Do not hesitate to contact us.</p>
      <p class="w3-text-blue-grey w3-large"><b>Law Service, 41 Redge Drive, 0081 Faerie Glen, PTA</b></p>
      <p>You can also contact us by phone 00553123-2323 or email .............., or you can send us a from here:</p>
      <div class="w3-center"><paper-button @click="${this._contactPage}" class="w3-indigo">contact page</paper-button></div>
    </div>
    `;
  }

  _contactPage() {
    window.location.href = "/contact-us";
  }

  firstUpdated() {
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
