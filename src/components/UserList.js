import React, { useState, useEffect } from "react";
import { fetchUsers } from "../services/SkilldevService";
import { Button, TextField, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from "@mui/material";
import NavBarComponent from "./NavBarComponent";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch users based on search, page, and size
  const handleSearch = async () => {
    try {
      const response = await fetchUsers(search, page, size);
      setUsers(response.data.content); // Assuming "content" contains the users
      setTotalUsers(response.data.totalElements); // Assuming "totalElements" contains the total number of users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    handleSearch(); // Fetch users on initial load
  }, [page, size, search]); // Re-fetch when page, size, or search changes

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when page size changes
  };

  return (
  <div>
    <NavBarComponent/>
      <Box p={4}>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>

      {/* Search Field */}
      <TextField
        label="Search"
        value={search}
        onChange={handleSearchChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      {/* <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginBottom: "20px" }}>
        Search
      </Button> */}

      {/* User Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.roles.map((role) => role.name).join(", ")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalUsers}
        rowsPerPage={size}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  </div>
  );
};

export default UserList;
