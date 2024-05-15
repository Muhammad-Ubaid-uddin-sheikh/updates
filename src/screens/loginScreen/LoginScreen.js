import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert, Platform, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Button from '../../components/Button';
import { Fonts } from '../style';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/logIn';
const App = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [Feildpassword, setFeildpassword] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [deviceID,setdeviceId] = useState(null)
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
    const getToken = async()=>{
      const token = await messaging().getToken()
      console.log('token notification',token)
      setdeviceId(token)
      
    }
    useEffect(()=>{
      requestUserPermission()
      getToken()
    },[])
  let payload = {
    identifier: email,
    password: Feildpassword,
    deviceId:deviceID
  }
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    setIsLoggingOut(true);
    try {
     
      const response = await axios.post(API_URL, {
        ...payload
      });

      if (response.data.status) {
        const { accessToken, user } = response.data.data;
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('Token', accessToken);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.navigate('Dashboard');

      }

    } catch (error) {
      console.log(JSON.stringify(error.response));  

    }finally{
      setIsLoggingOut(false);
          setLoading(false);
      
      }
  };

  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  return (

    <View style={styles.form}>
      {/* <StatusBar barStyle="dark-content" /> */}
      <View>
        <Text style={styles.heading}>Iniciar sesión como jugador</Text>
        {/* <Text style={styles.headingSub}>Court Owner </Text> */}
        <Text style={styles.paragraphs}>
          Reserva canchas, encuentra partidos, conéctate con la comunidad y más.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username / email"
            keyboardType="email-address"
            placeholderTextColor="rgba(33, 33, 33, 0.60)"
            letterSpacing={0.2}
            onChangeText={(text) => setemail(text)}
          />

        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="rgba(33, 33, 33, 0.60)"
            secureTextEntry={!isPasswordVisible}
            // value={password}
            letterSpacing={0.2}
            value={Feildpassword}
            onChangeText={(text) => setFeildpassword(text)}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <Text style={styles.eyeText}>{isPasswordVisible ? <Icon name="eye" style={styles.eyeIcon} size={17} /> : <Icon name="eye-slash" style={styles.eyeIcon} size={17} />}</Text>
          </TouchableOpacity>
        </View>

        <Button loading={loading} text='Inicia sesión' Link={handleLogin} />
        <Spinner
        visible={isLoggingOut}
        textContent={'Relojándose...'}
        textStyle={styles.loaderText}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.7)"
        color="white" 
      />
      </View>
      <Text style={styles.informationText}>¿Olvidaste tu contraseña?</Text>
      <View style={styles.SinupText}>
        <TouchableOpacity style={styles.linkText}>
          <Text style={styles.informationText}> ¿No tienes una cuenta? <Text style={styles.TextLink} onPress={() => navigation.navigate('SignupScreen')} >Regístrate hoy!</Text> </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  TextLink: {
    fontSize: 13,
    lineHeight: 24,
    color: '#408639',
    fontWeight: '600',
    fontFamily: 'Satoshi-Medium',
    letterSpacing: 0.4
  },
  SinupText: {
    position: 'absolute',
    bottom: 25,
    fontFamily: 'Satoshi-Medium',
    textAlign: 'center',
    justifyContent: 'center',

  },
  image: {
    width: 20,
    height: 25,
    objectFit: 'contain'
  },
  form: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
    paddingTop: 15,
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center'


  },
  heading: {
    fontSize: 28,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
    fontFamily: Fonts.SAMIBOLD,
  },
  paragraphs: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 15,
    color: '#61646B',
    letterSpacing: 0.3,

    lineHeight: 25,
    marginTop: 6,
    fontFamily: 'Satoshi-Medium'
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 8,


  },
  input: {

    marginTop: 12,
    paddingLeft: 12,
    padding: 16,
    fontSize: 14,
    lineHeight: 20,
    borderRadius: 8,
    borderWidth: 0.25,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    color: '#212121',
    fontFamily: 'Satoshi-Medium',
    backgroundColor: 'rgba(64, 134, 57, 0.05)'
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
    right: 15,
    top: Platform.OS === 'ios' ? 30 : 35,
    color: 'rgba(64, 134, 57, 1)'
  },
  eyeText: {
    fontSize: 20,
  },
  informationText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#61646B',
    textAlign: 'center',
    letterSpacing: 0.9,
    marginTop: 15,
    fontFamily: 'Satoshi-Medium',
    justifyContent: 'center',


  },

});

export default App;
