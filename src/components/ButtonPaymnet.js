import React from 'react'
import { Text, View ,StyleSheet, TouchableOpacity} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import FirstIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Fonts } from '../screens/style';
// arrow-forward-ios
// plus-box-outline
export const Button = ({text,Link,FirstIcon,SecondIcon,Center}) => {
    const ButtonStyle={
        justifyContent: Center || "space-between",
    }
  return (
<View>
<TouchableOpacity style={[styles.button,ButtonStyle]}  onPress={Link}>
<FirstIcons name={FirstIcon} style={styles.addIconButoon} size={17}  />
<Text style={styles.buttonText}>{text}</Text>
<Icons name={SecondIcon} style={styles.eyeIconButoon} size={17}  />
            </TouchableOpacity>
</View>
  )
}
const styles = StyleSheet.create({
 button: {
    backgroundColor: '#408639',
    padding: 15,
    // marginTop:10,
    borderRadius:12,
    borderColor:'#408639',
    borderWidth: 0.5, // Set the border width
    fontFamily:Fonts.MEDIUM,
    flexDirection:'row',
    // justifyContent:"space-between",
    alignItems:'center'
    
      },
      buttonText:{
        paddingLeft:5,
        color: '#EFEFF0',
        fontFamily:Fonts.MEDIUM,
      },
      eyeIconButoon:{
        // position: 'absolute',
        // right: 22,
        // top: 16.5,
        color:'#FFFFFF'
      }, 
      addIconButoon:{
        // position: 'absolute',
        // left: 22,
        // top: 16.5,
        color:'#FFFFFF',
        paddingRight:10
        
      }
    })

export default Button