const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

const init = async () => {
  initializeApp({
    credential: cert(serviceAccount),
  });
  const db = getFirestore();
  return {
    firestore: { db, Timestamp, FieldValue, getAuth },
  };
};

module.exports = { init };