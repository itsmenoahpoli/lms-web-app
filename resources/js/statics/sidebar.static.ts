export default [
  {
    groupName: "Academics",
    items: [
      {
        label: "Lectures",
        url: "/dashboard/teacher/lectures/manage",
      },
      {
        label: "Quizses",
        url: "/dashboard/teacher/quizses/manage",
      },
      {
        label: "Exams",
        url: "/dashboard/teacher/exams/manage",
      },
      {
        label: "Lab Activities",
        url: "/dashboard/teacher/activities/manage",
      },
    ],
  },
  {
    groupName: "Students",
    items: [
      {
        label: "Manage Students",
        url: "/dashboard/teacher/students/manage",
      },
    ],
  },
  {
    groupName: "Admin Utilities",
    items: [
      {
        label: "Roles Management",
        url: "/dashboard/admin/roles/manage",
      },
      {
        label: "Teacher Accounts",
        url: "/dashboard/admin/accounts/teachers/manage",
      },
    ],
  },
];
