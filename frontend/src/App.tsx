import { Tabs } from "antd";
import {
  ApartmentOutlined,
  BranchesOutlined,
  ShareAltOutlined,
  NodeIndexOutlined,
  BulbOutlined,
} from "@ant-design/icons";

import "./App.css";
import Intersection1 from "./components/Intersaction1";
import Intersection2 from "./components/Intersaction2";
import Intersection3 from "./components/Intersaction3";
import Intersection4 from "./components/Intersaction4";

const { TabPane } = Tabs;

function App() {
  return (
    <div className="app-container">
      <Tabs defaultActiveKey="1" type="card" centered>
        <TabPane
          tab={
            <span>
              <BranchesOutlined /> 3-Way Intersection
            </span>
          }
          key="1"
        >
          <Intersection1 />
        </TabPane>

        <TabPane
          tab={
            <span>
              <ApartmentOutlined /> 4-Way Intersection (Type-1)
            </span>
          }
          key="2"
        >
          <Intersection2 />
        </TabPane>

        <TabPane
          tab={
            <span>
              <ShareAltOutlined /> 4-Way Intersection (Type-2)
            </span>
          }
          key="3"
        >
          <Intersection3 />
        </TabPane>

        <TabPane
          tab={
            <span>
              <NodeIndexOutlined /> 5-Way Intersection
            </span>
          }
          key="4"
        >
          <Intersection4 />
        </TabPane>

        <TabPane
          tab={
            <span>
              <BulbOutlined /> Signals
            </span>
          }
          key="5"
        >
          <div
            style={{ padding: "16px", textAlign: "center", fontSize: "16px" }}
          >
            Signal settings or visualizations will appear here.
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
