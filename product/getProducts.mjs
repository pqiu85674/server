import db from "../firebase/firebaseConfig.mjs";

async function getProducts() {
  try {
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
