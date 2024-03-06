import { View, Text, TouchableOpacity, useWindowDimensions, TextInput, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AppColors from '../../assets/colors/AppColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterCards from '../../components/FilterCards/FilterCards';
import BackButtonHeader from '../../components/Headers/BackButtonHeader';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchMovie } from '../../features/Movies/SearchMovieSlice';

const Search = (props) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const width90Percent = windowWidth * 0.9;
  const [searchTerm, setSearchTerm] = useState('');
  const {titleScreen}=props.route.params
 const dispatch=useDispatch()
  useFocusEffect(
    React.useCallback(()=>{
      dispatch(fetchSearchMovie());
    },[])
  )
  const selectorName = titleScreen === 'Movies' ? 'searchMovie' : '';

  // const getData=useSelector(state =>state.searchMovie)
  const getData=useSelector(state =>state[selectorName])


    const renderFilteredItems=()=>{
      if(!searchTerm){
        return(
          <FlatList
          data={getData.data && getData.data.results || []}
          showsVerticalScrollIndicator={false}
          renderItem={({item})=>{
             return   <FilterCards item={item}/>
          }}
          />
        )
      }
      else{
        const filteredItems = getData.data?.results.filter(
          item => (item.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) || item.title?.toLowerCase()?.includes(searchTerm.toLowerCase()))
      
        )
        return(
          <FlatList
          data={filteredItems}
          showsVerticalScrollIndicator={false}
          renderItem={({item})=>{
             return   <FilterCards item={item}/>
          }}
          />
       
        )
      }
    }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.AppWhite }}>
      <View style={{ flex: 1, width: width90Percent, alignSelf: 'center', paddingTop: '5%' }}>
       
        <View style={{ width: scale(210), alignSelf: 'center',  }}>
           <BackButtonHeader title={titleScreen}/>
          <Text style={{ textAlign: 'center', fontSize: moderateScale(15), color: AppColors.AppBlack, textTransform: 'capitalize',marginVertical:15 }}>well help u to find wonderfull movies</Text>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: 'rgba(172, 167, 166,0.4)', overflow: 'hidden', justifyContent: 'center', alignItems: 'center', borderRadius: scale(20) }}>
          <FontAwesome name={'search'} size={scale(20)} color={AppColors.AppBlack} />
          <TextInput
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
            style={{ width: '80%', marginLeft: 10 }}
          />
        </View>
          {renderFilteredItems()}
      
       
       
      </View>

    </SafeAreaView>

  )
}

export default Search