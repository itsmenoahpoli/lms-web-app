import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button, Table, Space, type TableColumnsType } from "antd";
import { PageHeader } from "@/components/shared";
import { LecturesService } from "@/services";
import { formatDate } from "@/utils/date.util";
import type { Lecture } from "@/types/models";

const ManageLecturesPage: React.FC = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["data-lectures"],
    queryFn: async () => await LecturesService.getLecturesList(),
  });

  const handleEdit = (id: number) => {
    console.log(id);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const tableColumns: TableColumnsType<Lecture> = [
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
      render: (created_at: string) => {
        return formatDate(created_at);
      },
    },
    {
      title: "Last Updated",
      dataIndex: "updated_at",
      render: (updated_at: string) => {
        return formatDate(updated_at);
      },
    },
    {
      title: "...",
      dataIndex: "id",
      align: "right",
      render: (id: number) => {
        return (
          <Space direction="horizontal">
            <Button onClick={() => handleEdit(id)}>Edit</Button>
            <Button type="primary" onClick={() => handleDelete(id)} danger>
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
        <Link to="/dashboard/teacher/lectures/create">
          <Button type="primary" className="h-[40px]">
            CREATE LECTURE
          </Button>
        </Link>
      </PageHeader>

      {!isLoading && data ? (
        <Table dataSource={data} columns={tableColumns} />
      ) : null}
    </>
  );
};

export default ManageLecturesPage;
