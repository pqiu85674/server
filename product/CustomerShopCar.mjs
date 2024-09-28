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
        Object.entries(user.shopCar).forEach((item) => {
          queryProduct.forEach((doc) => {
            if (doc.id === item[0]) {
              result.push(item[1]);
            }
          });
        });
      }
    }
  });

  console.log("result", result);
  return result;
}

export default CustomerShopCar;
