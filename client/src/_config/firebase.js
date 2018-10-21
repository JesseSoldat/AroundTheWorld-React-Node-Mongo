import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAw5uIZdlyPYjBuYoc8zRjbiv0-lxWANys",
  authDomain: "playground-3f11f.firebaseapp.com",
  databaseURL: "https://playground-3f11f.firebaseio.com",
  projectId: "playground-3f11f",
  storageBucket: "playground-3f11f.appspot.com",
  messagingSenderId: "1016399993027"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
