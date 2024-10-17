import ecpay_payment from "ecpay-aio-node";
import options from "./options.mjs";

function ECPay(order, userUid) {
  const { HOST } = process.env;

  const MerchantTradeDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

  const TradeNo = "test" + new Date().getTime();
  const TotalAmount = order.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.count;
  }, 0);
  const ItemName = order
    .map((product) => {
      return `${product.productId}`; // X ${product.count} (${product.price})
    })
    .join(",");

  let base_param = {
    MerchantTradeNo: TradeNo,
    MerchantTradeDate,
    TotalAmount: TotalAmount,
    TradeDesc: "測試交易描述",
    ItemName: ItemName,
    ReturnURL: `${HOST}/return`,
    ClientBackURL: `${HOST}/clientReturn`,
    CustomField1: userUid,
  };

  const create = new ecpay_payment(options);
  const html = create.payment_client.aio_check_out_all(base_param);
  return html;
}

export default ECPay;
