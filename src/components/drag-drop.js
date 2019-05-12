import {LitElement, html } from 'lit-element';
import '@polymer/paper-button/paper-button.js';
import './snack-bar.js';
import { SharedStyles } from './shared-styles.js';
import{ w3css } from './w3-css.js';
import '@polymer/paper-spinner/paper-spinner';



class DragDrop extends LitElement {

    static get styles() {
        return [
            SharedStyles,
            w3css
        ];
    }

    static get properties() {
        return {
            uploadProgress: { type: Array},
            articleMessage: { type: String},
            toastOpened: {type: Boolean},
            colourSnack: {type: String},
            imageName: {type: Number}
        };
    }

  render() {
    return html`
    <style>
    a {
        color: #369;
    }
    .note {
    width: 500px;
    margin: 50px auto;
    font-size: 1.1em;
    color: #333;
    text-align: justify;
    }
    #drop-area {
    border: 2px dashed #ccc;
    border-radius: 20px;
    width: 480px;
    margin: 50px auto;
    padding: 20px;
    }
    #drop-area.highlight {
    border-color: purple;
    }
    p {
    margin-top: 0;
    }
    .my-form {
    margin-bottom: 10px;
    }
    #gallery {
    margin-top: 10px;
    }
    #gallery img {
    width: 150px;
    margin-bottom: 10px;
    margin-right: 10px;
    vertical-align: middle;
    }
    .button {
    display: inline-block;
    padding: 10px;
    background: #ccc;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #ccc;
    }
    .button:hover {
    background: #ddd;
    }
    #fileElem {
    display: none;
    }
    paper-spinner {
        --paper-spinner-stroke-width: 6px;
    }
    </style>
    <div id="drop-area">
    <div class="my-form">
        <p>Upload image for article.</p>
        <!-- If you want to accept multiple, uncomment -->
        <!-- <input type="file" id="fileElem" multiple accept="image/*"> -->
        <input type="file" id="fileElem" accept="image/*">
        <label class="button" for="fileElem">Select an image</label>
        <paper-button raised class="w3-indigo" @click="${this.uploadFile}">Upload</paper-button>
        <div class="w3-center w3-padding">
            <paper-button raised class="w3-red" @click="${this.resetFiles}" id="resetBut" style="display:none;max-width:87.8px;">Reset</paper-button>
        </div>
    </div>
    <progress id="progress-bar" max=100 value=0></progress>
    <div id="loader" style="display: none;text-align:center!important;margin-top:32px;">
        <div class="w3-animate-fading">uploading...</div>
        <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
    </div>
    <div id="gallery"></div>
    </div>
    <snack-bar ?active="${this.toastOpened}" colour="${this.colourSnack}">
        ${this.articleMessage}.
    </snack-bar>
    `;
  }

constructor () {
    super();
    this.uploadProgress = [];
    this.imageName = 0;
    this.progressBar = this.shadowRoot.querySelector('#progress-bar');
    this.handleDrop = this.handleDrop.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.initializeProgress = this.initializeProgress.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.previewFile = this.previewFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
}

firstUpdated () {
    let dropArea = this.shadowRoot.querySelector("#drop-area");
    let inputArea = this.shadowRoot.querySelector("#fileElem");

    inputArea.onchange = () => {
        this.handleFiles(inputArea.files);
    };

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', this.handleDrop, false);

    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropArea.classList.add('highlight');
    }

    function unhighlight(e) {
        dropArea.classList.remove('active');
    }

    var db = firebase.firestore();
    var docRef = db.collection("articles").doc("articleCount");
    docRef.get().then((doc) => {
        if(doc.exists) {
            this.imageName = doc.data().count + 1;
        }
    });
}

handleDrop(e) {
    var dt = e.dataTransfer;
    var files = dt.files;

    // remove if multiple files needed.

    if(files.length > 1) {
        alert("One image per article please.");
        this.resetFiles();
        return;
    } else if (files.length > 0) {
        sessionStorage.setItem('uploadingImage','notUploaded');
    }

    let inputArea = this.shadowRoot.querySelector("#fileElem");
    inputArea.files = files;

    this.handleFiles(files);
}

