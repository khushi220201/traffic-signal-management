import { Card, Form, message } from "antd";
import React, { useEffect } from "react";
import { getApi, postApi } from "../../utils/api";
import SignalInputForm from "../global/SignalInputForm";
import { IntersectionTypes, ISignalFormValues } from "../../interfaces";

type Props = {};

const Intersaction4 = (props: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: ISignalFormValues) => {
    try {
      setLoading(true);
      const data = {
        signal1Time: Number(values.signal1),
        signal2Time: Number(values.signal2),
        signal3Time: Number(values.signal3),
        signal4Time: Number(values.signal4),
        signal5Time: Number(values.signal5),
        intersectionType: IntersectionTypes.FIVE_WAY,
      };
      const response = await postApi("/traffic-signal-configs", data);
      messageApi.success(
        response.data.message ||
          "Traffic signal configuration has been successfully applied."
      );
    } catch (error) {
      messageApi.error("Failed to config time. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInitialValues = async () => {
    try {
      const response = await getApi("/traffic-signal-configs/type/FIVE_WAY");
      const data = response.data.data;
      form.setFieldsValue({
        signal1: data.signal1Time,
        signal2: data.signal2Time,
        signal3: data.signal3Time,
        signal4: data.signal4Time,
        signal5: data.signal5Time,
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
    <>
      {contextHolder}
      <Card title="5 Way Intersection Signals" className="intersection-card">
        <SignalInputForm
          signalCount={5}
          loading={loading}
          form={form}
          onFinish={onFinish}
        />
      </Card>
    </>
  );
};

export default Intersaction4;
