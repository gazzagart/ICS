
import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import{ w3css } from './w3-css.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/neon-animation/neon-animatable.js';
import '@polymer/neon-animation/animations/scale-up-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
import '@polymer/paper-input/paper-textarea.js'
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-spinner/paper-spinner';
import './drag-drop.js';
import './snack-bar.js';
import './article-row.js';


class ArticleInput extends PageViewElement {
  static get styles() {
    return [
      SharedStyles,
      w3css
    ];
  }
  static get properties() {
    return {
        articleMessage: { type: String},
        toastOpened: {type: Boolean},
        colourSnack: {type: String},
        dataArray: { type: Array}
    };
}
constructor () {
  super();
  this.dataArray = [];
}

  render() {
    return html`
    <style>
      :host {
          --big-height: 40px;
          --small-height: 10px;
        }
        section {
          padding: 20px;
        }

        .big-placeholder {
          --paper-input-container-input: {
            font-size: var(--big-height);
          };
        }

        /* The input label is used as the input placeholder
            when the actual placeholder property is not set,
            so target the label. When increasing the font-size,
           line-height may need to be adjusted to accommodate. */
        .big-label {
          --paper-input-container-label: {
            font-size: var(--big-height);
            line-height: calc(var(--big-height) + 4px);
          };
          --paper-input-container-input: {
            font-size: var(--big-height);
          };
          --paper-input-container: {
            line-height: calc(var(--big-height) + 4px);
          };
        }
        paper-spinner {
            --paper-spinner-stroke-width: 6px;
        }
    </style>
      <section id="editButtons">
        <div class="w3-center">
          <paper-button @click="${this._editArticles}" raised class="w3-indigo">add articles</paper-button>
          <paper-button @click="${this._deleteArticles}" raised class="w3-red">delete articles</paper-button>
        </div>
      </section>
      <!-- Article section -->
      <section>
        <h2>Articles</h2>
      </section>
      <div id="loader" style="text-align:center!important;margin-top:32px;">
          <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
      </div>
      <div id="articles" style="display:none;">
      </div>
      <!-- End of articles -->
      <!-- INPUT DIALOG -->
      <paper-dialog modal id="articleInput" entry-animation="scale-up-animation" exit-animation="fade-out-animation" style="border-radius: 16px;padding-bottom: 500px;">
        <h2>Header</h2>
          <div id="inputArea">
              <paper-input required error-message="Please provide a Title" id="titleInput" label="Title" type="text"></paper-input>
              <paper-input id="subTitleInput" class="big-placeholder big-label" label="Sub Title" type="text"></paper-input>
              <paper-textarea required error-message="Please provide a body" id="bodyInput" label="Body"></paper-textarea>
              <br>
              <paper-button raised  @click="${this._addImage}" id="addImageButton" class="w3-indigo">add image</paper-button>
              <drag-drop id="dragDrop" style="display:none;"></drag-drop>
          </div>
          <div id="loader2" style="display: none;text-align:center!important;margin-top:32px;">
              <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
          </div>
          <div>
            <paper-button raised @click="${this._closeModal}" class="w3-red">Cancel</paper-button>
            <paper-button raised  @click="${this._addArticle}" id="submitButton" class="w3-indigo">add article</paper-button>
          </div>
      </paper-dialog>
      <!-- INPUT DIALOG FINISHED -->
      <snack-bar ?active="${this.toastOpened}" colour="${this.colourSnack}">
          ${this.articleMessage}.
      </snack-bar>
          `;
  }

