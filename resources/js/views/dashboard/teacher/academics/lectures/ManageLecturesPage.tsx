import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Table, type TableColumnsType } from "antd";
import { PageHeader } from "@/components/shared";
import { LecturesService } from "@/services";
import ButtonGroup from "antd/es/button/button-group";

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
      title: "...",
      dataIndex: "id",
      align: "right",
      render: (id: number) => {
        return (
          <ButtonGroup>
            <Button>Edit</Button>
            <Button type="primary" danger>
              Delete
            </Button>
          </ButtonGroup>
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
