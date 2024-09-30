import db from "../firebase/firebaseConfig.mjs";
async function moveShopCarToOrder(userUid, TradeNo, productIds, TradeDate) {
  try {
    const queryUser = db.collection("users").doc(userUid);
    const user = await queryUser.get();
    if (!user.exists) {
      return new Error("User does not exist");
    }
    let orderInfo = [];
    const userData = user.data();
    productIds.forEach((productId) => {
      orderInfo.push(userData.shopCar[productId]);
      delete userData.shopCar[productId];
    });
    console.log("已刪除指定的購物車內容");
    let order = userData.order || {};
    order[TradeNo] = { ...orderInfo, TradeDate };
    // 將更新後的購物車資料寫回 Firestore
    await userRef.set({ order }, { merge: true });
    console.log("訂單已新增");
  } catch (e) {
    console.error("刪除購物車內容或新增訂單失敗: ", e);
    return "error", e;
  }
}
export default moveShopCarToOrder;
