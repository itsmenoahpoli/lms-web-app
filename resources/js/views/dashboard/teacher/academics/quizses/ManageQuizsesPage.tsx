import React from "react";
import { PageHeader } from "@/components/shared";
import { Button, Card, Table } from "antd";
import type { TableColumnsType } from "antd";

type DataType = {
  title: string;
  description: string;
};

const ManageQuizsesPage: React.FC = () => {
  const tableColumns: TableColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: (id: number) => {
        return id;
      },
    },
  ];
  return (
    <>
      <PageHeader
        title="Quizses"
        subtitle="Manage posted lecture quizses for students"
      >
        <Button type="primary" className="h-[40px]">
          Create Quiz
        </Button>
      </PageHeader>

      <Table dataSource={[]} columns={tableColumns} />
    </>
  );
};

export default ManageQuizsesPage;
