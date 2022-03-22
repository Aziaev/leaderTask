import { Form, Input, Modal, Select } from "antd";
import { Formik } from "formik";
import { CREATE_ITEM_INITIAL_VALUES, SALE_TYPES } from "../constants";
import validationSchema from "../validation";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function AddItemModal({ visible, setVisible }) {
  function onSubmit(values, { resetForm }) {
    console.log(values);
    resetForm();
    setVisible(false);
  }

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Formik
      initialValues={CREATE_ITEM_INITIAL_VALUES}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        const {
          handleSubmit,
          handleChange,
          values,
          errors,
          setFieldValue,
          isSubmitting,
        } = formikProps;

        return (
          <Modal
            title="Добавление записи"
            visible={visible}
            onOk={handleSubmit}
            confirmLoading={isSubmitting}
            onCancel={handleCancel}
          >
            <Form {...layout}>
              <Form.Item
                name="saleType"
                label="Вид лицензии"
                validateStatus={errors.saleType && "error"}
              >
                <Select
                  placeholder="Выберите вид лицензии"
                  disabled={isSubmitting}
                  onChange={(value) => setFieldValue("saleType", value)}
                  value={values.saleType}
                >
                  {SALE_TYPES.map((saleType, index) => (
                    <Option key={saleType} value={saleType}>
                      {saleType}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Стоимость лицензии"
                validateStatus={errors.price && "error"}
              >
                <Input
                  disabled={isSubmitting}
                  type="number"
                  name="price"
                  placeholder="Укажите стоимость"
                  onChange={handleChange}
                  value={values.price}
                />
              </Form.Item>
              <Form.Item
                label="Прибыль"
                validateStatus={errors.price && "error"}
              >
                <Input
                  disabled={isSubmitting}
                  type="number"
                  name="profit"
                  placeholder="Укажите прибыль"
                  onChange={handleChange}
                  value={values.profit}
                />
              </Form.Item>
              <Form.Item label="Дата продажи">
                <Input
                  disabled={isSubmitting}
                  type="date"
                  placeholder="Укажите дату продажи"
                  onChange={(value) => setFieldValue("date", value)}
                  value={values.date}
                />
              </Form.Item>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
}
