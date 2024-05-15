
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Image, StatusBar, Alert, KeyboardAvoidingView, Button } from 'react-native';
import NewIcons from 'react-native-vector-icons/Fontisto'
import axios from 'axios';
import PhoneInput from "react-native-phone-number-input";
import { Fonts } from '../style';
import CustomInputFeild from '../../components/inputFeildCustom'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Buttons from '../../components/Button';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getProfile';
const API_URL_POST = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/editProfile';
const pickerSelectStyles = StyleSheet.create({

  inputAndroid: {
    marginTop: 12,
    paddingLeft: 12,
    padding: 16,
    paddingRight: 40,
    fontSize: 14,
    lineHeight: 20,
    width: 345,
    borderRadius: 12,
    borderWidth: 0.25,
    borderColor: 'rgba(0, 0, 0, 0.25)',
   
    color: '#212121',
    fontFamily: 'Satoshi-Medium',
    backgroundColor: 'rgba(64, 134, 57, 0.05)'
  },
});
const Sigup = ({ navigation }) => {

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    _id: '',
    email: '',
    username: '',
    country: '',
    foot: '',
    position: '',
    jerseyNo: '',
    name: '',
    dob: '',
    team: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.status) {
        setUserData(response.data.data || {});
        console.log(JSON.stringify(response.data.data))
      } else {
        Alert.alert('Failed to fetch user data');
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error.response));
    }
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(API_URL_POST, userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.status && response.data.data === 'updated') {
        alert('Profile updated successfully');
        fetchUserData();
      } else {
        Alert.alert('Failed to update profile');
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error.response));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key, value) => {
    setUserData({
      ...userData,
      [key]: value
    });
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  // const [LeftFoot, setLeftFoot] = useState(userData.selectedText)
  const handlePhoneInputChange = (text) => {
    setLeftFoot(text);
  };

  return (

    <ScrollView style={styles.form} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>



      <View style={[styles.inputContainer, { paddingTop: 0 }]}>
        <CustomInputFeild focus={true} labelName='Nombre' value={userData.name} onChangeText={(text) => handleInputChange('name', text)} />
        <CustomInputFeild focus={false} labelName='Nombre de usuario' value={userData.username}
          onChangeText={(text) => handleInputChange('username', text)} />
      </View>
      <View style={styles.inputContainer}>
        <CustomInputFeild focus={true} labelName='Fecha de nacimiento' value={userData.dob}
          onChangeText={(text) => handleInputChange('dob', text)} />

        <NewIcons name='date' style={styles.eyeIcon} size={17} />
        <CustomInputFeild focus={false} labelName='Email' value={userData.email}
          onChangeText={(text) => handleInputChange('email', text)} />
      </View>
      <View style={styles.inputContainer}>
        <CustomInputFeild focus={true} labelName='Equipo' value={userData.country}
          onChangeText={(text) => handleInputChange('country', text)} />
        <CustomInputFeild maxLength={2} focus={true} labelName='Número de dorsal' value={userData.jerseyNo}
          onChangeText={(text) => handleInputChange('jerseyNo', text)} />

        <CustomInputFeild focus={true} labelName='Posición' value={userData.position}
          onChangeText={(text) => handleInputChange('position', text)} />
        <CustomInputFeild focus={true} labelName='Pie dominante' value={userData.foot}
          onChangeText={(text) => handleInputChange('foot', text)} />
          <View style={{marginTop:10}}>
          <Buttons loading={loading} text='Actualizar' Link={handleProfileUpdate} />
          </View>
          
      </View>
     
    </ScrollView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


  form: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
    paddingTop: 0,
    paddingBottom: 40,
  },

  paragraphs: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#61646B',
    letterSpacing: 1,
    fontFamily: Fonts.MEDIUM
  },
  inputContainer: {
    position: 'relative',
    marginLeft: 22,
    marginRight: 30,

  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    padding: 16,
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 30,
    top: 30,
    color: '#408639'
  },

  eyeText: {
    fontSize: 20,
  }, phoneInputContainer: {
    width: '100%',
    fontSize: 14,
    // width: 345,
    borderRadius: 12,
    borderWidth: 0.25,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    shadowRadius: 2,
    color: '#212121',
    backgroundColor: 'rgba(64, 134, 57, 0.05)', opacity: 1,
    fontFamily: Fonts.MEDIUM
  },
  phoneInputTextContainer: {
    marginLeft: -10,
    padding: 0,
    margin: 0,
    fontSize: 14,
    borderRadius: 12,
    color: '#212121',
    backgroundColor: 'transparent',
    opacity: 1,
    fontFamily: Fonts.MEDIUM,

  },
  phoneInputText: {
    fontSize: 14,
    color: '#212121',
    fontFamily: Fonts.MEDIUM,

  },
  phoneInputCodeText: {
    fontSize: 14,
    color: '#212121',
  },
  phoneInputFlagButton: {
    borderWidth: 0,

  },

});

export default Sigup;
