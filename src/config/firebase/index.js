import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    // apiKey: "AIzaSyDBwcd3AQ7zZ4R4U3y9LpOTJVVvlxV8LAk",
    // authDomain: "cawaapps.firebaseapp.com",
    // databaseURL: "https://cawaapps.firebaseio.com",
    // projectId: "cawaapps",
    // storageBucket: "cawaapps.appspot.com",
    // messagingSenderId: "115825543646",
    // appId: "1:115825543646:web:f3ee2b828e7b4a9bd8b54f",
    // measurementId: "G-R1MFYQVK00"
    apiKey: "AIzaSyDp3Sb0ZIj5kdGw3WzQ1bktFAJmKOiZdKo",
    authDomain: "catatan-7b9a2.firebaseapp.com",
    projectId: "catatan-7b9a2",
    storageBucket: "catatan-7b9a2.appspot.com",
    messagingSenderId: "393120474282",
    appId: "1:393120474282:web:28a34a96c9251b2faadcd3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// deklarasi databse
//diimport di halaman action
export const database = firebase.database();
export default firebase;