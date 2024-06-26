import React from "react";
import { Outlet } from "react-router-dom";
import { Card } from "antd";
import LOGO from "@/assets/dep-ed-logo.png";

export const AuthLayout: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-y-4 justify-center items-center bg-slate-950 relative">
      <img
        src={LOGO}
        alt="brand-logo.png"
        className="h-[80px] w-[150px] mb-10"
      />
      <Card className="w-[400px] bg-slate-900 border border-slate-800">
        <Outlet />
      </Card>

      <small className="text-xs text-slate-500 absolute bottom-2 left-2">
        Version 1.0.1 (beta)
      </small>
    </div>
  );
};
