import * as firebaseAdmin from 'firebase-admin';
import { getFirestore } from "firebase-admin/firestore"
const dotenv = require('dotenv');
dotenv.config();
if (!firebaseAdmin.apps.length) {
const firebaseApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        "projectId": process.env.FirebaseProjectID,
        "clientEmail": process.env.FirebaseClientEmail,
        "privateKey": process.env.FirebasePrivateKey.replace(/\\n/g, '\n'),
    }),
});
}
const db = getFirestore();

export { db };