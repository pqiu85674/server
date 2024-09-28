import admin from "firebase-admin";

async function signIn(idToken) {
  console.log("idToken", idToken);
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userName = decodedToken.name;
    const uid = decodedToken.uid;
    return { status: "success", message: "成功登入", userName, uid };
  } catch (error) {
    console.error("Error verifying ID token: ", error);
    return { status: "error", message: "無效的 ID token" };
  }
}

export default signIn;
