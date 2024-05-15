import React from 'react'
import { Text, View ,StyleSheet, TouchableOpacity} from 'react-native'
import FirstIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Fonts } from '../screens/style';

export const Button = ({text,Link,FirstIcon}) => {
  return (
<View>
<TouchableOpacity style={styles.button} onPress={Link}>
<FirstIcons name={FirstIcon} style={styles.addIconButoon} size={17}  />
<Text style={styles.buttonText}>{text}</Text>

            </TouchableOpacity>
</View>
  )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#408639',
        padding: 15,
        borderRadius:12,
        borderColor:'#408639',
        borderWidth: 0.5, // Set the border width
        fontFamily:Fonts.MEDIUM,
        flexDirection:'row',
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center'
        
          },
          buttonText:{
            paddingLeft:5,
            color: '#EFEFF0',
            fontFamily:Fonts.MEDIUM,
          }, 
          addIconButoon:{
            color:'#FFFFFF',
            paddingRight:10
            
          }
    })

export default Button