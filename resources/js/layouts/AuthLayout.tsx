import React from "react";

export const AuthLayout: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  return <div>{props.children}</div>;
};
