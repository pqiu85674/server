import db from "../firebase/firebaseConfig.mjs";

async function deleteShopCar(userUid, productId) {
  try {
    const userDocRef = db.collection("users").doc(userUid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return new Error("User does not exist");
    }

    const userData = userDoc.data();

    if (userData.shopCar && userData.shopCar[productId]) {
      delete userData.shopCar[productId];
    } else {
      return new Error("productId not found in shopCar");
    }

    await userDocRef.update({
      shopCar: userData.shopCar,
    });

    return "success";
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default deleteShopCar;
