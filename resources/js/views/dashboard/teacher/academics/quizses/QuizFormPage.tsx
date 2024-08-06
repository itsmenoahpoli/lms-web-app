import React from "react";
import { useParams } from "react-router-dom";
import { Card, Spin } from "antd";
import { PageHeader } from "@/components/shared";
import { LectureQuizForm } from "@/components/domains";
import { QuizsesService } from "@/services";

const QuizFormPage: React.FC = () => {
  const { id } = useParams();

  const [formData, setFormData] = React.useState(undefined);
  const [formType, setFormType] = React.useState<"add" | "update">("add");

  const fetchData = async () => {
    return await QuizsesService.getQuiz(+id!).then((data) => setFormData(data));
  };

  React.useEffect(() => {
    fetchData();

    if (window.location.pathname.includes("edit")) setFormType("update");
  }, []);

  return (
    <>
      <PageHeader
        title="LECTURE INFORMATION"
        subtitle="Upload or edit lecture module for students"
      />

      <Card>
        {!formData ? (
          <Spin />
        ) : (
          <LectureQuizForm type={formType} data={formData} />
        )}
      </Card>
    </>
  );
};

export default QuizFormPage;
