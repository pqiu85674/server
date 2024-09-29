import ecpay_payment from "ecpay-aio-node";
import options from "./options";

function ECPay(order) {
  const { HOST } = process.env;

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
  const TotalAmount = order.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.count;
  }, 0);
  const ItemName = order.map((product) => {
    return `${product.productId} X ${product.count} (${product.price})`;
  });

  console.log("TotalAmount", TotalAmount);
  console.log("ItemName", ItemName);

  let base_param = {
    MerchantTradeNo: TradeNo,
    MerchantTradeDate,
    TotalAmount: TotalAmount,
    TradeDesc: "測試交易描述",
    ItemName: ItemName.join(","),
    ReturnURL: `${HOST}/return`,
    ClientBackURL: `${HOST}/clientReturn`,
  };

  const create = new ecpay_payment(options);
  const html = create.payment_client.aio_check_out_all(base_param);
  return html;
}

export default ECPay;
