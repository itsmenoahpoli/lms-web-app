import React from "react";
import { Outlet } from "react-router-dom";
import LOGO from "@/assets/dep-ed-logo.png";

export const AuthLayout: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-y-4 justify-center items-center bg-slate-100">
      <img
        src={LOGO}
        alt="brand-logo.png"
        className="h-[100px] w-[200px] mb-10"
      />
      <Outlet />
    </div>
  );
};
