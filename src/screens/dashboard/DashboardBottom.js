import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Image, BackHandler } from 'react-native';
import SettingIcon from 'react-native-vector-icons/AntDesign';
import Bell from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardMain from './DashboardMain';
import AnalyticsScreen from '../followPage/FollowPage';
import Profile from '../setting/Profile';
import FindGames from '../findGames/FindGames'
import { Fonts } from '../style';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getProfile';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const [name, setName] = useState('');
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
    }
    useEffect(()=>{
      requestUserPermission()
      getToken()
    },[])
const navigation= useNavigation()
    const fetchDataAndStore = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        if (token) {
          const response = await fetch(API_URL, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
           
          });
          // console.warn(token)
          if (response.ok) {
            const data = await response.json();
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
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue !== null) {
          // Data retrieved successfully
          const user = JSON.parse(jsonValue);
          console.log('User data:', user);
          // Now you can use the user data as needed
        } else {
          console.log('No data found with the key "user"');
        }
      } catch (error) {
        // Error retrieving data
        console.error('Error retrieving data:', error);
      }
    };
  useEffect(() => {
    fetchDataAndStore();
    getData()
  }, []);
  

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'rgba(64, 134, 57, 1)',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: Fonts.MEDIUM,
          marginTop:-5
        },
        headerTitleStyle: {
            fontSize: 25, // Set the desired font size for the header text
            fontFamily: Fonts.BOLD,
            marginLeft: 0,
            
          },
      })}
    >
     <Tab.Screen
        name="DashboardMain"
        component={DashboardMain}
        options={{
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'white',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
            borderTopColor: 'white',
            borderBottomColor: 'white',
            borderBottomWidth: 0,
          },
          title: `Hola, ${name}`,
          headerTitleAlign: 'left', // Align the title to the left
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: -10 }}>
              <TouchableOpacity onPress={()=>navigation.navigate('NotificationMain')}>
                <Bell name="bell-o" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('chats')}>
                <Image source={require('../../assets/message.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginRight: 18 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                <SettingIcon name="setting" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
            </View>
          ),
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => <Entypo name="home" color={color} size={30} />,
        }}
      />
<Tab.Screen
        name="Discovery"
        component={FindGames}
        options={{
          title:'Comienza un partido',
          headerStyle: {
            backgroundColor: 'white', // Change the background color
            shadowColor: 'white', // Box shadow color
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0, // Box shadow opacity
            shadowRadius: 0,
            borderTopColor: 'white', // Box shadow blur radius
            elevation: 0, // For Android
            borderBottomColor: 'white', // Border color
            borderBottomWidth: 0, // Border width
          },
         
          headerTitleAlign: 'left',
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: -10 }}>
              <TouchableOpacity onPress={()=>navigation.navigate('NotificationMain')}>
                <Bell name="bell-o" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('chats')}>
              <Image source={require('../../assets/message.png')} style={{ width: 25, height: 25,objectFit:'contain',marginRight: 18  }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('Setting')}>
                <SettingIcon name="setting" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
            </View>
          ),
          tabBarLabel: 'Descubre',
          tabBarIcon: ({ color }) => <Ionicons name="football-outline" color={color} size={28} />,
        }}
      />

      <Tab.Screen
        name="AnalyticsScreen"
        component={AnalyticsScreen}
        options={{
          headerStyle: {
            backgroundColor: 'white', // Change the background color
            shadowColor: 'white', // Box shadow color
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0, // Box shadow opacity
            shadowRadius: 0, // Box shadow blur radius
            elevation: 0,
            borderTopColor: 'white', // For Android
            borderBottomColor: 'white', // Border color
            borderBottomWidth: 0, // Border width
          },
          title: `Hola, ${name}`,
          headerTitleAlign: 'left',
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: -10 }}>
              <TouchableOpacity onPress={()=>navigation.navigate('NotificationMain')}>
                <Bell name="bell-o" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('chats')}>
              <Image source={require('../../assets/message.png')} style={{ width: 25, height: 25,objectFit:'contain',marginRight: 18  }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('Setting')}>
                <SettingIcon name="setting" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
            </View>
          ),
          tabBarLabel: 'Jugadores',
          tabBarIcon: ({ color }) => <Entypo name="users" color={color} size={28} />,
        }}
      />
      
      <Tab.Screen
        name="PlayerProfile"
        component={Profile}
        options={{
          title: 'Perfil',
          headerStyle: {
            backgroundColor: 'white', // Change the background color
            shadowColor: 'white', // Box shadow color
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0, // Box shadow opacity
            shadowRadius: 0, // Box shadow blur radius
            elevation: 0, // For Android
            borderBottomColor: 'white',
            borderTopColor: 'white', // Border color
            borderBottomWidth: 0, // Border width
          },
          headerTitleAlign: 'left',
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: -10 }}>
              <TouchableOpacity onPress={()=> navigation.navigate('Setting')}>
                <SettingIcon name="setting" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
            </View>
          ),
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person" color={color} size={28} />,
        }}
      />


    </Tab.Navigator>
  );
}

export default MyTabs;
