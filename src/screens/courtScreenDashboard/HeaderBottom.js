import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from './courtInnerScreen/Clender';
import AnalyticsScreenCourt from './courtInnerScreen/Menu';
import SettingsScreen from './courtInnerScreen/Estadisticas';
import { Image, TouchableOpacity, View } from 'react-native';
import SettingIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation, } from '@react-navigation/native';
import { Fonts } from '../style';
import IconName from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Skeleton from "@thevsstech/react-native-skeleton";
import Bell from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/FontAwesome';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/getProfile';
const Tab = createBottomTabNavigator();

function MyTabs() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const handleNavigate = ()=> {
        navigation.navigate('CourtOwnerSetting');
      }
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
            try {
              // Convert data to string and save it in AsyncStorage
              const jsonData = JSON.stringify(data);
              await AsyncStorage.setItem('CourtSenderId', jsonData);
              console.log('Data saved successfully:', jsonData);
            } catch (error) {
              console.error('Error saving data to AsyncStorage:', error);
            }
            setName(data.data.name);
            console.log('data.data',data.data)
           
          } else {
            console.error('Error fetching user data:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error fetching and storing user data:', error);
      }
    };

    fetchDataAndStore();
  },[]); 
 
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'rgba(64, 134, 57, 1)',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: Fonts.MEDIUM,
          marginTop: -5,
        },
      })}
    >
      <Tab.Screen
        options={{
          title: `Hola, ${name}`,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: -10 }}>
            <TouchableOpacity onPress={()=>navigation.navigate('NotificationCourt')}>
              <Bell name="bell-o" size={23} color="black" style={{ marginRight: 18 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('Courtchats')}>
              <Image source={require('../../assets/message.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginRight: 18 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigate}>
              <SettingIcon name="setting" size={23} color="black" style={{ marginRight: 18 }} />
            </TouchableOpacity>
          </View>
          ),
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => <Entypo name="home" color={color} size={27} />,
          headerTitleAlign: 'start',
          headerTintColor: '#408639',
          headerTitleStyle: {
            color: 'rgba(0, 0, 0, 1)',
            fontSize: 27,
            fontFamily: Fonts.MEDIUM,
            marginLeft: 0,
            fontWeight: 700, // You can customize the style further
          },
        }}
        name="AnalyticsScreenCourt"
        component={AnalyticsScreenCourt}
      />
      <Tab.Screen
        options={{
          title: `Hola, ${name}`,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: -10 }}>
              <TouchableOpacity onPress={()=>navigation.navigate('NotificationCourt')}>
                <Bell name="bell-o" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('Courtchats')}>
                <Image source={require('../../assets/message.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginRight: 18 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNavigate}>
                <SettingIcon name="setting" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
            </View>
          ),
          tabBarLabel: 'Calendario',
          tabBarIcon: ({ color }) => <IconName name="calendar" color={color} size={20} />,
          headerTitleAlign: 'start',
          headerTintColor: '#408639',
          headerTitleStyle: {
            color: 'rgba(0, 0, 0, 1)',
            fontSize: 27,
            fontFamily: Fonts.MEDIUM,
            marginLeft: 0,
            fontWeight: 700, // You can customize the style further
          },
        }}
        name="CalendarScreen"
        component={CalendarScreen}
      />
      
      <Tab.Screen
        options={{
          title: 'Estadísticas',
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: -10 }}>
            <TouchableOpacity onPress={()=>navigation.navigate('NotificationCourt')}>
                <Bell name="bell-o" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('Courtchats')}>
                <Image source={require('../../assets/message.png')} style={{ width: 25, height: 25, objectFit: 'contain', marginRight: 18 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNavigate}>
                <SettingIcon name="setting" size={23} color="black" style={{ marginRight: 18 }} />
              </TouchableOpacity>
            </View>
          ),
          tabBarLabel: 'Estadísticas',
          tabBarIcon: ({ color }) => <IconName name="bar-graph" color={color} size={20} />,
          headerTitleAlign: 'start',
          headerTintColor: '#408639',
          headerTitleStyle: {
            color: 'rgba(0, 0, 0, 1)',
            fontSize: 27,
            fontFamily: Fonts.MEDIUM,
            marginLeft: 0,
            fontWeight: 700, // You can customize the style further
          },
        }}
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
