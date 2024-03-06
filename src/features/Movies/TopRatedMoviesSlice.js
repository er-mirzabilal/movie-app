import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTopRatedMoviesUrl } from "../../components/url";
import axios from "axios";

const initialState={
    loading:null,
    error:null,
    data:null
}
export const fetchTopRatedMovies=createAsyncThunk(
    '/movies/topRatedMovie',
    async()=>{
        try{
            const response=await axios.get(getTopRatedMoviesUrl(1))
            const res=response.data;
            return res;
        }catch(e){
            console.log(e,'error in fetching top rated movies');
            throw new Error('Failed to fetch products');
        }
    }
)
const topRatedMovieSlice=createSlice({
    name:'topRatedMovies',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(fetchTopRatedMovies.pending,(state,action)=>{
            state.loading='pending'
        })
        .addCase(fetchTopRatedMovies.fulfilled,(state,action)=>{
            state.loading=false
            state.error=false
            state.data=action.payload
        })
        .addCase(fetchTopRatedMovies.rejected,(state,action)=>{
            state.loading=false
            state.error=true
        })
    }
    
})
export default topRatedMovieSlice.reducer;