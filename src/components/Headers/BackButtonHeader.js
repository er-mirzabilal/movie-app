import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Divider } from 'react-native-elements';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AppColors from '../../assets/colors/AppColors';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import * as Animatable from 'react-native-animatable';

const BackButtonHeader = ({title}) => {
    const navigation = useNavigation(); // Use useNavigation hook to get navigation object

    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const width90Percent = windowWidth * 0.9;
  return (
    <Animatable.View duration={1000} animation={'fadeInDown'} style={{ flexDirection: 'row', alignItems: 'center',width: width90Percent,alignSelf:'center',marginBottom: scale(10) }}>
    <TouchableOpacity onPress={()=>{
        navigation.goBack()
    }} style={{ width: '30%' }}>

      <AntDesign name={'arrowleft'} size={scale(25)} color={AppColors.AppBlack} />
    </TouchableOpacity>
    <View style={{alignSelf:'center'}}>
      <Text style={{ fontSize: moderateScale(23), color: AppColors.AppBlack }}>{title}</Text>
      <Divider style={{ width: scale(30), height: verticalScale(5), backgroundColor: AppColors.AppOrange, alignSelf: 'center', marginTop: scale(5) }} />
    </View>
  </Animatable.View>
  )
}

export default BackButtonHeader