import React from "react";

export const AuthLayout: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-900">
      {props.children}
    </div>
  );
};
