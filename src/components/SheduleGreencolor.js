import React from 'react'
import { Text, View ,StyleSheet,} from 'react-native'
import { Fonts } from '../screens/style';
export const Buttons = ({Date,text}) => {
   
  return (
<View style={styles.mainContainerBackground}>
              <Text style={styles.Text}>{text}</Text>
              <Text style={styles.TextDate}>{Date}</Text>
            
</View>
  )
}
const styles = StyleSheet.create({
    mainContainerBackground:{
        marginTop: 2,
        padding: 16,
        marginBottom: 10,
        fontSize: 14,
        lineHeight: 20,
        borderRadius: 12,
        borderWidth: 0.25,
        borderColor: 'rgba(0, 0, 0, 0.25)',
        color: '#212121',
        fontFamily: 'Satoshi-Medium',
        backgroundColor: 'rgba(64, 134, 57, 0.05)',
    },
      Text:{
        color: 'rgba(33, 33, 33, 0.60)',
        fontFamily:Fonts.MEDIUM,
        textAlign:'center',
        fontSize:14
      },
      TextDate:{
        color: '#212121',
        fontFamily:Fonts.BOLD,
        textAlign:'center',
        fontSize:23
      }, 
    })

export default Buttons