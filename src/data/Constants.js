export const ROLES = ["admin", "faculty", "student"];
export const API_BASE_URL = "http://localhost:5000/api";
export const AUTH_API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/adduser",
};

export const ADMIN_API_ENDPOINTS = {
  // Department routes
  CREATE_DEPARTMENT: "/admin/create-department",
  GET_DEPARTMENT_DETAILS: "/admin/get-departments-list",
  UPDATE_DEPARTMENT_DETAILS: "/admin/update-department",
  DELETE_DEPARTMENT: "/admin/delete-department",

  // Subject routes
  CREATE_SUBJECT: "/admin/create-subject",
  GET_ALL_SUBJECTS: "/admin/get-all-subjects",
  GET_SUBJECT_BY_ID: "/admin/get-subject-by-id",
  UPDATE_SUBJECT: "/admin/update-subject",
  DELETE_SUBJECT: "/admin/delete-subject",
};

export const FACULTY_API_ENDPOINTS = {
  GET_ALL_STUDENT_RESULTS: "/faculty/get-all-students",
  GET_STUDENT_RESULTS: "/faculty/get-student-details",
  CREATE_STUDENT_RECORDS: "/faculty/upload/create-records",
  CREATE_LATERAL_RECORDS: "/faculty/upload/create-lateral-records",
  UPDATE_STUDENT_RECORDS: "/faculty/upload/update-records",
  UPDATE_SUPPLY_RECORDS: "/faculty/upload/update-supply-records",
};

// create an object and export academic regulations
export const academicRegulations = [
  {
    name: "R20",
    value: "r20",
    description: "Academic Regulation 20",
  },
  {
    name: "R24",
    value: "r24",
    description: "Academic Regulation 24",
  },
];
