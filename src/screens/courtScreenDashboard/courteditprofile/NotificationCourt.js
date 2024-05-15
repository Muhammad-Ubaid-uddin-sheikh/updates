// import React, { useEffect, useState } from 'react'
// import { View ,Text,ScrollView,StyleSheet} from 'react-native'
// import ToggleSwitch from 'toggle-switch-react-native'
// import { Fonts } from '../../style';
// const NotificacionCourt= () => {
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [Sound, setSound] = useState(true);
//   const [Vibrate, setVibrate] = useState(true);
//   const [App, setApp] = useState(false);
//     const [Email, setEmail] = useState(true);
//     const [Notification, setNotification] = useState(false);
//     const handleToggle = (state, setState, key) => {
//       setState(!state);
//     };
  
//     // const postNotificationSettings = async () => {
//     //   const apiUrl = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/notificationSetting';
//     //   const payload = {
//     //     general: isEnabled,
//     //     sound: Sound,
//     //     vibrate: Vibrate,
//     //     appUpdates: App,
//     //     receiveNotification: Email ? 'enabled' : 'disabled',
//     //     doNotReceiveNotifocation: Notification ? 'enabled' : 'disabled',
//     //   };
  
//     //   try {
//     //     const response = await fetch(apiUrl, {
//     //       method: 'POST',
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //       },
//     //       body: JSON.stringify(payload),
//     //     });
  
//     //     if (response.ok) {
//     //       console.log('API request successful');
//     //       // You can handle success actions here
//     //     } else {
//     //       console.error('API request failed');
//     //       // You can handle error actions here
//     //     }
//     //   } catch (error) {
//     //     console.error('API request error:', error);
//     //     // Handle error
//     //   }
//     // };
 
//   return (
//     <ScrollView backgroundColor={'white'}>
//     <View style={styles.MainContainer}>

//     <View style={styles.containerToggle}>
//       <Text style={styles.leftText}>Notificaciones generales</Text>
//       <Text style={styles.rightToggle}>
//    <ToggleSwitch
//    onPress={() => postNotificationSettings()}
//   isOn={isEnabled}
//   onColor="#408639"
//   offColor="#EEE"
//   size=" Medium"
//   onToggle={() =>  setIsEnabled(!isEnabled)}/>
  
//   </Text>
//     </View>

//     <View style={[styles.containerToggle,{marginTop:28}]}>
//       <Text style={styles.leftText}>Sonido</Text>
//       <Text style={styles.rightToggle}>
//    <ToggleSwitch
//    onPress={() => postNotificationSettings()}
//   isOn={Sound}
//   onColor="#408639"
//   offColor="#EEE"
//   size=" Medium"
//   onToggle={() =>  setSound(!Sound)}/>
  
//   </Text>


//     </View>
//     <View style={[styles.containerToggle,{marginTop:28}]}>
//       <Text style={styles.leftText}>Vibración</Text>
//       <Text style={styles.rightToggle}>
//    <ToggleSwitch
//    onPress={() => postNotificationSettings()}
//   isOn={Vibrate}
//   onColor="#408639"
//   offColor="#EEE"
//   size=" Medium"
//   onToggle={() =>  setVibrate(!Vibrate)}/>
  
//   </Text>


//     </View>
   
//     <View style={[styles.containerToggle,{marginTop:28}]}>
//       <Text style={styles.leftText}>Actualizaciones de la app</Text>
//       <Text style={styles.rightToggle}>
//    <ToggleSwitch
//    onPress={() => postNotificationSettings()}
//   isOn={App}
//   onColor="#408639"
//   offColor="#EEE"
//   size=" Medium"
//   onToggle={() =>  setApp(!App)}/>
  
//   </Text>


//     </View>
//     <View style={[styles.containerToggle,{marginTop:28}]}>
//       <Text style={styles.leftText}>Recibir notificaciones vía</Text>
//       <Text style={styles.rightToggle}>
//    <ToggleSwitch
//    onPress={() => postNotificationSettings()}
//   isOn={Email}
//   onColor="#408639"
//   offColor="#EEE"
//   size=" Medium"
//   onToggle={() =>  setEmail(!Email)}/>
  
//   </Text>


//     </View>
//     <View style={[styles.containerToggle,{marginTop:28}]}>
//       <Text style={styles.leftText}>No recibir notificaciones</Text>
//       <Text style={styles.rightToggle}>
//    <ToggleSwitch
//    onPress={() => postNotificationSettings()}
//   isOn={Notification}
//   onColor="#408639"
//   offColor="#EEE"
//   size=" Medium"
//   onToggle={() =>  setNotification(!Notification)}/>
  
//   </Text>


//     </View>

//     </View>
//      </ScrollView>
//   )
// }
// const styles = StyleSheet.create({
 
//   MainContainer:{
//     width:'auto',
//     backgroundColor:'white',
//     flex:1,
//     marginTop:20 ,
//     paddingLeft:5,
//     paddingRight:5
    
   
// },
// containerToggle: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   paddingHorizontal: 16, 
//   textAlignVertical:'center'
// },
// leftText: {
//   textAlign: 'left',
//   color:'#424242',
//   fontFamily: Fonts.MEDIUM,
//   fontSize: 16,
//   letterSpacing: 0.2
// },
// rightToggle: {
//   textAlign: 'right',
//   // Additional styling for the right text if needed
// },
// })
// export default NotificacionCourt
import React from 'react';
import { Text, View, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import { Fonts } from '../../style';

const Notifications = ({navigation}) => {
    
    
  return (
    
    <View style={styles.MainContainer}>
      
   <View style={styles.noMessagesContainer}>
            <Image source={require('../../../assets/notification.png')} style={styles.emptyIcon} />
            <Text style={styles.noMessagesText}>  No hay notificación en este momento</Text>
          </View>
    
   
     </View>
                
    
    // </View>
  
  )
}
const styles = StyleSheet.create({
   
    scrollcontainer:{
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight:5
    },

    row: {
        flexDirection: 'row', // Arrange points and text horizontally
        alignItems: 'center', // Center content vertically
        justifyContent:'space-between'
    },
   
    MainContainer:{
        backgroundColor:'white',
        // flexGrow: 1,
   height:"100%",
   flex:1,


       
    },
   
    noMessagesText: {
        fontSize:16,
        color:'black',
        letterSpacing:0.1,
    //   width:'auto',
      lineHeight: 36,
      fontFamily:Fonts.MEDIUM,
      paddingLeft:15,
      paddingRight:10
      },noMessagesContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        paddingTop:20,
        height:'100%'
      },
      emptyIcon:{
        width:'100%',
        height:350,
        objectFit:'contain'
              }
      
})

export default Notifications