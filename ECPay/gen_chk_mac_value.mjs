import ecpay_payment from "ecpay-aio-node";
import options from "./options.mjs";

function gen_chk_mac_value(data) {
  console.log("綠界金流回傳資料 data:", data);

  const { CheckMacValue } = data;
  delete data.CheckMacValue; // 此段不驗證

  const create = new ecpay_payment(options);
  try {
    const checkValue = create.payment_client.helper.gen_chk_mac_value(data);
    return CheckMacValue === checkValue;
  } catch (error) {
    console.log("生成 CheckMacValue 失敗:", error);
    return false;
  }
}
export default gen_chk_mac_value;
