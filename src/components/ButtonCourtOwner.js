import React from 'react'
import { Text, View ,StyleSheet, TouchableOpacity} from 'react-native'
import Icons from 'react-native-vector-icons/Fontisto'
import { Fonts } from '../screens/style';
const Button = ({text,Link,FontName,ColorIcon,backgroundIcon}) => {

    const ButtonStyle={
        color: ColorIcon || 'red',
    }
    const ButtonBacground= {
      backgroundColor: backgroundIcon || '#408639 '
    }
    
  return (
<View>
<TouchableOpacity style={[styles.button,ButtonBacground]}  onPress={Link}>
              <Text style={styles.buttonText}>{text}</Text><Icons name={FontName} style={[styles.eyeIconButoon,ButtonStyle]} size={17}  />
            </TouchableOpacity>
</View>
  )
}
const styles = StyleSheet.create({
 button: {
    backgroundColor: '#408639',
    padding: 15,
    marginTop:10,
    borderRadius:12,
    borderColor:'#408639',
    borderWidth: 0.5, // Set the border width
    fontFamily:Fonts.MEDIUM,
    // marginLeft:15,
    // marginRight:15,
    width:'100%',
    paddingTop:20,
    paddingBottom:20,
    display:'flex',
    justifyContent:'center',
    fontWeight:700
    
      },
      buttonText:{
        paddingLeft:5,
        color: 'black',
        fontFamily:Fonts.MEDIUM,
        letterSpacing:0.5,
        fontSize:15
      },
      eyeIconButoon:{
        position: 'absolute',
        right: 22,
        top: 20.5,
        color:'black'
      }, 
    })

export default Button