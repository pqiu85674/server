import ecpay_payment from "ecpay-aio-node";

function verifyEcpayResponse(data) {
  const { RtnCode, RtnMsg, TradeNo, MerchantTradeNo, CheckMacValue } = data;

  console.log("綠界金流回傳資料 data:", data);

  console.log("RtnCode", RtnCode);
  console.log("RtnMsg", RtnMsg);
  console.log("TradeNo", TradeNo);
  console.log("MerchantTradeNo", MerchantTradeNo);
  console.log("CheckMacValue", CheckMacValue);

  const { MERCHANTID, HASHKEY, HASHIV } = process.env;

  const options = {
    merchantInfo: {
      merchantID: MERCHANTID,
      hashKey: HASHKEY,
      hashIV: HASHIV,
    },
  };
  const create = new ecpay_payment(options);

  const isValid = create.payment_client.aio_check_out_verify_mac(data);
  if (isValid) {
    console.log("CheckMacValue 驗證通過");

    // 根據回傳資料進行處理

    const { RtnCode, TradeNo, MerchantTradeNo } = data;

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
