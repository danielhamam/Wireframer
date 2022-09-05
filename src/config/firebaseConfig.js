import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
// (ADDED)
// var firebaseConfig = {
//     apiKey: "AIzaSyCZcHpbnk8IbCdYQExAkweaPvusji6qaIM",
//     authDomain: "project316-7097b.firebaseapp.com",
//     databaseURL: "https://project316-7097b.firebaseio.com",
//     projectId: "project316-7097b",
//     storageBucket: "project316-7097b.appspot.com",
//     messagingSenderId: "37182883154",
//     appId: "1:37182883154:web:9e6c0d8fe39031392fa68b",
//     measurementId: "G-SGKG7GR5XT"
// };
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvf3l8mJ6YxMZ12mkiRJOnc9yJ7Htw4_U",
    authDomain: "hamam-48642.firebaseapp.com",
    projectId: "hamam-48642",
    storageBucket: "hamam-48642.appspot.com",
    messagingSenderId: "161099268923",
    appId: "1:161099268923:web:5c92edce48f02fe8586d1e"
  };

firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;