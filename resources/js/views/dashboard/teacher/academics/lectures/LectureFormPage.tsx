import React from "react";
import { useParams } from "react-router-dom";
import { Card, Spin } from "antd";
import { PageHeader } from "@/components/shared";
import { LectureForm } from "@/components/domains";
import { LecturesService } from "@/services";

const ManageLecturesPage: React.FC = () => {
  const { id } = useParams();

  const [formData, setFormData] = React.useState(undefined);
  const [formType, setFormType] = React.useState<"add" | "update">("add");

  const fetchData = async () => {
    return await LecturesService.getLecture(+id!).then((data) =>
      setFormData(data)
    );
  };

  React.useEffect(() => {
    fetchData();

    if (window.location.pathname.includes("edit")) setFormType("update");
  }, []);

  console.log("data", formData);

  return (
    <>
      <PageHeader
        title="LECTURE INFORMATION"
        subtitle="Upload or edit lecture module for students"
      />

      <Card className="w-3/4">
        {!formData ? <Spin /> : <LectureForm type={formType} data={formData} />}
      </Card>
    </>
  );
};

export default ManageLecturesPage;
