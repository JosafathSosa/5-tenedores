import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC068gYOJDkzBzJdQVtNrXfxi5Mb0g7Rn4",
  authDomain: "tenedores-v1-e6793.firebaseapp.com",
  projectId: "tenedores-v1-e6793",
  storageBucket: "tenedores-v1-e6793.appspot.com",
  messagingSenderId: "690515093368",
  appId: "1:690515093368:web:2a81592fa64df6f07eca8d",
  measurementId: "G-18QJZ8H8FE",
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);
