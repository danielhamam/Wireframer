import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
// (ADDED)
var firebaseConfig = {
    apiKey: "AIzaSyCZcHpbnk8IbCdYQExAkweaPvusji6qaIM",
    authDomain: "project316-7097b.firebaseapp.com",
    databaseURL: "https://project316-7097b.firebaseio.com",
    projectId: "project316-7097b",
    storageBucket: "project316-7097b.appspot.com",
    messagingSenderId: "37182883154",
    appId: "1:37182883154:web:9e6c0d8fe39031392fa68b",
    measurementId: "G-SGKG7GR5XT"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;