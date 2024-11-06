// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpXLrq2hmJx6Fq_wvZVKSiw_PlDzlLiU8",
  authDomain: "samvada-b0b49.firebaseapp.com",
  projectId: "samvada-b0b49",
  storageBucket: "samvada-b0b49.appspot.com",
  messagingSenderId: "329818268881",
  appId: "1:329818268881:web:62c2ff64927d0598ef51f0",
  measurementId: "G-0T1N8HC6NZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };