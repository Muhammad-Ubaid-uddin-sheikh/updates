import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from '../screens/home/Home';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import SignupScreen from '../screens/signupScreen/SignUpScreen';
import CustomizeProfile from '../screens/customiseProfile/CustomiseProfile';
import CustomizeProfileFoot from '../screens/customiseProfile/CustomizeProfileFoot';
import CustomizeProfilePrefferd from '../screens/customiseProfile/CustomizeProfilePrefferd';
import CustomizeProfileNationlity from '../screens/customiseProfile/CustomizeProfileNationlity';
import Dashboard from '../screens/dashboard/Dashboard';
import FindGames from '../screens/findGames/FindGames';
import EditCourtFeilds from '../screens/courtScreenDashboard/courtInnerScreen/particularCourtSreen/feildcourtnavigations/courtnavigations/EditCourtFeild'
import SettingIcon from 'react-native-vector-icons/AntDesign';
import ParticularGroundScreen from '../screens/particularGroundScreen/ParticularGroundScreen';
import Setting from '../screens/setting/Setting'
import { useNavigation } from '@react-navigation/native';
import CourtLogin from '../screens/courtLoginSinup/CourtLogin'
import CourtSingup from '../screens/courtLoginSinup/CourtSingup'
import CourtDashboard from '../screens/courtScreenDashboard/CourtScreenDashboard'
import Shadule from '../screens/courtScreenDashboard/ShaduleRevisa'
import EditProfile from '../screens/setting/EditarPerfil'
import Pago from '../screens/setting/Pago'
import Notification from '../screens/setting/Notification'
import Privacy from '../screens/setting/Privacy'
import Security from '../screens/setting/Security'
import { Fonts } from '../screens/style';
import CambiarContrasena from '../screens/setting/CambiarContrasena';
import NotificationCourt from '../screens/courtScreenDashboard/courteditprofile/NotificationCourt'
import ReservaFeild from '../screens/reservaFeild/ReservaFeild'
import EncuentraFeild from '../screens/encuentraFeild/EncuentraFeild'
import Payment from '../screens/particularGroundScreen/feildNavigations/Payment'
import SlipPage from '../screens/particularGroundScreen/feildNavigations/SlipPage'
import CourtOwnerSetting from '../screens/courtScreenDashboard/courteditprofile/Courteditprofile'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../screens/setting/Profile'
import GameStart from '../screens/gamestartselleted/Gamestartselleted'
import StartAGame from '../screens/gamestartselleted/StartaGame'
import StartATeam from '../screens/gamestartselleted/StartAGameTeam'
import CourtDetails from '../screens/courtScreenDashboard/courtAddFolder/CourtDetails'
import ImagesAdd from '../screens/courtScreenDashboard/courtAddFolder/ImagesAdd'
import SoccerSelect from '../screens/courtScreenDashboard/courtAddFolder/SoccerSelect'
import Display from '../screens/courtScreenDashboard/courtAddFolder/Display'
import ParticularCourtGround from '../screens/courtScreenDashboard/courtInnerScreen/particularCourtSreen/ParticularCourtSreen'
import CourtLocationDetailsc from '../screens/courtLoginSinup/CourtNameLoc'
import EditProfileCourt from '../screens/courtScreenDashboard/courteditprofile/EditProfileCourt'
import PlayerBookingPage from '../screens/dashboard/ProfileBookingPage'
import BackIcon from 'react-native-vector-icons/FontAwesome5'
import Chats from '../screens/chats/Chats'
import ChatScreen from '../screens/chats/ChatScreen';
import ManulBookingEdits from '../screens/courtScreenDashboard/courtInnerScreen/particularCourtSreen/feildcourtnavigations/courtnavigations/ManulBookingEdits';
import CourtChat from '../screens/courtScreenDashboard/chats/Chats'
import NotificationMain from '../screens/notifications/Notifications'
import CourtChatScreen from '../screens/courtScreenDashboard/chats/ChatScreen'
import EditImagesGalary from '../screens/courtScreenDashboard/courteditprofile/courtEditImageGalary'
import SecurityCourt from '../screens/courtScreenDashboard/courteditprofile/SecurityCourt'
import CourtPayment from '../screens/courtScreenDashboard/courteditprofile/PaymentCourt'
import PasswordChangeCourt from '../screens/courtScreenDashboard/courteditprofile/PasswordChangeCourt';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getProfile';
import ParticularTeamJoinScreen from '../screens/findGames/ParticularTeamJoinScreen';
import ParticularStatics from '../screens/courtScreenDashboard/courtInnerScreen/ParticularStatics'
const AppNavigator = () => {
  // const userData = useSelector(state => state.user);
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');

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
          
          } 
          else {
            console.error('Error fetching user data:', response.statusText);
          }
        }
  
      } catch (error) {
        console.error('Error fetching and storing user data:', error);
      }
    };
    fetchDataAndStore();
  
  }, []);

  


  
  const Stack = createStackNavigator();
