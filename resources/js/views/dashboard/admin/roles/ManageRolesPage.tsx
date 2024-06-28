import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, TableBuilder } from "@/components/shared";

const ManageRolesPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Roles Management"
        subtitle="Manage roles and permissions for user-control-access (UAC)"
      />

      <TableBuilder columns={[]} data={[]} />
    </>
  );
};

export default ManageRolesPage;
