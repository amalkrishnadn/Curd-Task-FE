
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "#f2ede4",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: 5,
            textAlign: "center",
            bgcolor: "#fffaf3",
            border: "1px solid #e2d9ce",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "#f4e3da",
              color: "#9e4b3b",
              px: 2,
              py: 1,
              borderRadius: 10,
              mb: 4,
            }}
          >
            <SchoolIcon />
            <Typography fontWeight={700} variant="body2">
              COURSE MANAGER
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#282321",
              fontSize: { xs: 38, sm: 55, md: 65 },
              lineHeight: 1.15,
              mb: 3,
            }}
          >
            Manage Your Courses
            <Box component="span" sx={{ display: "block", color: "#9e4b3b" }}>
              The Easy Way.
            </Box>
          </Typography>

          <Typography
            sx={{
              maxWidth: 600,
              mx: "auto",
              mb: 5,
              color: "#685e57",
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.8,
            }}
          >
            Organize your courses, manage details, and keep everything
            in one place with a simple course manager.
          </Typography>

          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/add-course")}
            sx={{
              bgcolor: "#9e4b3b",
              px: 4,
              py: 1.8,
              borderRadius: 3,
              fontSize: 16,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "#823c31" },
            }}
          >
            Get Started
          </Button>

          <Box sx={{ mt: 3 }}>
            <Button
              onClick={() => navigate("/courses")}
              sx={{
                color: "#685e57",
                textTransform: "none",
              }}
            >
              View All Courses
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
