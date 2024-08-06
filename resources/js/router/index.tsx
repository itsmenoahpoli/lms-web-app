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

/**
 * Teachers Pages
 */
const TeacherManageActivitiesPage = LoadComponent(
  React.lazy(
    () =>
      import(
        "@/views/dashboard/teacher/academics/activities/ManageActivitiesPage"
      )
  )
);
const TeacherManageLecturesPage = LoadComponent(
  React.lazy(
    () =>
      import("@/views/dashboard/teacher/academics/lectures/ManageLecturesPage")
  )
);
const TeacherLectureFormPage = LoadComponent(
  React.lazy(
    () => import("@/views/dashboard/teacher/academics/lectures/LectureFormPage")
  )
);
const TeacherManageQuizsesPage = LoadComponent(
  React.lazy(
    () =>
      import("@/views/dashboard/teacher/academics/quizses/ManageQuizsesPage")
  )
);
const TeacherQuizFormPage = LoadComponent(
  React.lazy(
    () => import("@/views/dashboard/teacher/academics/quizses/QuizFormPage")
  )
);
const TeacherManageExamsPage = LoadComponent(
  React.lazy(
    () => import("@/views/dashboard/teacher/academics/exams/ManageExamsPage")
  )
);
const TeacherManageStudentsPage = LoadComponent(
  React.lazy(
    () => import("@/views/dashboard/teacher/students/ManageStudentsPage")
  )
);

/**
 * Admin Pages
 */
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
    element: <Navigate to="/dashboard/overview" />,
  },
  {
    path: "/dashboard",
    element: <Navigate to="/dashboard/overview" />,
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
      {
        path: "/dashboard/teacher/lectures/manage",
        element: TeacherManageLecturesPage,
      },
      {
        path: "/dashboard/teacher/lectures/create",
        element: TeacherLectureFormPage,
      },
      {
        path: "/dashboard/teacher/lectures/edit/:id",
        element: TeacherLectureFormPage,
      },
      {
        path: "/dashboard/teacher/quizses/manage",
        element: TeacherManageQuizsesPage,
      },
      {
        path: "/dashboard/teacher/quizses/create",
        element: TeacherQuizFormPage,
      },
      {
        path: "/dashboard/teacher/quizses/edit/:id",
        element: TeacherQuizFormPage,
      },
      {
        path: "/dashboard/teacher/exams/manage",
        element: TeacherManageExamsPage,
      },
      {
        path: "/dashboard/teacher/students/manage",
        element: TeacherManageStudentsPage,
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
