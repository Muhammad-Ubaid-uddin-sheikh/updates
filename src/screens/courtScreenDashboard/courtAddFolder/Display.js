import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import Plus from 'react-native-vector-icons/AntDesign'
import { connect} from 'react-redux';
import { deleteSoccer } from '../../../../reduxfolder/reducers/action'; // Import the delete action
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../style';

const SoccerButton = ({ soccerData, deleteSoccer }) => {
  const [showDropdown, setShowDropdown] = useState(false);


const navigation = useNavigation()
  const handleAddSoccer = () => {
    setShowDropdown(false);
    // onAddSoccer();
    navigation.navigate('SoccerSelect');
  };

  const handleDeleteSoccer = (index) => {
    deleteSoccer(index); // Dispatch the delete action
  };

  return (
    <View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => setShowDropdown(!showDropdown)}>
      <View style={styles.textContainer}>  
                <Text style={styles.mainText}>Campos</Text>
                <Icons name='arrow-forward-ios' size={20} color="rgba(64, 134, 57, 1)" />

            </View>
      </TouchableOpacity>
      {showDropdown && (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}   >
          <TouchableOpacity style={styles.mainContainerPLus} onPress={handleAddSoccer}>
          <Plus name="plus"  style={styles.iconsTyle} />
          </TouchableOpacity>
        {(soccerData && soccerData.length > 0) ? (
          soccerData.map((data, index) => (
            <View key={index}>
             
              {/* <Text>Turf: {data.Turf}</Text>
              <Text>Timing: {data.timing}</Text> */}
              {data.imageUri && <Image source={{ uri: data.imageUri }} style={{ width: 170, height: 80 , objectFit:'cover',marginTop:10, borderRadius: 15,marginRight:10}} />}
              <TouchableOpacity onPress={() => handleDeleteSoccer(index)}>
              <Text style={styles.textHeading}>{data.name}</Text>
              {/* <Text style={styles.textHeading}>Opening Time: {data.openingHour}:{data.openingMinute} {data.openingPeriod}{data.selectedDays}</Text>
          <Text style={styles.textHeading}>Closing Time: {data.closingHour}:{data.closingMinute} {data.closingPeriod}</Text> */}
              <Text style={styles.textHeading}></Text>
              <Plus name="close"  style={styles.iconstyleCross} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',}}  >
          {/* <View style={styles.mainContainerPLus}>
          <Icon name="plus" size={20} style={styles.iconsTyle} />
          </View> */}
          </TouchableOpacity>
        //   <Text>No data available</Text>
        )}

        </ScrollView>
      )}
    
    </View>
  );
};

const mapStateToProps = (state) => ({
  soccerData: state.feild.soccerList
});

const mapDispatchToProps = {
  deleteSoccer 
};

export default connect(mapStateToProps, mapDispatchToProps)(SoccerButton);
const styles = StyleSheet.create({
    textHeading:{
        paddingLeft: 8,
        color: '#212121',
        fontFamily: Fonts.MEDIUM,
        fontSize: 15,
        letterSpacing:0.5
    },
    iconstyleCross:{
        color: 'white',
        fontSize: 15,
        borderRadius:20,
        backgroundColor:'rgba(0, 0, 0, 0.25)',
        position:'absolute',
        padding:9,
        top:-80,
        right:10,
    },
    iconsTyle:{
        color: 'black',
        fontSize: 25,
      
    },
    mainContainerPLus:{
        backgroundColor: 'rgba(0, 0, 0, 0.07)',
        borderRadius: 15,
        height: 80,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        marginTop:10,
        marginRight:10
    },
    buttonContainer: {
      backgroundColor: 'white',
      borderRadius: 5,
      fontFamily:Fonts.MEDIUM,
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 10,
      paddingTop:10
  },
  textContainer: {
      flex: 1, // Take remaining space
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      height:60,// width: 345,
      paddingLeft: 12,
      padding: 16,
      paddingRight: 25,
      fontSize: 14,
      lineHeight: 20,
      borderRadius: 10,
      borderWidth: 0.25,
      borderColor: 'rgba(0, 0, 0, 0.25)',
      color: '#212121',
      fontFamily: Fonts.MEDIUM,
      backgroundColor: 'rgba(64, 134, 57, 0.05)'

  },
  mainText: {
      paddingLeft: 8,
      color: '#212121',
      fontFamily: Fonts.MEDIUM,
      fontSize: 15,
      letterSpacing:0.5
  },
})