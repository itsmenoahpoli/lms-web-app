import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { sidebarLinks } from "@/statics";

type BreadcrumbPath = {
  title: string;
  href: string;
};

export const DashboardLayout: React.FC = () => {
  const location = useLocation();

  const [paths, setPaths] = React.useState<BreadcrumbPath[]>([]);

  const createBreadcrumbLinks = () => {
    const pathname = location.pathname;
    const parts = pathname.split("/").filter((part) => part !== "");
    const breadcrumbPaths: BreadcrumbPath[] = parts.map((part, index) => {
      const url = `/${parts.slice(0, index + 1).join("/")}`;
      return {
        title: part,
        href: url === "" ? "/" : url,
      };
    });

    setPaths(breadcrumbPaths);
  };

  React.useEffect(() => {
    createBreadcrumbLinks();
  }, [location.pathname]);

  return (
    <div className="w-screen h-screen relative">
      <div className="w-[300px] h-screen bg-slate-950 fixed top-0 left-0">
        <div className="w-full h-[60px] flex flex-row justify-center items-center gap-x-1 mb-5">
          {/* <h1 className="text-white text-lg font-medium">DentalEase</h1> */}
        </div>

        <div className="flex flex-col gap-y-3 px-5">
          <div className="w-full">
            <small className="text-xs text-slate-600 font-bold">Overview</small>
            <div className="flex flex-col gap-y-2 mt-2">
              <Link
                to="/dashboard/overview"
                className="text-xs text-gray-300 hover:text-white hover:bg-slate-900 rounded-md py-3 px-3"
              >
                Dashboard Overview
              </Link>
            </div>
          </div>

          {sidebarLinks.map((sidebarLink, index) => (
            <div className="w-full" key={`sidebar-link-group-${index}`}>
              <small className="text-xs text-slate-600 font-bold">
                {sidebarLink.groupName}
              </small>
              <div className="flex flex-col gap-y-2 mt-2">
                {sidebarLink.items.map((item, index) => (
                  <Link
                    to={item.url}
                    key={`sidebar-link-group-link-item-${index}`}
                    className="text-xs text-gray-300 hover:text-white hover:bg-slate-900 rounded-md py-3 px-3"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-screen bg-slate-100 ml-[300px]">
        <div
          className="w-full h-[50px] bg-white flex items-center border-gray-200 px-5"
          style={{ borderBottomWidth: "1px" }}
        >
          <Breadcrumb items={paths} />
        </div>

        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
