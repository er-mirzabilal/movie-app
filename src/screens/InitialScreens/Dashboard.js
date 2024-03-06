import { View, Text, useWindowDimensions, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppColors from '../../assets/colors/AppColors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Platform, StyleSheet } from 'react-native';
import DashboardHeader from '../../components/Headers/DashboardHeader'
import { Divider } from 'react-native-elements'
import { Image } from 'react-native'
import ProductListing from '../../components/ProductListing/ProductListing'
import DashboardComponent from '../../components/MainScreenComponent.js/DashboardComponent'
import { getPopularMoviesUrl } from '../../components/url'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { fetchPopularMovies } from '../../features/Movies/PopularMovieSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMustWatchMovies } from '../../features/Movies/MustWatchMovieSlice'
import { fetchTopRatedMovies } from '../../features/Movies/TopRatedMoviesSlice'

const Dashboard = (props) => {
    const dispatch=useDispatch();
    let filterData;

    const {title}=props.route.params || '';
    console.log('coming from',title)
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
     const halfScreenWidth = windowWidth / 2;
     const width90Percent = windowWidth * 0.9;
   
  useFocusEffect(
    React.useCallback(() => {
        dispatch(fetchPopularMovies())
        dispatch(fetchMustWatchMovies(1))
        dispatch(fetchTopRatedMovies())
    },[])
  )
// ////////

  const movies = [
    { title: 'Popular',selectorName:'popularMovies'},
    { title: 'Movies',selectorName:'topRatedMovies'},
    { title: 'Must Watch',selectorName:'mustWatchMovies' }
  ];

  if(title === 'Movies'){
    filterData=[...movies]
    //  filterData = popularMovies.data && popularMovies.data.results;
  }
  else{
    console.log('Title is not matched')
  }
  const [refreshing,setRefreshing]=useState(false);
  const onRefreshing=()=>{
    setRefreshing(refreshing);
    setTimeout(()=>{
     setRefreshing(false);
    },1000)
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:AppColors.AppWhite}}>
                 <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,width: width90Percent,backgroundColor:'Powder blue',alignSelf:'center' }}
                   refreshControl={
                    <RefreshControl 
                    refreshing={refreshing}
                    onRefresh={onRefreshing}
                    />
                  }
                 >
                    <DashboardHeader titleScreen={title}/>
                    <DashboardComponent productData={filterData} titleScreen={title}/>
                 </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      ...Platform.select({
        ios: {
          backgroundColor: 'red',
        },
        android: {
          backgroundColor: 'blue',
        },
      }),
    },
  });
  

export default Dashboard