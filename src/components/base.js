import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({

  apiKey: "AIzaSyC4a26bnOsRezRvwnSLm_c6VmNBkIKrtDc",
  authDomain: "careblocks-b4126.firebaseapp.com",
  projectId: "careblocks-b4126",
  storageBucket: "careblocks-b4126.appspot.com",
  messagingSenderId: "803716207265",
});

export default app;
