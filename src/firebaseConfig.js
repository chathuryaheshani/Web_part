import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
  apiKey: 'AIzaSyApN3QHrrJiVnyhsrx2fwqthAwm32jzCeA',
  authDomain: 'neon-985d0.firebaseapp.com',
  databaseURL: 'https://neon-985d0.firebaseio.com',
  projectId: 'neon-985d0',
  storageBucket: 'neon-985d0.appspot.com',
  messagingSenderId: '9422961749'
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const storage = firebase.storage()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase

// firebase collections
const driversCollection = db.collection('Bus_Drivers')
const routesCollection = db.collection('Bus_Routes')
const feedbackCollection = db.collection('Feedback')
const numberPlatesCollection = db.collection('NumberPlates')
const postsCollection = db.collection('posts')

export {
  db,
  auth,
  storage,
  currentUser,
  driversCollection,
  routesCollection,
  feedbackCollection,
  numberPlatesCollection,
  postsCollection
}
