import db from "../firebase/firebaseConfig.mjs";

async function addProducts(productId, productData) {
  try {
    // 使用 set 更新或新增文件到 "products" 集合，與 productId 對應
    await db.collection('products').doc(productId).set(productData);
    console.log("新增或更新產品成功，產品 ID: ", productId);

    return "success";
  } catch (e) {
    console.error("新增或更新產品失敗: ", e);
    return "error", e;
  }
}

export default addProducts;
