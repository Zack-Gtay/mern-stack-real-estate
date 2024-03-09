// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mernstack-finalproject.firebaseapp.com",
  projectId: "mernstack-finalproject",
  storageBucket: "mernstack-finalproject.appspot.com",
  messagingSenderId: "857763269310",
  appId: "1:857763269310:web:3a80f032c45defbde6acef",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
