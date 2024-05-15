import React, { useState ,useEffect} from 'react';
import { Text, View, StatusBar, StyleSheet, ScrollView,TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import CheckPlayer from '../../../components/CustomButton'
import ButtonEditDashboard from '../../../components/ButtonEditDashboard'
import ImageEditProfile from './ImageEditProfileImg'
import Modal from 'react-native-modal';
import Button from '../../../components/ButtonTransparentBlack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fonts } from '../../style';
import Skeleton from "@thevsstech/react-native-skeleton";
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/getProfile';
const Setting = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const hideLogoutModal = () => {
    setLogoutModalVisible(false);
  };
  const handleTokenConform= async () => {
   
    try {
  
      await AsyncStorage.removeItem('accessTokenCourt');
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error deleting data:', error);
    }
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
        const token = await AsyncStorage.getItem('accessTokenCourt');

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
  }, []);
  return (

        <ScrollView backgroundColor={'white'}>
           {/* <StatusBar backgroundColor={'white'} barStyle="dark-content" /> */}
        <View style={styles.MainContainer}>
    <View style={[styles.buttonContainer,{paddingTop:10}]}>
    <ButtonEditDashboard TextButton="Editar perfil" FontName="person-outline" Link={()=>navigation.navigate('EditProfileCourt')}/>
    <ButtonEditDashboard TextButton="Retiro" FontName="card-outline" Link={()=>navigation.navigate('CourtPayment')}/>
    <CheckPlayer NameFont="bell-outline" TextButton="Notificaciones" Link={()=>navigation.navigate('NotificationCourt')} />
    <ButtonEditDashboard TextButton="Seguridad" FontName="lock-closed-outline" Link={()=>navigation.navigate('SecurityCourt')}/>
         <View>
         <ButtonEditDashboard TextButton="Cerrar sesión" FontName="log-out-outline" Link={showLogoutModal}/> 
         
        <Modal
        isVisible={isLogoutModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={hideLogoutModal}
        onBackButtonPress={hideLogoutModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.paragraphsHeadingMain}>¿Quieres cerrar sesión?</Text>
            <Text style={styles.paragraphspoup}>Agradecemos tu visita. Nos vemos pronto.</Text>

            <View style={styles.containerButton}>
            <View style={styles.mainContent}> 
                <Button text="Cancelar"  ColorIcon="white" Link={hideLogoutModal} ColorText="#212121" />
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
         <View style={styles.nextButton}>
                     
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
            // width:200,
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
            paddingRight:15,
           
        },
        buttonContainer:{
            marginTop:0
        },
        paragraph: {
            fontSize:15,
            color:'#61646B',
            letterSpacing:0.1,
          width:'auto',

          fontFamily: Fonts.MEDIUM
          },
          paragraphspoup:{
            fontSize:14,
            color:'#424242',
            letterSpacing:0.1,
            fontFamily: Fonts.MEDIUM,
            paddingTop:18,
            paddingBottom:10,
            textAlign:"left",
            width:300,
          },
          paragraphsHeadingMain:{
            fontSize:20,
            color:'black',
            letterSpacing:0.1,
            fontFamily: Fonts.MEDIUM,
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
          fontFamily: Fonts.MEDIUM,
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
