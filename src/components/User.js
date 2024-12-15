import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { registerUser, fetchRoles } from "../services/SkilldevService";
import NavBarComponent from "./NavBarComponent";

const User = () => {
  const [roles, setRoles] = useState([]); // State to store roles
  const [loading, setLoading] = useState(false); // Loading indicator for roles

  // Fetch roles on component mount
  useEffect(() => {
    const getRoles = async () => {
      try {
        setLoading(true);
        const rolesResponse = await fetchRoles(); // API call to fetch roles
        setRoles(rolesResponse.data); // Extract 'data' from the response and set roles
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };
    getRoles();
  }, []);

  const resetForm = ()=>{
    formik.resetForm();
    setRoles([]); 
    setLoading(false);
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      roles: [],
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      roles: Yup.array().min(1, "At least one role must be selected"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await registerUser(values); // API call to register user
        alert("User registered successfully!");
        resetForm();
      } catch (error) {
        console.error("Error registering user:", error);
        setErrors({ email: "Failed to register user" }); 
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <NavBarComponent/>
   <Box maxWidth="400px" mx="auto" mt="50px">
      <Typography variant="h4" gutterBottom>
        Register User
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* Username Field */}
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
        {/* Password Field */}
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
        {/* Email Field */}
        <TextField
          fullWidth
          margin="normal"
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        {/* Roles Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="roles-label">Roles</InputLabel>
          <Select
            labelId="roles-label"
            id="roles"
            name="roles"
            multiple
            value={formik.values.roles}
            onChange={(e) => formik.setFieldValue("roles", e.target.value)}
            onBlur={formik.handleBlur}
          >
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : roles.length > 0 ? (
              roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No roles available</MenuItem>
            )}
          </Select>
          {formik.touched.roles && formik.errors.roles && (
            <Typography color="error" variant="caption">
              {formik.errors.roles}
            </Typography>
          )}
        </FormControl>
        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={formik.isSubmitting}
          sx={{ mt: 2 }}
        >
          {formik.isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>
    </Box>
    </div>

 
  );
};

export default User;
