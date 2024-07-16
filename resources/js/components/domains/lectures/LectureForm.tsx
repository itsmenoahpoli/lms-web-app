import React from "react";
import { Form, Input, Button } from "antd";
import { LecturesService } from "@/services";
import type { Lecture } from "@/types/models";

export const LectureForm: React.FC = (props) => {
  const handleFormSubmit = (formData: Lecture) => {
    console.log(formData);
  };

  return (
    <Form layout="vertical" onFinish={handleFormSubmit}>
      <Form.Item label="Name" name="name">
        <Input placeholder="Enter lecture name" />
      </Form.Item>
    </Form>
  );
};
