import admin from "firebase-admin"; // 使用 Firebase Admin SDK


// 初始化 Firebase Admin SDK，從環境變數讀取憑證
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey:
    process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

// 初始化 Firestore 資料庫
const db = admin.firestore();

// 確認 Firestore 已正確初始化
// console.log("Firestore initialized:", db);

export default db;
