import React from 'react';
import { Text, View, StatusBar, StyleSheet, Image, ScrollView, } from 'react-native'
import { Fonts } from '../../../style';
const Dashboard = ({ navigation }) => {
   

    const scheduleTimings = [
        { day: 'Lunes', timing: '9:00 PM - 10:00 PM' },
        { day: 'Martes', timing: '9:00 PM - 10:00 PM' },
        { day: 'Miércoles', timing: '9:00 PM - 10:00 PM' },
        { day: 'Jueves', timing: '9:00 PM - 10:00 PM' },
        { day: 'Viernes', timing: '9:00 PM - 10:00 PM' },
        { day: 'Sábado', timing: '9:00 PM - 10:00 PM' },
        { day: 'Domingo', timing: '9:00 PM - 10:00 PM' },

       
      ];
    return (

        <View style={styles.MainContainer}>
            <ScrollView style={styles.scrollEdit} backgroundColor={'white'}>
                <View style={styles.rowContainer}>
                    {/* <StatusBar backgroundColor={'white'} barStyle="dark-content" /> */}
                    <Text style={styles.paragraphs}>
                    Horarios disponibles
                    </Text>



                </View>

<View style={styles.mainContainerShedule}>
{scheduleTimings.map((schedule, index) => (
        <View key={index} style={styles.timingContainer}>
          <Text style={styles.day}>{schedule.day}</Text>
          <Text style={styles.timing}>{schedule.timing}</Text>
        </View>
      ))}
</View>
                

            </ScrollView>
            
        </View>

    )
}
const styles = StyleSheet.create({
    mainContainerShedule:{
        flex: 1,
    paddingHorizontal: 15,
    paddingRight:22,
    paddingTop:17
    },
    timingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      day: {
        fontSize: 16,
        color:'#6F6F6F',
        fontFamily:Fonts.MEDIUM,
        letterSpacing:0.2
      },
      timing: {
        fontSize: 13,
        color:'#000',
        fontFamily:Fonts.MEDIUM,
        letterSpacing:0.2
      },
    scrollcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },

    row: {
        flexDirection: 'row', // Arrange points and text horizontally
        alignItems: 'center', // Center content vertically
        justifyContent: 'space-between'
    },


    MainContainer: {
        backgroundColor: 'white',
        // flexGrow: 1,
        height: "100%"


    },

    paragraphs: {
        fontSize: 18,
        color: 'black',
        letterSpacing: 0.1,
        //   width:'auto',
        lineHeight: 36,
        fontFamily: Fonts.BOLD,
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 15
    },
    

})

export default Dashboard