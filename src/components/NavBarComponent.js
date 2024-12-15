import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext"; // Import the useAuth hook to access logout function
import { useNavigate } from "react-router-dom";

const NavBarComponent = () => {
  const { logout } = useAuth(); // Get the logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function from context
    alert("Log out successful!");
    navigate("/login");
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        {/* Logo or title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SkillDev Dashboard
        </Typography>

        {/* Navigation links */}
        <Box>
          <Button
            color="inherit"
            component={NavLink}
            to="/user"
            sx={{ textDecoration: "none", color: "white", marginRight: 2 }}
          >
            User Register
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/userlist"
            sx={{ textDecoration: "none", color: "white", marginRight: 2 }}
          >
            User List
          </Button>

          {/* Logout button */}
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ color: "white" }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarComponent;
