import db from "../firebase/firebaseConfig.mjs";

async function order(userUid) {
  console.log("到達order function");
  try {
    const userDocRef = db.collection("users").doc(userUid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return new Error("User does not exist");
    }

    const userData = userDoc.data();
    const order = userData.order;
    console.log("order", order);
    return { status: "success", order };
  } catch (error) {
    console.log("error", error);
    return { status: "failure", error };
  }
}

export default order;
