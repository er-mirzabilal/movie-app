import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getSearchMovieUrl } from "../../components/url";

const initialState={
    loading:null,
    error:null,
    data:null
}

export const fetchSearchMovie=createAsyncThunk(
    'searchMovie/searchMovieSlice',
    async()=>{
        try{
            const response=await axios(getSearchMovieUrl(1))
            const res=response.data;
            return res;
        }
        catch(e){
            console.log('search tv showssss',e)
        }
    }
)
const searchMovieSlice=createSlice({
    name:'searchMovieSlice',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(fetchSearchMovie.pending,(state,action)=>{
            state.loading='pending'
        })
        .addCase(fetchSearchMovie.fulfilled,(state,action)=>{
            state.loading=false
            state.error=false
            state.data=action.payload
        })
        .addCase(fetchSearchMovie.rejected,(state,action)=>{
            state.loading=false
            state.error=true
        })
    }
})
export default searchMovieSlice.reducer;