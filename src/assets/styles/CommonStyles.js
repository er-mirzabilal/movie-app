import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import AppColors from "../colors/AppColors";

const CommonStyles = StyleSheet.create({
    imgView: {
        width: scale(90), height: verticalScale(120),overflow: 'hidden', borderRadius: 10, 
            marginRight: scale(15),
        
    },
    fullheightWhidth:{ width: '100%', height: '100%' ,borderRadius: 10, },
    mediumText:{
         color: AppColors
         .AppBlack, fontSize: moderateScale(20), textTransform: 'capitalize',marginVertical:scale(10) 
    },
    mainView:{ flex: 1, alignSelf: 'center', paddingTop: '5%' },
    listCompo:{ width: scale(80), height: scale(90),marginLeft:10, marginRight: scale(5), borderRadius: scale(6), overflow: 'hidden' },
    movieShots:{ width: scale(120), height: scale(80), backgroundColor: 'red', marginRight: scale(5), borderRadius: scale(6), overflow: 'hidden' },
    listContainer: {
        flexGrow: 1,
        // backgroundColor: 'red'
    },
    item:{
        marginRight: scale(15),
    },
    animatedViewStyles: { backgroundColor: AppColors.AppWhite, marginTop: 10, borderTopLeftRadius: scale(25), borderTopRightRadius: scale(25), alignSelf: 'center', }
})
export default CommonStyles;