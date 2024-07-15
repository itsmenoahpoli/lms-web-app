import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Table, type TableColumnsType } from "antd";
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
      title: "",
      dataIndex: "id",
      align: "right",
      render: (id: number) => {
        return id;
      },
    },
  ];
  return (
    <>
      <PageHeader title="Lectures" subtitle="Manage students lectures">
        <Button type="primary" className="h-[40px]">
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
