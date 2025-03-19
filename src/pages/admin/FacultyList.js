import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FacultyList = () => {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("/api/faculties") // Replace with actual API endpoint
      .then((response) => {
        setFaculties(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching faculties:", error));
  }, []);

  const toggleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedFaculties = [...faculties].sort((a, b) => {
    if (sortField === "name" || sortField === "department") {
      return sortOrder === "asc"
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    }
    return 0;
  });

  return (
    <div className="p-6">
      <Typography variant="h4" className="text-center mb-4 text-blue-700">
        Registered Faculties
      </Typography>
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} className="shadow-lg">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell
                  className="font-bold cursor-pointer"
                  onClick={() => toggleSort("name")}
                >
                  Name{" "}
                  {sortField === "name"
                    ? sortOrder === "asc"
                      ? "⬆️"
                      : "⬇️"
                    : ""}
                </TableCell>
                <TableCell className="font-bold">Email</TableCell>
                <TableCell
                  className="font-bold cursor-pointer"
                  onClick={() => toggleSort("department")}
                >
                  Department{" "}
                  {sortField === "department"
                    ? sortOrder === "asc"
                      ? "⬆️"
                      : "⬇️"
                    : ""}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedFaculties.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No faculties found
                  </TableCell>
                </TableRow>
              ) : (
                sortedFaculties.map((faculty) => (
                  <TableRow key={faculty._id} className="hover:bg-gray-100">
                    <TableCell>{faculty.name}</TableCell>
                    <TableCell>{faculty.email}</TableCell>
                    <TableCell>{faculty.department}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default FacultyList;
