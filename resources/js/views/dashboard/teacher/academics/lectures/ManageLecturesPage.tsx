import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Table, Space type TableColumnsType } from "antd";
import { PageHeader } from "@/components/shared";
import { LecturesService } from "@/services";

const ManageLecturesPage: React.FC = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["data-lectures"],
    queryFn: async () => await LecturesService.getLecturesList(),
  });

  const tableColumns: TableColumnsType = [
    {
      title: "Title",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "is_posted",
    },
    {
      title: "Date Created",
      dataIndex: "created_at",
    },
    {
      title: "Last Updated",
      dataIndex: "updated_at",
    },
    {
      title: "...",
      dataIndex: "id",
      align: "right",
      render: (id: number) => {
        return (
          <Space direction="horizontal">
            <Button>Edit</Button>
            <Button type="primary" danger>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <PageHeader title="Lectures" subtitle="Manage students lectures">
        <Button type="default" className="h-[40px] border border-gray-300">
          Create Lecture
        </Button>
      </PageHeader>

      {!isLoading && data ? (
        <Table dataSource={data} columns={tableColumns} />
      ) : null}
    </>
  );
};

export default ManageLecturesPage;
