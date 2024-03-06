import 'react-native-gesture-handler';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale, scale } from 'react-native-size-matters';

import { heightPercentageToDP } from 'react-native-responsive-screen';
import AppColors from './src/assets/colors/AppColors';
import Dashboard from './src/screens/InitialScreens/Dashboard';
import Search from './src/screens/Search/Search';
import TVShows from './src/screens/InitialScreens/TVShows';
import store from './src/app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import More from './src/screens/MoreVideos/MoreVideos';
import MoreVideos from './src/screens/MoreVideos/MoreVideos';
import ProductDetailPage from './src/screens/ProductDetailPage/ProductDetailPage';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerScreens = (props) => {
  return (
    <Drawer.Navigator initialRouteName="Home" 
    screenOptions={{ 
      headerShown: false, 
      drawerType: 'back',//drawer khulny ka tarika
      drawerActiveBackgroundColor:AppColors.AppBlack,//jos screen khuli usko heighlight kr rha
      drawerActiveTintColor:AppColors.AppWhite,//yh screen jo khuli usky name ka color chnage kr rha
 
      }}
      drawerContent={props=>{
        return(
          <DrawerContentScrollView showsVerticalScrollIndicator={false}>
             <View style={{ flex: 1, }}>
              {/* <View style={{height:heightPercentageToDP(20),width:'auto',justifyContent:'center',alignItems:'center',marginTop:'30%'}}>
              <Image source={{uri:'https://images.unsplash.com/photo-1519581706005-e1b7e2de264c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D'}} style={{height:'35%',width:'20%',borderRadius:scale(25)}}/>
              <Text style={{ fontSize: moderateScale(15),color:AppColors.AppBlack,textAlign:'center'}}>Reel</Text>
              
              </View> */}

    <View style={{ justifyContent: 'center', alignItems: 'center',borderColor:AppColors.lineColor,borderTopWidth:.5,borderBottomWidth:.5,marginHorizontal:20,marginTop:'20%'}}>
    <TouchableOpacity onPress={()=>{
      props.navigation.navigate(Dashboard,{title:'Movies'})
    }} style={{alignItems:'center',flexDirection:'row',height:scale(40),borderRadius:5,width:'70%',marginVertical:20}}>
    <AntDesign name={'home'} size={scale(20)} color={AppColors.boldGray} style={{width:'30%'}} />
      <Text style={{ fontSize: moderateScale(15),color:AppColors.AppBlack,}}>Dashboard</Text>
      </TouchableOpacity>

      
    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center',borderColor:AppColors.lineColor,borderTopWidth:.5,borderBottomWidth:.5,marginHorizontal:20}}>
    <TouchableOpacity onPress={()=>{
      props.navigation.navigate(TVShows,{title:'TVShows'})
    }} style={{alignItems:'center',flexDirection:'row',height:scale(40),borderRadius:5,width:'70%',marginVertical:20}}>
    <AntDesign name={'home'} size={scale(20)} color={AppColors.boldGray} style={{width:'30%'}} />
      <Text style={{ fontSize: moderateScale(15),color:AppColors.AppBlack,}}>Tv Screens</Text>
      </TouchableOpacity>
    </View>   
    
              </View>
          </DrawerContentScrollView>
        )
        }}
        >
      <Drawer.Screen name="Dashboard" component={Dashboard} initialParams={{ title: 'Movies'}}  />
      <Drawer.Screen name="TVShows" component={TVShows} initialParams={{ title: 'TV Shows'}}  />
      
       
    </Drawer.Navigator>
  );
}
let persistor= persistStore(store);

const App = () => {
  return (
  <Provider store={store}>
    
      <PersistGate persistor={persistor} loading={null}>
    <NavigationContainer>
      <StatusBar backgroundColor={AppColors.AppWhite} barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='DrawerScreens'>
        <Stack.Screen name="DrawerScreens" component={DrawerScreens} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="MoreVideos" component={MoreVideos} />
        <Stack.Screen name="ProductDetailPage" component={ProductDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
    </PersistGate>
    </Provider>
 
  )
}

export default App