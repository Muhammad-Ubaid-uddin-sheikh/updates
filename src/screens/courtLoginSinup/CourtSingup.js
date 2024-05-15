import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, StatusBar,Alert, Platform, Linking, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import NewIcons from 'react-native-vector-icons/Fontisto'
import Button from '../../components/Button';
import { Fonts } from '../style';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/signUp';
const NOTIFICATION = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/login';
const Sigup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [Username, setUsername] = useState('');
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [Feildpassword, setFeildpassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [user, setUser] = useState(null);
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
        username:Username,
        password:Feildpassword,
        email:email,
        dob:dateOfBirth,
        name:name,
        deviceId:deviceID
    
    }

    useEffect(() => {
        GoogleSignin.configure({
          webClientId: '912066360296-87vr5t8ts8iuvh2isleq2s96e496q666.apps.googleusercontent.com',
        });
      }, []);
    
      signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const {idToken,user} = await GoogleSignin.signIn();
          setUser(user);
          await sendUserDataToServer(user);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log('errpr')
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
           
          } else {
            console.log('noo')
            // some other error happened
          }
        }
      };
      console.log('user',user)
      const sendUserDataToServer = async (userData) => {
        try {
          // Send user data to your server using axios or fetch
          const response = await axios.post(NOTIFICATION,  {
                identifier:user?.email,
                password:"",
                type:"google",
                googleUser:{
                    id:user?.id,
                    dob:""
                }
            }
            );
          if (response.data.status) {
            const { accessToken, user } = response.data.data;
            await AsyncStorage.setItem('accessTokenCourt', accessToken);
            await AsyncStorage.setItem('Token', accessToken);
            await AsyncStorage.setItem('userCourt', JSON.stringify(user));
            console.log("Singin With google",response.data.data)
          navigation.navigate('CourtNameLoc');
        }
          console.log('Server Response:', response.data);
        } catch (error) {
          console.error('Error sending user data to server:', error);
        }
      };
    const handleDateChange = (text) => {
        // Assuming the input format is DDMMYYYY
        const formattedDate = text.replace(/[^0-9]/g, '');

        // Format the date string as DD/MM/YYYY
        let formattedDateString = '';
        for (let i = 0; i < formattedDate.length; i++) {
            if (i === 2 || i === 4) {
                formattedDateString += '/';
            }
            if (i === 6 && formattedDate.length >= 7) {
                formattedDateString += formattedDate.substring(6, 10); // Ensure year is four digits
                break;
            }
            formattedDateString += formattedDate[i];
        }

        setDateOfBirth(formattedDateString);

    };
    const [loading, setLoading] = useState(false);
    const handleNavigate = async () => {
        // setLoading(true);
        if (!name || !email || !Username || !Feildpassword || !dateOfBirth) {
                    Alert.alert('Incomplete Details', 'Please fill in all fields.');
                
                }
                
                else{
                    setLoading(true);
                    setIsLoggingOut(true);
        
        try {
            const response = await axios.post(API_URL, {
              ...payload
            });
            if (response.data.status) {
                const { accessToken, user } = response.data.data;
                await AsyncStorage.setItem('accessTokenCourt', accessToken);
                await AsyncStorage.setItem('Token', accessToken);
                await AsyncStorage.setItem('userCourt', JSON.stringify(user));
                console.log(response.data.data)
              navigation.navigate('CourtNameLoc');
            }
          } catch (error) {
            
            console.log(JSON.stringify(error.response));  
          }finally{
            setLoading(false);
            setIsLoggingOut(false);
          }
        //   setTimeout(() => {
     
            
        //   }, 2000);
        }
      };
    

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // Format the date as needed
        const formattedDate = date.toISOString().split('T')[0]; // Get the date part
        setSelectedDate(formattedDate);
        hideDatePicker();
    };
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };


    const [RePassword, setRePassword] = useState('');
    const [isRePasswordVisible, setRePasswordVisibility] = useState(false);

    const toggleRePasswordVisibility = () => {
        setRePasswordVisibility(!isRePasswordVisible);
    };

    return (
        <ScrollView style={styles.form} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
             {/* <StatusBar backgroundColor={'white'} barStyle="dark-content" /> */}
            <Text style={styles.heading}>Registra tu cancha</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="rgba(33, 33, 33, 0.60)"
                    letterSpacing={0.1}
                    value={name}
                 
                    onChangeText={(text) => setName(text)}
                    
                />


            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    placeholderTextColor="rgba(33, 33, 33, 0.60)"
                    letterSpacing={0.1}
                    value={email}
                
        onChangeText={(text) => setEmail(text)}

                />

            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario"
                    keyboardType="default"
                    placeholderTextColor="rgba(33, 33, 33, 0.60)"
                    letterSpacing={0.1}
                    value={Username}
                    
        onChangeText={setUsername}
   
                />
                
            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    style={styles.input}
                    placeholder="Fecha de nacimiento"
                    value={dateOfBirth}
                onChangeText={handleDateChange}
                    letterSpacing={0.1}
                    placeholderTextColor="rgba(33, 33, 33, 0.60)"
                />
                {/* <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                /> */}
                <NewIcons name='date' style={styles.eyeIcon} size={17} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="rgba(33, 33, 33, 0.60)"
                    secureTextEntry={!isPasswordVisible}
                    value={Feildpassword}
                    onChangeText={(text) => setFeildpassword(text)}
                    letterSpacing={0.1}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                    <Text style={styles.eyeText}>{isPasswordVisible ? <Icon name="eye" style={styles.eyeIcon} size={17} /> : <Icon name="eye-slash" style={styles.eyeIcon} size={17} />}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirma tu contraseña"
                    placeholderTextColor="rgba(33, 33, 33, 0.60)"
                    secureTextEntry={!isRePasswordVisible}
                    value={RePassword}
                    letterSpacing={0.1}
                    onChangeText={(text) => setRePassword(text)}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={toggleRePasswordVisibility}>
                    <Text style={styles.eyeText}>{isRePasswordVisible ? <Icon name="eye" style={styles.eyeIcon} size={17} /> : <Icon name="eye-slash" style={styles.eyeIcon} size={17} />}</Text>
                </TouchableOpacity>
            </View>
            <Button loading={loading} text="Registrate " 
            Link={handleNavigate} 
            />
             <Spinner
        visible={isLoggingOut}
        textContent={'Relojándose...'}
        textStyle={styles.loaderText}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.7)"
        color="white" 
      />