  firstUpdated () {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.colourSnack = "#4caf50";
        this.articleMessage = "Welcome back Warwick.";
        this.toastOpened = true;
        setTimeout(() => {this.toastOpened = false;}, 2000);
      } else {
        //Logged out or doesn't have permission to see these things.
        this.colourSnack = "#f44336";
        this.articleMessage = "You are not allowed here. Rerouting.";
        this.toastOpened = true;
        setTimeout(() => {this.toastOpened = false;window.location.href = "/home-page";}, 2000);
      }
    });
    var db = firebase.firestore();
    var numberOfArticles = 0;
    db.collection("articles").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          let data = doc.data();
          if(doc.id == 'articleCount') numberOfArticles = data.count;
          else {
            this.dataArray.push(data);
          }
      });
    }).then(() => {
      if((numberOfArticles % 3) == 1) {//? 1 article.
        // We need two place holders
        var jsonPass = {title: "Title", body: "Body", subTitle: "Sub Title", image:"audit.jpg"};
        this.dataArray.push(jsonPass);
        jsonPass = {title: "Title2", body: "Body2", subTitle: "Sub Title2", image:"construction.jpg"};
        this.dataArray.push(jsonPass);
      } else if ((numberOfArticles % 3) == 2) {
        // We need one place holder
        var jsonPass = {title: "Title", body: "Body", subTitle: "Sub Title", image:"audit.jpg"};
        this.dataArray.push(jsonPass);
      }
      var length = this.dataArray.length;
      var counter = 0;
      while (counter < length) {
        var ele = document.createElement('article-row');
        var arrayPass = [];
        for(var a = 0; a < 3; a++) {
          arrayPass.push(this.dataArray[counter]);
          counter++;
        }
        ele.setAttribute('data',JSON.stringify(arrayPass));
        this.shadowRoot.querySelector('#articles').appendChild(ele);
      }
      this.shadowRoot.querySelector('#articles').style.display = "block";
      this.shadowRoot.querySelector('#loader').style.display = "none";
    });
      this.shadowRoot.querySelector('#articles').style.display = "block";
      this.shadowRoot.querySelector('#loader').style.display = "none";
  }

  _editArticles () {
    var editModal = this.shadowRoot.querySelector("#articleInput");
    if(window.innerWidth <= 400) {
      editModal.style.minWidth = "340px";
    } else if (window.innerWidth <= 720) {
      editModal.style.minWidth = "600px";
    } else if (window.innerWidth > 1000) {
      editModal.style.minWidth = "800px";
    }
    editModal.open();
  }

  _addArticle() {
    var imageDecision = sessionStorage.getItem('uploadingImage');
    var title = this.shadowRoot.querySelector('#titleInput').value;
    var body = this.shadowRoot.querySelector('#bodyInput').value;
    var subTitle = this.shadowRoot.querySelector('#subTitleInput').value;
    if(subTitle == undefined || subTitle == null){
      subTitle = "";
    }
    var imageName = sessionStorage.getItem('uploadedImage');
    var imageMeta = sessionStorage.getItem('uploadedMeta');
    if (title == undefined || body == undefined) {
        this.colourSnack = "#f44336";
        this.articleMessage = "You need to provide both a title and body before you can add a aritcle.";
        this.toastOpened = true;
        setTimeout(() => {this.toastOpened = false;}, 2000);
        return;
    }
    if(imageDecision != undefined) {
      if(imageDecision == "notUploaded"){
        this.colourSnack = "#f44336";
        this.articleMessage = "You haven't uploaded your image. Reset if you don't want an image";
        this.toastOpened = true;
        setTimeout(() => {this.toastOpened = false;}, 3000);
        return;
      }
    } else {
      imageName = "";
      imageMeta = "";
    }
    this.shadowRoot.querySelector('#inputArea').style.display = 'none';
    this.shadowRoot.querySelector('#loader2').style.display = 'block';
    var db = firebase.firestore();
    db.collection("articles").add({
      title: title,
      body: body,
      subTitle: subTitle,
      image: imageName,
      imageMeta: imageMeta
    })
    .then((docRef) => {
        this.colourSnack = "#4caf50";
        this.articleMessage = "Article writtenwith ID: " + docRef.id;
        this.toastOpened = true;
        setTimeout(() => {this.toastOpened = false;}, 2000);
        this.shadowRoot.querySelector('#inputArea').style.display = 'block';
        this.shadowRoot.querySelector('#loader2').style.display = 'none';
        this.shadowRoot.querySelector("#articleInput").close();
        var docRef = db.collection("articles").doc("articleCount");
        var articleCount = 0;
        docRef.get().then((doc) => {
          articleCount = doc.data().count + 1;
        }).then(() => {
          docRef.update({
            count: articleCount
            }).then(function() {
              console.log("Document successfully updated!");
          })
          .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });
        });
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        this.shadowRoot.querySelector('#inputArea').style.display = 'block';
        this.shadowRoot.querySelector('#loader2').style.display = 'none';
    });

  }
  _addImage () {
    var title = this.shadowRoot.querySelector('#titleInput').value;
    var body = this.shadowRoot.querySelector('#bodyInput').value;
    if (title == undefined || body == undefined) {
        this.colourSnack = "#f44336";
        this.articleMessage = "You need to provide both a title and body before you can choose a image.";
        this.toastOpened = true;
        setTimeout(() => {this.toastOpened = false;}, 2000);
        return;
    }
    this.shadowRoot.querySelector('#dragDrop').style.display = 'block';
  }

  _closeModal () {
    this.shadowRoot.querySelector("#articleInput").close();
  }

}

window.customElements.define('article-input', ArticleInput);
