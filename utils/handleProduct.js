function handleProduct(data) {
  const array = data.split("&");

  const object = {};
  function hadleData(item) {
    const selectValue = item.replace(/\s+/g, "");
    // console.log("selectValue", selectValue);
    return {
      productId: selectValue.split("X")[0],
      count: Number(selectValue.split("X")[1].split("(")[0]),
      price: Number(selectValue.split("X")[1].split("(")[1].replace(")", "")),
    };
  }

  array.forEach((item) => {
    let products = [];
    object[`${item.split("=")[0]}`] = item.split("=")[1];
    if (item.indexOf("ItemName") !== -1) {
      if (item.split("=")[1].indexOf(",") !== -1) {
        item
          .split("=")[1]
          .split(",")
          .forEach((product) => {
            // console.log(product);
            products.push(hadleData(product));
          });
      } else {
        // console.log(item);
        products.push(hadleData(item.split("=")[1]));
      }
      object.product = products;
    }
  });
  return object;
}
export default handleProduct;
