
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
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import './drag-drop.js';
import './snack-bar.js';
import './article-card.js';


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
      <div id="parentOfArticles">
        <div id="loader" style="text-align:center!important;margin-top:32px;">
            <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
        </div>
        <div id="articles" style="display:none;">
        </div>
      </div>
      <!-- End of articles -->
      <!-- INPUT DIALOG -->
      <paper-dialog modal id="articleInput" entry-animation="scale-up-animation" exit-animation="fade-out-animation" style="border-radius: 16px;overflow: auto;padding-bottom:500px;">
        <h2>article input</h2>
          <div id="inputArea">
              <paper-input required error-message="Please provide a Title" id="titleInput" label="Title" type="text"></paper-input>
              <paper-input id="subTitleInput" label="Sub Title" type="text"></paper-input>
              <paper-textarea required error-message="Please provide a body" id="bodyInput" label="Body"></paper-textarea>
              <br>
              <div class="w3-center">
                <paper-button raised  @click="${this._makeBold}" id="addImageButton" class="w3-deep-purple">bold</paper-button>
                <paper-button raised  @click="${this._makeItalics}" id="addImageButton" class="w3-teal">italics</paper-button>
              </div>
              <br>
              <div class="w3-center">
                <paper-button raised  @click="${this._makeUnderline}" id="addImageButton" class="w3-amber">underline</paper-button>
              </div>
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
      <!-- ARE YOU SURE DIALOG -->
      <paper-dialog modal id="deleteModal" entry-animation="scale-up-animation" exit-animation="fade-out-animation" style="border-radius: 16px;overflow: auto;padding-bottom:50px;">
        <h2>are you sure??</h2>
          <div class="w3-center w3-xxlarge">
            <p>You are about to delete this selection. This cannot be undone.</p>
          </div>
          <div>
            <div class="w3-center">
              <paper-button raised @click="${this._deleteSelection}" class="w3-red">yes i am sure!!</paper-button>
              <paper-button raised  @click="${this._closeDeleteModal}" id="submitButton" class="w3-indigo">go back</paper-button>
            </div>
          </div>
      </paper-dialog>
      <!-- ARE YOU SURE DIALOG FINISHED -->
      <div id="deleteBar" class="w3-card-4 w3-white w3-animate-bottom" style="display:none;position: sticky; height: 60px; width: 100vw; z-index: 3; bottom: 0px;text-align:center!important;">
        <div style="padding-top: 10px;">
          <paper-button raised @click="${this._openDeleteModal}" class="w3-red">delete selection</paper-button>
          <paper-button raised @click="${this._cancelDelete}" class="w3-amber">cancel</paper-button>
        </div>
      </div>
      <snack-bar ?active="${this.toastOpened}" style="background-color: ${this.colourSnack};">
          ${this.articleMessage}.
      </snack-bar>
          `;
  }

  firstUpdated () {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this._getArticles();
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
      this.shadowRoot.querySelector("#bodyInput").value = "";
  }

  _getArticles () {
    // for (let a = 0; a < this.shadowRoot.querySelector("#parentOfArticles").childNodes.length; a++) {
    //   if(this.shadowRoot.querySelector("#parentOfArticles").childNodes[a].id == "articles") {
    //     this.shadowRoot.querySelector("#parentOfArticles").removeChild(this.shadowRoot.querySelector("#parentOfArticles").childNodes[a]);
    //   }
    // }
    // var articleHolder = document.createElement("div");
    // articleHolder.id = "articles";
    // this.shadowRoot.querySelector("#parentOfArticles").appendChild(articleHolder);
    var db = firebase.firestore();
    var numberOfArticles = 0;
    db.collection("articles").orderBy("date", "desc").limit(12).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          let data = doc.data();
          data.id = doc.id;
          if(doc.id == 'articleCount') numberOfArticles = data.count;
          else if(doc.id != 'Contracts' && doc.id != 'Labour') {
            if(data.body.length > 399)
              data.body = data.body.substring(0, 400)+"...";
              this.dataArray.push(data);
          }
      });
    }).then(() => {
      var length = this.dataArray.length;
      var counter = 0;
      while (counter < length) {
        var cardEle = document.createElement('article-card');
        cardEle.setAttribute('data',JSON.stringify(this.dataArray[counter]));
        this.shadowRoot.querySelector('#articles').appendChild(cardEle);
        counter++;
      }
      this.shadowRoot.querySelector('#articles').style.display = "block";
      this.shadowRoot.querySelector('#loader').style.display = "none";
    });
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
    body = body.replace(/\n/g, '\\n');
    var subTitle = this.shadowRoot.querySelector('#subTitleInput').value;
    if(subTitle == undefined || subTitle == null){
      subTitle = "";
    }
    var imageName = sessionStorage.getItem('uploadedImage');
    var imageMeta = sessionStorage.getItem('uploadedMeta');
    if (title == "" || body == "") {
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
      imageMeta: imageMeta,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      likes: 0,
      views: 0
    })
    .then((docRef) => {
        this.colourSnack = "#4caf50";
        this.articleMessage = "Article writtenwith ID: " + docRef.id;
        this.toastOpened = true;
        setTimeout(() => {this.toastOpened = false;}, 1500);
        this.shadowRoot.querySelector('#inputArea').style.display = 'block';
        this.shadowRoot.querySelector('#loader2').style.display = 'none';
        this.shadowRoot.querySelector("#articleInput").close();
        var docRef = db.collection("articles").doc("articleCount");
        var articleCount = 0;
        docRef.get().then((doc) => {
          articleCount = doc.data().count + 1;
        }).then(() => {
          docRef.update({
            count: articleCount,
            date: firebase.firestore.Timestamp.fromDate(new Date()) // So that we always get this in limit query by desc
            }).then(() => {
              console.log("Document successfully updated!");
              this.shadowRoot.querySelector('#articles').style.display = "none";
              this.shadowRoot.querySelector('#loader').style.display = "block";
              setTimeout(() => {location.reload();}, 1000);
          })
          .catch((error) => {
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

  _deleteArticles () {
    var elementArray = this.shadowRoot.querySelector("#articles").childNodes;
    for (let a = 0; a < elementArray.length; a++) {
        if(elementArray[a].nodeName == "ARTICLE-CARD") {
          var elemArray = elementArray[a].shadowRoot.querySelectorAll(".checkBox");
          elemArray.forEach(element => {
            element.checked = false;
            element.style.display = "block";
          });
        }
    }
    this.shadowRoot.querySelector("#deleteBar").style.display = "block";
  }
  _cancelDelete () {
    var elementArray = this.shadowRoot.querySelector("#articles").childNodes;
    for (let a = 0; a < elementArray.length; a++) {
        if(elementArray[a].nodeName == "ARTICLE-CARD") {
          var elemArray = elementArray[a].shadowRoot.querySelectorAll(".paper-checkbox");
          elemArray.forEach(element => {
            element.checked = false;
            element.style.display = "none";
          });
        }
    }
    this.shadowRoot.querySelector("#deleteBar").style.display = "none";
  }
  _areYouSure(){

  }
  _deleteSelection () {
    this._closeDeleteModal();
    this.shadowRoot.querySelector("#deleteBar").style.display = "none";
    this.shadowRoot.querySelector("#loader").style.display = "block";
    this.shadowRoot.querySelector("#articles").style.display = "none";
    var elementArray = this.shadowRoot.querySelector("#articles").childNodes;
    var numCheck = 0;
    for (let a = 0; a < elementArray.length; a++) {
        numCheck++;
        if(elementArray[a].nodeName == "ARTICLE-CARD") {
          var elemArray = elementArray[a].shadowRoot.querySelectorAll(".paper-checkbox");
          elemArray.forEach(element => {
            if(element.checked == true) {
              var parentElem = element;
              while(parentElem.id != "parent") {
                parentElem = parentElem.parentNode;
              }
              var idOfDoc = parentElem.getAttribute("data-id");
              var picOfDoc = parentElem.getAttribute("data-img");
              var db = firebase.firestore();
              db.collection("articles").doc(idOfDoc).delete().then(() => {
                var storage = firebase.storage();
                // Create a storage reference from our storage service
                var storageRef = storage.ref();
                var imgRef = storageRef.child('articleImages/'+picOfDoc);
                console.log(picOfDoc);
                // Delete the file
                imgRef.delete().then(() => {
                  // File deleted successfully
                  console.log("Document successfully deleted!");
                  this.colourSnack = "#4caf50";
                  this.articleMessage = "Documents deleted.";
                  this.toastOpened = true;
                  setTimeout(() => {this.toastOpened = false;}, 1500);
                }).then(() => {
                  if(numCheck == elementArray.length){
                    this.shadowRoot.querySelector('#articles').style.display = "none";
                    this.shadowRoot.querySelector('#loader').style.display = "block";
                    setTimeout(() => {location.reload();}, 2000);
                  }
                });
              }).catch((error) => {
                  console.error("Error removing document: ", error);
                  this.colourSnack = "#f44336";
                  this.articleMessage = "Documents not deleted! Error.";
                  this.toastOpened = true;
                  setTimeout(() => {this.toastOpened = false;}, 2000);
              });
            }
          });
        }
    }
  }
  _addImage () {
    var title = this.shadowRoot.querySelector('#titleInput').value;
    var body = this.shadowRoot.querySelector('#bodyInput').value;
    if (title == "" || body == "") {
        this.colourSnack = "#f44336";
        this.articleMessage = "You need to provide both a title and body before you can choose a image.";
        this.toastOpened = true;
        setTimeout(() => {this.toastOpened = false;}, 2000);
        return;
    }
    this.shadowRoot.querySelector('#dragDrop').style.display = 'block';
  }

  _makeBold () {
    this.shadowRoot.querySelector("#bodyInput").value = this.shadowRoot.querySelector("#bodyInput").value + "*PUT BOLD TEXT HERE*";
  }

  _makeItalics () {
    this.shadowRoot.querySelector("#bodyInput").value = this.shadowRoot.querySelector("#bodyInput").value + "__put italics text here__";
  }

  _makeUnderline () {
    this.shadowRoot.querySelector("#bodyInput").value = this.shadowRoot.querySelector("#bodyInput").value + "~put underline text here~";
  }

  _openDeleteModal () {
    this.shadowRoot.querySelector("#deleteModal").open();
  }

  _closeDeleteModal () {
    this.shadowRoot.querySelector("#deleteModal").close();
  }

  _closeModal () {
    this.shadowRoot.querySelector("#articleInput").close();
  }

}

window.customElements.define('article-input', ArticleInput);
