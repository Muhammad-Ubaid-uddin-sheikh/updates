import React, { useEffect } from 'react';
import { Text, View, StatusBar, StyleSheet, Image, ScrollView, } from 'react-native'
import { Fonts } from '../../../style';
import Gallery from './Galary';
import CourtImageGalary from './CourtImagesGalary'
const Dashboard = ({ navigation,route }) => {
  const  {Feilds,Item}  = route.params;
console.log("dasdasdaItem",Item.images)
    return (

        <View style={styles.MainContainer}>
            <ScrollView style={styles.scrollEdit} backgroundColor={'white'}>
                <View style={styles.rowContainer}>
                    {/* <StatusBar backgroundColor={'white'} barStyle="dark-content" /> */}
                    <Text style={styles.paragraphs}>
                    Canchas disponibles
                    </Text>



                </View>

<View style={styles.mainContainerShedule}>
<Gallery GroundImageGalary={Feilds}/>
<View >
                      <Text style={styles.paragraphs}>
                    Galería
                    </Text>

                </View>
                <CourtImageGalary GroundImageGalary={[...Item.images]}/>
</View>

            </ScrollView>
            
        </View>

    )
}
const styles = StyleSheet.create({
    mainContainerSheduleTiming:{
      paddingLeft:15,
      paddingRight:15,
      paddingBottom:10
   
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
        paddingTop: 10
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

})

export default Dashboard