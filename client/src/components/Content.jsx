import { Tabs } from "antd";
import DataTab from "./DataTab";
import StatTab from "./StatTab";

export default function Content() {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Данные продаж" key="1">
        <DataTab />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Статистика" key="2">
        <StatTab />
      </Tabs.TabPane>
    </Tabs>
  );
}
