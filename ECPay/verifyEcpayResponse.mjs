import ecpay_payment from "ecpay-aio-node";
import options from "./options";

function verifyEcpayResponse() {
  console.log("綠界金流回傳資料 data:", data);

  const create = new ecpay_payment(options);

  const isValid = create.payment_client.aio_check_out_verify_mac(data);
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
