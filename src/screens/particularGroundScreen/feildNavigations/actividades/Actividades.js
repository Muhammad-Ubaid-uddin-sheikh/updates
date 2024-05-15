import React from 'react';
import { Text, View, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import { Fonts } from '../../../style';
const Dashboard = ({navigation}) => {
    
    
  return (
    
    <View style={styles.MainContainer}>
        <ScrollView style={styles.scrollEdit}  backgroundColor={'white'}>
        <View style={styles.rowContainer}>
        {/* <StatusBar backgroundColor={'white'}  barStyle="dark-content" /> */}
      
     <View style={styles.noMessagesContainer}>
            <Image source={require('../../../../assets/noactivies.png')} style={styles.emptyIcon} />
            <Text style={styles.noMessagesText}>  No hay torneo por el momento</Text>
          </View>
    
   
     </View>
                </ScrollView>
    
    </View>
  
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
   height:"100%"

       
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
        paddingTop:20
      },
      emptyIcon:{
        width:'100%',
        height:350,
        objectFit:'contain'
              }
      
})

export default Dashboard