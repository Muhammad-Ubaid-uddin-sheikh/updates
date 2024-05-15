import React from 'react'
import { Text, View ,StyleSheet, TouchableOpacity} from 'react-native'
import { Fonts } from '../screens/style'
export const Button = ({text,Link,ColorIcon,ColorText}) => {
  
    const ButtonStyle={
        backgroundColor: ColorIcon || '#408639',
    }
    const ButtonTextColor={
        color: ColorText || '#EFEFF0',
    }
  return (
<View>
<TouchableOpacity style={[styles.button,ButtonStyle]}   onPress={Link}>
              <Text style={[styles.buttonText,ButtonTextColor]} >{text}</Text>
            </TouchableOpacity>
</View>
  )
}
const styles = StyleSheet.create({
 button: {
    padding: 15,
    marginTop:20,
    borderRadius:12,
    borderColor:'#408639',
    borderWidth: 1.5, // Set the border width
    fontFamily:Fonts.MEDIUM,
    textAlign:'center',
    width:'100%',
    paddingVertical:13
    
      },
      buttonText:{
        fontFamily:Fonts.MEDIUM,
        textAlign:'center'
      },
    
    })

export default Button