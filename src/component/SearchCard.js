import React, { useState } from "react";
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const SearchForm = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [maxExperience, setMaxExperience] = useState("");

  const handleCountryChange = (event) => setCountry(event.target.value);
  const handleStateChange = (event) => setState(event.target.value);
  const handleCityChange = (event) => setCity(event.target.value);
  const handleMinExperienceChange = (event) =>
    setMinExperience(event.target.value);
  const handleMaxExperienceChange = (event) =>
    setMaxExperience(event.target.value);

  const handleSearch = () => {
    // Handle the search logic here
    console.log({ country, state, city, minExperience, maxExperience });
  };

  return (
    <Container>
      <h1>Advance Search</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} ms={4} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Select country</InputLabel>
            <Select value={country} onChange={handleCountryChange}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="country1">Country 1</MenuItem>
              <MenuItem value="country2">Country 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Select state</InputLabel>
            <Select value={state} onChange={handleStateChange}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="state1">State 1</MenuItem>
              <MenuItem value="state2">State 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Select city</InputLabel>
            <Select value={city} onChange={handleCityChange}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="city1">City 1</MenuItem>
              <MenuItem value="city2">City 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Select minimum experience</InputLabel>
            <Select value={minExperience} onChange={handleMinExperienceChange}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1 Year</MenuItem>
              <MenuItem value="2">2 Years</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Select maximum experience</InputLabel>
            <Select value={maxExperience} onChange={handleMaxExperienceChange}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="5">5 Years</MenuItem>
              <MenuItem value="10">10 Years</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button variant="contained" fullWidth onClick={handleSearch}>
            SEARCH
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchForm;
