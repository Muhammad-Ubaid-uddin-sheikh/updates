import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Fonts } from '../../style';
const Statics = ({name,firstNum,number}) => {
   
  return (
    <View style={styles.mainContainerStat}>
        <View style={{width:'60%'}}>
        <Text style={{fontFamily:Fonts.MEDIUM,fontSize:15,color:'black'}}>{name}</Text>
        <Text style={{fontFamily:Fonts.REGULAR,fontSize:12,color:'#9DA3B7'}}>{firstNum}</Text>
        </View>
       <View style={{width:'20%',display:'flex',justifyContent:'flex-start'}}>
<Image source={require('../../../assets/statics.png')} style={{width:'100%',objectFit:'contain',height:60}}/>
       </View>
       <View style={{width:'20%',display:'flex',alignItems:'center',justifyContent:'center'}}>
       <Text style={{fontFamily:Fonts.BOLD,fontSize:18,color:'black'}}>{number}</Text>
       </View>
    </View>
  )
}
const styles = StyleSheet.create({
    mainContainerStat:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'rgba(64, 134, 57, 0.05)',
        paddingHorizontal:10,
        borderWidth:0.5,borderColor:'rgba(0, 0, 0, 0.25)',
        borderRadius:12,
        paddingVertical:6,
        marginTop:10
    }
})
export default Statics