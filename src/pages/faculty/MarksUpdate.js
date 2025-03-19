import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Loader from "../../components/Loader";
import {
  academicRegulations,
  API_BASE_URL,
  FACULTY_API_ENDPOINTS,
} from "../../data/Constants";

const MarksUpdate = () => {
  const [batch, setBatch] = useState("");
  const [semester, setSemester] = useState("");
  const [studentsType, setStudentsType] = useState("");
  const [regulation, setRegulation] = useState("");
  const [file, setFile] = useState(null);
  const [examType, setExamType] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("batch", batch);
    formData.append("semester", semester);
    formData.append("type", studentsType);
    formData.append("file", file);
    formData.append("regulation", regulation);
    formData.append("examType", examType);

    try {
      // declare APIENDPOINT with let
      setLoading(true);
      let ApiEndpoint = `${API_BASE_URL}${
        examType === "Supply"
          ? FACULTY_API_ENDPOINTS.UPDATE_SUPPLY_RECORDS
          : studentsType === "lateral" && semester === 3
          ? FACULTY_API_ENDPOINTS.CREATE_LATERAL_RECORDS
          : semester !== 1
          ? FACULTY_API_ENDPOINTS.UPDATE_STUDENT_RECORDS
          : FACULTY_API_ENDPOINTS.CREATE_STUDENT_RECORDS
      }`;

      const response = await fetch(`${ApiEndpoint}`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setUploaded(true);
        console.log(result, uploaded);
        StudentUploadResult(result);
      } else {
        console.log(result);
      }
      setLoading(false);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const StudentUploadResult = ({ response }) => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-md shadow-lg rounded-2xl">
          <CardContent>
            <Typography
              variant="h5"
              className="text-center font-semibold text-green-600"
            >
              {response.message}
            </Typography>

            {response.missedEntries.length > 0 && (
              <div className="mt-4">
                <Typography variant="h6" className="text-gray-700">
                  Missed Entries:
                </Typography>
                <Table className="mt-2 border">
                  <TableHead>
                    <TableRow className="bg-gray-200">
                      <TableCell className="font-semibold">Regd No</TableCell>
                      <TableCell className="font-semibold">Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {response.missedEntries.map((entry, index) => (
                      <TableRow key={index} className="hover:bg-gray-100">
                        <TableCell>{entry.regdno}</TableCell>
                        <TableCell>{entry.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // use loading circular progress
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Upload/Update Student Results
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel>Select Exam Category</InputLabel>
            <Select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              label="Select Exam Category"
            >
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="Supply">Supply</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormControl fullWidth>
            <InputLabel>Batch (Year)</InputLabel>
            <Select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              label="Batch (Year)"
            >
              {Array.from(
                { length: new Date().getFullYear() - 2010 + 1 },
                (_, i) => (
                  <MenuItem key={2010 + i} value={2010 + i}>
                    {2010 + i}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Students Type</InputLabel>
            <Select
              value={studentsType}
              onChange={(e) => setStudentsType(e.target.value)}
              label="Students Type"
            >
              <MenuItem key="all" value="all">
                All
              </MenuItem>
              <MenuItem key="regular" value="regular">
                Regular
              </MenuItem>
              <MenuItem key="lateral" value="lateral">
                Lateral
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Semester</InputLabel>
            <Select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              label="Semester"
            >
              {[...Array(studentsType === "lateral" ? 6 : 8)].map((_, i) => {
                const semesterValue =
                  studentsType === "lateral" ? i + 3 : i + 1;
                return (
                  <MenuItem key={semesterValue} value={semesterValue}>
                    {semesterValue}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* add another input field to select regulation */}
          <FormControl fullWidth>
            <InputLabel>Regulation</InputLabel>
            <Select
              value={regulation}
              onChange={(e) => setRegulation(e.target.value)}
              label="Regulation"
            >
              {academicRegulations.map((reg) => (
                <MenuItem key={reg.value} value={reg.value}>
                  {reg.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="mt-4">
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4 w-full"
          disabled={!batch || !semester || !studentsType || !file}
        >
          Upload
        </Button>
      </form>

      {/* will receive a message if the file is uploaded successfully, it also contains missed entries display missed entries*/}
      {uploaded && { StudentUploadResult }}
    </div>
  );
};

export default MarksUpdate;
