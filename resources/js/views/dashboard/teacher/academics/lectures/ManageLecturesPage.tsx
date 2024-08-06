import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Table,
  Space,
  Modal,
  type TableColumnsType,
} from "antd";
import {
  IoAddCircleOutline,
  IoCloudDownloadOutline,
  IoCopyOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { PageHeader } from "@/components/shared";
import { LecturesService } from "@/services";
import { formatDate } from "@/utils/date.util";
import { copyToClipboard } from "@/utils/string.util";
import type { Lecture } from "@/types/models";

const ManageLecturesPage: React.FC = () => {
  const [modal, context] = Modal.useModal();

  const navigate = useNavigate();
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["data-lectures"],
    queryFn: async () => await LecturesService.getLecturesList(),
  });

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

  const handleEdit = (id: number) => {
    return navigate(`/dashboard/teacher/lectures/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: "Do you confirm to delete this record?",
      onOk: async () =>
        await LecturesService.deleteLecture(id).then(() => refetch()),
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const tableColumns: TableColumnsType<Lecture> = [
    {
      title: "Title",
      dataIndex: "name",
    },
    {
      title: "Module File",
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
              Copy URL <IoCopyOutline />
            </Button>
            <a href={file} download>
              <Button className="text-xs">
                Download <IoCloudDownloadOutline />
              </Button>
            </a>
          </Space>
        );
      },
    },
    {
      title: "Week No.",
      dataIndex: "week_number",
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
            className="text-xs text-center font-bold w-[80px] h-[20px]"
            type={status.type}
            message={status.message}
          />
        );
      },
    },
    {
      title: "Submission Status",
      dataIndex: "is_posted",
      render: (is_posted: boolean) => {
        const status = {
          message: is_posted ? "OPEN" : "CLOSED",
          type: (is_posted ? "success" : "error") as any,
        };
        return (
          <Alert
            className="text-xs text-center font-bold w-[80px] h-[20px]"
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
            <Button type="link" onClick={() => handleEdit(id)}>
              <IoPencilOutline />
            </Button>
            <Button type="link" onClick={() => handleDelete(id)} danger>
              <IoTrashOutline />
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {context}
      <PageHeader title="LECTURES" subtitle="Manage students lectures">
        <Button type="default" className="h-[35px]">
          <IoAddCircleOutline size={24} /> Download CSV
        </Button>

        <Link to="/dashboard/teacher/lectures/create">
          <Button type="primary" className="h-[35px]">
            <IoAddCircleOutline size={24} /> Create Lecture
          </Button>
        </Link>
      </PageHeader>

      <Space direction="vertical" size="middle" className="w-full mt-2">
        <Table
          rowKey={"id"}
          rowSelection={rowSelection}
          dataSource={data}
          columns={tableColumns}
          loading={isLoading}
          pagination={{ pageSize: 50 }}
        />
      </Space>
    </>
  );
};

export default ManageLecturesPage;
