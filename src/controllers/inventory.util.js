const transformInventory = (data, inStockPerMonth, outStockPerMonth) => {
  const result = data;
  const inventories = [];

  data.results?.forEach((item) => {
    const inventory = { ...item.toJSON() };
    const inStockCurrentMonth = inStockPerMonth?.find((inStock) => inStock._id.equals(item._id))?.inStockCurrentMonth ?? 0;
    const outStockCurrentMonth =
      outStockPerMonth?.find((outStock) => outStock._id.equals(item._id))?.outStockCurrentMonth ?? 0;

    inventory.inStockCurrentMonth = inStockCurrentMonth;
    inventory.outStockCurrentMonth = outStockCurrentMonth;
    inventory.stockCurrentMonth = inStockCurrentMonth - outStockCurrentMonth;

    inventories.push(inventory);
  });

  result.results = inventories;

  return result;
};

module.exports = {
  transformInventory,
};
