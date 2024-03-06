import AsyncStorage from '@react-native-async-storage/async-storage';
import PopularMovieSlice from '../features/Movies/PopularMovieSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import MustWatchMovieSlice from '../features/Movies/MustWatchMovieSlice';
import TopRatedMoviesSlice from '../features/Movies/TopRatedMoviesSlice';
import PopularTvShowsSlics from '../features/tvShows/PopularTvShowsSlics';
import MustWatchtvShowsSlice from '../features/tvShows/MustWatchtvShowsSlice';
import TopRatedTvShowsSlics from '../features/tvShows/TopRatedTvShowsSlics';
import SearchMovieSlice from '../features/Movies/SearchMovieSlice';
import SingleMovieDetailSlice from '../features/Movies/SingleMovieDetailSlice';
import logger from 'redux-logger'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // blacklist: ['popularMovies.register'],
  };
  
  
  const rootReducers = combineReducers({
    popularMovies: PopularMovieSlice,
    mustWatchMovies:MustWatchMovieSlice,
    topRatedMovies:TopRatedMoviesSlice,
    popularTVshows:PopularTvShowsSlics,
    mustWatchTV:MustWatchtvShowsSlice,
    topRatedTVshows:TopRatedTvShowsSlics,
    searchMovie:SearchMovieSlice,
    singleMovieDetail:SingleMovieDetailSlice
    });
    
    const persistedReducer = persistReducer(persistConfig, rootReducers);
    
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: false,
        }).concat(logger),
      });
      export default store;