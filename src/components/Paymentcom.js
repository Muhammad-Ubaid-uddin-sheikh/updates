
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text,  StatusBar, ScrollView,} from 'react-native'
import ButtonPaymnet from './ButtonPaymnet';
import Paypal from '../assets/paypal.png'
import Google from '../assets/google.png'
import Apple from '../assets/apple.png'
import { Fonts } from '../screens/style';
import ButtonImg from './ButtonImage'
import {WebView} from 'react-native-webview';
import io from 'socket.io-client';
import Button from './CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import { useSocket } from '../../Socket';
const CustomizeProfile = ({Link,SecondIcon,text,center,FirstIcon,Paymnet}) => {
  const navigation = useNavigation()
  
  // const [socket, setSocket] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
   // Initialize socket state
 const  Item = 'hello' 
 const Datarespo = 'asa' 
 const totalAmount ='asdasdasd'
  useEffect(() => {
    const socket = io('https://kickers-backend-5e360941484b.herokuapp.com');
    // Create socket connection
    // const newSocket = io('https://kickers-backend-5e360941484b.herokuapp.com');
    // socket.on("payment.complete", (e) => {
    //   console.log('payment', e);
    //   setVal(true);
    // });
    socket.on('payment.complete', (status) => {
      setPaymentStatus(status);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('payment.complete');
    };
  }, []);
    // setSocket(newSocket);

    // Clean up on unmount
console.log("payment status",paymentStatus)
  useEffect(() => {
    if (paymentStatus) {
      navigation.navigate('SlipPage',{paymentStatus});
      console.log('asdasd',paymentStatus)
    }
  }, [paymentStatus, navigation]);

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor={'white'}  barStyle="dark-content" /> */}
           
            <View style={styles.MainContainer}>
            <Text style={styles.Heading}>Por favor, selecciona un método de Retiro</Text>
    
      <WebView source={{ uri: Paymnet }} />
            </View>
               
        </View>
        
    )
}
const styles = StyleSheet.create({
  courtName:{
width:'100%'
  },
  containerButton:{
    marginTop:30,
    padding:0
  },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      //   marginRight:10,
      //  marginLeft:10,
        
    }, 
 Heading: {
                  fontSize:20,
                  color:'#212121',
                  letterSpacing:0.1,
                fontFamily: Fonts.BOLD
                },
            
    
    nextButton: {
        position: 'absolute',
        bottom: 25,
        width:340
    },
   
  
   
});

export default CustomizeProfile