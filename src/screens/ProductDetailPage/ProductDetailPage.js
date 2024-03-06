import { View, Text, useWindowDimensions, TouchableOpacity, ImageBackground, ScrollView, FlatList, Linking, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppColors from '../../assets/colors/AppColors'
import BackButtonHeader from '../../components/Headers/BackButtonHeader'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Divider, Image } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleMovieDetail } from '../../features/Movies/SingleMovieDetailSlice'
import { getImageUrl, getMovieImageUrl, getMovieRecommendationsUrl } from '../../components/url';
import LinearGradient from 'react-native-linear-gradient'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import CommonStyles from '../../assets/styles/CommonStyles'
import * as Animatable from 'react-native-animatable';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Cast from '../../components/ProductDetailPagecomponent/Cast'
import RenderMovieShots from '../../components/ProductDetailPagecomponent/RenderMovieShots'
import MovieRecomendations from '../../components/ProductDetailPagecomponent/MovieRecomendations'
const AnimatedBackgroundImage = Animatable.createAnimatableComponent(ImageBackground);
const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

const ProductDetailPage = (props) => {
    const [recommendations, setRecommendations] = useState([]);
    const { itemId } = props.route.params;

    const headerContatiner = useSharedValue(0);//we can store value in it 
    const headerStyle = useAnimatedStyle(() => {
        return {
            height: headerContatiner.value
        }
    })
    
    useEffect(() => {
        headerContatiner.value = withTiming(verticalScale(550), { duration: 1500 })
    }, [])
    
    const dispatch = useDispatch()
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const width90Percent = windowWidth * 0.9;
    const width100Percent = windowWidth * 1;
    const [showFullOverView, setShowFullOverView] = useState(false);
    const toggleOverView = () => {
        setShowFullOverView(!showFullOverView)
    }
    useEffect(() => {
        dispatch(fetchSingleMovieDetail(itemId))

    }, [dispatch])

    const getData = useSelector((state) => state.singleMovieDetail)
    const imageUrl = getImageUrl(getData.data.poster_path); // Call getMovieImageUrl with itemId to get the background image URL
    console.log("Get Data", recommendations)
    if (!getData) {
        console.log('no data')
    } else {
        console.log('................................', imageUrl, JSON.stringify(getData.data));
    }

    const renderGenre = () => {
        return (
            getData.data.genres && getData.data.genres.map((genre, index) => (
                <View key={index} style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: AppColors.lineColor, paddingHorizontal: 6, marginRight: 8, marginBottom: 8, borderRadius: 5 }}>
                    <Text style={{ fontSize: moderateScale(15), color: AppColors.lineColor }}>{genre.name}</Text>
                </View>
            ))
        );
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.AppWhite }}>
            <ScrollView style={{ height: '100%', backgroundColor: AppColors.AppBlack }} showsVerticalScrollIndicator={false}>

                <AnimatedBackgroundImage duration={1000} animation={'slideInLeft'} style={{ width: '100%', height: scale(170), justifyContent: 'space-between', alignSelf: 'center' }} source={imageUrl}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.goBack()
                    }} style={{ width: '30%', paddingHorizontal: 10 }}>
                        <AntDesign name={'arrowleft'} size={scale(20)} color={AppColors.AppWhite} />
                    </TouchableOpacity>
                    <LinearGradient
                        useAngle={true}
                        angle={180}
                        angleCenter={{ x: 0.1, y: 0.3 }}
                        colors={['rgba(255,255,255,0)', 'rgba(0,0,0,.9)']}
                        start={{ x: 0, y: 0.1 }}
                        end={{ x: 0, y: 1 }}
                    // style={{position:'absolute',height:'10%',width:'100%',justifyContent:'flex-end'}}
                    >
                        <View style={{ justifyContent: 'flex-end', width: width90Percent, marginHorizontal: 15, alignItems: 'flex-start' }}>
                            <Text style={{ color: AppColors.AppWhite, fontSize: moderateScale(25), }}>
                                {getData.data.original_title}
                            </Text>
                            <Divider style={{ width: scale(30), height: verticalScale(5), backgroundColor: AppColors.AppWhite, marginTop: scale(5), }} />
                        </View>
                        <View style={{ marginLeft: 8, flexDirection: 'row', marginTop: 6 }}>
                            <StarRatingDisplay
                                rating={getData.data.vote_average / 2}
                                starSize={widthPercentageToDP('4.7%')}
                                color="#FCC400"
                                emptyColor={AppColors.lineColor}
                                starStyle={{ width: widthPercentageToDP('1%') }}

                            />
                            <Text style={{ fontSize: moderateScale(15), color: AppColors.AppWhite, marginLeft: scale(10) }}>
                                {Math.round((getData.data.vote_average / 2) * 10) / 10}
                            </Text>
                        </View>
                    </LinearGradient>
                </AnimatedBackgroundImage>
                {/* 2ndddddd */}

                <Animated.View style={[headerStyle,CommonStyles.animatedViewStyles,{ width: width100Percent,}]}>
                    <View style={{ width: width90Percent, alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(getData.data.homepage)
                        }} style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: scale(-25), alignSelf: 'flex-end', width: scale(60), height: scale(50), backgroundColor: AppColors.AppOrange, borderRadius: 10 }}>
                            <AntDesign name={'caretright'} size={scale(20)} color={AppColors.AppWhite} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            {renderGenre()}
                        </View>
                        <Text style={[CommonStyles.mediumText]}>
                            Overview
                        </Text>
                        <TouchableOpacity onPress={toggleOverView}>
                            <Text style={{ color: AppColors.AppBlack, fontSize: moderateScale(13), }}>
                                {showFullOverView ? getData.data.overview : getData.data.overview.length > 150 ? getData.data.overview.substring(0, 150) + '...' : getData.data.overview}
                            </Text>
                        </TouchableOpacity>
                        <Text style={[CommonStyles.mediumText]}>
                            Cast
                        </Text>
                        <Cast data={getData.data.production_companies} />
                        <Text style={[CommonStyles.mediumText]}>
                            Images
                        </Text>
                        <RenderMovieShots data={getData.data.genres} />
                        
                      <MovieRecomendations  navigation={props.navigation} itemId={itemId}/>
                    </View>
                </Animated.View>
                {/* </View> */}
            </ScrollView>
        </SafeAreaView>
    )
}


export default ProductDetailPage