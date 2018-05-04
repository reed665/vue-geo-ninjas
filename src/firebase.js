import firebase from 'firebase'
import firestore from 'firebase/firestore' // eslint-disable-line no-unused-vars

const config = {
  apiKey: 'AIzaSyBBti1eBtVN1XHLDIr4Boa_TXFYUH6Fneg',
  authDomain: 'vue-geo-ninjas-bc962.firebaseapp.com',
  databaseURL: 'https://vue-geo-ninjas-bc962.firebaseio.com',
  projectId: 'vue-geo-ninjas-bc962',
  storageBucket: 'vue-geo-ninjas-bc962.appspot.com',
  messagingSenderId: '678983538094',
}

export default firebase.initializeApp(config).firestore()
