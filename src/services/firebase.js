const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require('../config/serviceAccountKey.json');

const init = async () => {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'gs://coba-28e96.appspot.com'
  });
  const db = getFirestore();
  const bucket = getStorage().bucket();
  return {
    firestore: { db, Timestamp, FieldValue, getAuth, bucket },
  };
};

module.exports = { init };