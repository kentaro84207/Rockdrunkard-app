import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

admin.initializeApp()
const db = new admin.firestore.Firestore()
db.settings({ timestampsInSnapshots: true })

// 一旦今の年月で取得
// TODO: 選択した年月に変更
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth() + 1

// 登った課題の点数をリターン
async function fetchPoint(problemRef: any) {
  const problemSnapshot = await problemRef.get()
  const problem = problemSnapshot.data()
  return problem ? problem.point : 0
}

// user_points、usersコレクションに書き込む
async function updateUserPoints(uid: string, point: number) {
  const yearMonth = `${year}_${month}`
  await db
    .collection('user_points')
    .doc(uid)
    .set({
      [yearMonth]: point
    })
  await db
    .collection('users')
    .doc(uid)
    .update({ point })
}

// ユーザの総得点を計算
// TODO: FIX any
async function getTotalPoint(querySnapshot: any, uid: string) {
  const pointArray: number[] = []
  const { size } = querySnapshot
  if (size) {
    querySnapshot.docs.forEach(async (queryDocumentSnapshot: any) => {
      const problem = queryDocumentSnapshot.data()
      if (problem.problemRef) {
        const point = await fetchPoint(problem.problemRef)
        pointArray.push(point)
      }
      if (pointArray.length === size) {
        const totalPoint = pointArray.reduce((a, x) => a + x)
        await updateUserPoints(uid, totalPoint)
      }
    })
  } else {
    await updateUserPoints(uid, 0)
  }
}

export const updatePoint = functions
  .region('asia-northeast1')
  .firestore.document('problems/{problemId}/ascent_users/{uid}')
  .onWrite(async (change, context) => {
    const { problemId, uid } = context.params
    const problemRef = db.collection('problems').doc(problemId)
    const documentSnapshot = await problemRef.get()
    const data = documentSnapshot.data()
    const ascentUsers = data ? data.ascent_users : []
    const newPoint = ascentUsers !== [] ? 100 / ascentUsers.length : 100
    const batch = db.batch()
    batch.update(problemRef, {
      point: newPoint
    })
    // update each problem point
    await batch.commit()

    // update user_points
    const querySnapshot = await db
      .collection('users')
      .doc(uid)
      .collection('ascents')
      .where('year', '==', year)
      .where('month', '==', month)
      .get()
    await getTotalPoint(querySnapshot, uid)
  })
