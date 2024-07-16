import React from "react";
import { Form, Input, Button } from "antd";
import { LecturesService } from "@/services";
import type { Lecture } from "@/types/models";

export const LectureForm: React.FC<{ type: "add" | "update" }> = (props) => {
  const handleFormSubmit = async (formData: Lecture) => {
    return await LecturesService.createLecture(formData);
  };

  return (
    <Form layout="vertical" onFinish={handleFormSubmit}>
      <Form.Item label="Name" name="name">
        <Input placeholder="Enter lecture name" />
      </Form.Item>
      <Form.Item label="Name" name="name">
        <Input.TextArea placeholder="Enter lecture description" />
      </Form.Item>
    </Form>
  );
};
