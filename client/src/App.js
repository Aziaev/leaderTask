import { Button, Col, Layout, PageHeader, Row } from "antd";

const { Footer, Content } = Layout;

export default function App() {
  return (
    <Layout>
      <Row style={{minHeight: "100vh"}}>
        <Col span={6} />
        <Col span={12} style={{minHeight: "100vh", display: 'flex', flexDirection: "column"}}>
          <PageHeader title="ЛидерТаск" />
          <Content
            style={{
              background: "#fff",
              margin: "0",
              padding: '1rem 1.5rem'
            }}
          >
            <Button type="primary">
              Primary Button
            </Button>
          </Content>
          <Footer style={{padding: '1rem 1.5rem'}}>ИС "Сбор статистики и анализ продаж"</Footer>
        </Col>
        <Col span={6} />
      </Row>
    </Layout>
  );
}
