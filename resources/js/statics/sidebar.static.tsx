import {
  FiHome,
  FiFile,
  FiFilePlus,
  FiCode,
  FiUsers,
  FiList,
} from "react-icons/fi";

export default [
  {
    groupName: "Academics",
    items: [
      {
        label: "Lectures",
        url: "/dashboard/teacher/lectures/manage",
        icon: <FiHome size={18} />,
      },
      {
        label: "Quizses",
        url: "/dashboard/teacher/quizses/manage",
        icon: <FiFile size={18} />,
      },
      {
        label: "Exams",
        url: "/dashboard/teacher/exams/manage",
        icon: <FiFilePlus size={18} />,
      },
      {
        label: "Lab Activities",
        url: "/dashboard/teacher/activities/manage",
        icon: <FiCode size={18} />,
      },
    ],
  },
  {
    groupName: "Students",
    items: [
      {
        label: "Manage Students",
        url: "/dashboard/teacher/students/manage",
        icon: <FiUsers size={18} />,
      },
    ],
  },
  {
    groupName: "Admin Utilities",
    items: [
      {
        label: "Roles Management",
        url: "/dashboard/admin/roles/manage",
        icon: <FiList size={18} />,
      },
      {
        label: "Teacher Accounts",
        url: "/dashboard/admin/accounts/teachers/manage",
        icon: <FiUsers size={18} />,
      },
    ],
  },
];
