import * as firebaseAdmin from 'firebase-admin';
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"
const dotenv = require('dotenv');
dotenv.config();
if (!firebaseAdmin.apps.length) {
const firebaseApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        "projectId": process.env.FirebaseProjectID,
        "clientEmail": process.env.FirebaseClientEmail,
        "privateKey": process.env.FirebasePrivateKey.replace(/\\n/g, '\n'),
    }),
    storageBucket: 'tcsh22-contentment.appspot.com'
});
}
const db = getFirestore();
const storage = getStorage(firebaseAdmin.apps[0]);
const bucket = storage.bucket("tcsh22-contentment.appspot.com");
export { db, bucket };