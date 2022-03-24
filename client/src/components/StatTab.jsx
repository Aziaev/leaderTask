import { Col, Row } from "antd";
import React from "react";
import LineReport from "./LineReport";
import PieReport from "./PieReport";
import ProfitReport from "./ProfitReport";

export default function StatTab() {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Анализ популярности продуктов</h1>
      </div>
      <Row>
        <Col span={16} offset={4}>
          <PieReport />
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Анализ прибыльности продуктов, в руб.</h1>
      </div>
      <Row>
        <Col span={16} offset={4}>
          <ProfitReport />
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Анализ выручки и прибыли, в руб.</h1>
      </div>
      <Row>
        <Col span={24}>
          <LineReport />
        </Col>
      </Row>
    </>
  );
}
