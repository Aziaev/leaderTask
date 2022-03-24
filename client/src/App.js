import { Col, Layout, PageHeader, Row } from "antd";
import { AppContextProvider } from "./AppContext";
import Content from "./components/Content";

export default function App() {
  return (
    <AppContextProvider>
      <Layout>
        <Row style={{ minHeight: "100vh" }}>
          <Col span={6} />
          <Col
            span={12}
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <PageHeader title="ЛидерТаск" />
            <Layout.Content
              style={{
                background: "#fff",
                margin: "0",
                padding: "1rem 1.5rem",
              }}
            >
              <Content />
            </Layout.Content>
            <Layout.Footer style={{ padding: "1rem 1.5rem" }}>
              ИС "Сбор статистики и анализ продаж"
            </Layout.Footer>
          </Col>
          <Col span={6} />
        </Row>
      </Layout>
    </AppContextProvider>
  );
}
