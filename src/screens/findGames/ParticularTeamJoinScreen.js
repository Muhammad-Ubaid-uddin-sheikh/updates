import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LocationIcon from 'react-native-vector-icons/FontAwesome6';
import { Fonts } from '../style';
import PlayerData from '../../components/PlayerData';
import Button from '../../components/ButtonslipAndcencel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const APIURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/joinGame'
const ParticularGroundScreen = ({ route }) => {
  const { item } = route.params;
console.log('item',item.status)
const [ImageUri] = item?.field?.images
const navigation = useNavigation();
const handleNavigate = async()  => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(APIURL, {gameId:item._id} ,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data) {
      console.log('APIDATAJoined', response.data);
      navigation.goBack()
    } else {
      Alert.alert('Failed to delete court field');
    }
  } catch (error) {
    console.error('Delete Error:', error.response.data);
    Alert.alert('Failed to delete court field');
  }
  console.log('paylod',paylod)
}
  

  return (
    <View style={styles.container}>
      <Image
      source={{ uri: ImageUri || 'https://static7.depositphotos.com/1004999/795/i/450/depositphotos_7950878-stock-photo-golf-course-and-blue-sky.jpg' }}
        style={styles.backgroundImage}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, width: '100%', alignItems: 'center', position: 'absolute', top: 25 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="keyboard-arrow-left" color="white" size={18} style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleGroundDiv}>
        <Text style={styles.textGroundTitle}>Spwan Court</Text> 
      </View>
<View style={[styles.titleGroundDiv,{alignItems:'flex-start',}]}>
  <LocationIcon name='location-dot' size={15} style={{color:'green'}}/>
  <Text numberOfLines={1} ellipsizeMode="tail" style={{fontFamily:Fonts.REGULAR,fontSize:13,paddingRight:14}}>{item.address}</Text>
</View>
      {/* Location Info */}
      <View style={styles.locationTextContainer}>
    <PlayerData/>
      </View>

<ScrollView >
<View style={styles.titleGroundDiv}>
  <Text style={[styles.textGroundTitle,{fontFamily:Fonts.BOLD,fontSize:22}]}>Detalles del partido</Text>
</View>
<View style={[styles.titleGroundDiv,{marginTop:10,paddingRight:20}]}>
    <View style={styles.input}>
    <Text style={styles.firstText}>Fecha</Text>
    <Text style={styles.frontHeading}>{item.date}</Text>
    </View>
    </View>
    <View style={[styles.titleGroundDiv,{marginTop:10,paddingRight:20}]}>
    <View style={styles.input}>
    <Text style={styles.firstText}>Hora</Text>
    <Text style={styles.frontHeading}>{item.startTime}</Text>
    </View>
    </View>
    <View style={[styles.titleGroundDiv,{marginTop:10,paddingRight:20}]}>
    <View style={styles.input}>
    <Text style={styles.firstText}>Tipo De Partido</Text>
    <Text style={styles.frontHeading}>{item.matchType}</Text>
    </View>
    </View>
    <View style={[styles.titleGroundDiv,{marginTop:10,paddingRight:20}]}>
    <View style={styles.input}>
    <Text style={styles.firstText}>Buscando</Text>
    <Text style={styles.frontHeading}>{item.lookingFor}</Text>
    </View>
    </View>
    <View style={[styles.titleGroundDiv,{marginTop:10,paddingRight:20}]}>
    <View style={styles.input}>
    <Text style={styles.firstText}>Jugadores máximos</Text>
    <Text style={styles.frontHeading}>{item.maxPlayers}</Text>
    </View>
    </View>
    <View style={[styles.titleGroundDiv,{marginTop:10,paddingRight:20}]}>
    <View style={styles.input}>
    <Text style={styles.firstText}>Color de la camiseta</Text>
    <Text style={styles.frontHeading}>{item.teamOneJerseyColor}</Text>
    </View>
    </View>
    <View style={[styles.titleGroundDiv,{marginTop:10,paddingRight:20,}]}>
    <View style={styles.input}>
    <Text style={styles.firstText}>Precio</Text>
    <Text style={styles.frontHeading}>${item.pricePerPerson}.00</Text>
    </View>
    </View>
    <View style={[styles.titleGroundDiv,{marginTop:10,paddingRight:20,paddingBottom:10}]}>
    <View style={[styles.input,{flexDirection:'column'}]}>
    <Text style={styles.firstText}>note:</Text>
    <Text style={styles.frontHeading}>{item.note}</Text>
    </View>
    </View>
    {item.status === 'joined' ? (
        // If status is 'join', do not render the button
        null
      ) : (
        // If status is anything other than 'join', render the button
       <View style={{paddingHorizontal:15,paddingBottom:20}}>
    <Button ColorIcon="black" text="Unirse" IconName="done" Link={handleNavigate}  />
    </View>
      )}
    
   
</ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  frontHeading:{
    fontFamily:Fonts.MEDIUM,
    color:'black',
    fontSize:15
  },
  firstText:{
    fontFamily:Fonts.REGULAR,
    color:'#212121'
  },
  input: {
    paddingLeft: 12,
    padding: 16,
    fontSize: 14,
    lineHeight: 20,
    borderRadius: 8,
    borderWidth: 0.25,
    borderBottomColor:'black',
    borderBottomWidth:1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    color: '#212121',
    fontFamily: 'Satoshi-Medium',
    backgroundColor: 'rgba(64, 134, 57, 0.05)',
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between'

  },
  container: {
    flex: 1,
    position: 'relative',
    marginTop: 0,
    padding: 0,
    backgroundColor: 'white',
  },
  iconStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 5,
    borderRadius: 50,
  },
  backgroundImage: {
    width: '100%',
    height: 223,
    objectFit: 'cover',
  },
  titleGroundDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  textGroundTitle: {
    fontSize: 19,
    color: 'black',
    letterSpacing: 0.1,
    lineHeight: 36,
    fontFamily: Fonts.MEDIUM,
    paddingTop: 5,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: Fonts.MEDIUM,
  },
  locationTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingLeft: 15,
    // paddingRight: 15,
    paddingTop:10
  },
  textLocation: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: '#A0A0A0',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 5,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width:'auto',
    marginLeft:5,
    marginRight:5
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    
  },
  paragraphspoup:{
    fontSize:14,
    color:'#424242',
    letterSpacing:0.1,
    fontFamily: 'Satoshi-Medium',
    paddingTop:18,
    paddingBottom:10,
    textAlign:"left",
    width:300,
  },
  paragraphsHeadingMain:{
    fontSize:20,
    color:'black',
    letterSpacing:0.1,
    fontFamily: 'Satoshi-Medium',
    fontWeight:'bold',
    textAlign:"left",
    width:300,
  },
paragraphsHeading:{
    fontSize:20,
    color:'black',
    letterSpacing:0.3,
  width:'auto',
  lineHeight: 36,
  fontFamily: 'Satoshi-Medium',
  marginLeft:2,
  marginTop:20
},  
  loaderText:{
    color:'white',
    fontFamily:Fonts.BOLD
},
containerButton:{// Arrange points and text horizontally
    alignItems: 'center', // Center content vertically
    justifyContent:'space-between',
    width:'50%',
    position:'relative',
    flexDirection: 'row',
    gap:10,
},
mainContent:{
  width:'100%'
}
});

export default ParticularGroundScreen;
