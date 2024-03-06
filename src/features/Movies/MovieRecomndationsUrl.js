import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopRatedMovies=createAsyncThunk(
    '/movies/getRecomndatiosn',
    async()=>{
        try{
            const response=await axios.get()
            const res=response.data;
            return res;
        }catch(e){
            console.log(e,'error in fetching top rated movies');
            throw new Error('Failed to fetch products');
        }
    }
)