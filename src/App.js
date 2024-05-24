import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { fetchApiData } from "./redux/slice";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Link,
  Stack,
  Typography,
} from "@mui/material";

function App() {
  const [offSet, setOffSet] = useState(0);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);
  console.log(data, "data", loading);

  useEffect(() => {
    dispatch(fetchApiData(offSet));
    setOffSet((pre) => pre + 1);
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    dispatch(fetchApiData(offSet));
    setOffSet((pre) => pre + 1);
  }, [data.length, dispatch, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, loading]);

  const [showText, setShowText] = useState({});

  const expendMoredetails = (id) => {
    setShowText((prevShowText) => ({
      ...prevShowText,
      [id]: !prevShowText[id],
    }));
  };
  console.log(showText, "showText");
  return (
    <>
      <Container maxWidth="lg" color="#212121">
        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {data.length !== 0 &&
            data?.jdList.map((item) => (
              <Grid item xs={12} ms={4} sm={4} key={item.jdUid}>
                <Card
                  sx={{ maxWidth: 345 }}
                  style={{ padding: "10px", marginBottom: "20px" }}
                >
                  <CardContent>
                    <Typography color={"#212121"} fontSize="20px" >
                      <img    
                        cols={2}
                          style={{width:'50px'}}
                          // srcSet={`${item.logoUrl}`}
                          src={`${item.logoUrl}`}
                          alt={item.companyName}
                          loading="lazy"
                        /><span> {item.companyName}</span>
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
                        {item.jobRole[0].toUpperCase() + item.jobRole.slice(1)}{" "}
                        ({item.location})
                      </Typography>
                      <Typography color="#757575">
                        Estimated Salary:{" "}
                        <span>{`$${item.minJdSalary} - ${item.maxJdSalary} ${item.salaryCurrencyCode}`}</span>
                      </Typography>
                    </Typography>
                    <Typography color="#212121">About Company:</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className={showText[item.jdUid] ? "" : "truncate4_line"}
                    >
                      {item.jobDetailsFromCompany}
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        style={{
                          textTransform: "capitalize",
                          padding: 0,
                          marginTop: 10,
                        }}
                        onClick={() => expendMoredetails(item.jdUid)}
                      >
                        View Job
                      </Button>
                    </Stack>
                    <Typography color="#757575">
                      {item.minExp &&
                        `Experience: ${item.minExp} -${item.maxExp} years`}
                    </Typography>
                  </CardContent>
                  <Stack spacing={1}>
                    <Button href="https://weekday.works" variant="contained">
                      Apply Now
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}

export default App;
