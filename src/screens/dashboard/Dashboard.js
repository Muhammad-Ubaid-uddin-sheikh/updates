import React from 'react';
import { View, StatusBar, StyleSheet,} from 'react-native'
import { Fonts } from '../style';
import DashboardBottom from './DashboardBottom'

const Dashboard = ({navigation}) => {

    
  return (
    
    <View style={styles.MainContainer}>
        {/* <ScrollView style={styles.scrollEdit}  backgroundColor={'white'}>
        <View style={styles.rowContainer}> */}
        {/* <StatusBar backgroundColor={'white'}  barStyle="dark-content" /> */}
        <DashboardBottom/>
    
    </View>
  
  )
}
const styles = StyleSheet.create({
    MainContainer:{
        backgroundColor:'white',
        // flexGrow: 1,
   height:"100%"

       
    },
    
})

export default Dashboard