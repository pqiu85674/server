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

const whitelist = ["http://localhost:3000", "http://localhost:3001","https://pqiu85674.github.io/side-project"];
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
    title: "衣服 t-shirt 純棉素T 白色上衣 黑色上衣 灰色上衣",
    alt: ["黑色素T", "灰色素T", "白色素T"],
    size: ["M", "L", "XL", "2XL"],
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

  const nike = {
    src: [
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/Nike%2FblackShoe.png?alt=media&token=7825b33d-17c8-4af0-b5b1-4c4f88a93301",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/Nike%2FblueShoe.png?alt=media&token=030cf076-e206-42e6-89da-59a07f8c5b60",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/Nike%2FgreenShoe.png?alt=media&token=26392e00-0597-4fbc-a56b-c41edbeb9562",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/Nike%2FredShoe.png?alt=media&token=cff4334f-16f1-4434-96dc-ed2af4e2a829",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/Nike%2FwhiteShoe.png?alt=media&token=f47ddc10-0d61-4fc4-94d9-836481fb533d",
    ],
    price: 3400,
    title: "Nike Dunk 低筒 Retro 鞋子 暢銷鞋款",
    alt: ["黑色", "藍色", "綠色", "紅色", "白色"],
    kind: ["黑色", "藍色", "綠色", "紅色", "白色"],
    size: ["CM28", "CM28.5", "CM29", "CM29.5", "CM30"],
  };

  const pants = {
    src: [
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/pants%2FbrowPants.png?alt=media&token=a241a812-9e75-436c-b2f9-3a6a623a073b",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/pants%2FblackPants.png?alt=media&token=4365667d-9768-499e-9384-413884370fcc",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/pants%2FblackSuit.png?alt=media&token=989dae89-9303-4ac7-a97b-4b8d91a93e3d",
    ],
    price: 520,
    title: "透涼冰爽絲素色腰鬆緊直筒褲(男款) 褲子 素色",
    alt: ["咖啡色褲子", "黑色褲子", "黑色西裝"],
    kind: ["咖啡色", "黑色"],
    size: ["M", "L", "XL", "2XL"],
  };

  const jeans = {
    src: [
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/jeans%2Fblue.png?alt=media&token=e070b42e-9b6c-4993-8db0-222d803dce01",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/jeans%2FhightBlue.png?alt=media&token=f53776e1-19b8-4c02-b3ba-0fdc847a5ac5",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/jeans%2FdarkBlue.png?alt=media&token=b22bb0f8-2bfe-4f93-998b-2d5d479172c5",
    ],
    price: 3489,
    title: "中腰舒適直筒牛仔褲 牛仔褲 男性",
    alt: ["藍色牛仔褲", "淺藍色牛仔褲", "深藍色牛仔褲"],
    kind: ["藍色", "淺藍", "深藍"],
    size: ["M", "L", "XL", "2XL"],
  };
  const backpack = {
    src: [
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/backpack%2FgrayBackpack.png?alt=media&token=1296c7ca-e3c9-4e38-b268-82cfa42d77c2",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/backpack%2FdarkGrayBackPack.png?alt=media&token=cc1eaef7-2e6b-4afb-ab47-fe695a5b1997",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/backpack%2FdarkGreenBackPack.png?alt=media&token=4f00dc88-4234-4aa5-be8b-b5f07b828f2b",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/backpack%2FbackpackBackSide.png?alt=media&token=5dab6f93-9714-4a63-800b-920d4a0b63b7",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/backpack%2FbackpackInSide.png?alt=media&token=b768c504-ee22-4717-bb79-bdd7fadeb88b",
    ],
    price: 899,
    title: "素色後背包",
    alt: ["灰色後背包", "深灰色後背包", "墨綠色後背包", "背包背面", "背包內部"],
    kind: ["灰色", "深灰", "墨綠"],
    size: [],
  };
  const boots = {
    src: [
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/Boots%2FMilkTeaBeigeBoots.png?alt=media&token=a86195fe-a850-4cbd-9372-8dd5abcae712",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/Boots%2FRetroBrownBoots.png?alt=media&token=a49053ca-5fb0-4e58-967a-8ae5744970d5",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/Boots%2FStylishBlackBoots.png?alt=media&token=4b19f990-6e66-4439-bcb3-8b372259d9a3",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/Boots%2FTexturedVelvetBlackBoots.png?alt=media&token=7c3cece3-e8e7-411e-9659-3ec2a5883c8c",
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/Boots%2FVanillaOff-WhiteBoots.png?alt=media&token=6b0d9d92-931d-4312-88ac-823b3d045db4",
    ],
    price: 1258,
    title: "素面方頭高跟瘦瘦靴",
    alt: ["奶茶杏", "復古咖", "時尚黑", "質感黑絨", "香草米白"],
    kind: ["奶茶杏", "復古咖", "時尚黑", "質感黑絨", "香草米白"],
    size: [],
  };
  const AirPodsPro = {
    src: [
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/AirPodsPro2%2FAirPodsPro2.png?alt=media&token=98d38d62-bdcb-43e2-9f05-a61b7c146341",
    ],
    price: 7490,
    title: "AirPods Pro 2",
    alt: ["AirPods Pro 2"],
    kind: [],
    size: [],
  };
  const HydratingEnergyCC_Cream = {
    src: [
      "https://firebasestorage.googleapis.com/v0/b/react-908cf.appspot.com/o/Hydrating%20Energy%20CC%20Cream%2FHydratingEnergyCC_Cream.png?alt=media&token=4ca0375e-6bce-4449-b654-d7963dfa66a9",
    ],
    price: 2250,
    title: "香奈兒超保水能量CC霜",
    alt: ["香奈兒超保水能量CC霜"],
    kind: [],
    size: [],
  };
  const example = {
    src: [],
    price: 0,
    title: "",
    alt: [],
    kind: [],
    size: [],
  };
  // 使用範例
  const result = await addProducts("HydratingEnergyCC_Cream", HydratingEnergyCC_Cream);
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
