import React from 'react';
import { StatusBar, View, } from 'react-native'
import HeaderBottom from './HeaderBottom'
const Dashboard = () => {
    
  return (
    
    <View style={{width:'auto',flex:1,justifyContent:'center'}} >
       {/* <StatusBar backgroundColor={'white'} barStyle="dark-content" /> */}
    <HeaderBottom/>
    </View>
 
  )
}


export default Dashboard