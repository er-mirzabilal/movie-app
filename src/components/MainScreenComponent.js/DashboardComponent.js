import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import AppColors from '../../assets/colors/AppColors'
import ProductListing from '../ProductListing/ProductListing'
import { Divider } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import CommonStyles from '../../assets/styles/CommonStyles'
const DashboardComponent = ({titleScreen,productData}) => {
  const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

  return (
    <View>
      <Animatable.Text animation={"zoomIn"} duration={1400} style={{fontSize:moderateScale(30),marginTop:scale(40),color:AppColors.AppBlack}}>{titleScreen}</Animatable.Text>
          <Divider style={{width:scale(30),height:verticalScale(5),backgroundColor:AppColors.AppOrange,marginBottom:20}} />
          {productData.map((item, index) => (
          <ProductListing key={index} title={item.title} selectorName={item.selectorName} titleScreen={titleScreen} />
          ))}
    </View>
  )
}

export default DashboardComponent
