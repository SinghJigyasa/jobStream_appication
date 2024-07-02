import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useCallback, useEffect } from "react";
import { fetchApiData } from "./redux/slice";
import JobCard from "./component/jobCard";
import { Container, Grid } from "@mui/material";
import { useRef } from "react";

function App() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);
  const offSetRef = useRef(0);

  useEffect(() => {
    dispatch(fetchApiData(offSetRef.current));
    offSetRef.current += 1;
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1) {
      dispatch(fetchApiData(offSetRef.current));
      offSetRef.current += 1;
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  
  return (
      <Container maxWidth="lg" color="#212121">
        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {data.length !== 0 &&
            data?.jdList.map((item) => <JobCard key={item.jdUid} cardData={item} />)}
        </Grid>
      </Container>  
  );
}

export default App;
