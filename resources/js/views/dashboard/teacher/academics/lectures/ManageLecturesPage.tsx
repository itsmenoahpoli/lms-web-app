import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Table,
  Space,
  Input,
  Select,
  type TableColumnsType,
} from "antd";
import { IoCloudDownloadOutline, IoCopyOutline } from "react-icons/io5";
import { PageHeader } from "@/components/shared";
import { LecturesService } from "@/services";
import { formatDate } from "@/utils/date.util";
import { copyToClipboard } from "@/utils/string.util";
import { getPopupContainer } from "@/utils/select.util";
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
      title: "Module URL",
      dataIndex: "file",
      render: (file: string) => {
        return (
          <Space direction="horizontal">
            <Button
              className="text-xs"
              onClick={() =>
                copyToClipboard(file, "File url copied to clipboard!")
              }
            >
              Copy <IoCopyOutline />
            </Button>
            <a href={file} target="_blank">
              <Button className="text-xs">
                Download <IoCloudDownloadOutline />
              </Button>
            </a>
          </Space>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "is_posted",
      render: (is_posted: boolean) => {
        const status = {
          message: is_posted ? "POSTED" : "DRAFT",
          type: (is_posted ? "success" : "warning") as any,
        };
        return (
          <Alert
            className="text-xs text-center font-bold"
            type={status.type}
            message={status.message}
          />
        );
      },
    },
    {
      title: "Date Created",
      dataIndex: "created_at",
      align: "right",
      render: (created_at: string) => {
        return formatDate(created_at);
      },
    },
    {
      title: "Last Updated",
      dataIndex: "updated_at",
      align: "right",
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

      <Space direction="vertical" size="middle" className="w-full mt-2">
        <div className="flex flex-row gap-2 w-3/4">
          <Input className="w-full" placeholder="Search" />
          <Select
            className="w-full"
            placeholder="Filter by status"
            getPopupContainer={getPopupContainer}
          />
        </div>
        <Table
          dataSource={data}
          columns={tableColumns}
          rowKey={"id"}
          loading={isLoading}
        />
      </Space>
    </>
  );
};

export default ManageLecturesPage;
