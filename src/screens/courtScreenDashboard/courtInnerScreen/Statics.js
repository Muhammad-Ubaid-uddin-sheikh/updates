import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import {  LineChart, LineChartBicolor} from "react-native-gifted-charts";
import { Fonts } from '../../style';
const Statics = ({name,firstNum,number}) => {
    const data = [
        {value: 6},
        {value: 6},
        {value: 8},
        {value: 5},
        {value: 5},
        {value: 8},
        {value: 0},
        {value: 8},
        {value: 4},
        {value: 2},
        {value: 7},
        {value: 14},
        {value: 3},
        {value: 7},
        {value: 3}
      ];
  return (
    <View style={styles.mainContainerStat}>
        <View style={{width:'60%'}}>
        <Text style={{fontFamily:Fonts.MEDIUM,fontSize:17,color:'black'}}>{name}</Text>
        <Text style={{fontFamily:Fonts.REGULAR,fontSize:14,color:'#9DA3B7'}}>{firstNum}</Text>
        </View>
       <View style={{width:'20%',display:'flex',justifyContent:'flex-start'}}>
       {/* <LineChart
  data={data}
  spacing={6}
  thickness={3}
  color='red'
  hideRules
  hideDataPoints
  xAxisThickness={0} 
  yAxisThickness={0}
  hideLabels  // This is the hypothetical prop to hide the axis labels
  highlightedRange={{
    from: 5,
    to: 12,
    color: 'green',
  }}
/> */}
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