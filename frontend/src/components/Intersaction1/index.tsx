import { Card, Form, message } from "antd";
import React, { useEffect } from "react";
import { getApi, postApi } from "../../utils/api";
import SignalInputForm from "../global/SignalInputForm";

const Intersaction1 = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const data = {
        signal1Time: Number(values.signal1),
        signal2Time: Number(values.signal2),
        signal3Time: Number(values.signal3),
        intersectionType: "THREE_WAY",
      };
      const response = await postApi("/traffic-signal-configs", data);
      message.success("Form submitted successfully!");
      console.log("API Response:", response.data);
    } catch (error) {
      message.error("Failed to submit form. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInitialValues = async () => {
    try {
      const response = await getApi("/traffic-signal-configs/type/THREE_WAY");
      const data = response.data.data;
      form.setFieldsValue({
        signal1: data.signal1Time,
        signal2: data.signal2Time,
        signal3: data.signal3Time,
      });
    } catch (error) {
      message.error("Failed to fetch initial values. Please try again.");
      console.error("Error fetching initial values:", error);
    }
  };

  useEffect(() => {
    fetchInitialValues();
  }, []);

  return (
    <Card title="3 Way Intersection Signals" className="intersection-card">
      <SignalInputForm
        signalCount={3}
        loading={loading}
        form={form}
        onFinish={onFinish}
      />
    </Card>
  );
};

export default Intersaction1;
