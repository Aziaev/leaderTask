export const CREATE_ITEM_INITIAL_VALUES = {
  saleType: "",
  date: new Date().toISOString().split("T")[0],
  profit: "",
  price: "",
};

export const SALE_TYPES = [
  "Неограниченная лицения",
  "Персональная лицензия",
  "Лицензия на 2-х пользователей",
  "Лицензия на 3-х пользователей",
  "Лицензия на 4-х пользователей",
  "Лицензия на 5 пользователей",
];