import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoadComponent } from "@/components/LoadComponent";

/**
 * Layouts
 */
import { AuthLayout, DashboardLayout } from "@/layouts";

/**
 * Error Pages
 */
const ErrorPage = LoadComponent(
  React.lazy(() => import("@/views/system/ErrorPage"))
);

/**
 * Auth Pages
 */
const SigninPage = LoadComponent(
  React.lazy(() => import("@/views/auth/SigninPage"))
);

/**
 * Dashboard Pages
 */
const DashboardPage = LoadComponent(
  React.lazy(() => import("@/views/dashboard/OverviewPage"))
);
const TeacherManageActivitiesPage = LoadComponent(
  React.lazy(
    () =>
      import(
        "@/views/dashboard/teacher/academics/activities/ManageActivitiesPage"
      )
  )
);
const AdminManageRolesPage = LoadComponent(
  React.lazy(() => import("@/views/dashboard/admin/roles/ManageRolesPage"))
);

export default createBrowserRouter([
  {
    path: "*",
    element: ErrorPage,
  },
  {
    path: "/",
    element: <Navigate to="/auth/signin" />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/signin",
        element: SigninPage,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/overview",
        element: DashboardPage,
      },

      /**
       * Teacher
       */
      {
        path: "/dashboard/teacher/activities/manage",
        element: TeacherManageActivitiesPage,
      },

      /**
       * Admin
       */
      {
        path: "/dashboard/admin/roles/manage",
        element: AdminManageRolesPage,
      },
    ],
  },
]);
