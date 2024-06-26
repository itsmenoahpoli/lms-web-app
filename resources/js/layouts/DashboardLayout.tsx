import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FcInspection } from "react-icons/fc";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="w-screen h-screen relative">
      <div className="w-[300px] h-screen bg-slate-950 fixed top-0 left-0">
        <div className="w-full h-[60px] flex flex-row justify-center items-center gap-x-1 mb-5">
          <FcInspection size={32} />
          <h1 className="text-white text-sm font-medium">
            Learning Management System
          </h1>
        </div>

        <div className="flex flex-col gap-y-3 px-5">
          <div className="w-full">
            <small className="text-xs text-slate-600 font-bold">Overview</small>
            <div className="flex flex-col gap-y-2 mt-2">
              <Link
                to="/dashboard/overview"
                className="text-xs text-gray-300 hover:text-white hover:bg-slate-900 rounded-md p-3"
              >
                Dashboard Overview
              </Link>
            </div>
          </div>

          <div className="w-full">
            <small className="text-xs text-slate-600 font-bold">
              Academics
            </small>
            <div className="flex flex-col gap-y-2 mt-2">
              <Link
                to="/dashboard/overview"
                className="text-xs text-gray-300 hover:text-white hover:bg-slate-900 rounded-md p-3"
              >
                Quizses
              </Link>
              <Link
                to="/dashboard/overview"
                className="text-xs text-gray-300 hover:text-white hover:bg-slate-900 rounded-md p-3"
              >
                Exams
              </Link>
            </div>
          </div>

          <div className="w-full">
            <small className="text-xs text-slate-600 font-bold">
              Accounts Management
            </small>
            <div className="flex flex-col gap-y-2 mt-2">
              <Link
                to="/dashboard/overview"
                className="text-xs text-gray-300 hover:text-white hover:bg-slate-900 rounded-md p-3"
              >
                Teacher Accounts
              </Link>
              <Link
                to="/dashboard/overview"
                className="text-xs text-gray-300 hover:text-white hover:bg-slate-900 rounded-md p-3"
              >
                Student Accounts
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-screen bg-slate-900 ml-[300px]">
        <div className="w-full h-[70px] flex items-center border-b-2 border-slate-800 px-5">
          <small className="text-gray-300">Dashboard &gt; Overview</small>
        </div>

        <Outlet />
      </div>
    </div>
  );
};
