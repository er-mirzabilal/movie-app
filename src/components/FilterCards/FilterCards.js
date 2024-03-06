import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import AppColors from '../../assets/colors/AppColors'
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { getImageUrl } from '../url';
import CommonStyles from '../../assets/styles/CommonStyles';
import { useNavigation } from '@react-navigation/native';
const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);
import * as Animatable from 'react-native-animatable';

const FilterCards = ({item,index}) => {
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  console.log(item,'item.....>>>>>')
  const imgUrl=getImageUrl(item.poster_path);
  return (
    <AnimatedButton  duration={1000*index+.5} animation={'zoomIn'}
     onPress={()=>{
      navigation.navigate("ProductDetailPage",{itemId:item.id})

    }} style={{ height: verticalScale(120), alignItems: 'center', flexDirection: 'row', marginVertical: 20 }}>
    <View style={[CommonStyles.imgView,{height: '100%'}]}>
      <Animatable.Image duration={1000} animation={'zoomIn'} style={[CommonStyles.fullheightWhidth]} source={imgUrl}/>
    </View>
    <View style={{ paddingHorizontal: scale(10),width:'70%' }}>
      <Text style={{ color: AppColors.AppBlack, fontSize: moderateScale(18), textTransform: 'capitalize',marginLeft:5, }}>
        {item.original_title || item.name}
      </Text>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <StarRatingDisplay
        rating={item.vote_average/2}
        starSize={widthPercentageToDP('4.7%')}
        color="#FCC400"
        emptyColor={AppColors.lineColor}
        starStyle={{ width: widthPercentageToDP('1%') }}
      />
      <Text style={{ fontSize: moderateScale(15), color: AppColors.AppBlack,marginLeft:scale(10) }}>
             {Math.round((item.vote_average / 2) * 10) / 10}
      </Text>
      </View>
      <Text style={{fontSize: moderateScale(15), color: AppColors.lineColor,marginLeft:scale(10) }}>
      </Text>

    </View>
  </AnimatedButton>
  )
}

export default FilterCards