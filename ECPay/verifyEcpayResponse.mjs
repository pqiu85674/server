import ecpay_payment from "ecpay-aio-node";
import options from "./options.mjs";

function verifyEcpayResponse(data) {
  console.log("綠界金流回傳資料 data:", data);

  const create = new ecpay_payment(options);
  const isValid = ecpay.payment_client.aio_check_out_verify_mac(data);
  const isValid2 = create.payment_client.verify_mac(data);
  console.log("isValid", isValid);
  console.log("isValid2", isValid2);
  if (isValid) {
    console.log("CheckMacValue 驗證通過");
    const { RtnCode, RtnMsg, TradeNo } = data;

    if (RtnCode === "1") {
      console.log(`交易成功 TradeNo: ${TradeNo}`);
    } else {
      console.log(`交易失敗 RtnMsg: ${RtnMsg}`);
    }
    return { status: "success" };
  } else {
    console.log("CheckMacValue 驗證失敗");
    return { status: "error" };
  }
}
export default verifyEcpayResponse;
