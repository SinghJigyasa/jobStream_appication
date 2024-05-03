import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchApiData = createAsyncThunk(
  'api/fetchData',
  async (offset, thunkAPI) => {
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const payload = {
      limit: 50,
      offset: offset
    };

    try {
      const response = await axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", payload, {
        headers: requestOptions
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        const newDataList = action.payload
        console.log(newDataList)
        state.loading = false;
        state.data = ({...state.data, ...newDataList});
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default dataSlice.reducer;