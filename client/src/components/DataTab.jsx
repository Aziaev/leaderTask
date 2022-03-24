import { CloseOutlined } from "@ant-design/icons";
import { Button, Row, Spin, Table } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useAppContext } from "../AppContext";
import { formatDateToString, formatNumberDecimalMoney } from "../utils";
import AddItemModal from "./AddItemModal";

export default function DataTab() {
  const [visible, setVisible] = useState(false);

  const { products, isLoading, deleteProduct } = useAppContext();

  function addButtonClickHandler() {
    setVisible(true);
  }

  const deleteButtonClick = useCallback(
    async (e) => {
      await deleteProduct(e.currentTarget.id);
    },
    [deleteProduct]
  );

  const columns = useMemo(
    () => [
      {
        title: "Вид продажи",
        dataIndex: "product",
        key: "product",
      },
      {
        title: "Дата продажи",
        dataIndex: "date",
        key: "date",
        width: 120,
        render: (value) => formatDateToString(value),
      },
      {
        title: "Цена",
        dataIndex: "price",
        key: "price",
        width: 120,
        render: (value) => {
          return (
            <div style={{ display: "block", textAlign: "end" }}>
              {formatNumberDecimalMoney(value)}
            </div>
          );
        },
      },
      {
        title: "Прибыль",
        dataIndex: "profit",
        key: "profit",
        width: 120,
        render: (value) => (
          <div style={{ display: "block", textAlign: "end" }}>
            {formatNumberDecimalMoney(value)}
          </div>
        ),
      },
      {
        title: <div style={{ display: "block", textAlign: "center" }}>...</div>,
        width: 50,
        dataIndex: "_id",
        key: "_id",
        render: (_id) => (
          <div style={{ display: "block", textAlign: "center" }}>
            <Button
              size="small"
              id={_id}
              type="text"
              onClick={deleteButtonClick}
              icon={<CloseOutlined />}
            />
          </div>
        ),
      },
    ],
    [deleteButtonClick]
  );

  return (
    <>
      <Row style={{ marginBottom: "1rem", justifyContent: "flex-end" }}>
        <Button onClick={addButtonClickHandler} style={{ float: "right" }}>
          Добавить запись
        </Button>
      </Row>
      <Table
        dataSource={products}
        columns={columns}
        pagination={false}
        size="small"
        rowKey="_id"
        scroll={{ y: 600 }}
        loading={isLoading}
      />
      <AddItemModal visible={visible} setVisible={setVisible} />
    </>
  );
}
