// Import the functions you need from the SDKs you need
// import initializeApp from "firebase/app";
import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi3fc3rHYl_hfkklYgYhikPKk30K1AWlQ",
  authDomain: "mymoney2-e8cd6.firebaseapp.com",
  projectId: "mymoney2-e8cd6",
  storageBucket: "mymoney2-e8cd6.appspot.com",
  messagingSenderId: "676508546442",
  appId: "1:676508546442:web:cbce9a7578b6cf3a8d0473"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const firestore = firebase.firestore()
const timestamp = firebase.firestore.Timestamp

export {auth, firestore, timestamp}