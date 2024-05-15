import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Image, StatusBar, StyleSheet, View ,ImageBackground} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'; // Import the useFocusEffect hook

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            handleTokenConform()
        }, 3000)
    }, [])
    const handleTokenConform= async () => {
        const dataToken = await AsyncStorage.getItem('accessToken')
        const courtToken = await AsyncStorage.getItem('accessTokenCourt')
        // const Userdata = await AsyncStorage.getItem('user')
        if(courtToken){
            navigation.replace('CourtDashboard')
        }
        else if (dataToken){
            navigation.replace('Dashboard')
        }
        else {
            navigation.replace('Home')
        }
    }

    return (
  
        
       
        <ImageBackground
            source={require('../../assets/SplashBackground.png')}
            style={styles.backgroundImage}
        > 
             <StatusBar barStyle="light-content" />
            {/* <StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'}  /> */}
            <View style={styles.container}>
                {/* <StatusBar backgroundColor={'#408639'} /> */}
                <Image style={styles.logo} source={require('../../assets/launch_screen.png')} />
            </View>
        </ImageBackground>
       
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 500,
        height: 400,
        objectFit: 'cover'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});
