
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, ScrollView, Platform, } from 'react-native';
import { Fonts } from '../style';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
const App = ({ navigation }) => {

    return (
     
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Image style={styles.imageStyle} source={require('../../assets/splashSec.png')} width={20} height={20} />
                <View style={styles.Widthcontainer}>

                    <Text style={styles.heading}>Disfruta al máximo el mundo del fútbol cerca de ti</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.buttonText}>Inicia sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'white', }]} onPress={() => navigation.navigate('SignupScreen')} >
                        <Text style={[styles.buttonText, { color: 'black' }]}>Registrate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.linkText}  >
                        <Text style={styles.informationText}>¿Eres propietario de una cancha? <Text onPress={() => navigation.navigate('CourtLogin')} style={styles.TextLink}>Haz click aquí</Text> </Text>
                    </TouchableOpacity>

                </View>
            </View>
    )
};

const styles = StyleSheet.create({
    // safeAreaView:{
    //     flex: 1,
    //     backgroundColor: 'red',
    //     padding: Platform.OS === 'ios' ? hp('0%') : 0,
    //     height: Platform.OS === 'ios' ? '100%' : 'auto',
    //     marginTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
    // },
    imageStyle:{
        flex: 1,
    resizeMode: 'cover',
    height: hp('100%'), // 70% of height device screen
    width: wp('100%') ,

    },
    linkText: {
        backgroundColor: 'white'
    },
    TextLink: {
        fontSize: 13,
        lineHeight: 24,
        color: '#408639',
        fontWeight: '500',
        fontFamily: 'Satoshi-Medium'
    },
    informationText: {
        fontSize: 12,
        lineHeight: 24,
        color: '#61646B',
        textAlign: 'center',
        fontFamily: 'Satoshi-Medium'
    },
    Widthcontainer: {
        width: '100%',
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20
    },
    container: {
        flex: 1,
        height: hp('100%'), // 70% of height device screen
        width: wp('100%'),
        paddingBottom:10 
    },
    heading: {
        fontSize: 23,
        paddingBottom: 20,
        color: '#000',
        fontFamily: Fonts.SAMIBOLD,
        lineHeight: 36,
        paddingTop: 10
    },
    button: {
        backgroundColor: '#212121',
        padding: 15,
        marginTop: 15,
        borderRadius: 10,
       
        borderColor: '#212121',
        borderWidth: 0.5, // Set the border width
       fontFamily: 'Satoshi-Regular',

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Satoshi-Medium'
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 0,
    },
    backIcon: {
        width: '100%',
        height: 30,
        marginLeft: 10
    },
});

export default App;
