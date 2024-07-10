import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useCallback, useEffect } from "react";
import { fetchApiData } from "./redux/slice";
import { Container, Grid } from "@mui/material";
import { useRef, useState } from "react";
import FilterComponent from "./component/SearchCard";
import SearchForm from "./component/SearchCard";
import JobCard from "./component/JobListCard";

function App() {
  const defaultFilterValue = {
    jobType: "select Job Type",
    minExp: "select Experience",
    roles: "select Role",
  };
  const [filterValue, setFilterValue] = useState(defaultFilterValue);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);
  const [filterList, setFilterList] = useState([])
  const offSetRef = useRef(0);
  console.log(filterList,"filterList",filterList.length)

 useEffect(()=>{
  if(data.length !==0&& data.jdList){
    setFilterList(data?.jdList)
  }
 },[data])
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

  const handleSearch = ()=>{
    console.log('search click....')
    const filterDataList = data?.jdList.filter((value)=>value.location ==filterValue.jobType)
    setFilterList(filterDataList)
    console.log(filterDataList)
  }
  return (
    <Container
      maxWidth={false}
      color="#212121"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            margin: "20px",
            width: "900px",
            borderBottom: "2px solid #80808040",
            paddingBottom: "30px",
          }}
        >
          <SearchForm
            handleSearch={handleSearch}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={8}
          spacing={2}
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {data.length !== 0 && filterList.length !==0 &&
            filterList.map((item) => (
              <JobCard key={item.jdUid} cardData={item} />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
