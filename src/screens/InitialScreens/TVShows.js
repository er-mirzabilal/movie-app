import { View, Text, useWindowDimensions, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppColors from '../../assets/colors/AppColors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Platform, StyleSheet } from 'react-native';
import DashboardHeader from '../../components/Headers/DashboardHeader'
import { Divider } from 'react-native-elements'
import { Image } from 'react-native'
import ProductListing from '../../components/ProductListing/ProductListing'
import DashboardComponent from '../../components/MainScreenComponent.js/DashboardComponent'
import { useFocusEffect } from '@react-navigation/native'
import { fetchTopRatedTvShows } from '../../features/tvShows/TopRatedTvShowsSlics'
import { fetchPopularTvShows } from '../../features/tvShows/PopularTvShowsSlics'
import { fetchMustWatchTvShows } from '../../features/tvShows/MustWatchtvShowsSlice'
import { useDispatch, useSelector } from 'react-redux'

const TVShows = (props) => {
    const dispatch=useDispatch()
    const { title } = props.route.params || '';
    console.log('coming from', title)
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const width90Percent = windowWidth * 0.9;
    const tVShows = [
        { title: 'Popular',selectorName:'popularTVshows'},
        { title: 'Movies',selectorName:'topRatedTVshows'},
        { title: 'Must Watch',selectorName:'mustWatchTV' }
        
      ];
      useFocusEffect(
        React.useCallback(() => {
            dispatch(fetchTopRatedTvShows())
            dispatch(fetchPopularTvShows())
            dispatch(fetchMustWatchTvShows())
        },[])
        )

        const selectoData=useSelector(state => state.mustWatchTV)
        console.log('..................mustWatchTV',selectoData.data.results)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.AppWhite }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, width: width90Percent, backgroundColor: 'Powder blue', alignSelf: 'center' }}>
                <DashboardHeader titleScreen={title}/>
                <DashboardComponent productData={tVShows} titleScreen={title} />
            </ScrollView>
        </SafeAreaView>
    )
}
export default TVShows