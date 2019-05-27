import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

import '@polymer/paper-spinner/paper-spinner';
import './article-card.js';


class ArticlePage extends PageViewElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }
  static get properties() {
    return {
      dataArray: { type: Array}
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
      <!-- Article section -->
      <section>
        <h2>Articles</h2>
      </section>
      <div id="loader" style="text-align:center !important;">
        <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
      </div>
      <div id="articles" style="display:none;">
      </div>
          `;
  }

  constructor () {
    super();
    this.dataArray = [];
  }

  firstUpdated () {
    console.log("Loaded");
    this.shadowRoot.querySelector('#loader').style.display = "block";
    this.shadowRoot.querySelector('#articles').style.display = "none";
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
    }).catch((e)=> {
      console.error(e);
      this.shadowRoot.querySelector('#articles').style.display = "block";
      this.shadowRoot.querySelector('#loader').style.display = "none";
    });
  }

}

window.customElements.define('article-page', ArticlePage);
