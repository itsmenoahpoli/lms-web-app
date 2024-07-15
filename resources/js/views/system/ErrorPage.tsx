import React from "react";
import { useRouteError, Link } from "react-router-dom";
import LOGO from "@/assets/dep-ed-logo.png";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="w-screen h-screen bg-slate-950 flex justify-center items-center relative">
      <img
        src={LOGO}
        alt="brand-logo.png"
        className="h-[50px] w-[100px] mb-10 absolute top-5 left-5"
      />

      <div className="flex flex-col gap-3">
        <h1 className="text-[48px] text-white font-bold">PAGE NOT FOUND</h1>
        <Link
          to="/dashboard"
          className="text-md text-blue-700 text-underline text-center"
        >
          BACK TO DASHBOARD
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
