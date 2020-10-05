import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCo9pu6CjOsVZVcqF_IW0ockolBFZiZFss",
    authDomain: "whats-app-clone-72121.firebaseapp.com",
    databaseURL: "https://whats-app-clone-72121.firebaseio.com",
    projectId: "whats-app-clone-72121",
    storageBucket: "whats-app-clone-72121.appspot.com",
    messagingSenderId: "831990616887",
    appId: "1:831990616887:web:cc65d6af3767940ad400b2",
    measurementId: "G-WQLVGGZ508"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;