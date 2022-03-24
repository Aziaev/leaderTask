export const LICENSE_TYPES = [
  "Неограниченная лицения",
  "Персональная лицензия",
  "Лицензия на 2-х пользователей",
  "Лицензия на 3-х пользователей",
  "Лицензия на 4-х пользователей",
  "Лицензия на 5 пользователей",
];

export const CREATE_ITEM_INITIAL_VALUES = {
  product: LICENSE_TYPES[0],
  date: new Date().toISOString().split("T")[0],
  profit: "",
  price: "",
};
