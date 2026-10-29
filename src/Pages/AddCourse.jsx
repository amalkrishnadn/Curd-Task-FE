
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  Stack,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";
import ListAltIcon from "@mui/icons-material/ListAlt";

import { createCourse } from "../services/courseService";

const AddCourse = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("");

  const navigate = useNavigate();

  const addCourse = async () => {
    if (!name.trim() || !course.trim() || !duration.trim()) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      await createCourse({
        name,
        course,
        duration,
      });

      toast.success("Course added successfully!");

      setName("");
      setCourse("");
      setDuration("");

      navigate("/courses");
    } catch {
      toast.error("Failed to add course");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f2ede4",
        py: { xs: 3, md: 6 },
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{
            color: "#9e4b3b",
            mb: 3,
            textTransform: "none",
          }}
        >
          Back to Home
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            bgcolor: "#fffaf3",
            border: "1px solid #e2d9ce",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 55,
                height: 55,
                bgcolor: "#f4e3da",
                color: "#9e4b3b",
                borderRadius: 3,
              }}
            >
              <SchoolIcon fontSize="large" />
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#282321",
                  fontSize: { xs: 27, sm: 32 },
                }}
              >
                Add a Course
              </Typography>

              <Typography sx={{ color: "#82776e", mt: 0.5 }}>
                Enter your course details below.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Stack spacing={3}>
              <TextField
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                fullWidth
              />

              <TextField
                label="Course Name"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Enter course name"
                fullWidth
              />

              <TextField
                label="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 3 months"
                fullWidth
              />

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={addCourse}
                fullWidth
                sx={{
                  bgcolor: "#9e4b3b",
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: 16,
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#823c31" },
                }}
              >
                Add Course
              </Button>

              <Button
                variant="outlined"
                startIcon={<ListAltIcon />}
                onClick={() => navigate("/courses")}
                fullWidth
                sx={{
                  color: "#9e4b3b",
                  borderColor: "#9e4b3b",
                  py: 1.4,
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#f4e3da",
                    borderColor: "#823c31",
                  },
                }}
              >
                View All Courses
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddCourse;
