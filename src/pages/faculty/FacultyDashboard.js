import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { API_BASE_URL, FACULTY_API_ENDPOINTS } from "../../data/Constants";
import DepartmentsJson from "../../data/Departments.json";

const FacultyDashboard = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [department, setDepartment] = useState("All");
  const [batch, setBatch] = useState("");
  const [sortField, setSortField] = useState("rollNumber");
  const [sortOrder, setSortOrder] = useState("asc");
  const [percentageFilter, setPercentageFilter] = useState("");
  const [enableResultsBtn, setEnableResultsBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = () => {
    setLoading(true);
    let ApiEndPoint = `${API_BASE_URL}`;
    if (department === "All") {
      ApiEndPoint = `${API_BASE_URL}${FACULTY_API_ENDPOINTS.GET_ALL_STUDENT_RESULTS}?batch=${batch}`;
    } else {
      ApiEndPoint = `${API_BASE_URL}${FACULTY_API_ENDPOINTS.GET_STUDENT_RESULTS}?department=${department}&batch=${batch}`;
    }
    axios
      .get(`${ApiEndPoint}`)
      .then((response) => {
        setStudents(response.data);
        setFilteredStudents(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  const startYear = 2010;
  const currentYear = new Date().getFullYear();
  const batches = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => ({
      value: startYear + i,
      label: startYear + i,
    })
  );

  useEffect(() => {
    setLoading(true);
    let filtered = students;

    if (batch) {
      setEnableResultsBtn(true);
    } else {
      setEnableResultsBtn(false);
    }

    // Apply Percentage Filter
    if (percentageFilter !== "") {
      const minPercentage = parseFloat(percentageFilter);
      filtered = filtered.filter(
        (student) => student.percentage >= minPercentage
      );

      filtered.sort((a, b) => b.percentage - a.percentage);
    }

    // Apply Sorting
    setLoading(true);
    filtered = filtered.sort((a, b) => {
      if (sortField === "rollNumber") {
        return sortOrder === "asc"
          ? a.rollNumber.localeCompare(b.rollNumber)
          : b.rollNumber.localeCompare(a.rollNumber);
      } else if (sortField === "percentage") {
        return sortOrder === "asc"
          ? a.percentage - b.percentage
          : b.percentage - a.percentage;
      }
      return 0;
    });

    setFilteredStudents(filtered);
    setLoading(false);
  }, [department, batch, students, sortField, sortOrder, percentageFilter]);

  const allSemesters = [
    ...new Set(students.flatMap((s) => s.semesters.map((sem) => sem.semester))),
  ].sort((a, b) => a - b);

  const toggleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="p-6">
      <Typography
        variant="h4"
        className="text-center font-semibold text-blue-700 mb-4"
      >
        Student Results
      </Typography>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <FormControl className="w-1/4">
          <InputLabel>Batch</InputLabel>
          <Select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            label="Batch"
          >
            <MenuItem value="">Select Batch</MenuItem>
            {batches.map((b) => (
              <MenuItem key={b.value} value={b.value}>
                {b.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="w-1/4">
          <InputLabel>Department</InputLabel>
          <Select
            value={department || "All"}
            onChange={(e) => setDepartment(e.target.value)}
            label="Department"
          >
            {/* make it by default value */}
            <MenuItem key="All" value="All">
              All
            </MenuItem>
            {DepartmentsJson.map((dept) => (
              <MenuItem key={dept.value} value={dept.label}>
                {dept.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Percentage Filter */}
        <TextField
          className="w-1/4"
          label="Min Percentage"
          type="number"
          value={percentageFilter}
          onChange={(e) => setPercentageFilter(e.target.value)}
          disabled={!enableResultsBtn}
        />

        {/* Fetch Results Button */}
        <Button
          variant="contained"
          color="primary"
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
          disabled={!enableResultsBtn}
        >
          {batch && !department ? "Get All Students Results" : "Get Results"}
        </Button>
      </div>

      {/* Student Table */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
            {/* Search Bar */}
            <Box className="relative w-full md:w-1/2 flex items-center">
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search for a student"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  pl: 4, // Adjust for icon spacing
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                  "& .MuiOutlinedInput-input": {
                    paddingLeft: "40px", // Adjust text padding due to icon
                  },
                }}
              />
            </Box>

            {/* Students Count */}
            <Typography variant="h6" fontWeight="bold" color="textPrimary">
              {students.length} {students.length === 1 ? "Student" : "Students"}{" "}
              Found
            </Typography>
          </Box>

          <TableContainer component={Paper} className="shadow-lg">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-200">
                  <TableCell
                    className="font-bold cursor-pointer"
                    onClick={() => toggleSort("rollNumber")}
                  >
                    Roll No{" "}
                    {sortField === "rollNumber"
                      ? sortOrder === "asc"
                        ? "⬆️"
                        : "⬇️"
                      : ""}
                  </TableCell>

                  <TableCell className="font-bold">Name</TableCell>
                  <TableCell className="font-bold">CGPA</TableCell>

                  <TableCell
                    className="font-bold cursor-pointer"
                    onClick={() => toggleSort("percentage")}
                  >
                    Percentage{" "}
                    {sortField === "percentage"
                      ? sortOrder === "asc"
                        ? "⬆️"
                        : "⬇️"
                      : ""}
                  </TableCell>

                  {allSemesters.map((sem) => (
                    <TableCell key={sem} className="font-bold text-center">
                      Sem {sem}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={allSemesters.length + 4}
                      className="text-center py-4"
                    >
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student, index) => (
                    <TableRow
                      key={student._id}
                      className={
                        index % 2 === 0
                          ? "bg-white hover:bg-gray-300"
                          : "bg-gray-100 hover:bg-gray-300"
                      }
                    >
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>{student.name}</TableCell>

                      <TableCell>{student.cgpa}</TableCell>
                      <TableCell>{student.percentage}%</TableCell>

                      {allSemesters.map((sem) => {
                        const semData = student.semesters.find(
                          (s) => s.semester === sem
                        );
                        return (
                          <TableCell key={sem} className="text-center">
                            {semData
                              ? (Math.floor(semData.sgpa * 100) / 100).toFixed(
                                  2
                                )
                              : "-"}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default FacultyDashboard;
