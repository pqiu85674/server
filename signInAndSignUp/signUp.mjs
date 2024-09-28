import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import db from "../firebase/firebaseConfig.mjs";
import { doc, setDoc } from "firebase/firestore";
async function saveToDatabase(userName, email, password) {
  const userData = {
    userName,
    email,
    password,
  };

  try {
    // 建立文件參考 (假設資料庫結構為 users/{userName})
    const userDocRef = doc(db, "users", userName);

    // 寫入資料
    await setDoc(userDocRef, userData);
    console.log("資料寫入成功");
    return "success"; // 返回成功狀態
  } catch (error) {
    console.error("資料寫入失敗:", error);
    throw error; // 抛出錯誤
  }
}

async function signUp(userName, email, password) {
  const auth = getAuth();
  try {
    // 創建新用戶
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: userName,
    });
    await saveToDatabase(userName, email, password);
    return { status: "success", message: "註冊成功" };
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return { status: "error", message: "此電子郵件已經被註冊過" };
    } else if (error.code === "auth/invalid-email") {
      return { status: "error", message: "無效的電子郵件格式" };
    } else if (error.code === "auth/weak-password") {
      return { status: "error", message: "密碼強度不足" };
    } else {
      // 對於其他未處理的錯誤，返回通用錯誤信息
      return { status: "error", message: error };
    }
  }
}

export default signUp;
