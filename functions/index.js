const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

const users = admin.firestore().collection('users')

exports.checkAlias = functions.https.onCall((data, context) => {
  return users.doc(data.slug).get()
    .then((doc) => {
      return { unique: !doc.exists }
    })
    .catch((err) => {
      throw new functions.https.HttpsError(err.message)
    })
})
