import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Fonts } from '../screens/style'
export const Button = ({ Link }) => {
    return (

        <TouchableOpacity style={styles.buttonContainer} onPress={Link}>


            {/* </View> */}
            <View style={styles.textContainer}>
                <Icons name="signal-cellular-outline" size={27} color="rgba(64, 134, 57, 1)" />
                <Text style={styles.mainText}>Check Player Leaderboard </Text>

            </View>

        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        fontFamily:Fonts.MEDIUM,
        marginLeft: 20,
        marginRight: 28,
        // width: 355,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    textContainer: {
        flex: 1, // Take remaining space
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // width: 345,
        paddingLeft: 12,
        padding: 16,
        paddingRight: 40,
        fontSize: 14,
        lineHeight: 20,
        borderRadius: 12,
        borderWidth: 0.25,
        borderColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 1 },

        color: '#212121',
        fontFamily:Fonts.MEDIUM,
        backgroundColor: 'rgba(64, 134, 57, 0.05)'

    },
    mainText: {
        paddingLeft: 20,
        color: '#212121',
        fontFamily: 'Satoshi-Medium',
        fontSize: 15
    },

})

export default Button