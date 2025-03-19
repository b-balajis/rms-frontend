import Profile from "../components/Profile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import DepartmentsDetails from "../pages/admin/DepartmentsDetails";
import GPAComparison from "../pages/admin/GPAComparison";
import SubjectManger from "../pages/admin/SubjectsManger";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MarksUpdate from "../pages/faculty/MarksUpdate";
import StudentDashboard from "../pages/student/StudentDashboard";

// Define routes for each role
const routesConfig = {
  admin: [
    { path: "/a/dashboard", element: <AdminDashboard />, name: "Home" },
    { path: "/a/profile", element: <Profile />, name: "Profile" },
    {
      path: "/a/departments",
      element: <DepartmentsDetails />,
      name: "Departments",
    },
    {
      path: "/a/subjects",
      element: <SubjectManger />,
      name: "Subjects",
    },
    {
      path: "/a/r20r24-comparison",
      element: <GPAComparison />,
      name: "R20-R24 Comparison",
    },
  ],
  faculty: [
    { path: "/f/dashboard", element: <FacultyDashboard />, name: "Home" },
    { path: "/f/marksupload", element: <MarksUpdate />, name: "Marks Update" },
    { path: "/f/profile", element: <Profile />, name: "Profile" },
  ],
  student: [
    { path: "/s/dashboard", element: <StudentDashboard />, name: "Home" },
    { path: "/s/profile", element: <Profile />, name: "Profile" },
  ],
};

export default routesConfig;
