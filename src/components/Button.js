import React from 'react'
import { Text, View ,StyleSheet, TouchableOpacity,ActivityIndicator} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Fonts } from '../screens/style';
export const Buttons = ({text,Link,loading}) => {
   
  return (
<View>
<TouchableOpacity style={styles.button}  onPress={Link}  disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Loading...' : text}</Text><Icons name='arrow-forward-ios' style={styles.eyeIconButoon} size={17}  />
            
            </TouchableOpacity>
</View>
  )
}
const styles = StyleSheet.create({
 button: {
    backgroundColor: '#408639',
    padding: 15,
    borderRadius:8,
    borderColor:'#408639',
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
        top: 16.5,
        color:'#FFFFFF'
      }, 
    })

export default Buttons