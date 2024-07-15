import React from "react";
import { PageHeader } from "@/components/shared";
import { Button, Card, Table } from "antd";
import type { TableColumnsType } from "antd";

type DataType = {
  title: string;
  description: string;
};

const ManageStudentsPage: React.FC = () => {
  const tableColumns: TableColumnsType<DataType> = [
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
        title="Students"
        subtitle="Manage students information & data"
      >
        <Button type="primary" className="h-[40px]">
          Create Quiz
        </Button>
      </PageHeader>

      <Table dataSource={[]} columns={tableColumns} />
    </>
  );
};

export default ManageStudentsPage;
