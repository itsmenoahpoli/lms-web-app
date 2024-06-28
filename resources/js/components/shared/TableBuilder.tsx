import React from "react";
import { Table } from "antd";

export const TableBuilder: React.FC<{
  columns: any[];
  data: any[];
  isLoading?: boolean;
}> = (props) => {
  return (
    <div className="w-full">
      <Table
        dataSource={props.data}
        columns={props.columns}
        loading={props.isLoading}
      />
    </div>
  );
};
