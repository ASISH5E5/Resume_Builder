import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBmx5TOiwBL8_5822keJFpnQuDICwahLKE",
  authDomain: "resume-build-7bcc0.firebaseapp.com",
  projectId: "resume-build-7bcc0",
  storageBucket: "resume-build-7bcc0.appspot.com",
  messagingSenderId: "663434182871",
  appId: "1:663434182871:web:600e41cbfe5c9ade307092"
};

  const app=initializeApp(firebaseConfig)
  const db=getFirestore(app)

  export {db};