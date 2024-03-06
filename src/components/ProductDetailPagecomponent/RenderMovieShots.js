import { View, Text, Image, FlatList } from 'react-native'
import React, { memo } from 'react'
import { getImageUrl } from '../url';
import CommonStyles from '../../assets/styles/CommonStyles';

const RenderMovieShots = ({data}) => {
  return (
    <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data} // Sample data
            renderItem={({ item }) => {
                const posterPath = item.poster_path;
                     const imageUrl = getImageUrl(posterPath);
                return (
                    <View style={[CommonStyles.movieShots]}>
                        <Image source={imageUrl} style={CommonStyles.fullheightWhidth}/>
                    </View>
                )
            }}
        />
  )
}

export default memo(RenderMovieShots)