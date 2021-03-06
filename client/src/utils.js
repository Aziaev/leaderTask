import { format, isValid, parseJSON } from "date-fns";
import { get } from "lodash";

export function formatNumberDecimalMoney(numberDecimal) {
  const amount = get(numberDecimal, "$numberDecimal");
  if (!amount) {
    return 0;
  }
  const floatAmount = parseFloat(amount);

  return new Intl.NumberFormat("ru-RU").format(floatAmount);
}

const HUMAN_DATE_FORMAT = "dd.MM.yyyy";

export function formatDateToString(dateString) {
  if (!dateString) {
    return null;
  }
  const date = new Date(dateString);
  const isValidDate = isValid(parseJSON(dateString));
  return isValidDate ? format(date, HUMAN_DATE_FORMAT) : null;
}
