import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import ImageEdit from './ImageEdit'
import Checking from '../../components/inputFeildCustom'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fonts } from '../style';
import LevelProgressBar from '../../components/EditProfileLine'
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getProfile';
const Setting = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState('');
  const [position, setposition] = useState('');
  const [name, setName] = useState('');
  const [foot, setfoot] = useState('');
  const [jerseyNo, setjerseyNo] = useState('')
  const [country, setcountry] = useState('')
  useEffect(() => {
    const fetchDataAndStore = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        if (token) {
          const response = await fetch(API_URL, {
            headers: {
              Authorization: `Bearer ${token}`,
              // Add other headers as needed
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Fetched User Data:', data);

            // Store the user data in component state
            setUserData(data.data);

            // Set values in input fields
            setfoot(data.data.foot)
            setEmail(data.data.email);
            setposition(data.data.position);
            setName(data.data.name);
            setjerseyNo(data.data.jerseyNo)
            setcountry(data.data.country)
          } else {
            console.error('Error fetching user data:', response.statusText);
          }
        } else {
          console.error('Token not available');
        }
      } catch (error) {
        console.error('Error fetching and storing user data:', error);
      }
    };

    // Call the function when the component mounts
    fetchDataAndStore();
  }, []);
  const [inputText, setInputText] = useState('');
  const handleInputChange = (text) => {
    // Capitalize the first letter of the input
    const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
    setInputValue(capitalizedText);
  };

  return (

    <ScrollView backgroundColor={'white'}>
      <View style={styles.MainContainer}>
        
          {/* <StatusBar backgroundColor={'white'} barStyle="dark-content" /> */}

          <View style={styles.ShoeContainer}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <View style={styles.ShoeCon}>
                  <ImageEdit title="Editar foto" />
                </View>
              </TouchableOpacity>
              <View style={styles.ShoeConText} >
                <Text style={styles.textPoints} >{name} </Text>
                <Text style={styles.paragraph} >{email}</Text>
                {/* <LevelProgressBar/> */}
                {/* <Text style={styles.paragraph} >Nivel  3.5 </Text> */}
              </View>

          </View>
          <View style={styles.rowtopFeild}>
                <View style={{width:'33.33%',paddingRight:7}}>
                <Checking focus={false} labelName='Rango global' value={jerseyNo} onChangeText={(text) => handleInputChange('name', text)} />
                </View>
                
                <View style={{width:'33.33%',paddingRight:7}}>
                <Checking focus={false} labelName='Puntos' value={jerseyNo} onChangeText={(text) => handleInputChange('name', text)} />
                </View>
                <View style={{width:'33.33%'}}>
                <Checking focus={false} labelName='Partidos jugados' value={jerseyNo} onChangeText={(text) => handleInputChange('name', text)} />
                </View>
              </View>
            <View style={styles.secondDivTitle}>
             
              <Text style={styles.textPoints} >Estadísticas </Text>
            </View>


            <View style={styles.InputButtonsFeild}>
              <Checking focus={false} labelName='Pie' value={foot} onChangeText={(text) => handleInputChange('name', text)} />
              <Checking focus={false} labelName='Posición' value={position} onChangeText={(text) => setInputText(text)} />
              <Checking focus={false} labelName='Número De Playera' value={jerseyNo} onChangeText={(text) => setInputText(text)} />
              {/* <Checking focus={false} labelName='Nacionalidad' value={country} onChangeText={(text) => setInputText(text)} />
              <Checking focus={false}labelName='Equipo' value={inputText} onChangeText={(text) => setInputText(text)} />
              <Checking focus={false} labelName='Racha de partidos' value={inputText} onChangeText={(text) => setInputText(text)} /> */}


            </View>
          </View>

        </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  rowtopFeild:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondDivTitle: {
    paddingHorizontal: 5,
    paddingTop:10,
  },
  containerButton: {// Arrange points and text horizontally
    alignItems: 'center', // Center content vertically
    justifyContent: 'space-between',
    position: 'relative',
    flexDirection: 'row',
    gap: 10
  },
  mainContent: {
    textAlign: 'center',
    justifyContent: 'center',
    //  width:150,
  },
  ShoeConText: {
    paddingTop: 10
  },


  row: {
    flexDirection: 'row', // Arrange points and text horizontally
    alignItems: 'top', // Center content vertically
    gap: 20,

  },
  textPoints: {
    fontSize: 22,
    lineHeight: 24,
    color: '#000',
    marginTop: 10,
    fontFamily: Fonts.BOLD


  },
  ShoeCon: {
    textAlign: 'center',
    justifyContent: 'center',
    // width:85
  },
  ShoeContainer: {
    marginTop: 5,
  },
  MainContainer: {

    backgroundColor: 'white',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15

  },
  buttonContainer: {
    marginTop: 30
  },
  paragraph: {
    fontSize: 16,
    color: '#61646B',
    letterSpacing: 0.1,
    fontFamily: Fonts.REGULAR
  },




})


export default Setting
