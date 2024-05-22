import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC88ezXFcFXy1jL_kAvkR_NsyO4yDqPXWE",
  authDomain: "resume-data-a98b2.firebaseapp.com",
  databaseURL: "https://resume-data-a98b2-default-rtdb.firebaseio.com",
  projectId: "resume-data-a98b2",
  storageBucket: "resume-data-a98b2.appspot.com",
  messagingSenderId: "168464673100",
  appId: "1:168464673100:web:6c6f92f0203e26349e87e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
