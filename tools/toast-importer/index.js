/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const admin = require("firebase-admin");

const config = {
    credentialsPath: "credentials.json",
    toastPath: "./toasts.ts",
    collectionName: "toasts"
};

admin.initializeApp({
    credential: admin.credential.cert(config.credentialsPath)
});
const db = admin.firestore();
console.log("Database initialized");
const collection = db.collection(config.collectionName);
const toasts = require(config.toastPath);
console.log("Toasts loaded");

Object.defineProperty(Array.prototype, 'chunk', {
  value: function(chunkSize) {
    var R = [];
    for (var i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  }
});

toasts
.chunk(500)
.forEach(async chunk => {
    const batch = db.batch();
    chunk.forEach(toast => {
        const documentRef = collection.doc();
        batch.create(documentRef, toast);
    });
    await batch.commit();
    console.log("Batch completed");
});