const { reduce } = require("lodash");

function getNumberDecimalValue(value) {
  if (!value) {
    return 0;
  }

  const stringValue = value.toString();

  return parseFloat(stringValue);
}

function getSums(leads) {
  return reduce(
    leads,
    (result, { revenue, profit }) => {
      return {
        revenue: result.revenue + getNumberDecimalValue(revenue),
        profit: result.profit + getNumberDecimalValue(profit),
      };
    },
    { revenue: 0, profit: 0 }
  );
}

module.exports = { getNumberDecimalValue, getSums };
