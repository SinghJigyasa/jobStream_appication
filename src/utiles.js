import axios from "axios";
export const FETCH_API_DATA_REQUEST = 'FETCH_API_DATA_REQUEST';
    
export const fetchApiData=(offset)=>{  
    return async (dispatch)=>{
        dispatch({type:FETCH_API_DATA_REQUEST})
        const requestOptions = {
            headers: {
                'Content-Type':'application/json'
            }}; 
        const payload={
            "limit": 50,
            "offset": offset
        }
        axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON",payload,{
            headers: requestOptions
          } )
        // .then((result) => {
        //     console.log(result.data)
        // })
    }
}