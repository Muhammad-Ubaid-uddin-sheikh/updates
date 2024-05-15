import React, {  useEffect, useState } from 'react'
import { Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import  Icons  from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import FeildNavigation from './feildNavigations/FeildNavigation'
import { Fonts } from '../style';
import LocationIcon from 'react-native-vector-icons/FontAwesome6'
import StarIcons from 'react-native-vector-icons/Fontisto'
const ParticularGroundScreen = ({ route }) => {
  const { item,dataFeild} = route.params;
  const navigation = useNavigation();
  console.log("feildDataasdasdad",item)
  const addressParts = item.address.split(',').slice(0, 5).join(',');
 const [color , SetColor] = useState(false)
 const handlePress=()=>{
  SetColor(!color)
 }
  return (
    
    <View style={styles.container}>
      
       <View style={styles.imageconta}></View>
       <Image
                        source={{ uri: item.images.length > 0 ? item.images[0] : 'https://github.com/Muhammad-Ubaid-uddin-sheikh/Kicker-AfterAPK/blob/master/src/assets/WhatsApp%20Image%202024-04-20%20at%2000.11.53.jpeg?raw=true' }}
                        style={styles.backgroundImage}
                    />
      <View style={{ flexDirection: 'row', justifyContent:"space-between", padding: 16 ,width:'100%',alignItems:'center',position:'absolute',top:25}}>
      
        <TouchableOpacity onPress={()=>navigation.goBack()} >
          <Icon name="keyboard-arrow-left"  color="white" size={18} style={{backgroundColor:'rgba(0, 0, 0, 0.35)',padding:5,borderRadius:50}}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} >
        <Icons name="staro"   size={16} color={color ? '#FCC767' : 'white'} style={{backgroundColor:'rgba(0, 0, 0, 0.35)',padding:5,borderRadius:50}}  />
        </TouchableOpacity>
      </View>
   <View style={styles.TitleGroundDiv}>
   
<Text style={styles.textGroundTitle}>{item.name}</Text>
{/* <Text style={styles.textGroundTitle}>{item.turfType}</Text> */}
<Text style={[styles.buttonText, { color: item.isActive ? '#408639' : '#408639' }]}>
                        {item.isActive ? 'Disponible' : 'Disponible'}
                    </Text>

</View>
<View style={styles.locationTextContainer}>
<LocationIcon name='location-dot' style={{color:'#408639'}} size={15} />
<Text numberOfLines={1} ellipsizeMode="tail" style={[styles.textLocation,{width: Platform.OS === 'ios' ? 280 : 300,}]}> {addressParts} </Text>
<StarIcons name='star' style={{color:'#FCC767',marginLeft:10}} size={12} />
<Text style={styles.textLocation}> 4.5</Text>
</View>
<FeildNavigation Feilds={dataFeild} Item={item} />
    </View>
  )
}
const styles = StyleSheet.create({
  locationTextContainer:{
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems:"center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  textLocation:{
    fontSize:14,
    fontFamily:Fonts.REGULAR,
    color:'#A0A0A0',
    alignItems:'center',
    flexDirection:'row'
  },
  buttonText: {
    fontSize:15,
    fontFamily:Fonts.MEDIUM
  },
  TitleGroundDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
    paddingLeft: 15,
    paddingRight: 15,
   
  },
  textGroundTitle:{
    fontSize: 19,
    color: 'black',
    letterSpacing: 0.1,
    //   width:'auto',
    lineHeight: 36,
    fontFamily: Fonts.MEDIUM,
   
    paddingTop: 5
  },
  container: {
    flex: 1,
    position: 'relative',
    marginTop: 0,
    padding: 0,
    backgroundColor: 'white',


},
backgroundImage:{
  width:"100%",
  height:223,
  objectFit:'cover'
}
  
})

export default ParticularGroundScreen