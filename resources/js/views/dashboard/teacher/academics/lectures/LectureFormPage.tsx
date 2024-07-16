import React from "react";
import { PageHeader } from "@/components/shared";
import { LectureForm } from "@/components/domains";
import { Card } from "antd";

const ManageLecturesPage: React.FC = () => {
  return (
    <>
      <PageHeader title="Lectures" subtitle="Manage students lectures" />

      <Card>
        <LectureForm />
      </Card>
    </>
  );
};

export default ManageLecturesPage;
