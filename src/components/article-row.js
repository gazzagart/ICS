import { LitElement, html } from 'lit-element';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import{ w3css } from './w3-css.js';

import '@polymer/paper-button/paper-button.js';


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
                        <p class="w3-medium w3-left-align w3-text-grey w3-margin-left">${this.data[0].subTitle}</p>
                        <div class="w3-center">
                            <paper-button @click="${() => {window.location.href = "/single-article#" + this.data[0].Id;}}" raised class="w3-indigo">open article</paper-button>
                        </div>
                        <p class="w3-large w3-margin-left w3-margin-right w3-margin-bottom" style="text-align: justify !important;">${this.data[0].body.substring(0, 400).replace(/\\n/g, '\n') + "..."}</p>
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
                        <p class="w3-medium w3-left-align w3-text-grey w3-margin-left">${this.data[1].subTitle}</p>
                        <div class="w3-center">
                            <paper-button @click="${() => {window.location.href = "/single-article#" + this.data[1].Id;}}" raised class="w3-indigo">open article</paper-button>
                        </div>
                        <p class="w3-large w3-margin-left w3-margin-right w3-margin-bottom" style="text-align: justify !important;">${this.data[1].body.substring(0, 400).replace(/\\n/g, '\n') + "..."}</p>
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
                        <p class="w3-medium w3-left-align w3-text-grey w3-margin-left">${this.data[2].subTitle}</p>
                        <div class="w3-center">
                            <paper-button @click="${() => {window.location.href = "/single-article#" + this.data[2].Id;}}" raised class="w3-indigo">open article</paper-button>
                        </div>
                        <p class="w3-large w3-margin-left w3-margin-right w3-margin-bottom" style="text-align: justify !important;">${this.data[2].body.substring(0, 400).replace(/\\n/g, '\n') + "..."}</p>
                    </div>
                </div>
            </div>
            <!-- END OF SMALL AND LARGE ROW -->
            <!-- SINGLE ROW ARTICLE -->
            <div class="w3-row w3-section w3-stretch w3-center w3-card-4" style="padding-bottom:16px;">
                <div class="w3-container w3-col l8 m8 s8">
                    <h4>${this.data[2].title}</h4>
                    <p class="w3-medium w3-left-align w3-text-grey w3-margin-left">${this.data[2].subTitle}</p>
                    <p class="w3-large w3-margin-left w3-margin-right w3-margin-bottom" style="text-align: justify !important;">${this.data[2].body.substring(0, 400).replace(/\\n/g, '\n') + "..."}</p>
                    <div class="w3-center">
                        <paper-button @click="${() => {window.location.href = "/single-article#" + this.data[2].Id;}}" raised class="w3-indigo">open article</paper-button>
                    </div>
                </div>
                <div class="w3-container w3-col l4 m4 s4">
                    <div class="loader" style="text-align:center!important;margin-top:32px;">
                        <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
                    </div>
                    <div class="w3-center">
                        <img src="" crossorigin="anonymous" class="w3-image" id="img3">
                    </div>
                </div>
            </div>
            <!-- END OF SINGLE ROW ARTICLE -->
            `;
    }

    constructor () {
        super();
        this.numOfPics = 0;
        this._getPics = this._getPics.bind(this);
        this._resizeCard = this._resizeCard.bind(this);
    }

    firstUpdated () {
        this._firstResize();
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
    _firstResize () {
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

/** needed for article-page if we dont use one one per line.
 * var db = firebase.firestore();
    var numberOfArticles = 0;
    db.collection("articles").orderBy("date", "desc").limit(12).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          let data = doc.data();
          data.Id = doc.id;
          if(doc.id == 'articleCount') numberOfArticles = data.count;
          else if(doc.id != 'Contracts' && doc.id != 'Labour') {
            if(data.body.length > 399)
              data.body = data.body.substring(0, 400)+"...";
            this.dataArray.push(data);
          }
      });
    }).then(() => {
      if((numberOfArticles % 3) == 1) {
        // We need two place holders
        var jsonPass = {title: "Did You Know?", body: "Body", subTitle: "Contracts", image:"audit.jpg", Id: "Contracts"};
        this.dataArray.push(jsonPass);
        jsonPass = {title: "Did You Know?", body: "Body", subTitle: "Labour", image:"construction.jpg", Id: "Labour"};
        this.dataArray.push(jsonPass);
      } else if ((numberOfArticles % 3) == 2) {
        // We need one place holder
        var jsonPass = {title: "Did You Know?", body: "Body", subTitle: "Labour", image:"construction.jpg", Id: "Labour"};
        this.dataArray.push(jsonPass);
      }
      var length = this.dataArray.length;
      var counter = 0;
      while (counter < length) {
        // var ele = document.createElement('article-row');
        // var arrayPass = [];
        var cardEle = document.createElement('article-card');
          cardEle.setAttribute('data',JSON.stringify(this.dataArray[counter]));
          this.shadowRoot.querySelector('#articles').appendChild(cardEle);
          counter++;
        for(var a = 0; a < 3; a++) {
          arrayPass.push(this.dataArray[counter]);
          var cardEle = document.createElement('article-card');
          cardEle.setAttribute('data',JSON.stringify(this.dataArray[counter]));
          this.shadowRoot.querySelector('#articles').appendChild(cardEle);
          counter++;
        }
        // ele.setAttribute('data',JSON.stringify(arrayPass));
        // this.shadowRoot.querySelector('#articles').appendChild(ele);
      }
      this.shadowRoot.querySelector('#articles').style.display = "block";
      this.shadowRoot.querySelector('#loader').style.display = "none";
    });
      this.shadowRoot.querySelector('#articles').style.display = "block";
      this.shadowRoot.querySelector('#loader').style.display = "none";
 */
