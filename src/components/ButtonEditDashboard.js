import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, } from 'react-native'
import FootBall from 'react-native-vector-icons/Ionicons'
import { Fonts } from '../screens/style'
export const Button = ({ Link,TextButton,FontName }) => {
    return (

        <TouchableOpacity style={styles.buttonContainer} onPress={Link}>
            {/* </View> */}
            <View style={styles.textContainer}>
                <FootBall  name={FontName} size={27} color="rgba(64, 134, 57, 1)" />
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
        // marginLeft: 15,
        // marginRight:10,
        // width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15
    },
    textContainer: {
        flex: 1, // Take remaining space
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // width: 'auto',
        paddingLeft: 12,
        padding: 16,
        paddingRight: 40,
        fontSize: 14,
        lineHeight: 20,
        borderRadius: 12,
        borderWidth: 0.25,
        borderColor: 'rgba(0, 0, 0, 0.25)',
        color: '#212121',
        fontFamily: Fonts.MEDIUM,
        backgroundColor: 'rgba(64, 134, 57, 0.05)'

    },
    mainText: {
        paddingLeft: 10,
        color: '#212121',
        fontFamily: Fonts.MEDIUM,
        fontSize: 15,
        letterSpacing:0.5
    },

})

export default Button