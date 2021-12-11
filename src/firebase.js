  import firebase from 'firebase'
  import 'firebase/auth'
  
  const appId = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-S9KMQ1RR8C"
  })
  export const auth = appId.auth();
  export default appId
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
 