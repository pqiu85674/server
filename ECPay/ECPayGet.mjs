import ecpay_payment from "ecpay-aio-node";
const { MERCHANTID, HASHKEY, HASHIV, HOST } = process.env;

function ECPayGet() {
  console.log("MERCHANTID", MERCHANTID);
  console.log("HASHKEY", HASHKEY);
  console.log("HASHIV", HASHIV);
  console.log("HOST", HOST);
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
    ReturnURL: `${HOST}/return`,
    ClientBackURL: `${HOST}/clientReturn`,
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
