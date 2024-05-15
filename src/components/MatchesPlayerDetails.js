import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet,ScrollView, TouchableOpacity, Alert } from 'react-native';
import PlayerData from './PlayerData';
import { Fonts } from '../screens/style';
import { useNavigation } from '@react-navigation/native';

const YourComponent = ({duration,MatchDate,LookingFor,matchType,Link,Address,Status}) => {


  return (
    <View>
    <TouchableOpacity onPress={Link} >
    <View style={styles.container}>
      <Text style={[styles.header,{paddingTop:8}]}>{MatchDate} | {duration} | {Status} </Text>
      
      <Text style={styles.paragraph}>{Address}</Text>
      <View style={styles.avatarContainer}>
        <PlayerData/>
     
      </View>
      <View style={styles.containerThird}>
        
        <Text style={[styles.header,{fontSize:12}]}>Looking For | <Text style={styles.innerTExtLevel}>{LookingFor} </Text></Text>
        <Text style={[styles.header,{fontSize:12}]}>Match Type | <Text style={styles.innerTExtLevel}>{matchType} </Text></Text>

      </View>
    </View>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  innerTExtLevel:{
    color: '#909090',
    fontSize: 12,
    letterSpacing:0.2,
    fontFamily:Fonts.MEDIUM,
    textAlign:'right'
  },
  containerThird:{
borderTopWidth: 1,
marginTop:18,
paddingTop:10,
paddingBottom:10,
flexDirection:'row',
justifyContent:'space-between',
borderColor: 'rgba(0, 0, 0, 0.25)',
color: '#212121',
fontFamily:Fonts.MEDIUM,
backgroundColor: 'rgba(64, 134, 57, 0.05)'
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 'auto',
gap:11,
    alignItems:'flex-start',
    // paddingLeft:10, 
      paddingRight:15,
       flexWrap: 'wrap',
       height:'auto'
  },
  container: {
    borderRadius:10,
    borderColor:'#A6A6A6',
    borderWidth: 1,
    backgroundColor: 'rgba(64, 134, 57, 0.05)',
height:'auto',
letterSpacing:0.2,

  },
  header: {
  
    fontSize: 14,
    color:'#474747',
    fontFamily:Fonts.MEDIUM,
    // paddingTop:8,
    paddingLeft:10,
      paddingRight:15,
  },
  // subHeader: {
  //   fontSize: 16,
  //   marginBottom: 10,
  //   color:'black'
  // },
  paragraph: {
    fontSize: 12,
    marginBottom: 15,
    color:'#959595',
    letterSpacing:0.5,
    fontFamily:Fonts.MEDIUM,
    paddingLeft:10,
      paddingRight:15,
      // paddingLeft:5,
  },
 
});

export default YourComponent;
