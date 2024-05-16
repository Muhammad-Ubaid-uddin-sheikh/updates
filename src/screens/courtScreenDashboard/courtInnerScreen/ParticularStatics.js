import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Fonts } from '../../style';
import Statics from './Statics';

const YourComponent = () => {
  // Sample data for each court
  const courtData = [
    { id: 1, name: 'Cancha 1', data: [{value: 6},
        {value: 6},
        {value: 8},
        {value: 5},
        {value: 5},
        {value: 8},
        {value: 0},
        {value: 8},
        {value: 4},
        {value: 2},
        {value: 7},
        {value: 14},
        {value: 3},
        {value: 7},
        {value: 3}] },
    { id: 2, name: 'Cancha 2', data: [{value: 150},
        {value: 123},
        {value: 12},
        {value: 160},
        {value: 122},
        {value: 111},
        {value:100},
        {value: 231},
        {value: 131},
        {value: 11},
        {value: 3},
        {value: 23},
        {value:1},
        {value: 324},
        {value: 12}] },
    { id: 3, name: 'Cancha 3', data: [{value: 6},
        {value: 6},
        {value: 8},
        {value: 5},
        {value: 5},
        {value: 8},
        {value: 0},
        {value: 8},
        {value: 4},
        {value: 2},
        {value: 7},
        {value: 14},
        {value: 3},
        {value: 7},
        {value: 3}] },
    { id: 4, name: 'Cancha 4', data: [{value: 6},
        {value: 126},
        {value: 28},
        {value: 135},
        {value: 15},
        {value: 338},
        {value: 130},
        {value: 138},
        {value: 14},
        {value: 312},
        {value: 337},
        {value: 114},
        {value: 23},
        {value: 217},
        {value: 31}] },
    { id: 5, name: 'Cancha 5', data: [{value: 6},
        {value: 6},
        {value: 8},
        {value: 5},
        {value: 5},
        {value: 8},
        {value: 0},
        {value: 8},
        {value: 4},
        {value: 2},
        {value: 7},
        {value: 14},
        {value: 3},
        {value: 7},
        {value: 3}] },
    { id: 6, name: 'Cancha 6', data: [{value: 6},
        {value: 6},
        {value: 8},
        {value: 5},
        {value: 5},
        {value: 8},
        {value: 0},
        {value: 8},
        {value: 4},
        {value: 2},
        {value: 7},
        {value: 14},
        {value: 3},
        {value: 7},
        {value: 3}] },
  ];
  const [activeCourt, setActiveCourt] = useState(courtData[0].id); // Set default to the first court

  // Function to handle court selection
  const handleCourtSelection = (id) => {
    setActiveCourt(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresos</Text>
     
      <FlatList
  data={courtData}
  horizontal
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleCourtSelection(item.id)}
      style={[
        styles.courtItem,
        { 
            borderBottomWidth: item.id === activeCourt ? 2 : 0,
          paddingLeft: index === 0 ? 0 : 20, // Apply different padding based on index
        },
      ]}
    >
      <Text style={[styles.courtText, { color: item.id === activeCourt ? '#408639' : '#9DA3B7' }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )}
  showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
/>
<Statics name="Ingresos del mes pasado" firstNum="+$1,235" number='$10,321'/>
      {activeCourt && (
        <View style={styles.chartContainer}>
          
          <LineChart
            data={courtData.find(court => court.id === activeCourt).data}
            spacing={6}
            thickness={3}
            color='red'
            hideRules
            hideDataPoints
            xAxisThickness={0}
            yAxisThickness={0}
            hideLabels
            highlightedRange={{
              from: 5,
              to: 12,
              color: 'green',
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.BOLD,
    color: 'black',
    fontSize: 20,
    marginTop: 20,
  },
  courtItem: {
    borderWidth: 0,
    // borderRadius: 5,
    // marginHorizontal: 5,
    borderColor:'#408639',
    paddingHorizontal: 10,
    paddingVertical: 10,
    
  },
  courtText: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 15,
  },
  chartContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    top: 0,
  },
});

export default YourComponent;