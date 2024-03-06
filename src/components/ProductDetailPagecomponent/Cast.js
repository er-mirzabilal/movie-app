import { View, Text, FlatList } from 'react-native'
import React, { memo, useEffect } from 'react'
import CommonStyles from '../../assets/styles/CommonStyles';
import { getImageUrl } from '../url';
import { Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Cast = ({data}) => {
  const listItemX = useSharedValue(150);///behtr yahi bai yha windwo ki dimensions get kr k value return ki jaye
    const listItemStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: listItemX.value }]
        }
    })
    useEffect(() => {
      listItemX.value = withTiming(0, { duration: 1000 });
  }, [])
  
  return (
    <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={data} // Sample data
    renderItem={({ item }) => {
        const imageUrl = getImageUrl(item.logo_path); // Get the image URL using getImageUrl function
        console.log(item, 'item')
        return (
            <Animated.View style={[listItemStyle,CommonStyles.listCompo]}>
                <Image source={imageUrl} style={CommonStyles.fullheightWhidth} />
            </Animated.View>
        )
    }}
/>
  )
}

export default memo(Cast)