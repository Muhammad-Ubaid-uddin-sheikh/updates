
import React from 'react'
import { View, StyleSheet, StatusBar,  } from 'react-native'
import PaymentComp from '../../components/Paymentcom';

const CustomizeProfile = () => {

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor={'white'}  barStyle="dark-content" /> */}
                <PaymentComp FirstIcon="plus-box-outline" center="center" text="Agregar nueva tarjeta"/>
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