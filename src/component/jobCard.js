import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
const JobCard = (props) => {
  const {
    jdUid,
    logoUrl,
    companyName,
    jobRole,
    location,
    minJdSalary,
    maxExp,
    minExp,
    jobDetailsFromCompany,
    salaryCurrencyCode,
    maxJdSalary,
  } = props.cardData;

   const [showText, setShowText] = useState({});

  const expendMoredetails = (id) => {
    setShowText((prevShowText) => ({
      ...prevShowText,
      [id]: !prevShowText[id],
    }));
  };
  return (

        <Grid item xs={12} ms={4} sm={4} key={jdUid}>
          <Card
            sx={{ maxWidth: 345 }} 
            style={{ padding: "5px",margin:'10px', marginBottom: "20px", height:'100%', justifyContent: 'space-between'}}
          >
            <CardContent>
              <Typography color={"#212121"} fontSize="20px">
                <img
                  cols={2}
                  style={{ width: "50px" }}
                  // srcSet={`${item.logoUrl}`}
                  src={`${logoUrl}`}
                  alt={companyName}
                  loading="lazy"
                />
                <span> {companyName}</span>
              </Typography>
              <Typography
                cols={6}
                gutterBottom
                variant="h5"
                component="div"
                color={"#616161"}
                fontSize="25px"
              >
                <Typography color={"#212121"} fontSize="20px">
                  {jobRole[0].toUpperCase() + jobRole.slice(1)} ({location})
                </Typography>
                <Typography color="#757575">
                  Estimated Salary:{" "}
                  <span>&#36;{`${minJdSalary !==null ? minJdSalary +'-':''}  ${maxJdSalary !== null ?maxJdSalary:''} ${salaryCurrencyCode}`}</span>
                </Typography>
              </Typography>
              <Typography color="#212121">About Company:</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                  className={showText[jdUid] ? "" : "truncate4_line"}
              >
                {jobDetailsFromCompany}
              </Typography>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  style={{
                    textTransform: "lowercase",
                    padding: 0,
                    marginTop: 10,
                    backgroundColor:'transparent'
                  }}
                  onClick={() => expendMoredetails(jdUid)}
                  startIcon={showText[jdUid]?<ArrowDropUpIcon/>:<ArrowDropDownIcon />}
                >
                {showText[jdUid]?'view less':'view more '}
                </Button>
              </Stack>
              <Typography color="#757575">
                {minExp && `Experience: ${minExp}-${maxExp} years`}
              </Typography>
            </CardContent>
            <Stack spacing={1}>
              <Button href="https://weekday.works" variant="contained">
                Apply Now
              </Button>
            </Stack>
          </Card>
        </Grid>
     
  );
};
export default JobCard;
