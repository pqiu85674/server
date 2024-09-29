import ecpay_payment from "ecpay-aio-node";
import options from "./options.mjs";

function query_trade_info(data) {
  console.log("成功進入query_trade_info function");
  const { MerchantTradeNo } = data;

  let base_param = { MerchantTradeNo };
  const query = new ecpay_payment(options);
  const order = query.query_client.query_trade_info(base_param);
  console.log("成功撈取當筆交易資料:", order);
  return { status: "success", order };
}

export default query_trade_info;
