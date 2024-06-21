import React from "react";

export const DashboardLayout: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  return <div className="w-screen h-screen">{props.children}</div>;
};
