import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, Spin } from "antd";
import { PageHeader } from "@/components/shared";
import { LectureForm } from "@/components/domains";
import { LecturesService } from "@/services";

const ManageLecturesPage: React.FC = () => {
  const [formType, setFormType] = React.useState<"add" | "update">("add");

  const { id } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["data-lecture"],
    queryFn: async () => await LecturesService.getLecture(+id!),
  });

  React.useEffect(() => {
    if (window.location.pathname.includes("edit")) setFormType("update");
  }, []);

  return (
    <>
      <PageHeader
        title="LECTURE INFORMATION"
        subtitle="Upload or edit lecture module for students"
      />

      <Card className="w-3/4">
        {isLoading ? <Spin /> : <LectureForm type={formType} data={data} />}
      </Card>
    </>
  );
};

export default ManageLecturesPage;
