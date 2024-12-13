// src/components/Login.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { login } from "../services/SkilldevService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { saveToken } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required"),
      password: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await login(values); // Call the API with username & password
        saveToken(response.data); // Save token globally
        alert("Login successful!");
        navigate("/dashboard");
      } catch (error) {
        setErrors({ username: "Invalid credentials" }); // Adjust error handling as per your API
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box maxWidth="400px" mx="auto" mt="50px">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          margin="normal"
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={formik.isSubmitting}
          sx={{ mt: 2 }}
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Box>
  );
};

export default Login;