<View style={{paddingHorizontal:10,flexDirection:'row',alignItems:''}}>
            <Text style={styles.informationText}>
  Al registrarte aceptas nuestros{' '}
  <TouchableOpacity style={{marginTop:10,}} onPress={() => Linking.openURL('https://kickers.mx/terms-&-Conditions')}>
    <Text style={[styles.privacyPolicyText,{color: '#408639',}]}>términos y condiciones</Text>
  </TouchableOpacity>
  {' & '}
  <TouchableOpacity onPress={() => Linking.openURL('https://kickers.mx/privacy-policy')}>
    <Text style={[styles.privacyPolicyText,{color: '#408639'}]}>política de privacidad</Text>
  </TouchableOpacity>
</Text>
</View>
            <View style={styles.SinupText}>

                <TouchableOpacity onPress={signIn} style={styles.buttonGoole}>
                    <Image source={require('../../assets/google.png')} style={styles.image} />
                    {/* <GooIcon name='google' style={styles.googleICon} color='rgb(52, 168, 90)' size={25}  /> */}
                    <Text style={styles.buttonTextGoogle}>Continuar con Google</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.buttonGoole}>
                    <FaIcon name='facebook' style={styles.googleICon} color='#4267B2' size={25} />
                    <Text style={styles.buttonTextGoogle} >Continuar con Facebook</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.linkText}>
                    <Text style={styles.informationTextAccont}>¿Ya tienes una cuenta? <Text style={styles.TextLink} onPress={() => navigation.navigate('CourtLogin')} >Inicia sesión!</Text> </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    privacyPolicyText:{
        fontFamily:Fonts.MEDIUM,
        fontSize:14,
        top:3
    },
    linkText: {
        marginTop: 10,
        paddingBottom: 10,
        marginBottom: 28,
        fontFamily: 'Satoshi-Regular'
    },
    buttonGoole: {
        backgroundColor: 'white',
        padding: 15,
        marginTop: 25,
        borderRadius: 12,
        // width: 338,
        borderColor: '#AFB1B6',
        borderWidth: 0.5, // Set the border width
       fontFamily: 'Satoshi-Regular',
        // marginLeft: 25,
        // marginRight: 25
    },
    buttonTextGoogle: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Satoshi-Regular'

    },
    TextLink: {
        fontSize: 15,
        lineHeight: 24,
        color: '#408639',
        fontWeight: '800',
    },
    SinupText: {
        marginTop: 0,

        textAlign: 'center',

    },
    image: {
        width: 20,
        height: 25,
        objectFit: 'contain',
        position: 'absolute',
        top: 14,
        left: 20,
    },
    form: {
        backgroundColor: '#fff',
        flex:1,
         position: 'relative',
         paddingTop: 15,
         paddingLeft:18,
         paddingRight:18,

    },
    heading: {
        fontSize: 28,
        marginBottom: 10,
        color: 'black',
        fontFamily: Fonts.SAMIBOLD,
        textAlign: 'center',
        marginTop: 25
    },
    paragraphs: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 16,
        color: '#61646B',
        letterSpacing: 1,
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
        shadowOffset: { width: 0, height: 1 },
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
        right: 30,
        top: Platform.OS === 'ios' ? 30 : 35,
        color: '#408639'
    },
    googleICon: {

        position: 'absolute',
        top: 14,
        left: 20
    },
    eyeText: {
        fontSize: 20,
    },
    informationText: {
        fontSize: 13,
        lineHeight: 20,
        color: '#61646B',
        // textAlign: 'center',
        letterSpacing: 0.2,
        marginTop: 8,
        paddingBottom: 0,
       fontFamily: 'Satoshi-Medium'
    },
    informationTextAccont: {
        fontSize: 15,
        lineHeight: 16,
        color: '#61646B',
        textAlign: 'center',
        letterSpacing: 0.2,
        marginTop: 8,
        fontFamily: 'Satoshi-Medium'
    },
    headingSub: {
        fontSize: 18,
        marginBottom: 10,
        color: 'black',
        fontFamily: Fonts.SAMIBOLD,
        textAlign: 'center',
        letterSpacing: 0.2
    },
});

export default Sigup;
