import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
// import { collectionName } from './services/rockdrunkard/constants'

admin.initializeApp()
// export const users = functions
//   .region('asia-northeast1')
//   .https.onRequest(async (req, res) => {
//     const snap = await admin
//       .firestore()
//       .collection(collectionName.users)
//       .get()
//     const data = snap.docs.map(doc => doc.data())
//     res.send({ data })
//   })

export const updatePoints = functions
  .region('asia-northeast1')
  .firestore.document('problems/{ascent_users}')
  .onUpdate((change, context) => {
    return new Promise((resolve, reject) => {
      // ここに記述
    })
  })
