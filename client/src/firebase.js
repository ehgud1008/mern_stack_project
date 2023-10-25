// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "mernproject-a786e.firebaseapp.com",
  projectId: "mernproject-a786e",
  storageBucket: "mernproject-a786e.appspot.com",
  messagingSenderId: "192661534528",
  appId: "1:192661534528:web:51ed8524584cd449c86ca5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);