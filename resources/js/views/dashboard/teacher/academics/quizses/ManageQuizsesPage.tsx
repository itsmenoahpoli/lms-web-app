import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table, Space, Modal, type TableColumnsType } from "antd";
import {
  IoAddCircleOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { PageHeader } from "@/components/shared";
import { QuizsesService } from "@/services";
import type { LectureQuiz } from "@/types/models";

type DataType = {
  title: string;
  description: string;
};

const ManageQuizsesPage: React.FC = () => {
  const [modal, context] = Modal.useModal();

  const navigate = useNavigate();
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["data-lecture-quizses"],
    queryFn: async () => await QuizsesService.getQuizsesList(),
  });

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

  const handleEdit = (id: number) => {
    return navigate(`/dashboard/teacher/lectures/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: "Do you confirm to delete this record?",
      onOk: async () =>
        await QuizsesService.deleteQuiz(id).then(() => refetch()),
    });
  };

  const tableColumns: TableColumnsType<DataType> = [
    {
      title: "Lecture No",
      render: (row: LectureQuiz) => {
        return row.lecture.lecture_no;
      },
    },
    {
      title: "Lecture",
      render: (row: LectureQuiz) => {
        return row.title;
      },
    },
    {
      title: "Actions",
      dataIndex: "id",
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <PageHeader
        title="Quizses"
        subtitle="Manage posted lecture quizses for students"
      >
        <Button type="default" className="h-[35px]">
          <IoAddCircleOutline size={24} /> Download CSV
        </Button>

        <Link to="/dashboard/teacher/quizses/create">
          <Button type="primary" className="h-[35px]">
            <IoAddCircleOutline size={24} /> Create Quiz
          </Button>
        </Link>
      </PageHeader>

      <Table
        rowKey={"id"}
        rowSelection={rowSelection}
        dataSource={data}
        columns={tableColumns}
        loading={isLoading}
        pagination={{ pageSize: 50 }}
      />
    </>
  );
};

export default ManageQuizsesPage;
