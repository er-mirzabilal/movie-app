import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getMustWatchMoviesUrl } from "../../components/url";

const initialState={
    isloading:null,
    isError:null,
    data:null //[]

}
export const fetchMustWatchMovies=createAsyncThunk(
    '/movies/mustwatch',
    async(pageNumber)=>{
        try{
            const response=await axios.get(getMustWatchMoviesUrl(1))
            const res=response.data;
            return res;
        }catch(e){
            console.log(e,'error in fecth must watch movies')
        }
    }
)
const mustWatchMovies=createSlice({
    name: 'mustWatchMovies' ,
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchMustWatchMovies.pending,(state,action)=>{
            state.isloading=true;
        }).addCase(fetchMustWatchMovies.fulfilled, (state, action) =>{
            state.isloading = false;
            state.isError=false;
            state.data=action.payload;
           })
           .addCase(fetchMustWatchMovies.rejected,(state,action)=>{
            state.isError=true
            state.isloading=false;
           })
        }
 }
)
export default  mustWatchMovies.reducer ;