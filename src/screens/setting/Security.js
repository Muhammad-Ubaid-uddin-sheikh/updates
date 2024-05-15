import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { Fonts } from '../style';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notificaciones = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [Face, setFace] = useState(true);
  const [Touch, setTouch] = useState(true);

  useEffect(() => {
    // Retrieve token from AsyncStorage on component mount
    const retrieveToken = async () => {
      try {
        const authToken = await AsyncStorage.getItem('accessToken');
        // Use the token as needed
        console.log('Retrieved token:', authToken);
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    retrieveToken();

    // Call API on component mount and whenever toggles are updated
    handleToggle('Face', Face);
    handleToggle('RememberLoginDetails', isEnabled);
    handleToggle('Touch', Touch);
  }, [isEnabled, Face, Touch]); // useEffect will be triggered whenever these values change

  const handleToggle = async (key, value) => {
    // Assuming you have a function to get the authentication token
    const authToken = await AsyncStorage.getItem('accessToken');

    // Your API endpoint
    const apiUrl = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/securitySetting';

    // API request payload
    const payload = {
      [key]: value,
    };

    // Make API POST request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });
console.log(authToken)
    if (response.ok) {
      console.log('API request successful');
      // You can handle success actions here if needed
    } else {
      const responseData = await response.json();
      console.error('API request failed:', responseData);
      // You can handle error actions here if needed
    }
  };

  return (
    <SafeAreaView style={{paddingHorizontal: 20,paddingTop:0,flex:1}}>
    <ScrollView backgroundColor={'white'}>
      <View style={styles.MainContainer}>
        <View style={styles.containerToggle}>
          <Text style={styles.leftText}>Face ID</Text>
          <Text style={styles.rightToggle}>
            <ToggleSwitch
              isOn={Face}
              onColor="#408639"
              offColor="#EEE"
              size=" Medium"
              onToggle={() => {
                setFace(!Face);
                handleToggle('Face', !Face);
              }}
            />
          </Text>
        </View>

        <View style={[styles.containerToggle, { marginTop: 28 }]}>
          <Text style={styles.leftText}>Remember Login Details </Text>
          <Text style={styles.rightToggle}>
            <ToggleSwitch
              isOn={isEnabled}
              onColor="#408639"
              offColor="#EEE"
              size=" Medium"
              onToggle={() => {
                setIsEnabled(!isEnabled);
                handleToggle('RememberLoginDetails', !isEnabled);
              }}
            />
          </Text>
        </View>
        <View style={[styles.containerToggle, { marginTop: 28 }]}>
          <Text style={styles.leftText}>Touch ID</Text>
          <Text style={styles.rightToggle}>
            <ToggleSwitch
              isOn={Touch}
              onColor="#408639"
              offColor="#EEE"
              size=" Medium"
              onToggle={() => {
                setTouch(!Touch);
                handleToggle('Touch', !Touch);
              }}
            />
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <View style={[styles.containerToggle, { marginTop: 20 }]}>
            <Text style={styles.leftText}>Authenticated r de google</Text>
            <Text style={styles.rightToggle}>
              <Icons name="arrow-forward-ios" style={styles.eyeIconButoon} size={20} />
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CambiarContrasena')}
        >
          <View style={[styles.containerToggle, { marginTop: 25 }]}>
            <Text style={styles.leftText}>Cambiar contraseña</Text>
            <Text style={styles.rightToggle}>
              <Icons name="arrow-forward-ios" style={styles.eyeIconButoon} size={20} />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  eyeIconButoon:{
        position: 'absolute',
        right: 22,
        top: 16.5,
        color:'green'
      }, 
      MainContainer:{
        width:'auto',
        backgroundColor:'white',
        flex:1,
        paddingLeft:5,
        paddingRight:5
        
       
    },
    containerToggle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      
      textAlignVertical:'center'
    },
    leftText: {
      textAlign: 'left',
      color:'#424242',
      fontFamily: Fonts.MEDIUM,
      fontSize: 16,
      letterSpacing: 0.2,
    width:300
    },
    rightToggle: {
      textAlign: 'right',
    
    },button:{
      marginTop:10
    }
});

export default Notificaciones;
