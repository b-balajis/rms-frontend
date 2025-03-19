import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DepartmentsJson from "../../data/Departments.json";

const Register = () => {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    batch: "",
    semester: "",
    department: "",
  });

  const SEMESTERS = Array.from({ length: 8 }, (_, i) => i + 1);
  const BATCHES = Array.from(
    { length: new Date().getFullYear() - 2010 + 1 },
    (_, i) => 2010 + i
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <FormControl fullWidth className="my-4">
        <InputLabel>Role</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="faculty">Faculty</MenuItem>
        </Select>
      </FormControl>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          onChange={handleChange}
          className="my-4"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
          className="my-4"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          className="my-4"
          required
        />

        {role === "student" && (
          <>
            <FormControl fullWidth className="my-4">
              <InputLabel>Batch</InputLabel>
              <Select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
              >
                {BATCHES.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth className="my-4">
              <InputLabel>Semester</InputLabel>
              <Select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
              >
                {SEMESTERS.map((sem) => (
                  <MenuItem key={sem} value={sem}>
                    {sem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        <FormControl fullWidth className="my-4">
          <InputLabel>Department</InputLabel>
          <Select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            {DepartmentsJson.map((dept) => (
              <MenuItem key={dept.value} value={dept.value}>
                {dept.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* add link to login if already have account */}
        <Typography variant="body2" className="text-center text-gray-500 my-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
