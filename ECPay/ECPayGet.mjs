import ecpay_payment from "ecpay-aio-node";

function ECPayGet(MERCHANTID, HASHKEY, HASHIV, SERVER, CLIENT) {
  console.log("MERCHANTID", MERCHANTID);
  console.log("HASHKEY", HASHKEY);
  console.log("HASHIV", HASHIV);
  console.log("SERVER", SERVER);
  console.log("CLIENT", CLIENT);
  const MerchantTradeDate = new Date().toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  const TradeNo = "test" + new Date().getTime();
  let base_param = {
    MerchantTradeNo: TradeNo,
    MerchantTradeDate,
    TotalAmount: "100",
    TradeDesc: "測試交易描述",
    ItemName: "測試商品等",
    ReturnURL: `${SERVER}/return`,
    ClientBackURL: `${CLIENT}/clientReturn`,
  };

  let options = {
    merchantInfo: {
      merchantID: MERCHANTID,
      hashKey: HASHKEY,
      hashIV: HASHIV,
    },
  };

  const create = new ecpay_payment(options);
  const html = create.payment_client.aio_check_out_all(base_param);
  return html;
}

export default ECPayGet;
