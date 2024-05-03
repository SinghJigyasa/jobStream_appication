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

  const [showText, setShowText] = useState(true);
  const expendMoredetails = () => {
    
  }
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" style={{ marginTop: "50px" }}>
          Material Card
        </Typography>
        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {data.length !== 0 &&
            data?.jdList.map((item) => (
              <Grid item xs={12} ms={4} sm={4} key={item.jdUid}>
                <Card
                  sx={{ maxWidth: 345 }}
                  style={{ padding: "10px", marginBottom: "50px" }}
                >
                  {/* <CardActionArea>
                  </CardActionArea> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Weekdays
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className={showText ? "truncate4_line" : ""}
                    >
                      {item.jobDetailsFromCompany}
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        href="#text-buttons"
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
                  </CardContent>
                  <Stack spacing={1}>
                    <Button variant="contained">
                      <Link
                        href="https://weekday.works"
                        variant="button"
                      ></Link>
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
