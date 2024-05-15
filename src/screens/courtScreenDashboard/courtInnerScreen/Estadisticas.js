import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { Fonts } from '../../style';
import { BarChart,LineChart} from "react-native-gifted-charts";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../../components/ButtonTransparentBlack';
import Statics from './Statics';
const Clender = ({navigation}) => {
  const data=[ 
  { value: 70, label: 'M' },
  { value: 90, label: 'T' },
  { value: 60, label: 'W' },
  { value: 80, label: 'T' },
  { value: 20, label: 'F' },
  { value: 40, label: 'S' },
  { value: 10, label: 'S' },
 ]
 const dataAll = [
  { name: 'Índice promedio de ocupación', Numberfst: '+1.6%', number: '69%' },
  { name: 'Reservaciones totales', Numberfst: '+1.2%', number: '30%' },
  { name: 'Ingresos del mes pasado', Numberfst: '+2.6%', number: '12%' },
];
  return (
    <View style={styles.MainContainer}>
      
        <ScrollView>
        {/* <BarChart
                barWidth={22}
                noOfSections={3}
                barBorderRadius={4}
                frontColor="lightgray"
                data={data}
                yAxisThickness={0}
                xAxisThickness={0}
            /> */}
            <View style={{paddingHorizontal:18,marginTop:40}} >
              <View style={{backgroundColor:'rgba(64, 134, 57, 0.05)',padding:8,borderRadius:10,borderWidth:0.5,borderColor:'rgba(0, 0, 0, 0.25)',paddingTop:15,paddingBottom:15}}>
                <View style={{flexDirection:'row',alignItems:"center"}}>
              <Text style={styles.mainHeadingPrice}> $49,329.77</Text>
              <Text style={styles.SubPriceGreen}> +$1,530</Text>  
               </View>
              <Text style={{fontFamily:Fonts.REGULAR,fontSize:15,paddingTop:10,paddingHorizontal:5,color:'black'}}> Ingresos totales generados </Text>
              <Button text="Ver gráficos" Link={()=>navigation.navigate('ParticularStatics')}/>
              </View>
            <View style={{flexDirection:'row',alignItems:"center",justifyContent:'space-between',paddingTop:15}}>
            <Text style={styles.mainHeadingPrice}>Gráficos</Text>
            <TouchableOpacity style={{backgroundColor:'rgba(64, 134, 57, 0.05)',padding:5,borderRadius:25,borderWidth:0.5,borderColor:'rgba(0, 0, 0, 0.25)'}}>
              <Text style={{color:'#408639',fontFamily:Fonts.REGULAR,fontSize:12}}>  Ver todo </Text>
            </TouchableOpacity>
            </View>
          
            {dataAll.map((item, index) => (
        <View key={index}>
            <Statics name={item.name} firstNum={item.Numberfst} number={item.number}/>
          {/* <Text>Name: {item.name}</Text>
          <Text>Value: {item.value}</Text>
          <Text>Number: {item.number}</Text> */}
        </View>
      ))}
            </View>
        </ScrollView>
        
    </View>
  )
}
const styles= StyleSheet.create({
  mainHeadingPrice:{
    fontFamily:Fonts.BOLD,
    fontSize:24,
    color:'black'
  },
  SubPriceGreen:{
fontFamily:Fonts.REGULAR,
fontSize:17,
color:'#408639'
  },
    textHeading: {
        fontSize: 20,
        color: '#000',
        marginTop: 20,
        fontFamily: Fonts.BOLD,
        marginLeft:20,
       
    },
    MainContainer:{
        width:'auto',
        backgroundColor:'white',
        flex:1,
       
    },
    buttonContainer:{
      marginTop:10
    }
   
    
})
export default Clender
