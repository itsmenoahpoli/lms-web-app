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
  Modal,
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
  const [modal, context] = Modal.useModal();
  const [filters, setFilters] = React.useState();

  const { isLoading, data } = useQuery({
    queryKey: ["data-lectures"],
    queryFn: async () => await LecturesService.getLecturesList(),
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    console.log(value);
  };

  const handleFilter = (status: string | boolean) => {
    console.log(status);
  };

  const handleEdit = (id: number) => {
    console.log(id);
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: "Do you confirm to delete this record?",
      onOk: async () => await LecturesService.deleteLecture(id),
    });
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
      {context}
      <PageHeader title="Lectures" subtitle="Manage students lectures">
        <Link to="/dashboard/teacher/lectures/create">
          <Button type="primary" className="h-[40px]">
            CREATE LECTURE
          </Button>
        </Link>
      </PageHeader>

      <Space direction="vertical" size="middle" className="w-full mt-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-x-3 text-sm">
            <p>Posted (32)</p>
            <p>Draft (16)</p>
          </div>
          <div className="flex flex-row gap-2 w-1/2">
            <Input
              className="w-full"
              placeholder="Search"
              onChange={handleSearch}
            />
            <Select
              className="w-full"
              placeholder="Filter by status"
              getPopupContainer={getPopupContainer}
            />
          </div>
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
