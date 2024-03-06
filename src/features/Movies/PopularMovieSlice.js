import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getPopularMoviesUrl} from '../../components/url';
const initialState = {
  data: null,
  isLoader: false,
  isError: false,
};

export const fetchPopularMovies = createAsyncThunk(
  'movies/popularMovies',
  async (useId,thunk) => {
    try {
      const result = await axios.get(getPopularMoviesUrl({page: 1}));
      const res = result.data;
      return res;
    } catch (e) {
      console.log(e,'error in fetchPopularMovies');
      throw new Error('Failed to fetch products');
    }
  },
);
const popularMovieSlice = createSlice({
  name: 'popularMovies',
  initialState,
  extraReducers:(builder) =>{
    builder.addCase(fetchPopularMovies.pending,(state,action)=>{
        state.isLoader=false;
        
    })
    .addCase(fetchPopularMovies.rejected,
        (state,action)=>{
            state.isLoader=false;
            state.isError =true
        }
        )
        .addCase(fetchPopularMovies.fulfilled,
            (state,action)=>{
                state.isLoader=false;
                state.data=action.payload;
                state.isError=false

            })
  },
});
export default popularMovieSlice.reducer;
