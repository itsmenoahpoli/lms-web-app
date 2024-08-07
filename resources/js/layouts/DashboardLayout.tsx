import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { FiHome } from "react-icons/fi";
import { useAuth } from "@/hooks";
import { sidebarLinks } from "@/statics";
import LOGO from "@/assets/dep-ed-logo.png";

type BreadcrumbPath = {
  title: string;
  href: string;
};

export const DashboardLayout: React.FC = () => {
  const { user_role, user, logoutSession } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
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

  const filterSidebarLinks = () => {
    if (user_role !== "admin") {
      return sidebarLinks.filter(
        (group) => group.groupName !== "Admin Utilities"
      );
    }

    return sidebarLinks;
  };

  const handleLogout = () => {
    return logoutSession();
  };

  const isActive = (linkPath: string) => {
    return window.location.pathname.includes(linkPath);
  };

  React.useEffect(() => {
    createBreadcrumbLinks();
  }, [location.pathname]);

  React.useEffect(() => {
    if (!user) {
      return navigate("/auth/signin");
    }
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div className="w-[300px] h-screen bg-slate-900 border-r fixed top-0 left-0 z-50">
        <div className="w-full flex flex-row justify-center items-center gap-x-1 mt-10 mb-5">
          <h1 className="text-white text-lg font-medium">BASIC GEAR VIRTUAL</h1>
          <img
            src={LOGO}
            alt="brand-logo.png"
            className="h-[80px] w-[150px] mb-10 hidden"
          />
        </div>

        <div className="flex flex-col gap-y-3 px-5">
          <div className="w-full">
            <small className="text-xs text-gray-400 font-medium">
              Overview
            </small>
            <div className="flex flex-col gap-y-2 mt-2">
              <Link
                to="/dashboard/overview"
                // prettier-ignore
                className={`text-xs font-medium text-white flex flex-row gap-x-3 hover:text-white hover:bg-slate-800 rounded-md py-2 px-3 ${isActive(  "/dashboard/overview") ? '!bg-slate-800 !text-white' : ''}`}
              >
                <FiHome size={18} />
                Dashboard Overview
              </Link>
            </div>
          </div>

          {filterSidebarLinks().map((sidebarLink, index) => (
            <div className="w-full" key={`sidebar-link-group-${index}`}>
              <small className="text-xs text-gray-400 font-medium">
                {sidebarLink.groupName}
              </small>
              <div className="flex flex-col mt-2">
                {sidebarLink.items.map((item, index) => (
                  <Link
                    to={item.url}
                    key={`sidebar-link-group-link-item-${index}`}
                    // prettier-ignore
                    className={`text-xs font-medium text-white flex flex-row gap-x-3 hover:text-white hover:bg-slate-800 rounded-md py-2 px-3 ${isActive(item.url) ? '!bg-slate-800 !text-white' : ''}`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-auto h-screen ml-[300px]">
        <div className="w-full h-[50px] bg-white flex justify-between items-center px-5">
          <Breadcrumb items={paths} />

          <button
            className="text-sm text-red-700 font-medium hidden"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>

        <div className="dashboard-layout-content p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
