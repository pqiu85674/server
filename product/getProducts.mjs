import db from "../firebase/firebaseConfig.mjs";

async function getProducts() {
  // console.log("到達 getProducts function");
  try {
    // console.log("db start", db);
    // console.log("db end");

    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.log("getProducts error:", error);
    return error;
  }
}

export default getProducts;
