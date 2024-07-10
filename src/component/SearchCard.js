import React, { useState } from "react";
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Input,
  debounce,
} from "@mui/material";
import { experienceOptions, jobTypeOptions, roleTypeOptions } from "./uitil";

/**
 * Min experience
Company name
Location
Remote/on-site
Tech stack
Role
Min base pay

 */
const SearchForm = ({ filterValue, setFilterValue, handleSearch }) => {

  
  const handleFilter = (e) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const menuProps = {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getcontentanchorel: null,
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8, // Sets a maximum height for the dropdown
      },
    },
  };

  return (
    <Container>
      <h1>Advance Search</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} sx={{ marginRight: 4 , marginLeft: 3}}>
          <FormControl fullWidth>
            <Select
              variant="standard"
              value={filterValue.jobType}
              onChange={(e) => handleFilter(e)}
              name="jobType"
              MenuProps={menuProps}
            >
              {jobTypeOptions.map((option, idx) => (
                <MenuItem key={idx} value={option.value}>
                  {option.Label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ marginRight: 4 ,marginLeft: 2 }}>
          <FormControl fullWidth>
            <Select
              variant="standard"
              name="minExp"
              value={filterValue.minExp}
              onChange={(e) => handleFilter(e)}
              MenuProps={menuProps}
            >
              {experienceOptions.map((option, idx) => (
                <MenuItem key={idx} value={option.value}>
                  {option.Label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}  sx={{marginLeft: 3}}>
          <FormControl fullWidth>
            <Select
              variant="standard"
              name="roles"
              value={filterValue.roles}
              onChange={(e) => handleFilter(e)}
              MenuProps={menuProps}
            >
              {roleTypeOptions.map((options, idx) => (
                <MenuItem key={idx} value={options.value}>
                  {options.Label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} ms={4} sm={4}  sx={{marginTop: 2, marginLeft: 3}}>
          <FormControl fullWidth>
            <Input
              placeholder="please Enter Company Name"
              type="text"
              name="compName"
              onChange={(e) => handleFilter(e)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{marginTop: 2, marginLeft: 3}}>
          <Button variant="contained" fullWidth onClick={handleSearch}>
            SEARCH
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchForm;
