import React from "react";
import { PageHeader } from "@/components/shared";
import { LectureForm } from "@/components/domains";
import { Card } from "antd";

const ManageLecturesPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Upload Lectures"
        subtitle="Upload new lecture module for students"
      />

      <Card className="w-3/4">
        <LectureForm type="add" />
      </Card>
    </>
  );
};

export default ManageLecturesPage;
