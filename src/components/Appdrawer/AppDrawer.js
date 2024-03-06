import { Divider } from "react-native-paper";


import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from "react";
import AppColors from "../../assets/colors/AppColors";

const Drawer = createDrawerNavigator();
const { width, height, fontScale, scale } = Dimensions.get("window");
console.log(width, height, fontScale, scale);
const isMobile = width < 600;  // Adjust the threshold as needed




const screens = [
    { name: 'Dashboard', 
    // component: AppBottomTab, 
    icon: 'home-outline' },

];
const otherScreens = [
    // { name: 'Instruction', component: Instruction },
    // { name: 'About', component: About },
    // { name: 'ContactUs', component: ContactUs },
    // { name: 'RateUs', component: RateUs },
]
const AppDrawer = () => {

    let labelFontSize=wp(4);
    let labelColor=AppColors.boldGray;
    let iconsColor=AppColors.lineColor;
    let iconsize=wp(5)
    return (
        <Drawer.Navigator dcreenOptions={{
            headerShown: true,
        }}

            // drawerContent={(props) => {
            //     return (
            //         <DrawerContentScrollView>
            //             <View style={{ height: hp(25), backgroundColor: AppColors.AppWhite, width: 'auto', justifyContent: 'center', alignItems: 'center' }}>
            //                 {/* <Image source={require('../../assets/logos/logo2.png')} style={{ width: hp(8), height: hp(8),display:'flex', borderRadius: hp(5) }} /> */}
            //                 <Text style={{ color: AppColors.gray,fontWeight:'bold',display:'flex' }}>Markeet</Text>
            //                 {/* <DrawerDivider style={{marginTop:5}}/> */}
            //             </View>
            //             <DrawerItemList {...props} />
            //         </DrawerContentScrollView>
            //     )

            // }}

        >
            {screens.map((screen) => {
                return <Drawer.Screen

                    key={screen.name}
                    name={screen.name}
                    // component={screen.component}
                    options={{
                        drawerIcon: () => (
                            <MaterialCommunityIcons name={screen.icon} color={iconsColor} size={iconsize} />
                        ),
                        drawerActiveBackgroundColor:AppColors.transparent,
                        drawerLabelStyle: {
                            fontSize: labelFontSize,
                            color: labelColor,
                            marginLeft: -10
                        },
                    }}
                />
            })}
{/* 
            {otherScreens.map((screen) => {
                return <Drawer.Screen
                    options={{
                        drawerLabelStyle: {
                            fontSize: labelFontSize,
                            marginLeft: 0, marginTop: -5,
                            color: labelColor,
                        },
                        drawerActiveBackgroundColor:AppColors.transparent,
                        
                    }}
                    key={screen.name}
                    name={screen.name}
                    component={screen.component} />
            })} */}

        </Drawer.Navigator>
    )
}

export default AppDrawer;