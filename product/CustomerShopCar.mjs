import db from "../firebase/firebaseConfig.mjs";

async function CustomerShopCar(userUid) {
  const queryUsers = await db.collection("users").get();
  const queryProduct = await db.collection("products").get();
  const users = [];
  let result = [];
  queryUsers.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  users.forEach((user) => {
    if (user.id === userUid) {
      if (typeof user.shopCar === "object") {
        Object.values(user.shopCar).forEach((item) => {
          queryProduct.forEach((doc) => {
            if (doc.id === item.productId) {
              result.push(item);
            }
          });
        });
      }
    }
  });
  return result;
}

export default CustomerShopCar;
