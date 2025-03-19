import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const data = [
  {
    subject: "24IT101 - Linear Algebra",
    r20Internal: 22,
    r20External: 55,
    r20Total: 77,
    r24Internal: 30,
    r24External: 48,
    r24Total: 78,
  },
  {
    subject: "24IT102 - Physics",
    r20Internal: 20,
    r20External: 60,
    r20Total: 80,
    r24Internal: 32,
    r24External: 50,
    r24Total: 82,
  },
  {
    subject: "24IT103 - Electrical Engg.",
    r20Internal: 18,
    r20External: 50,
    r20Total: 68,
    r24Internal: 28,
    r24External: 46,
    r24Total: 74,
  },
  {
    subject: "24IT104 - Programming",
    r20Internal: 24,
    r20External: 65,
    r20Total: 89,
    r24Internal: 36,
    r24External: 52,
    r24Total: 88,
  },
];

const GPACalculator = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Step-by-Step Example of GPA Calculation for a Student in a Semester
      </Typography>
      <Typography paragraph>
        Let’s consider a student named Rahul, who is currently in Semester 1 and
        taking the following subjects under both R20 and R24 regulations.
      </Typography>

      <Typography variant="h6">
        Step 1: Understanding the Regulations
      </Typography>
      <Typography paragraph>
        <strong>R20 Regulation:</strong> Internal Marks: 30, External Marks: 70,
        Passing Criteria: 28/70 in External
      </Typography>
      <Typography paragraph>
        <strong>R24 Regulation:</strong> Internal Marks: 40, External Marks: 60,
        Passing Criteria: 24/60 in External
      </Typography>

      <Typography variant="h6">
        Step 2: Rahul's Marks in Each Subject
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>R20 Internal (30)</TableCell>
              <TableCell>R20 External (70)</TableCell>
              <TableCell>Total (100)</TableCell>
              <TableCell>R24 Internal (40)</TableCell>
              <TableCell>R24 External (60)</TableCell>
              <TableCell>Total (100)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.r20Internal}</TableCell>
                <TableCell>{row.r20External}</TableCell>
                <TableCell>{row.r20Total}</TableCell>
                <TableCell>{row.r24Internal}</TableCell>
                <TableCell>{row.r24External}</TableCell>
                <TableCell>{row.r24Total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6">Step 3: GPA Calculation Formula</Typography>
      <Typography paragraph>
        GPA = (∑(Grade Points × Credits)) / ∑Credits
      </Typography>

      <Typography variant="h6">
        Step 4: Calculate the Grade Points for Rahul
      </Typography>
      <Typography paragraph>
        Each subject carries credits, and GPA is calculated based on grade
        points assigned to marks.
      </Typography>

      <Typography variant="h6">Step 5: Comparing R20 vs R24 GPA</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Metric</TableCell>
              <TableCell>R20</TableCell>
              <TableCell>R24</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Total Marks</TableCell>
              <TableCell>742</TableCell>
              <TableCell>756</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Percentage</TableCell>
              <TableCell>74.2%</TableCell>
              <TableCell>75.6%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>GPA</TableCell>
              <TableCell>8.54</TableCell>
              <TableCell>8.69</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6">
        Step 6: GPA Calculator Implementation
      </Typography>
      <Typography paragraph>
        A GPA calculator can be implemented where users input marks to get GPA
        calculations and compare results for R20 and R24 visually.
      </Typography>
    </Container>
  );
};

export default GPACalculator;
