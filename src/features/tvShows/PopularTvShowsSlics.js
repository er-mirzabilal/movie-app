import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPopularTVShowUrl } from "../../components/url";
import axios from "axios";

const initialState={
    loading:null,
    error:null,
    data:null
}
export const fetchPopularTvShows=createAsyncThunk(
    '/movies/popularTvshows',
    async()=>{
        try{
            const response=await axios.get(getPopularTVShowUrl(({page: 1})))
            const res=response.data;
            return res;
        }catch(e){
            console.log(e,'error in fetching popularTvshows');
        }
    }
)
const popularTvShowsSlics=createSlice({
    name:'popularMoviesTvShows',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(fetchPopularTvShows.pending,(state,action)=>{
            state.loading='pending'
        })
        .addCase(fetchPopularTvShows.fulfilled,(state,action)=>{
            state.loading=false
            state.error=false
            state.data=action.payload
        })
        .addCase(fetchPopularTvShows.rejected,(state,action)=>{
            state.loading=false
            state.error=true
        })
    }
    
})
export default popularTvShowsSlics.reducer;