import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scale } from 'react-native-size-matters';
import AppColors from '../../assets/colors/AppColors';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import * as Animatable from 'react-native-animatable';

const DashboardHeader = ({titleScreen}) => {
    const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  return (
    <Animatable.View duration={1400} animation={'fadeInDown'} style={{justifyContent:'space-between',flexDirection:'row'}}>
          
              <TouchableOpacity onPress={()=>{
                   navigation.toggleDrawer();
           }}>
           <FontAwesome6 name={'bars-staggered'} size={scale(20)} color={AppColors.AppBlack}  />
           </TouchableOpacity>

           <TouchableOpacity onPress={()=>{
                navigation.navigate('Search',{titleScreen:titleScreen})
           }}>
           <FontAwesome name={'search'} size={scale(20)} color={AppColors.AppBlack} />           
           </TouchableOpacity>
    </Animatable.View>
  )
}

export default DashboardHeader