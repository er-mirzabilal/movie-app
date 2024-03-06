import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Image } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CommonStyles from '../../assets/styles/CommonStyles';
import { getImageUrl } from '../url';
import AppColors from '../../assets/colors/AppColors';
import * as Animatable from 'react-native-animatable';

const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

const ProductListing = ({ title, selectorName }) => {
    const navigation = useNavigation();
    const getData = useSelector(state => state[selectorName]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (getData.data) {
            setIsLoading(false);
        }
    }, [getData.data]);

   


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Text animation="zoomInUp" style={styles.title}>
                    {title}
                </Animatable.Text>
                <AnimatedButton animation="zoomIn" duration={1000} easing={'ease-out'} onPress={() => navigation.navigate('MoreVideos', { title, selectorName })}>
                    <Animatable.Text animation="zoomInUp" style={styles.moreText}>
                        More
                    </Animatable.Text>
                </AnimatedButton>
            </View>
            {isLoading ?
            <View style={styles.skeletonContainer}>
            </View> : (
                <FlatList
                    bounces={false}
                    scrollEventThrottle={16}
                    contentContainerStyle={[CommonStyles.listContainer]}
                    data={getData.data?.results || []}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({ item, index }) => {
                        const posterPath = item.poster_path;
                        const imageUrl = getImageUrl(posterPath);
                        return (
                            <AnimatedButton
                                duration={1000}
                                easing={'ease-in'}
                                animation="zoomIn"
                                onPress={() => navigation.navigate('ProductDetailPage', { itemId: item.id })}
                                style={[CommonStyles.imgView, styles.item]}
                            >
                                <Image
                                    source={imageUrl}
                                    style={[CommonStyles.fullheightWhidth]}
                                />
                            </AnimatedButton>
                        );
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: scale(10),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginVertical: scale(10),
    },
    title: {
        color: AppColors.AppBlack,
        fontSize: moderateScale(18),
        textTransform: 'capitalize',
    },
    moreText: {
        color: AppColors.AppOrange,
        fontSize: moderateScale(14),
        textTransform: 'capitalize',
    },
    listContainer: {
        flexGrow: 1,
    },
    item: {
        marginRight: scale(15),
    },
    skeletonContainer: {
        // Style for the skeleton loading container
        // backgroundColor:
    },
});

export default ProductListing;
