import { View, Text, TouchableOpacity, useWindowDimensions, TextInput, Image, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AppColors from '../../assets/colors/AppColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterCards from '../../components/FilterCards/FilterCards';
import BackButtonHeader from '../../components/Headers/BackButtonHeader';
import { useSelector } from 'react-redux';
import CommonStyles from '../../assets/styles/CommonStyles';

const MoreVideos = (props) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const width90Percent = windowWidth * 0.9;
  const {title,selectorName} =props.route.params || ''
  const getData=useSelector(state => state[selectorName])//getData fromredux
  console.log('getData.....',getData)
  const [refresh,setRefresh]=useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.AppWhite }}>
      <View style={[CommonStyles.mainView,{ width: width90Percent,}]}>
       
        <View style={{ width: scale(210), alignSelf: 'center',  }}>
           <BackButtonHeader title={title}/>
        </View>

        
        <FlatList
        data={getData.data && getData.data.results}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refresh}
          onRefresh={()=>{
            setRefresh(true)
            setTimeout(()=>{
              setRefresh(false)
            },1000)
          }}
          />
        }
        renderItem={({item,index})=>{
           return   <FilterCards item={item} index={index}/>
        }}
        />
      
      </View>

    </SafeAreaView>

  )
}

export default MoreVideos