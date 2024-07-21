import React from "react";
import { Form, Input, Select, Button } from "antd";
import { LecturesService } from "@/services";
import { getPopupContainer } from "@/utils/select.util";
import type { Lecture } from "@/types/models";

const statusOptions = [
  {
    value: 1,
    label: "Posted",
  },
  {
    value: 0,
    label: "Draft",
  },
];

export const LectureForm: React.FC<{ type: "add" | "update" }> = (props) => {
  const [fileValue, setFileValue] = React.useState<File | null>(null);

  const handleFormSubmit = async (formData: Lecture) => {
    return await LecturesService.createLecture({
      ...formData,
      file: fileValue,
    });
  };

  const handleFileInput = (fileList: FileList | null) => {
    if (fileList) setFileValue(fileList[0]);
  };

  return (
    <Form layout="vertical" onFinish={handleFormSubmit} requiredMark>
      <Form.Item label="Name" name="name" required>
        <Input placeholder="Enter lecture name" />
      </Form.Item>
      <Form.Item label="Description" name="description" required>
        <Input.TextArea
          className="!h-[100px]"
          placeholder="Enter lecture description"
        />
      </Form.Item>
      <Form.Item label="Module File" name="file">
        <Input
          type="file"
          name="file"
          onChange={(e) => handleFileInput(e.target.files)}
        />
      </Form.Item>
      <Form.Item label="Status" name="is_posted">
        <Select options={statusOptions} getPopupContainer={getPopupContainer} />
      </Form.Item>
      <Button htmlType="submit" type="primary" size="large" className="text-sm">
        {props.type === "add" ? "Upload Lecture" : "Update Module"}
      </Button>
    </Form>
  );
};
