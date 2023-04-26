
import firebase from "firebase";



 // Add your own firebase config
const firebaseConfig = {
  
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();




export { db,storage,auth,provider}

