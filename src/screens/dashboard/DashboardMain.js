import React,{useEffect, useRef, useState} from 'react';
import { Text, View, StatusBar, StyleSheet, Image, ScrollView,PermissionsAndroid, TouchableOpacity, Platform, BackHandler, Alert} from 'react-native'
import { Fonts } from '../style';
import Button from '../../components/Button';
import VerticalSlider from './VerticalSlides';
import CheckPlayer from '../../components/CustomButton'
import ButtonEditDashboard from '../../components/ButtonEditDashboard'
import { useSelector } from 'react-redux';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useFocusEffect } from '@react-navigation/native';
const Dashboard = ({navigation}) => {
   
    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          if (granted === 'authorized') {
            console.log('Location permission granted');
          } 
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              {
                title: 'Location Permission',
                message: 'This app needs access to your location',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Location permission granted');
            } else {
              console.log('Location permission denied');
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };
      useEffect(()=>{
        requestLocationPermission();
      })
    const userData = useSelector(state => state.user);
    const handlePrefrences = () => {
        navigation.navigate('CustomizeProfile');
    }
    
    const handleLocationSelect = (data, details) => {
        const { location } = details.geometry;
        console.log('Latitude:', location.lat);
        console.log('Longitude:', location.lng);
      };
      useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            Alert.alert(
              'Exit App',
              'Are you sure you want to exit?',
              [
                { text: 'Cancel', onPress: () => null, style: 'cancel' },
                { text: 'OK', onPress: () => BackHandler.exitApp() },
              ],
              { cancelable: false }
            );
            return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
      );
  return (
    
    // <View style={styles.MainContainer}>
    <>
 
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  backgroundColor={'white'} >
        <View style={styles.rowContainer}>
        {/* <StatusBar backgroundColor={'white'}  barStyle="dark-content" /> */}
       
     <View style={styles.ShoeContainer}>
     <Text style={styles.mainparagraph}> ¿Qué te gustaría hacer hoy?</Text>
    
                    <View style={styles.row}>
                        
                        <View style={styles.ShoeCon}>
                        <TouchableOpacity onPress={()=> navigation.navigate('ReservaFeild')}>
                            <View style={styles.imageContainerBorder}>
                               
                            <Image source={require('../../assets/reserveFeild.jpg')} style={{ width: 150, height: 130,objectFit:'contain',marginTop:5  }} />
                            
                            </View>
                            </TouchableOpacity>
                            <Text style={styles.textPoints} >
                              
                                Reserva una cancha</Text>
                        </View>
                        <View style={styles.ShoeCon}>
                        <TouchableOpacity onPress={()=> navigation.navigate('EncuentraFeild')}>
                        <View style={styles.imageContainerBorder}>
                            <Image source={require('../../assets/findMatch.jpg')} style={{ width: 150, height: 130,objectFit:'contain',marginBottom:5 }} /></View>
                            <Text style={styles.textPoints} >Encuentra un partido</Text>
                            </TouchableOpacity>
                        </View>
                     
                    </View>

                </View>
                <Text style={styles.paragraphsHeading}>
                Partidos ocurriendo cerca de ti
                  {/* {userData.selectedCountry.name.common} */}
     </Text>
     </View>
     <View ><VerticalSlider/></View>
<View style={styles.buttonContainer}>
    <ButtonEditDashboard Link={handlePrefrences} TextButton="Ajusta tus preferencias" FontName="football-outline"/>
    {/* <CheckPlayer NameFont="signal-cellular-outline" TextButton="Consultar la tabla de clasificación de jugadores" />
    <CheckPlayer NameFont="signal-cellular-outline" TextButton="Check Team Leaderboard" /> */}
    <CheckPlayer NameFont="wallet" TextButton="Reservas de cancha activas" Link={()=> navigation.navigate('PlayerBookingPage')} />
    
    </View>

   
     
                </ScrollView>
 
             </>
                /* <View style={styles.nextButton}>
                    <Button  text="Comenzar un partido" Link={handleNavigate} />
                </View> */
    // </View>
  
  )
}
const styles = StyleSheet.create({
   
    scrollcontainer:{
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight:5
    },

    row: {
        flexDirection: 'row', // Arrange points and text horizontally
        alignItems: 'center', // Center content vertically
        justifyContent:'space-between'
    },
    imageContainerBorder:{
        borderWidth:1,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:18,
        borderColor:'rgba(0, 0, 0, 0.25)',
    //    marginLeft:5,
    //    marginRight:8,
       padding:5
        
    },
    textPoints: {
        fontSize: 15,
        lineHeight: 24,
        color: '#000',
        marginTop: 10,
        fontFamily: Fonts.BOLD,
        marginLeft:2
    },
    ShoeCon: {
        textAlign: 'center',
        justifyContent: 'center',
             paddingLeft:12,
    paddingRight:12,
        
    },
    mainparagraph:{
fontFamily:Fonts.MEDIUM,
fontSize:18,
color:'black',
paddingLeft:12,
paddingBottom:10,
marginTop:0
    },
    ShoeContainer: {
        // marginTop: 20,
            },
    MainContainer:{
        backgroundColor:'white',
        // flexGrow: 1,
   height:"100%"

       
    },
    buttonContainer:{
        
        marginTop: Platform.OS === 'ios' ? 10 : 30,
        paddingLeft: 10,
        paddingRight:10,
       margin:0,
       padding:0
    },
    paragraphs: {
        fontSize:18,
        color:'black',
        letterSpacing:0.1,
    //   width:'auto',
      lineHeight: 36,
      fontFamily:Fonts.MEDIUM,
      paddingLeft:15,
      paddingRight:10
      },
      nextButton: {
        // position: 'absolute',
        // bottom: -20,
        marginBottom:20,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'white'
    },
    paragraphsHeading:{
        fontSize:20,
        color:'black',
        letterSpacing:0.3,
      lineHeight: 36,
      fontFamily:Fonts.MEDIUM,
      paddingLeft:15,
      paddingRight:10,
      marginTop:20,
    }
})

export default Dashboard