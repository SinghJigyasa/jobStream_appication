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
    let filterDataList =data?.jdList;
    if(filterValue.jobType =='remote'){
     filterDataList= filterDataList.filter((value)=>value.location ==filterValue.jobType)
    }if(filterValue.jobType =='onsite'){
      filterDataList =filterDataList.filter((value)=>value.location !=='remote')
    }if(filterValue.minExp !=='select Experience'){
      filterDataList = filterDataList.filter((value)=>value.minExp == Number(filterValue.minExp))
    }if(filterValue.roles !=='select Role'){
      filterDataList = filterDataList.filter((value)=>value.jobRole == filterValue.roles)
    }if(filterValue?.compName ){
      filterDataList = filterDataList.filter((value)=>value.companyName.toLowerCase().includes(filterValue.compName.toLowerCase()))
    }
    else{
      filterDataList =[]
    }

    setFilterList(filterDataList)
    console.log(filterDataList,"...filtering")
  }
console.log(filterList.length,"filterList.length")
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
