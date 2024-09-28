import db from "../firebase/firebaseConfig.mjs";

async function shopCar(
  userUid,
  productId,
  price,
  count,
  size = null,
  kind = null
) {
  console.log(userUid, productId, count);
  try {
    // 定義要更新的文件路徑 (users/{userName})
    const userRef = db.collection("users").doc(userUid);

    // 先獲取當前的購物車資料
    const docSnap = await userRef.get();

    if (docSnap.exists) {
      const data = docSnap.data();
      let shopCar = data.shopCar || {}; // 獲取當前的 shopCar 資料，若不存在則初始化為空物件

      // 檢查是否已有相同的 productId
      if (shopCar[productId]) {
        shopCar[productId].price = price;
        shopCar[productId].count = count;

        if (size !== null) {
          shopCar[productId].size = size;
        }

        if (kind !== null) {
          shopCar[productId].kind = kind;
        }
      } else {
        // 新增一個新的商品
        shopCar[productId] = {
          productId,
          count,
          price,
          ...(size && { size }),
          ...(kind && { kind }),
        };
      }

      // 將更新後的購物車資料寫回 Firestore
      await userRef.set({ shopCar }, { merge: true });
      return "購物車已更新";
    } else {
      // 如果文件不存在，初始化購物車並新增第一筆資料
      const shopCar = {
        [productId]: { productId, count },
      };

      await userRef.set({ shopCar }, { merge: true });
      console.log("購物車已建立並新增商品");
      return "購物車已建立並新增商品";
    }
  } catch (error) {
    console.error("更新購物車時發生錯誤: ", error);
  }
}

export default shopCar;