initializeProgress(numFiles) {
    this.shadowRoot.querySelector('#progress-bar').value = 0;
    this.uploadProgress = [];

    for(let i = numFiles; i > 0; i--) {
        this.uploadProgress.push(0);
    }
}

updateProgress(fileNumber, percent) {
    this.uploadProgress[fileNumber] = percent;
    let total = this.uploadProgress.reduce((tot, curr) => tot + curr, 0) / fileNumber;
    // console.debug('update', fileNumber, percent, total);
    this.shadowRoot.querySelector('#progress-bar').value = total;
}

handleFiles(files) {
    files = [...files];
    this.initializeProgress(files.length);
    // files.forEach(this.uploadFile);
    files.forEach(this.previewFile);
    sessionStorage.setItem('uploadingImage','notUploaded');
    this.shadowRoot.querySelector('#resetBut').style.display = "block";
}

previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        let img = document.createElement('img');
        img.src = reader.result;
        this.shadowRoot.querySelector('#gallery').appendChild(img);
    }
}

uploadFile() {
    var storageRef = firebase.storage().ref();

    let inputArea = this.shadowRoot.querySelector("#fileElem");
    var arrayPass = [...inputArea.files];
    if(arrayPass.length == 0){
        this.colourSnack = "#f44336";
        this.articleMessage = "No image selected.";
        this.toastOpened = true;
        setTimeout(() => {this.toastOpened = false;}, 2000);
        return;
    }
    var i = 0;
    this.shadowRoot.querySelector('#loader').style.display = 'block';
    arrayPass.forEach(file => {
        i++;
        var metadata = {
            contentType: file.type
        };
        this.updateProgress(i, 100);
        var uploadTask;
        //? Here we are going to upload the name as a number! This is because when we delete, we want to delete just this picture.
        if(this.imageName > 0) {
            uploadTask = storageRef.child('articleImages/' + this.imageName.toString()).put(file, metadata);
        } else {
            uploadTask = storageRef.child('articleImages/' + file.name).put(file, metadata);
        }
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            this.updateProgress(i, (progress) || 100);
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                // console.log('Upload is running');
                break;
            }
        }, (error) => {
            this.shadowRoot.querySelector('#loader').style.display = 'none';
            sessionStorage.setItem('uploadingImage','notUploaded');
            // Handle unsuccessful uploads
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                this.updateProgress(i,0);
                this.colourSnack = "#f44336";
                this.articleMessage = "You are not allowed to do this.";
                this.toastOpened = true;
                setTimeout(() => {this.toastOpened = false;}, 2000);
                break;

                case 'storage/canceled':
                // User canceled the upload
                break;

                case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
        }, () => {
            // Handle successful uploads on complete
            this.colourSnack = "#4caf50";
            this.articleMessage = "Image has been uploaded.";
            this.toastOpened = true;
            // sessionStorage.setItem('uploadedImage', file.name);
            sessionStorage.setItem('uploadedImage', this.imageName);
            sessionStorage.setItem('uploadedMeta',file.type);
            sessionStorage.setItem('uploadingImage','uploaded');
            setTimeout(() => {this.toastOpened = false;}, 2000);
            this.shadowRoot.querySelector('#loader').style.display = 'none';
        });
    });
}
resetFiles() {
    let inputArea = this.shadowRoot.querySelector("#fileElem");
    inputArea.value = null;
    this.shadowRoot.querySelector('#gallery').innerHTML = '';
    this.shadowRoot.querySelector('#resetBut').style.display = "none";
    var uploadedImage = sessionStorage.getItem('uploadedImage');
    if (uploadedImage != undefined) {
        var storageRef = firebase.storage().ref();
        //? We are leaving this here incase we want to switch to file name
        //! file.name??? Where is the file?
        // var imageRef = storageRef.child('articleImages/' + file.name);
        var imageRef = storageRef.child('articleImages/' + this.imageName);
        // Delete the file
        imageRef.delete().then(() => {
        // File deleted successfully
            console.log("Deleted last upload");
            sessionStorage.removeItem('uploadingImage');
        }).catch((error) => {
        // Uh-oh, an error occurred!
            console.error("couldn't delete file!!!");
            console.log(error);
        });
    }
}

//https://codepen.io/joezimjs/pen/yPWQbd

}

window.customElements.define('drag-drop', DragDrop);
