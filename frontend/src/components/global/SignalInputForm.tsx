import { Button, Form, Input } from "antd";
import React from "react";

type SignalInputFormProps = {
  signalCount: number;
  loading: boolean;
  form: any;
  onFinish: (values: any) => void;
};

const SignalInputForm: React.FC<SignalInputFormProps> = ({
  signalCount,
  loading,
  form,
  onFinish,
}) => {
  const renderSignalInputs = () => {
    return Array.from({ length: signalCount }, (_, index) => {
      const signalKey = `signal${index + 1}`;
      return (
        <Form.Item
          key={signalKey}
          label={`Signal ${index + 1} Time`}
          name={signalKey}
          rules={[
            { required: true, message: `Please input signal ${index + 1}!` },
            {
              validator: (_, value) => {
                if (value === "" || value === undefined)
                  return Promise.resolve();
                const num = Number(value);
                if (isNaN(num)) {
                  return Promise.reject("Please enter a valid number!");
                }
                if (num < 10 || num > 300) {
                  return Promise.reject(
                    "Time must be between 10 and 300 seconds!"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            type="number"
            placeholder={`Enter signal ${index + 1}`}
            className="full-width"
          />
        </Form.Item>
      );
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="intersection-form"
    >
      {renderSignalInputs()}

      <Form.Item className="submit-spacing">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="full-width"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignalInputForm;
