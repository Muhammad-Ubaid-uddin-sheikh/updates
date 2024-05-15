


import React, { useState } from 'react'
import { View, StyleSheet, Text, StatusBar, ScrollView, } from 'react-native'
import ButtonPaymnet from '../../../components/ButtonPaymnet';
import BankAmercia from '../../../assets/BankAmercia.png'
import capitalbank from '../../../assets/capitalbank.png'
import ButtonImg from '../../../components/ButtonImage'
import { Fonts } from '../../style';
const PaymentCourt = () => {

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor={'white'} barStyle="dark-content" /> */}

            <View style={styles.MainContainer}>
                <Text style={styles.Heading}>Tus métodos de retiro</Text>

                <ScrollView width={340} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={styles.containerButton}>
                    <ButtonImg TextButton="Banco de America" ImageName={BankAmercia} />
                    <ButtonImg TextButton="Banco Capital One" ImageName={capitalbank} />

                </ScrollView>

            </View>
            <View style={styles.nextButton}>

                <ButtonPaymnet FirstIcon="plus-box-outline" center="center" text="Agregar nuevo retiro" />
            </View>
        </View>

    )
}
const styles = StyleSheet.create({

    containerButton: {
        marginTop: 15,
        padding: 0
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,

    },
    Heading: {
        fontSize: 20,
        color: '#212121',
        letterSpacing: 0.1,
        fontFamily: Fonts.BOLD,
        paddingTop:20
    },


    nextButton: {
        position: 'absolute',
        bottom: 25,
        width: 340
    },



});

export default PaymentCourt