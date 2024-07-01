import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { fetchApiData } from "./redux/slice";

import JobCard from "./component/jobCard";
import { Container, Grid } from "@mui/material";

function App() {
  const [offSet, setOffSet] = useState(0);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchApiData(offSet));
    setOffSet((pre) => pre + 1);
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    if (
    window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading
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

 
  return (
      <Container maxWidth="lg" color="#212121">
        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {data.length !== 0 &&
            data?.jdList.map((item) => <JobCard cardData={item} />)}
        </Grid>
      </Container>  
  );
}

export default App;
