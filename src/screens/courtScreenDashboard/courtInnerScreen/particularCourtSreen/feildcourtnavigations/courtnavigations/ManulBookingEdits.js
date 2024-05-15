import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { Fonts } from '../../../../../style';
import axios from 'axios'; // Import axios for making API calls
import AsyncStorage from '@react-native-async-storage/async-storage';
const apiUrl = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/manualBooking'
const ManulBookingEdits = ({ route }) => {
  const { timeSlots,item,selectedDate } = route.params;
  console.log('timeSlots', timeSlots);

  // Initialize state for each toggle with its default state as off
  const [toggleStates, setToggleStates] = useState(timeSlots.map(slot => slot.isBooked));
// useEffect(()=>{
//     const updatedToggleStates = timeSlots.map(slot =>
//         response.data.some(dataSlot =>
//           dataSlot._id === slot._id && dataSlot.isBooked
//         )
//       );
//       setToggleStates(updatedToggleStates);
// })
  const handleToggle = async (index, timeSlotId, time) => {
    // Toggle the active state of the clicked toggle
    const updatedToggleStates = [...toggleStates];
    updatedToggleStates[index] = !updatedToggleStates[index];
    setToggleStates(updatedToggleStates);

    // Log the selected time slot's ID and time to the console
    console.log('Selected Time Slot ID:', timeSlotId);
    console.log('Selected Time:', time);
    const payload = {
        fieldId: item._id,
        timeslots: [{
          id: timeSlotId,
          time: time,
        }],
        date: selectedDate,
        startTime: "",
        endTime: "",
        sessionDurate: item.sessionDuration,
      };
      console.log(payload)
      try {
        const token = await AsyncStorage.getItem('accessTokenCourt'); // Fetch access token from AsyncStorage
        const response = await axios.post(apiUrl, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API response:', response.data);
      } catch (error) {
        console.error('Error making API call:', error);
      }
    
  }

  return (
    <View style={styles.containermain}>
      <ScrollView style={styles.scrollEdit} backgroundColor={'white'} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <Text style={[styles.heading, { fontFamily: Fonts.BOLD }]}> Ranuras de Hora </Text>
      <Text style={[styles.heading, { fontSize: 13, color: '#212121', fontFamily: Fonts.REGULAR, paddingTop: 5 }]}> Todos los espacios disponibles </Text>
      {timeSlots.map((slot, index) => (
        <TouchableOpacity
          key={slot._id}
          onPress={() => {
            // Only handle toggle if the slot is not already booked
            if (!slot.isBooked) {
              handleToggle(index, slot._id, slot.time);
            }
          }}
          style={[styles.timeSlotContainer, { backgroundColor: toggleStates[index] ? 'lightgray' : 'white' }]}
        >
          <View style={styles.mainContainerSheduleTiming}>
            <Text style={[styles.heading, { fontSize: 25, fontFamily: Fonts.MEDIUM }]}>{slot.time}</Text>
            <ToggleSwitch
              onPress={() => ''}
              isOn={toggleStates[index]} // Set the toggle state based on toggleStates array
              onColor="#408639"
              offColor="#EEE"
              size=" Medium"
              onToggle={() => { }} // Do not handle toggle here, handle it in handleToggle function
            />
          </View>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containermain: {
    paddingHorizontal: 20,
  },
  mainContainerSheduleTiming: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 6,
  },
  heading: {
    fontFamily: Fonts.MEDIUM,
    color: 'black',
    fontSize: 20,
  },
  timeSlotContainer: {
    marginBottom: 10,
    // borderColor: '#ddd',
    // borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});

export default ManulBookingEdits;



