import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import{ w3css } from './w3-css.js';

import '@polymer/paper-spinner/paper-spinner';
import './article-row.js';


class ArticlePage extends PageViewElement {
  static get styles() {
    return [
      SharedStyles,
      w3css
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
      <div id="loader" style="text-align:center!important;margin-top:32px;">
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
    var db = firebase.firestore();
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

}

window.customElements.define('article-page', ArticlePage);