const navigation= useNavigation()
  const handleNavigate = () => {
    navigation.navigate('Setting');
}


  return (
    <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{
      // headerShown: false,
      cardStyle: { backgroundColor: 'white' }, // Set background color if needed
      cardStyleInterpolator: ({ current, layouts }) => {
        return {
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        };
      },}}
      >
    
    {/* <Stack.Screen name="CreditCard" component={CreditCardScreen} /> */}
   
      <Stack.Screen options={{ headerShown: false }} name="SplashScreen" component={SplashScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
      <Stack.Screen options={{ headerShown: false }} name="CourtLogin" component={CourtLogin} />
      <Stack.Screen options={{ headerShown: false }} name="SignupScreen" component={SignupScreen} />
      <Stack.Screen options={{ headerShown: false }} name="CourtSingup" component={CourtSingup} />
      <Stack.Screen options={{ headerShown: false }} name="ParticularTeamJoinScreen" component={ ParticularTeamJoinScreen} />
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Estadísticas</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }} name="ParticularStatics" component={ ParticularStatics} />
      <Stack.Screen options={{ headerLeft: () => (null),
         title:'Detalles de la cancha' ,headerTintColor: '#408639', headerTitleStyle: {  color: 'rgba(0, 0, 0, 1)', fontSize: 18,fontFamily: Fonts.MEDIUM, },
          }} name="CourtNameLoc" component={CourtLocationDetailsc} />
 <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Privacidad</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }} name="PlayerBookingPage" component={PlayerBookingPage } />
      <Stack.Screen options={{ headerShown: false }} name="Display" component={Display} />

      <Stack.Screen
      options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Recibo</Text>
          </TouchableOpacity>
        ),
        title: null, 
        // }} options={{ title: 'Recibo', headerTitleAlign: 'start', headerTintColor: '#408639', headerTitleStyle: {
        //   fontWeight: 400, color: 'rgba(0, 0, 0, 1)', fontSize: 18,fontFamily: Fonts.MEDIUM, marginLeft: -20 // You can customize the style further
        // },
      }} name="SlipPage" component={SlipPage} />


      <Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Retiro</Text>
            </TouchableOpacity>
          ),
          title: null, 
          }}
       name="Paymnet" component={Payment} />
       <Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Pagar</Text>
            </TouchableOpacity>
          ),
          title: null, 
          }}  name="CourtPayment" component={CourtPayment} />
      <Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Retiro</Text>
            </TouchableOpacity>
          ),
          title: null, 
          }} name="Pago" component={Pago} />
<Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Notificaciones</Text>
            </TouchableOpacity>
          ),
          title: null, 
          }} name="Notification" component={Notification} />
      <Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Notificaciones</Text>
            </TouchableOpacity>
          ),
          title: null, 
          }} name="NotificationCourt" component={NotificationCourt} />
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Privacidad</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }}      
      name="Privacy" component={Privacy } />
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Seguridad</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }}    name="Security" component={Security} />
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Seguridad</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }}  name="SecurityCourt" component={SecurityCourt} />
      <Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Editar perfil</Text>
            </TouchableOpacity>
          ),
          title: null, 
          }} name="EditProfile" component={EditProfile} />
      <Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Editar perfil</Text>
            </TouchableOpacity>
          ),
          title: null, 
          }} name="EditProfileCourt" component={EditProfileCourt} />

<Stack.Screen options={{ title: 'perfil', headerTitleAlign: 'start', headerTintColor: '#408639', headerTitleStyle: {
          fontWeight: 400, color: 'rgba(0, 0, 0, 1)', fontSize: 18,fontFamily: Fonts.MEDIUM, marginLeft: -20 // You can customize the style further
        },
      }} name="Profile" component={Profile} />
<Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>cambiar contraseña</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }}  name="CambiarContrasena" component={CambiarContrasena} />
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>cambiar contraseña</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }} name="PasswordChangeCourt" component={PasswordChangeCourt} />
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Perfil del jugador</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }} name="CustomizeProfile" component={CustomizeProfile} />
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Perfil del jugador</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }} name="CustomizeProfileFoot" component={CustomizeProfileFoot} />
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Perfil del jugador</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }} name="CustomizeProfileNationlity" component={CustomizeProfileNationlity} />
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Perfil del jugador</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }} name="CustomizeProfilePrefferd" component={CustomizeProfilePrefferd} />
      <Stack.Screen options={{ 
        headerShown: false
      }}  name="Dashboard" component={Dashboard} />

<Stack.Screen options={{
        headerLeft: null,
     
        headerRight: () => (
          <View style={{flexDirection:'row',gap:-10}}>
          <TouchableOpacity onPress={()=> navigation.navigate('Dashboard')}>
            <View style={styles.headerRight}>
            <Image source={require('../assets/Vector.png')} style={{ width: 20, height: 28,objectFit:'contain',marginRight: 18  }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('chats')}}>
            <View style={styles.headerRight}>
            <Image source={require('../assets/message.png')} style={{ width: 25, height: 25,objectFit:'contain',marginRight: 18  }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigate}>
            <View style={styles.headerRight}>
            <SettingIcon name="setting" size={23} color='black' style={{ marginRight: 18 }} />
            </View>
          </TouchableOpacity>
          </View>
        ),
        headerTitleAlign: 'left', 
        title: 'Reserva una cancha',
        headerTintColor: '#408639', headerTitleStyle: {
          color: 'black', fontSize: 20,fontFamily: Fonts.BOLD, letterSpacing:0.1
        },
      }} name="ReservaFeild" component={ReservaFeild} />

<Stack.Screen options={{
        headerLeft: null,
        headerRight: () => (
          <View style={{flexDirection:'row',gap:-10}}>
          <TouchableOpacity onPress={()=> navigation.navigate('Dashboard')}>
            <View style={styles.headerRight}>
            <Image source={require('../assets/Vector.png')} style={{ width: 20, height: 28,objectFit:'contain',marginRight: 18  }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.headerRight}>
            <Image source={require('../assets/message.png')} style={{ width: 25, height: 25,objectFit:'contain',marginRight: 18  }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigate}>
            <View style={styles.headerRight}>
            <SettingIcon name="setting" size={23} color='black' style={{ marginRight: 18 }} />
            </View>
          </TouchableOpacity>
          </View>
        ),
headerTitleAlign: 'left', 
        title: 'Encuentra un partido',
        headerTintColor: '#408639', headerTitleStyle: {
          color: 'black', fontSize: 20,fontFamily: Fonts.BOLD, letterSpacing:0.1
        },
      }} name="EncuentraFeild" component={EncuentraFeild} />

      <Stack.Screen options={{ headerShown: false }} name="ParticularGroundScreen" component={ParticularGroundScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ParticularCourtGround" component={ParticularCourtGround} />
      <Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Ajustes </Text>
            </TouchableOpacity>
          ),
          title: null, 
      }} name="Setting" component={Setting} />
      <Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Ajustes </Text>
            </TouchableOpacity>
          ),
          title: null, 
          }} name="CourtOwnerSetting" component={CourtOwnerSetting} />
