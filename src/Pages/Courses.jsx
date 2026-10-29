import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteCourse as removeCourse,
  getCourses as fetchCourses,
  updateCourse as saveCourse,
} from "../services/courseService";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Modal,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("");
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // Get all courses
  const getCourses = async () => {
    setCourses(await fetchCourses());
  };

  useEffect(() => {
    let isMounted = true;

    fetchCourses()
      .then((data) => {
        if (isMounted) setCourses(data);
      })
      .catch(() => {
        if (isMounted) toast.error("Failed to fetch courses");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Open edit modal
  const handleOpen = (item) => {
    setName(item.name);
    setCourse(item.course);
    setDuration(item.duration);
    setEditId(item.id);
    setOpen(true);
  };

  // Close edit modal
  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    setName("");
    setCourse("");
    setDuration("");
  };

  // Update course
  const updateCourse = async () => {
    if (!name.trim() || !course.trim() || !duration.trim()) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      await saveCourse(editId, {
        name,
        course,
        duration,
      });

      toast.success("Course updated successfully");
      handleClose();
      await getCourses();
    } catch {
      toast.error("Failed to update course");
    }
  };

  // Delete course
  const deleteCourse = async (id) => {
    try {
      await removeCourse(id);
      toast.success("Course deleted successfully");
      await getCourses();
    } catch {
      toast.error("Failed to delete course");
    }
  };

  // Search courses
  const filteredCourses = courses.filter((item) =>
    `${item.name} ${item.course} ${item.duration}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f2ede4",
        p: { xs: 2, sm: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>

        {/* Header */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ color: "#9e4b3b", mb: 2 }}
        >
          Home
        </Button>

        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: "#282321", mb: 1 }}
        >
          Course Manager
        </Typography>

        <Typography sx={{ color: "#685e57", mb: 4 }}>
          Manage your courses in one place.
        </Typography>

        {/* Add Course Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/add-course")}
          sx={{
            bgcolor: "#9e4b3b",
            mb: 3,
            px: 3,
            py: 1.3,
            borderRadius: 2,
            textTransform: "none",
            "&:hover": { bgcolor: "#823c31" },
          }}
        >
          Add Course
        </Button>

        {/* Search */}
        <TextField
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, course or duration..."
          sx={{
            mb: 4,
            bgcolor: "#fffaf3",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9e4b3b" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Course Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {filteredCourses.map((item) => (
            <Card
              key={item.id}
              elevation={0}
              sx={{
                borderRadius: 3,
                bgcolor: "#fffaf3",
                border: "1px solid #e2d9ce",
                transition: "0.25s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 25px #28232115",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f4e3da",
                    color: "#9e4b3b",
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <SchoolIcon />
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#9e4b3b",
                    mb: 2,
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.course}
                </Typography>

                <Typography sx={{ mb: 1, color: "#514840" }}>
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Name:
                  </Box>{" "}
                  {item.name}
                </Typography>

                <Typography sx={{ color: "#514840" }}>
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Duration:
                  </Box>{" "}
                  {item.duration}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(item)}
                    sx={{
                      borderColor: "#9e4b3b",
                      color: "#9e4b3b",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#f4e3da",
                        borderColor: "#823c31",
                      },
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteCourse(item.id)}
                    sx={{ textTransform: "none" }}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>

        {filteredCourses.length === 0 && (
          <Typography
            sx={{
              mt: 5,
              textAlign: "center",
              color: "#82776e",
            }}
          >
            No courses found.
          </Typography>
        )}
      </Box>

      {/* Edit Course Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-course-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 480 },
            maxHeight: "85vh",
            overflowY: "auto",
            bgcolor: "#fffaf3",
            borderRadius: 3,
            boxShadow: 24,
            p: { xs: 3, sm: 4 },
            outline: "none",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              bgcolor: "#9e4b3b",
              color: "#fffaf3",
              p: 2,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography
              id="edit-course-title"
              variant="h6"
              sx={{ fontWeight: 700 }}
            >
              Edit Course Details
            </Typography>

            <IconButton onClick={handleClose} sx={{ color: "#fffaf3" }}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack spacing={2.5}>
            <TextField
              label="Your Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Course Name"
              fullWidth
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />

            <TextField
              label="Duration"
              fullWidth
              placeholder="e.g. 3 months"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />

            <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClose}
                sx={{
                  borderColor: "#82776e",
                  color: "#514840",
                  py: 1.2,
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={updateCourse}
                sx={{
                  bgcolor: "#426653",
                  py: 1.2,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#31513f" },
                }}
              >
                Update Course
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default Courses;
