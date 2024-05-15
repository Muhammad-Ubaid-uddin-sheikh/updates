
import React from 'react'
import { View, StyleSheet,Alert,  } from 'react-native'
import PaymentComp from '../../../components/Paymentcom'

const CustomizeProfile = ({route,navigation}) => {
    const { Datarespo,Item,totalAmount,} = route.params

    const Paymnet =  Datarespo.data.paymentLink
    Handlepress=()=>{
        Alert.alert('Pago exitosa','Transición exitosa ')
        navigation.navigate('SlipPage', {Item,Datarespo,totalAmount});
    }
  
    return (
        <View style={styles.container}>
                <PaymentComp SecondIcon="arrow-forward-ios"  text="Confirmar Retiro" Link={Handlepress} Paymnet ={Paymnet}/>
               
        </View>
        
    )
}
const styles = StyleSheet.create({
   
  
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        
    }, 
   
  
   
});

export default CustomizeProfile