<Stack.Screen options={{ headerShown: false }}  name="CourtDashboard" component={CourtDashboard} />
<Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Horario</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }}  name="Shadule" component={Shadule} />
      <Stack.Screen options={{headerShown: false,}} name="StartAGame" component={StartAGame} />

<Stack.Screen options={{headerShown:false,}} name="GameStart" component={GameStart} />
<Stack.Screen options={{headerShown:false,}} name="StartATeam" component={StartATeam} />
   
<Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Detalles de la cancha</Text>
            </TouchableOpacity>
          ),
          title: null, 
          }} name="CourtDetails" component={CourtDetails} />
      <Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,flex:1}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Editar campo de la cancha</Text>
            </TouchableOpacity>
          ),
          title: null, 
          }}
        name="EditCourtFeild" component={EditCourtFeilds} />
      <Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Imágenes</Text>
            </TouchableOpacity>
          ),
          title: null, 
          }}
      
     name="ImagesAdd" component={ImagesAdd} />
     <Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Imágenes</Text>
            </TouchableOpacity>
          ),
          title: null, 
          }}
      
     name="EditImagesGalary" component={EditImagesGalary} />
     
       <Stack.Screen options={{
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
               <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
              <Text style={[styles.backicontext,{marginLeft: -10}]}>Detalles de la cancha</Text>
            </TouchableOpacity>
          ),
          title: null, 
          }} name="SoccerSelect" component={SoccerSelect} />
  <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Mensajes</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }}      
      name="chats" component={Chats } />
      <Stack.Screen options={({route})=> ({
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,alignItems:'center'}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 10 }} />
             <Image style={{width:40,height:40,borderRadius:12}} source={{ uri: route.params.userImg }} />
            <View>
            <Text style={[styles.backicontext,{marginLeft: 10,fontSize:15,color:'#212121'}]}>{route.params.userName}</Text>
            <Text style={[styles.backicontext,{marginLeft: 10,fontSize:10,color:'#61646B'}]}>Last Active {route.params.messageTime}</Text>
            
            </View>
            
          </TouchableOpacity>
        ),
        title: null, 
        })}      
      name="chatscreen" component={ChatScreen} />
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Mensajes</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }}      
      name="Courtchats" component={CourtChat} />
       <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Editar</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }}      
      name="ManulBookingEdits" component={ManulBookingEdits} />
      <Stack.Screen options={({route})=> ({
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,alignItems:'center'}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 10 }} />
             <Image style={{width:40,height:40,borderRadius:12}} source={{ uri: route.params.userImg }} />
            <View>
            <Text style={[styles.backicontext,{marginLeft: 10,fontSize:15,color:'#212121'}]}>{route.params.userName}</Text>
            <Text style={[styles.backicontext,{marginLeft: 10,fontSize:10,color:'#61646B'}]}>Last Active {route.params.messageTime}</Text>
            
            </View>
            
          </TouchableOpacity>
        ),
        title: null, 
        })}      
      name="CourtChatScreen" component={CourtChatScreen} />
          <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity style={{flexDirection:"row",marginLeft: 20,}} onPress={() => navigation.goBack()}>
             <BackIcon name="chevron-left" size={23} color='#408639' style={{ marginRight: 18 }} />
            <Text style={[styles.backicontext,{marginLeft: -10}]}>Notificación</Text>
          </TouchableOpacity>
        ),
        title: null, 
        }}      
      name="NotificationMain" component={NotificationMain} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  backicontext:{
      color: '#212121',
      fontSize: 16,
      fontFamily: Fonts.MEDIUM,
  }
});