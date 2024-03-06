import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getTopRatedTVShowUrl } from "../../components/url";

const initialState={
    isloading:null,
    isError:null,
    data:null //[]

}
export const fetchTopRatedTvShows=createAsyncThunk(
    '/movies/topRatedTVshows',
    async(pageNumber)=>{
        try{
            const response=await axios.get(getTopRatedTVShowUrl(1))
            const res=response.data;
            return res;
        }catch(e){
            console.log(e,'error in fecth topRatedTVshows')
        }
    }
)
const topRatedTvShowsSlics=createSlice({
    name: 'topRatedTvShows' ,
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchTopRatedTvShows.pending,(state,action)=>{
            state.isloading=true;
        }).addCase(fetchTopRatedTvShows.fulfilled, (state, action) =>{
            state.isloading = false;
            state.isError=false;
            state.data=action.payload;
           })
           .addCase(fetchTopRatedTvShows.rejected,(state,action)=>{
            state.isError=true
            state.isloading=false;
           })
        }
 }
)
export default  topRatedTvShowsSlics.reducer ;