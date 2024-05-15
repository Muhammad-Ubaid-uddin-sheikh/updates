import React from 'react'
import ColoredLine from '../../components/LineComponet';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { useState } from 'react';
import { Fonts } from '../style';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import Button from '../../components/Button';
const API_URL_POST = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/createProfile'
import {  useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const CustomizeProfilePrefferd = ({ navigation }) => {
   ;
    const userData = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [jerseyNumber, setJerseyNumber] = useState('0'); // Start with '00' as a string
    
    let payload = {
        foot:userData.selectedItem,
        position:userData.selectedText,
        jerseyNo:jerseyNumber,
        country:userData.selectedCountry.name.common,
    }
    
    const [responseData, setResponseData] = useState(null);

    const handleButtonClick = async () => {  
            try {
                if (jerseyNumber === '0') {
                    Alert.alert('Please fill select the Número de dorsal');
                }  
                else{
                     setLoading(true);
                  setTimeout(() => {
                      
                    setLoading(false);
                  }, 200);
                const accessToken = await AsyncStorage.getItem('accessToken'); // Replace with your actual access token
              const apiUrl = API_URL_POST; // Replace with your actual API endpoint
             
            //  console.log(payload,accessToken)
              const response = await axios.post(apiUrl, payload, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },
              });
              setResponseData(response.data);
              console.log('Data posted successfully:', response.data);
              navigation.navigate('Dashboard');
            }
                   
            } catch (error) {
              console.error('Error posting data:', error);
            }
            }
    
        
      

    const handleIncrement = () => {
        const incrementedNumber = parseInt(jerseyNumber, 10) + 1;
        setJerseyNumber(incrementedNumber <= 99 ? `${incrementedNumber}` : jerseyNumber);
    };

    const handleDecrement = () => {
        const decrementedNumber = parseInt(jerseyNumber, 10) - 1;
        setJerseyNumber(decrementedNumber >= 0 ? `${decrementedNumber}` : jerseyNumber);
    };

    return (
       
            <View style={styles.container}>
                {/* <StatusBar backgroundColor={'white'}  barStyle="dark-content"/> */}

                <View style={styles.MainContainer}>
                    <ColoredLine flex={0} />
                    <Text style={styles.MainHeading} >¿Cuál es el número que utilizas?
                    </Text>
                    <View style={styles.ShoeCon}>

                        <View style={styles.jerseyNumberContainer}>
                            <Text style={styles.jerseyNumberText}>{jerseyNumber < 10 ? `0${jerseyNumber}` : jerseyNumber}</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Número de dorsal"
                                keyboardType="numeric"
                                placeholderTextColor="rgba(33, 33, 33, 0.60)"
                                letterSpacing={0.6}
                                maxLength={2}
                                value={jerseyNumber}
                                onChangeText={(text) => setJerseyNumber(text)}
                            />
                            <TouchableOpacity onPress={handleIncrement}>
                                <Icons name='keyboard-arrow-up' style={styles.arrowTop} size={28} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDecrement}>
                                <Icons name='keyboard-arrow-down' style={styles.arrowDown} size={28} />
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
                <View style={styles.nextButton}>
                    <Button loading={loading} text='Terminar' Link={handleButtonClick} />
                </View>

            </View>


    )
}

const styles = StyleSheet.create({
    arrowTop: {
        position: 'absolute',
        right: 15,
        color: 'rgba(120, 187, 113, 1)',
  
        top: Platform.OS === 'ios' ? -50 : -53,
    },
    arrowDown: {
        position: 'absolute',
        right: 15,
        color: 'rgba(120, 187, 113, 1)',
        top: Platform.OS === 'ios' ? -30 : -37,
    },
    inputContainer: {
        position: 'absolute',
        // marginBottom: 8,
        width: 320,
        marginLeft: 22,
        marginRight: 30,
        top:'90%'
    },
    input: {
        marginTop: 12,
        paddingLeft: 12,
        padding: 16,
        paddingRight: 40,
        fontSize: 14,
        lineHeight: 20,
        width: '100%',
        borderRadius: 12,
        borderWidth: 0.25,
        borderColor: 'rgba(0, 0, 0, 0.25)',
        color: '#212121',
        fontFamily: 'Satoshi-Medium',
        backgroundColor: 'rgba(64, 134, 57, 0.05)'
    },
    jerseyNumberContainer: {
        // marginTop: 80,
        // marginTop:-40,   
        // marginBottom: 80,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: ' rgba(64, 134, 57, 0.05)',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#408639',
        paddingLeft: 30,
        paddingRight: 30,
        position:'absolute',
       top:'10%',
       width:300,
       height:260

    },
    jerseyNumberText: {
        fontSize: 160,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#78BB71',
        textShadowColor: '#212121',
        textShadowOffset: { width: 3, height: 5 },
        textShadowRadius: 0.5,

    },
    inputField: {
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        marginBottom: 10,
    },
    arrowButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    nextButton: {
        
        marginTop: 70,
        marginBottom:20,
        width:'100%',
        paddingHorizontal:20
    },
    ShoeCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal:20

    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        // marginTop: 30,
        width: 'auto',
        paddingLeft: 5,
        paddingRight: 5
        
    },
    MainHeading: {
        fontSize: 28,
        color: 'black',
        textAlign: 'center',
        fontFamily: Fonts.BOLD,
        width: 330,
        // lineHeight: 36,
        marginTop: Platform.OS === 'ios' ? 10 : 20,
    },
    ImageContainer: {
        marginTop: 0
    },
    selectedNumber: {
        fontSize: 150,
        fontWeight: 'bold',
        color: '#666'
    },
    inputField: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        color: '#666'
    },
    warningText: {
        color: 'red',
    },
});

export default CustomizeProfilePrefferd