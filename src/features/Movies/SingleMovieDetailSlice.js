import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovieDetailUrl } from "../../components/url";
import axios from "axios";

const initialState={
    loading:null,
    error:null,
    data:null
}
export const fetchSingleMovieDetail=createAsyncThunk(
    '/movies/singleMovieDetail',
    async(id)=>{
        try{
            const response=await axios.get(getMovieDetailUrl(id))
            const res=response.data;
            return res;
        }catch(e){
            console.log(e,'error in fetching single movies');
            throw new Error('Failed to fetch products');
        }
    }
)
const singleMovieDetailSlice=createSlice({
    name:'SingleMovieDetail',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(fetchSingleMovieDetail.pending,(state,action)=>{
            state.loading='pending'
        })
        .addCase(fetchSingleMovieDetail.fulfilled,(state,action)=>{
            state.loading=false
            state.error=false
            state.data=action.payload
        })
        .addCase(fetchSingleMovieDetail.rejected,(state,action)=>{
            state.loading=false
            state.error=true
        })
    }
    
})
export default singleMovieDetailSlice.reducer;