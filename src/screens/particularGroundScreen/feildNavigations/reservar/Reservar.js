import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Fonts } from '../../../style';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NewIcons from 'react-native-vector-icons/Fontisto';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation,  } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const API_URL_GET = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getTimeslots';
const API_URL_POST = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/bookCourt';

const Dashboard = ({ route }) => {
  const navigation = useNavigation();
  const { Feilds, Item, courtId } = route.params;
const initialValueFromParams = courtId ? courtId.name : '';
const handleFocus = useCallback(() => {
  console.log(courtId?.name);
  setCourtName(courtId?.name || ''); 
  setSelectedId(courtId?._id)
}, [courtId]);

// Use useFocusEffect with the wrapped callback function
useFocusEffect(
  useCallback(() => {
    handleFocus();
  }, [handleFocus])
);
  const [courtName, setCourtName] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [CourtPopup, setCourtPopup] = useState(false);
  const [CLender, setCLender] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [responseData, setResponseData] = useState();
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    calculateTotalAmount();
   
  }, [selectedTime]);
  const calculateTotalAmount = () => {
    let total = 0;
    selectedTime.forEach((slotId) => {
      const selectedSlot = timeSlots.find((slot) => slot._id === slotId);
      if (selectedSlot) {
        total += parseFloat(selectedSlot.price);
      }
    });
    setTotalAmount(total);
    
  };

  const handleDayPress = (day) => {
    const formattedDate = format(new Date(day.dateString), 'd MMM yyyy');
    setSelectedDate(formattedDate);
    setCLender(!CLender);
  };

  const handleTimeSlotPress = (timeSlot) => {
    const index = selectedTime.indexOf(timeSlot);
    const isBooked = timeSlots.find(slot => slot._id === timeSlot)?.isBooked;

    if (isBooked) {
      Alert.alert('Alert', 'This time slot is already booked.');
      return;
    }

    if (index === -1) {
      setSelectedTime([...selectedTime, timeSlot]);
    } else {
      const updatedTimeSlots = [...selectedTime];
      updatedTimeSlots.splice(index, 1);
      setSelectedTime(updatedTimeSlots);
    }
    setPopupVisible(false);
  };

  const handleCourtnamePress = (id, name) => {
    setCourtName(name);
    setSelectedId(id);
    setCourtPopup(false);
  };

  const handleRegisterd = async () => {
    try {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem('accessToken');
      const payload = {
        fieldId: selectedId,
        timeslots: selectedTime.map(id => ({ id, time: getTimeById(id) })),
        date: selectedDate,
        startTime: "",
        endTime: ""
      };

      const response = await axios.post(API_URL_POST, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setResponseData(response.data);
      let Datarespo = response.data;
      navigation.navigate('Paymnet', { Datarespo, Item, totalAmount });
    } catch (error) {
      console.error('Error occurred:', error);
      Alert.alert('Error', 'There was a problem with your request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getTimeById = (id) => {
    const timeSlot = timeSlots.find(slot => slot._id === id);
    return timeSlot ? timeSlot.time : '';
  };

  useEffect(() => {
    const fetchCourtData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const yourDate = selectedDate;
        const response = await fetch(`${API_URL_GET}?fieldId=${selectedId}&date=${yourDate}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setTimeSlots(responseData.data);
        } else {
          console.error('Error fetching court data:', response.statusText);
          console.error('Response Body:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching court data:', error);
      }
    };
    if (selectedDate && selectedId) {
      fetchCourtData();
    }
  }, [selectedDate]);

  return (
    <View style={styles.MainContainer}>
      <ScrollView style={styles.scrollEdit} backgroundColor={'white'}>
        <View style={styles.rowContainer}>
          <Text style={styles.paragraphs}>Detalles de reserva</Text>
        </View>
        <View style={[styles.inputContainer, { paddingTop: 10 }]}>
          <TouchableOpacity onPress={() => setCourtPopup(!CourtPopup)}>
            <TextInput
              placeholderTextColor="black"
              editable={false}
              placeholder="Cancha"
              style={[styles.input, {
                borderColor: CourtPopup ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.25)',
                borderRadius: CourtPopup ? 0 : 12,
                borderTopLeftRadius: CourtPopup ? 12 : 12,
                borderTopRightRadius: CourtPopup ? 12 : 12,
                borderTopWidth: CourtPopup ? 0.25 : 0.25,
                borderBottomWidth: CourtPopup ? 0 : 0.25,
                borderLeftWidth: CourtPopup ? 0.25 : 0.25,
                borderRightWidth: CourtPopup ? 0.25 : 0.25,
              }]}
              // value={courtName}
              value={ courtName}
            />
            {CourtPopup ? (
              <NewIcons name='angle-up' style={styles.eyeIcon} size={15} />
            ) : (
              <NewIcons name='angle-down' style={styles.eyeIcon} size={15} />
            )}
          </TouchableOpacity>
          {CourtPopup && (
            <View style={{
              backgroundColor: 'rgba(64, 134, 57, 0.05)', paddingTop: 5, marginTop: -1, paddingBottom: 13, borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.25)', borderTopWidth: 0, borderWidth: 0.25, borderBottomLeftRadius: 12, borderBottomRightRadius: 12,
            }} >
              {Feilds.length === 0 ? (
                <View style={{ paddingTop: 30 }}>
                  <FontAwesome name='soccer-ball-o' style={{ textAlign: 'center', color: '#6F6F6F', fontSize: 60 }} />
                  <Text style={styles.empltyText}>No hay canchas disponibles</Text>
                </View>
              ) : (
                <View style={{ marginTop: 10, paddingLeft: 10, paddingRight: 5, flexDirection: 'row', justifyContent: 'flex-start', width: 380, flexWrap: 'wrap', gap: 5 }}>
                  {Feilds.map(({ _id, name }) => (
                    <TouchableOpacity key={_id} onPress={() => handleCourtnamePress(_id, name)}>
                      <Text style={{ fontSize: 15, color: 'black', width: 300, fontFamily: Fonts.MEDIUM }}>{name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>

        <View style={[styles.inputContainer,]}>
          <TouchableOpacity onPress={() => setCLender(!CLender)}>
            <TextInput
              placeholderTextColor="black"
              editable={false}
              placeholder="Nombre de usuario"
              style={[styles.input, {
                borderColor: CLender ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.25)',
                borderRadius: CLender ? 0 : 12,
                borderTopLeftRadius: CLender ? 12 : 12,
                borderTopRightRadius: CLender ? 12 : 12,
                borderTopWidth: CLender ? 0.25 : 0.25,
                borderBottomWidth: CLender ? 0 : 0.25,
                borderLeftWidth: CLender ? 0.25 : 0.25,
                borderRightWidth: CLender ? 0.25 : 0.25,
              }]}
              value={selectedDate}
            />
            {CLender ? (
              <NewIcons name='angle-up' style={styles.eyeIcon} size={15} />
            ) : (
              <NewIcons name='angle-down' style={styles.eyeIcon} size={15} />
            )}
          </TouchableOpacity>
          {CLender && (
            <Calendar
              onDayPress={handleDayPress}
              style={styles.calendar}
              theme={{
                calendarBackground: 'rgba(64, 134, 57, 0.05)',
                textSectionTitleColor: 'black',
                selectedDayTextColor: 'white',
                selectedDayBackgroundColor: 'green',
                todayTextColor: 'green',
                dayTextColor: '#2d4150',
                textDisabledColor: '#8C8C8C',
                dotColor: '#00adf5',
                selectedDotColor: 'black',
                arrowColor: '#408639',
                monthTextColor: 'black',
                textDayFontFamily: Fonts.MEDIUM,
                textMonthFontFamily: Fonts.MEDIUM,
                textDayHeaderFontFamily: Fonts.MEDIUM,
                textDayFontSize: 15,
                textMonthFontSize: 15,
                textDayHeaderFontSize: 14,
                borderWidth: 1,
              }}
              markedDates={{
                [selectedDate]: { selectedDate: true, selectedColor: 'rgba(64, 134, 57, 1)' },
                current: { selectedDate: true, selectedColor: 'rgba(64, 134, 57, 1)' }
              }}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
            <TextInput
              placeholderTextColor="black"
              editable={false}
              placeholder="Intervalo de Hora "
              style={[styles.input, {
                borderColor: isDropdownOpen ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.25)',
                borderRadius: isDropdownOpen ? 0 : 12,
                borderTopLeftRadius: isDropdownOpen ? 12 : 12,
                borderTopRightRadius: isDropdownOpen ? 12 : 12,
                borderTopWidth: isDropdownOpen ? 0.25 : 0.25,
                borderBottomWidth: isDropdownOpen ? 0 : 0.25,
                borderLeftWidth: isDropdownOpen ? 0.25 : 0.25,
                borderRightWidth: isDropdownOpen ? 0.25 : 0.25,
              }]}
              value={selectedTime.length > 0 ? selectedTime.map(id => getTimeById(id)).join(', ') : ''}
            />
            {isDropdownOpen ? (
              <NewIcons name='angle-up' style={styles.eyeIcon} size={15} />
            ) : (
              <NewIcons name='angle-down' style={styles.eyeIcon} size={15} />
            )}
          </TouchableOpacity>
          {isDropdownOpen && (
            <View style={{
              backgroundColor: 'rgba(64, 134, 57, 0.05)', paddingTop: 5, marginTop: -1, paddingBottom: 13, borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.25)', borderTopWidth: 0, borderWidth: 0.25, borderBottomLeftRadius: 12, borderBottomRightRadius: 12,
            }} >
              {timeSlots.length === 0 ? (
                <View style={{ paddingTop: 30 }}>
                  <FontAwesome name='calendar-times-o' style={{ textAlign: 'center', color: '#408639', fontSize: 60 }} />
                  <Text style={styles.empltyText}>No available court this date  plz select another date</Text>
                </View>
              ) : (
                <View style={{ marginTop: 10, paddingLeft: 10, paddingRight: 5, flexDirection: 'row', justifyContent: 'flex-start', width: 'auto', flexWrap: 'wrap', gap: 5, }}>
                  {timeSlots.map((slot, index) => (
                    <TouchableOpacity
                      style={[styles.timeSlotsText, { backgroundColor: selectedTime.includes(slot._id) ? '#408639' : (slot.isBooked ? '#408639' : 'transparent'), color: slot.isBooked || selectedTime.includes(slot._id) ? 'white' : 'black' }]}
                      key={slot._id}
                      onPress={() => handleTimeSlotPress(slot._id)}
                      disabled={slot.isBooked}
                    >
                      <Text style={[{ fontSize: 13, fontFamily: Fonts.MEDIUM, color: slot.isBooked || selectedTime.includes(slot._id) ? 'white' : 'black' }]}>{slot.time}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.nextButton}>
        <TouchableOpacity style={styles.button} onPress={handleRegisterd} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Reservar'}</Text>
          <Text style={styles.buttonText}>Precio: {totalAmount}.00</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#408639',
    padding: 15,
    borderRadius: 12,
    borderColor: '#408639',
    borderWidth: 0.5, // Set the border width
    fontFamily: Fonts.MEDIUM,
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  buttonText: {
    paddingLeft: 5,
    color: '#EFEFF0',
    fontFamily: Fonts.MEDIUM,
  },
  calendar: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderColor: 'rgba(0, 0, 0, 0.25)'
  },
  eyeIcon: {
    position: 'absolute',
    right: 30,
    top: 20,
    color: '#408639'
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 20,
  },
  MainContainer: {
    backgroundColor: 'white',
    height: "100%"
  },
  paragraphs: {
    fontSize: 18,
    color: 'black',
    letterSpacing: 0.1,
    lineHeight: 36,
    fontFamily: Fonts.BOLD,
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 15
  },
  empltyText: {
    textAlign: 'center',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 10,
    fontFamily: Fonts.MEDIUM,
    paddingTop: 20,
    color: '#408639'
  },
  input: {
    paddingLeft: 12,
    padding: 16,
    fontSize: 14,
    lineHeight: 20,
    borderRadius: 12,
    borderWidth: 0.25,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    color: '#212121',
    fontFamily: 'Satoshi-Medium',
    backgroundColor: 'rgba(64, 134, 57, 0.05)',
    width: '100%'
  },
  timeSlotsText: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 13,
    color: '#000',
    borderWidth: 1,
    borderColor: '#408639',
    width: '23%',
    textAlign: 'center',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextButton: {
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'white'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    width: 320
  },
});

export default Dashboard;
