import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useCallback, useEffect } from "react";
import { fetchApiData } from "./redux/slice";
import JobCard from "./component/JobCard";
import { Container, Grid } from "@mui/material";
import { useRef } from "react";
import FilterComponent from "./component/SearchCard";
import SearchForm from "./component/SearchCard";

function App() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);
  const offSetRef = useRef(0);

  useEffect(() => {
    dispatch(fetchApiData(offSetRef.current));
    offSetRef.current += 1;
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1
    ) {
      dispatch(fetchApiData(offSetRef.current));
      offSetRef.current += 1;
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
      <Container maxWidth={false} color="#212121" style={{  minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid item xs={12} md={8} sx={{ margin: '20px', width: '900px', borderBottom: '2px solid #80808040', paddingBottom: '30px' }}>

            <SearchForm />
          </Grid>
          <Grid container item xs={12} md={8} spacing={2} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            {data.length !== 0 &&
              data?.jdList.map((item) => (
                <JobCard key={item.jdUid} cardData={item} />
              ))}
          </Grid>
        </Grid>
      </Container>
  );
}

export default App;
