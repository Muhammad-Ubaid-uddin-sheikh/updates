import React from 'react'
import { Text, View ,StyleSheet, TouchableOpacity,ActivityIndicator} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Fonts } from '../screens/style';
export const Buttons = ({text,Link,loading,ColorIcon,ColorText,IconColor,IconName}) => {
  const ButtonStyle={
    backgroundColor: ColorIcon || '#408639',
}
const ButtonTextColor={
    color: ColorText || '#EFEFF0',
}
const IconColorChange={
  color: IconColor || '#EFEFF0',
}
  return (
<View>
<TouchableOpacity style={[styles.button,ButtonStyle]}  onPress={Link}  disabled={loading}>
              <Text style={[styles.buttonText,ButtonTextColor]}>{loading ? 'Loading...' : text}</Text><Icons name={IconName} style={[styles.eyeIconButoon,IconColorChange]} size={25}  />
            </TouchableOpacity>
</View>
  )
}
const styles = StyleSheet.create({
 button: {
    backgroundColor: '#212121',
    padding: 15,
    borderRadius:8,
    // borderColor:'#408639',
    borderWidth: 0.5, // Set the border width
    fontFamily:Fonts.MEDIUM,
    
      },
      buttonText:{
        paddingLeft:5,
        color: '#EFEFF0',
        fontFamily:Fonts.MEDIUM,
      },
      eyeIconButoon:{
        position: 'absolute',
        right: 22,
        top: 11.5,
        color:'#FFFFFF'
      }, 
    })

export default Buttons