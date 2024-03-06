import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTopRatedMoviesUrl } from "../../components/url";
import axios from "axios";

const initialState={
    loading:null,
    error:null,
    data:null
}
export const fetchMustWatchTvShows=createAsyncThunk(
    '/movies/mustWatchTv',
    async()=>{
        try{
            const response=await axios.get(getTopRatedMoviesUrl(1))
            const res=response.data;
            return res;
        }catch(e){
            console.log(e,'error in mustWatchTv');
        }
    }
)
const mustWatchTvShowsSlice=createSlice({
    name:'mustWacthTvShoes',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(fetchMustWatchTvShows.pending,(state,action)=>{
            state.loading='pending'
        })
        .addCase(fetchMustWatchTvShows.fulfilled,(state,action)=>{
            state.loading=false
            state.error=false
            state.data=action.payload
        })
        .addCase(fetchMustWatchTvShows.rejected,(state,action)=>{
            state.loading=false
            state.error=true
        })
    }
    
})
export default mustWatchTvShowsSlice.reducer;