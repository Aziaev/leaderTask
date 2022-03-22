import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  saleType: Yup.string().required("Нужно выбрать"),
  date: Yup.date().required("Нужно указать дату продажи"),
  profit: Yup.number().required("Нужно указать прибыль"),
  price: Yup.number().required("Нужно указать стоимость"),
});

export default validationSchema;
