import React from "react";
import { Form, Input, Select, Button } from "antd";
import { LecturesService } from "@/services";
import { getPopupContainer } from "@/utils/select.util";
import type { Lecture } from "@/types/models";

const statusOptions = [
  {
    value: 1,
    label: "Open",
  },
  {
    value: 0,
    label: "Closed",
  },
];

const submissionStatusOptions = [
  {
    value: 1,
    label: "Open",
  },
  {
    value: 0,
    label: "Closed",
  },
];

export const LectureForm: React.FC<{
  type: "add" | "update";
  data?: Lecture;
}> = (props) => {
  const [fileValue, setFileValue] = React.useState<File | null>(null);

  let initialValues: Lecture | undefined = React.useMemo(() => {
    if (props.data) {
      delete props.data["file"];
    }

    return props.data ? { ...props.data } : undefined;
  }, [props.data]);

  const handleFormSubmit = async (formData: Lecture) => {
    if (props.type === "update" && props.data?.id) {
      delete formData.file;

      return await LecturesService.updateLecture(props.data?.id, {
        ...formData,
      });
    }

    return await LecturesService.createLecture({
      ...formData,
      file: fileValue,
    });
  };

  const handleFileInput = (fileList: FileList | null) => {
    if (fileList) setFileValue(fileList[0]);
  };

  React.useEffect(() => {
    return () => {
      initialValues = undefined;
    };
  }, []);

  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFormSubmit}
      requiredMark
    >
      <Form.Item label="Week No" name="week_number" required>
        <Input type="number" placeholder="Enter week number" />
      </Form.Item>

      <Form.Item label="Name" name="name" required>
        <Input placeholder="Enter lecture name" />
      </Form.Item>

      <Form.Item label="Description" name="description" required>
        <Input.TextArea
          className="!h-[100px]"
          placeholder="Enter lecture description"
        />
      </Form.Item>

      {props.type === "add" ? (
        <Form.Item label="Module File" name="file">
          <Input
            type="file"
            name="file"
            onChange={(e) => handleFileInput(e.target.files)}
          />
        </Form.Item>
      ) : null}

      <Form.Item label="Status" name="is_posted">
        <Select
          options={submissionStatusOptions}
          getPopupContainer={getPopupContainer}
        />
      </Form.Item>

      <Form.Item label="Open for submission?" name="is_submission_open">
        <Select options={statusOptions} getPopupContainer={getPopupContainer} />
      </Form.Item>

      <Button htmlType="submit" type="primary" size="large" className="text-sm">
        {props.type === "add" ? "Upload Lecture" : "Update Module"}
      </Button>
    </Form>
  );
};
