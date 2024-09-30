import express from "express";
import bodyParser from "body-parser";
import { collection, getDocs } from "firebase/firestore";
import cors from "cors";
import signUp from "./signInAndSignUp/signUp.mjs";
import signIn from "./signInAndSignUp/signIn.mjs";
import addProducts from "./product/addProducts.mjs";
import getProducts from "./product/getProducts.mjs";
import shopCar from "./product/shopCar.mjs";
import CustomerShopCar from "./product/CustomerShopCar.mjs";
import deleteShopCar from "./product/deleteShopCar.mjs";
import ECPay from "./ECPay/ECPay.mjs";
import gen_chk_mac_value from "./ECPay/gen_chk_mac_value.mjs";
import query_trade_info from "./ECPay/query_trade_info.mjs";
import handleProduct from "./utils/handleProduct.mjs";
import moveShopCarToOrder from "./product/moveShopCarToOrder.mjs";
import order from "./product/order.mjs";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const whitelist = ["http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const fetchAllCollections = async (docRef) => {
  const subCollections = {};
  const collections = ["123"]; // 替換為你的子集合名稱

  for (const collectionName of collections) {
    const collectionRef = collection(docRef, collectionName);
    const snapshot = await getDocs(collectionRef);
    subCollections[collectionName] = [];

    for (const doc of snapshot.docs) {
      const docData = doc.data();
      docData.id = doc.id;
      subCollections[collectionName].push(docData);

      if (doc.data() !== undefined) {
        console.log(doc);
        // 遞迴抓取子集合
        const nestedSubCollections = await fetchAllCollections(doc.ref);
        if (Object.keys(nestedSubCollections).length > 0) {
          docData.subCollections = nestedSubCollections;
        }
      }
    }
  }

  return subCollections;
};

app.get("/getproducts", async (req, res) => {
  let result = [];
  try {
    result = await getProducts();
    // console.log(result);
  } catch (error) {
    console.log(error);
  }
  res.json(result);
});

app.get("/addProducts", async (req, res) => {
  const clothes = {
    src: [
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/clothes%2Fblack.png?alt=media&token=da617d59-b1af-4ad4-a0e3-40b3981dc26b",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/clothes%2Fgray.png?alt=media&token=cfb64f7b-b230-4876-9fb2-2fa36a48660e",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/clothes%2Fwhite.png?alt=media&token=8198acc1-5ad7-46f9-8cae-1a10773ab46b",
    ],
    price: 399,
    title: "t-shirt 純棉素T 白色上衣 黑色上衣 灰色上衣",
    alt: ["黑色素T", "灰色素T", "白色素T"],
    size: ["XL", "L", "M", "S", "XS"],
    kind: ["黑色素T", "灰色素T", "白色素T"],
  };

  const fannyPack = {
    src: [
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/fannyPack%2FfannyPack.png?alt=media&token=5664341a-3922-4a5f-b577-a60a6c851d90",
    ],
    price: 449,
    title: "輕便大容量多功能腰包 休閒胸包 側背包 單肩包 男性腰包",
    alt: ["側背包"],
    kind: [],
    size: [],
  };

  const toiletPaper = {
    src: [
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/toiletPaper%2FtoiletPaper.png?alt=media&token=3d0a89c6-20f7-4449-821f-24ab30903c37",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/toiletPaper%2FtoiletPaper2.png?alt=media&token=a64b5e85-8ca1-4828-b8f7-2807eb284ed7",
    ],
    price: 345,
    title: "好市多熱銷衛生紙 科克蘭三層抽取衛生紙 衛生紙",
    alt: ["衛生紙(一組)", "衛生紙(一包)"],
    kind: [],
    size: [],
  };

  // 使用範例
  const result = await addProducts("clothes", clothes);
  res.json(result);
});

app.post("/signUp", async (req, res) => {
  const { email, password, userName } = req.body;
  const result = await signUp(userName, email, password);
  res.json(result);
});

app.post("/signIn", async (req, res) => {
  const { idToken } = req.body;
  console.log("signIn", idToken);
  if (!idToken) {
    return res
      .status(400)
      .json({ status: "error", message: "ID token 未提供" });
  }

  const result = await signIn(idToken);
  if (result.status === "success") {
    return res.json(result);
  } else {
    return res.status(401).json(result);
  }
});

app.post("/customerShopCar", async (req, res) => {
  const { userUid } = req.body;
  const result = await CustomerShopCar(userUid);
  res.json(result);
});

app.post("/order", async (req, res) => {
  const { userUid } = req.body;
  console.log("userUid", userUid);
  const result = await order(userUid);
  console.log("result", result);
  res.json(result);
});
app.delete("/deleteShopCar", async (req, res) => {
  const { userUid, product } = req.body;
  const result = await deleteShopCar(userUid, product);
  res.json(result);
});

app.patch("/updateShopCar", async (req, res) => {
  const { userUid, productId, price, count, size, kind } = req.body;
  const result = await shopCar(userUid, productId, price, count, size, kind);
  res.json(result);
});

app.post("/ECPay", (req, res) => {
  const { order, userUid } = req.body;
  const html = ECPay(order, userUid);
  res.send(html);
});

app.post(
  "/return",
  express.urlencoded({ extended: false }),
  async (req, res) => {
    try {
      const data = { ...req.body };
      if (gen_chk_mac_value(data)) {
        const result = await query_trade_info(data);
        console.log("result", result);
        console.log("----------------------------------------------------");
        if (result.status === "success") {
          console.log("query_trade_info success", result);
          const orderInfo = handleProduct(result.order);
          console.log("orderInfo", orderInfo);
          await moveShopCarToOrder(
            orderInfo.CustomField1,
            orderInfo.TradeNo,
            orderInfo.products,
            orderInfo.TradeDate
          );
        } else {
          return res.status(500).send("伺服器發生錯誤");
        }
        res.status(200).send("OK");
      } else {
        console.log("CheckMacValue 驗證失敗");
      }
    } catch (error) {
      console.log("這裡錯", error);
    }
  }
);

// 用戶交易完成後的轉址
app.get("/clientReturn", (req, res) => {
  const redirectUrl = `${process.env.CLIENT}/clientReturn`;
  // 重新導向至前端頁面
  res.redirect(redirectUrl);
});

const port = process.env.PORT || 3000; // 使用 Render 提供的 PORT，若不存在則預設為 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
