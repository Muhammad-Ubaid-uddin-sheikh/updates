import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, } from 'react-native'
import FootBall from 'react-native-vector-icons/Ionicons'
import { Fonts } from '../screens/style'
import IMg from '../assets/google.png'
export const Button = ({ Link,TextButton,ImageName }) => {
    return (

        <TouchableOpacity style={styles.buttonContainer} onPress={Link}>


            {/* </View> */}
            <View style={styles.textContainer}>
                {/* <FootBall name={FontName} size={27} color="rgba(64, 134, 57, 1)" /> */}
                <Image source={ImageName} style={styles.image} />
                <Text style={styles.mainText}>{TextButton} </Text>

            </View>

        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        fontFamily: Fonts.MEDIUM,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15
    },
    textContainer: {
        flex: 1, // Take remaining space
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18,
        padding: 22,
        paddingRight: 40,
        fontSize: 14,
        lineHeight: 20,
        borderRadius: 12,
        borderWidth: 0.25,
        borderColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 1 },
        color: '#212121',
        fontFamily: Fonts.MEDIUM,
        backgroundColor: 'rgba(64, 134, 57, 0.05)'

    },
    mainText: {
        paddingLeft: 15,
        color: '#212121',
        fontFamily: Fonts.MEDIUM,
        fontSize: 17,
        letterSpacing:0.5
    },
    image:{
        width:25,
        height:25   
    }

})

export default Button