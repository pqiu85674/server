import db from "../firebase/firebaseConfig.mjs";

async function order(userUid) {
  try {
    const userDocRef = db.collection("users").doc(userUid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return new Error("User does not exist");
    }

    const userData = userDoc.data();
    const order = userData.order;
    return { status: "success", order };
  } catch (error) {
    console.log(error);
    return { status: "failure", error };
  }
}

export default order;
