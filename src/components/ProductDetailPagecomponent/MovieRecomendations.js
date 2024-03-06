import React, { memo, useCallback, useEffect, useState } from 'react'
import { getImageUrl, getMovieRecommendationsUrl } from '../url';
import CommonStyles from '../../assets/styles/CommonStyles';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Text } from 'react-native';

// const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

const MovieRecomendations = ({itemId,navigation}) => {
    const [recommendations, setRecommendations] = useState([]);
    const fetchRecommendations = async () => {
        try {
            const response = await axios.get(getMovieRecommendationsUrl(itemId));
            const data = await response.data;
            console.log('Movie Recomndations', data.results)
            setRecommendations(data.results);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };
    useEffect(()=>{
        fetchRecommendations()
    },[itemId])
  return ( 
    <>
    {recommendations.length>0 ? 
    <Text style={[CommonStyles.mediumText]}>
                            Recomendations
                        </Text>
                        :null
      }
      <ScrollView>
    <FlatList
    contentContainerStyle={[CommonStyles.listContainer]}
    data={recommendations}
    showsHorizontalScrollIndicator={false}
    horizontal
    renderItem={({ item, index }) => {
        console.log('recomendationssssssssssssssssss',item)
        const posterPath = item.poster_path;
        const imageUrl = getImageUrl(posterPath);
        return (
            <>
            {/* // <TouchableOpacity
                // duration={1000}
                // animation="zoomIn"
                onPress={() => navigation.push('ProductDetailPage', { itemId: item.id })}
                style={[CommonStyles.imgView,]}
            // > */}
                <TouchableOpacity style={{height:scale(130),width:scale(100)}}
                        onPress={() => navigation.push('ProductDetailPage', { itemId: item.id })}
                >
                <Image
                    source={imageUrl}
                    style={{height:scale(130),width:scale(90)}}
                />
                </TouchableOpacity>
             {/* </TouchableOpacity> */}
            </> 
        );
    }}
/>
</ScrollView>
</>

  )
}

export default MovieRecomendations