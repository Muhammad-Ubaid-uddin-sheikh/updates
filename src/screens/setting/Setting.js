import React, { useState ,useEffect} from 'react';
import { Text, View, StatusBar, StyleSheet, ScrollView,TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import CheckPlayer from '../../components/CustomButton'
import ButtonEditDashboard from '../../components/ButtonEditDashboard'
import ImageEdit from './ImageEdit'
import Modal from 'react-native-modal';
import Button from '../../components/ButtonTransparentBlack';
import { Fonts } from '../style';
import Skeleton from "@thevsstech/react-native-skeleton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getProfile';
const Setting = ({navigation}) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
const [isLoading, setIsLoading] = useState(true);
  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const hideLogoutModal = () => {
    setLogoutModalVisible(false);
  };
  const handleTokenConform= async () => {
   
    try {
  
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.clear();
      // navigation.navigate('Home');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    // const resetAction = CommonActions.reset({
    //   index: 0,
    //   routes: [{ name: 'Login' }], // Replace 'Login' with the name of your login screen
    // });
    // navigation.dispatch(resetAction);
  }
        
  const handleLogout = async () => { 
    setIsLoggingOut(true);

    setTimeout(() => {
      
      setIsLoggingOut(false);
      handleTokenConform()
    }, 500);
    hideLogoutModal();
   
   
  };

  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchDataAndStore = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        if (token) {
          const response = await fetch(API_URL, {
            headers: {
              Authorization: `Bearer ${token}`,

            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data.data); 
            setName(data.data.name);
            setemail(data.data.email)
          
          } else {
            console.error('Error fetching user data:', response.statusText);
          }
        }
       
      } catch (error) {
        console.error('Error fetching and storing user data:', error);
      }finally{
        setIsLoading(false)
      }
    };
    fetchDataAndStore();
    // const intervalId = setInterval(() => {
    //   fetchDataAndStore();
    // }, 200);

    // return () => clearInterval(intervalId);
  }, []);
  return (

        <ScrollView backgroundColor={'white'}>
        <View style={styles.MainContainer}>
            <View style={styles.rowContainer}>
            {/* <StatusBar backgroundColor={'white'} barStyle="dark-content" /> */}
    
            {isLoading ? (
                    
        
                    <Skeleton highlightColor={'rgba(64, 134, 57, 0.25)'} backgroundColor={'rgba(64, 134, 57, 0.05)'} borderRadius={'20'} visible={false}>
                    
                              <View style={{ flexDirection: "row", alignItems: "center",justifyContent:'space-between',marginTop:10 }}>
                    <View style={{ width: 100, height: 100, borderRadius: 50 ,marginBottom:30}} />
                   
                  
                    <View style={{paddingRight:20,marginBottom:30}}>
                    <View style={{ width: 220, height: 30, borderRadius: 4 }} />
                    <View style={{ width: '100%', height: 20, borderRadius: 4 ,marginTop:10}} />
                    </View>
                    </View>
                    
                        </Skeleton>
            
                            ) : (
                              
                              <View style={[styles.ShoeContainer,]}>
                                    <View style={styles.row}>
                                    <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                                        <View style={styles.ShoeCon} >
                                        <ImageEdit/>
                                        </View>
                                        </TouchableOpacity>
                                        <View style={styles.ShoeConText} >
                                        <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                                            <Text style={styles.textPoints} >{name}</Text>
                                            <Text style={styles.paragraph} >{email}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    
                                </View>
                               
                  
                                )}
                   
         </View>
    <View style={styles.buttonContainer}>
       
        <ButtonEditDashboard TextButton="Editar perfil" FontName="person-outline" Link={()=>navigation.navigate('EditProfile')}/>
        {/* <ButtonEditDashboard TextButton="Retiro" FontName="card-outline" Link={()=>navigation.navigate('Pago')}/> */}
        <CheckPlayer NameFont="bell-outline" TextButton="Notificaciones" Link={()=>navigation.navigate('Notification')} />
        <ButtonEditDashboard TextButton="Privacidad" FontName="shield-checkmark-outline" Link={()=>navigation.navigate('Privacy')}/>
         <ButtonEditDashboard TextButton="Seguridad" FontName="lock-closed-outline" Link={()=>navigation.navigate('Security')}/> 
         <View>
         <ButtonEditDashboard TextButton="Cerrar sesión" FontName="log-out-outline" Link={showLogoutModal}/> 
         
        <Modal
        isVisible={isLogoutModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={hideLogoutModal}
        onBackButtonPress={hideLogoutModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.paragraphsHeadingMain}>¿Quieres cerrar sesión?</Text>
            <Text style={styles.paragraphspoup}>Agradecemos tu visita. Nos vemos pronto.</Text>

            <View style={styles.containerButton}>
            <View style={styles.mainContent}> 
                <Button text="Cancelar"  ColorIcon="white" Link={hideLogoutModal} ColorText="#408639" />
                </View>
            <View style={styles.mainContent} >
                 <Button text="Cerrar sesión"  Link={handleLogout} />
                 <Spinner
        visible={isLoggingOut}
        textContent={'Relojándose...'}
        textStyle={styles.loaderText}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.7)"
        color="white" 
      />
                 </View>
            
                </View>
              
          </View>
        </View>
      </Modal>
         </View>
        
        </View>
        </View>
        </ScrollView>
      )
    }
    const styles = StyleSheet.create({
        loaderText:{
            color:'white',
            fontFamily:Fonts.BOLD
        },
        containerButton:{// Arrange points and text horizontally
            alignItems: 'center', // Center content vertically
            justifyContent:'space-between',
            width:'auto',
            position:'relative',
            flexDirection: 'row',
            gap:10
        },
        mainContent: {
            textAlign: 'center',
        justifyContent: 'center',
       width:150,
          },
        ShoeConText:{
            paddingTop:20
        },
       
    
        row: {
            flexDirection: 'row', // Arrange points and text horizontally
            alignItems: 'top', // Center content vertically
            gap: 30,
        },
        textPoints: {
            fontSize: 22,
            lineHeight: 24,
            color: '#000',
            marginTop: 10,
            

        },
        ShoeCon: {
            textAlign: 'center',
            justifyContent: 'center',
            // width:85
        },
        ShoeContainer: {
            marginTop: 5,
                },
        MainContainer:{
            width:'auto',
            backgroundColor:'white',
            flex:1,
            paddingLeft:15,
            paddingRight:15
           
        },
        buttonContainer:{
            marginTop:0
        },
        paragraph: {
            fontSize:15,
            color:'#61646B',
            letterSpacing:0.1,
          width:'auto',

          fontFamily: 'Satoshi-Medium'
          },
          paragraphspoup:{
            fontSize:14,
            color:'#424242',
            letterSpacing:0.1,
            fontFamily: 'Satoshi-Medium',
            paddingTop:18,
            paddingBottom:10,
            textAlign:"left",
            width:300,
          },
          paragraphsHeadingMain:{
            fontSize:20,
            color:'black',
            letterSpacing:0.1,
            fontFamily: 'Satoshi-Medium',
            fontWeight:'bold',
            textAlign:"left",
            width:300,
          },
          nextButton: {
            // position: 'absolute',
            // bottom: -20,
            marginBottom:20
        },
        paragraphsHeading:{
            fontSize:20,
            color:'black',
            letterSpacing:0.3,
          width:'auto',
          lineHeight: 36,
          fontFamily: 'Satoshi-Medium',
          marginLeft:2,
          marginTop:20
        },  
        buttonText: {
            fontSize: 18,
            color: 'blue',
            textDecorationLine: 'underline',
          },
          modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // width:'auto',
            marginLeft:5,
            marginRight:5
            

        
          },
          modalContent: {
            backgroundColor: 'white',
            padding: 25,
            borderRadius: 20,
            alignItems: 'center',
            
          },
    })


export default Setting
