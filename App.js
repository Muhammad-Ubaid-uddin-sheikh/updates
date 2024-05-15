import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, SafeAreaView, View, Platform} from 'react-native';
import AppNavigator from './src/routes/AppNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reduxfolder/index';
const store = createStore(rootReducer);
import {enableLatestRenderer} from 'react-native-maps';
import { io } from 'socket.io-client';
import { SocketProvider } from './Socket';
import NetInfo from '@react-native-community/netinfo';
const socket = io('https://kickers-backend-5e360941484b.herokuapp.com');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const App = ({navigation}) => {
  
    
    return ( 
     
    
        <Provider store={store}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'}/>
       <SocketProvider>
        <NavigationContainer>
          <View style={{flex:1,padding:0}}>
          {/* <ScrollView style={styles.form} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}> */}
            <AppNavigator />
            </View>
           
        </NavigationContainer>
        </SocketProvider>
        </Provider>
     
    );
};

export default App;

const styles = StyleSheet.create({
  
});

