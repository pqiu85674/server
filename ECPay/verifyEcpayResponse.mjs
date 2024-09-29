import ecpay_payment from "ecpay-aio-node";

function verifyEcpayResponse() {
  console.log("綠界金流回傳資料 data:", data);

  // console.log("RtnCode", RtnCode);
  // console.log("RtnMsg", RtnMsg);
  // console.log("TradeNo", TradeNo);
  // console.log("MerchantTradeNo", MerchantTradeNo);
  // console.log("CheckMacValue", CheckMacValue);

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
    const { RtnCode, RtnMsg, TradeNo, MerchantTradeNo } = data;

    let base_param = { MerchantTradeNo };
    if (RtnCode === "1") {
      console.log(`交易成功 TradeNo: ${TradeNo}`);
      const query = new ecpay_payment(options);
      const order = query.query_client.query_trade_info(
        (parameters = base_param)
      );
      console.log("成功撈取當筆交易資料:", order);
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
