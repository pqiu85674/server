import ecpay_payment from "ecpay-aio-node";
import options from "./options.mjs";

function gen_chk_mac_value(data) {
  console.log("綠界金流回傳資料 data:", data);

  const { CheckMacValue } = req.body;
  delete data.CheckMacValue; // 此段不驗證

  const create = new ecpay_payment(options);
  const checkValue = create.payment_client.helper.gen_chk_mac_value(data);
  console.log(
    "確認交易正確性：",
    CheckMacValue === checkValue,
    CheckMacValue,
    checkValue
  );
  return CheckMacValue === checkValue;
}
export default gen_chk_mac_value;
