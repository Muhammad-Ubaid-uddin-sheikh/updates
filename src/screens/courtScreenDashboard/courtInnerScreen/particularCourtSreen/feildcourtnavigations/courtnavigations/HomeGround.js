import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert, RefreshControl } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { Fonts } from '../../../../../style';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FirstIconsButton from '../../../../../../components/FirstIconCenterTextbtn';
import { format } from 'date-fns';
import Plus from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInputFeild from '../../../../../../components/inputFeildCustom'
import Button from '../../../../../../components/ButtonTransparentBlack';
import axios from 'axios';
const apiUrl = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/updateTimeSlotPricing'
const API_URL_GET = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/getTimeSlots'
const Dashboard = ({ navigation, route }) => {
  const { PerHour, SecHour, ThirdHour, item } = route.params;
  const [PopupVisibleSession, setPopupVisibleSession] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'eee, MMM dd yyyy'));
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState([]);
  const [courtData, setCourtData] = useState([]);
  const [Price,setPrice] = useState('')
  const [loading, setLoading] = useState(true);
  const [scheduleTimings, setScheduleTimings] = useState([]);
  const [timeSlots,setTimeSlots] = useState([])
 const [ UpdatePrice , setUpdatePrice] = useState('')
 const [UpdateTimeSlotId,setUpdateTimeSlotId] = useState('')
  const handleTimeSlotPress = (timeSlot) => {
    // setSelectedTime([...selectedTime,timeSlot]);
    setPopupVisibleSession(true)
    console.log('Selected Time:', ...selectedTime,"timeSlot",timeSlot);
    setUpdateTimeSlotId(timeSlot)
  };
  console.log('UpdateTimeSlotId',UpdateTimeSlotId,UpdatePrice)
  const handleClosePopup = () => {
    setPopupVisibleSession(false) // Hide popup
    // Reset selected time slot
  };
console.log("6aasdas",UpdatePrice)

  const handleDayPress = (day) => {
    const formattedDate = format(new Date(day.dateString), 'eee, MMM dd yyyy');
    setSelectedDate(formattedDate);
    setPopupVisible(false);
  };
  const fetchCourtData = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessTokenCourt');
        const response = await fetch(`${API_URL_GET}?fieldId=${item._id}&date=${selectedDate}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            setTimeSlots(responseData.data);
            setPrice(responseData.data[0]?.price)
            console.log('API Response Data:', responseData.data); 
        } else {
            console.error('Error fetching court data:', response.statusText);
            console.error('Response Body:', await response.text()); // Log the response body for more details
        }
    } catch (error) {
        console.error('Error fetching court data:', error);
    } finally {
        setLoading(false);
    }
};
  useEffect(() => {
    fetchCourtData();
}, [selectedDate]);

const UpdatePriceSession = async () => {
  const payload = {
    timeslots: [
      {
        fieldId: item._id,
        timeslotId: UpdateTimeSlotId,
        price: UpdatePrice + '$',
      },
    ],
  };
 try {
  if (
    Price === ''
) {
    Alert.alert('Error', 'Please fill all fields');
} else {  
  const accessToken = await AsyncStorage.getItem('accessTokenCourt'); 
  const response = await axios.post(apiUrl, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
    
  setPopupVisibleSession(false)
  console.log('API response:', response.data);
  console.log('update Price',payload,); 
  setUpdatePrice('')
    Alert.alert('Precio actualizado  ')
}
      
 } catch (error) {
  
  console.error('Error posting data:', error);

 }
}


  return (
    <View style={styles.MainContainer}>
      <ScrollView style={styles.scrollEdit} backgroundColor={'white'} refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              fetchCourtData();
            }}
          />
        }>
        {/* <StatusBar backgroundColor={'white'} barStyle="dark-content" /> */}
        <View style={styles.rowContainer}>
          <View style={styles.containerFlex}>
            <Text style={styles.paragraphs}>{item.name}</Text>
            <TouchableOpacity style={styles.buttonEdit} onPress={()=>{navigation.navigate('EditCourtFeild',{item})}}>
              <Text style={[{textAlign:'center',color:'#408639',fontFamily:Fonts.REGULAR,fontSize:12}]}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mainContainerSheduleTiming}>
          <Text style={[styles.timing, { fontSize: 15 }]}>Precio</Text>
          <Text style={[styles.timing, { fontSize: 15 }]}>{Price}.00</Text>
         
        </View>
        <View style={styles.mainContainerSheduleTiming}>
          <Text style={[styles.timing, { fontSize: 15 }]}>Duración de la sesión</Text>
          <Text style={[styles.timing, { fontSize: 15 }]}>{item.sessionDuration} Min</Text>
         
        </View>
        <View style={[styles.mainContainerSheduleTiming, { flexDirection: 'none', alignItems: 'none' }]}>
          {scheduleTimings.map((schedule, index) => (
            <View key={index} style={styles.timingContainer}>
              <Text style={styles.day}>{schedule.day}</Text>
              <Text style={styles.timing}>${schedule.timing}.00</Text>
            </View>
          ))}
        </View>
        <View style={[styles.containerFlex, { marginTop: -8 }]}>
          <Text style={styles.paragraphs}>Ranuras de tiempo</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('ManulBookingEdits',{timeSlots,item,selectedDate})}  style={styles.buttonEdit}>
            <Text style={[{textAlign:'center',color:'#408639',fontFamily:Fonts.REGULAR,fontSize:12}]}>Editar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.containerSelcetDateClen}>
            <TouchableOpacity onPress={() => setPopupVisible(true)}>
              <Text style={[styles.selectTime,{paddingTop:10}]}>
              {selectedDate ? selectedDate : 'Seleccionar Fecha'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPopupVisible(true)}  style={[styles.buttonEdit,{marginRight:0,marginTop:0}]}>
            <Text style={[{textAlign:'center',color:'#408639',fontFamily:Fonts.REGULAR,fontSize:12}]}>Fecha</Text>
          </TouchableOpacity>
          </View>
          <Modal
            visible={popupVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setPopupVisible(false)}>
              <TouchableOpacity onPress={() => setPopupVisible(false)} style={{flex:1}}>
            <View style={styles.modalContainer}>
              <View style={styles.popup}>
              <Calendar
      onDayPress={handleDayPress}
      style={styles.calendar}
      theme={{
        backgroundColor: 'rgba(64, 134, 57, 0.05)',
        calendarBackground: 'rgba(64, 134, 57, 0.05)',
        textSectionTitleColor: 'black',
        selectedDayTextColor: 'white',
        selectedDayBackgroundColor: 'green',
        todayTextColor: 'green',
        dayTextColor: '#2d4150',
        textDisabledColor: '#8C8C8C',
        dotColor: '#00adf5',
        selectedDotColor: 'black',
        arrowColor: 'black',
        monthTextColor: 'black',
        textDayFontFamily: Fonts.MEDIUM,
        textMonthFontFamily: Fonts.MEDIUM,
        textDayHeaderFontFamily: Fonts.MEDIUM,
        textDayFontSize: 15,
        textMonthFontSize: 15,
        textDayHeaderFontSize: 14,
        borderWidth: 0,
        borderRadius: 12
      }}
      markedDates={{ [selectedDate]: { selected: true, selectedColor: '#408639' } }}
    />
              </View>
            </View>
            </TouchableOpacity>
          </Modal>
        </View>
        <View style={styles.mainContainerSheduleTiming}>
          <Text style={[styles.timing, { fontSize: 15 }]}>Mostrar solo espacios disponibles</Text>
          <ToggleSwitch
            onPress={() => ''}
            isOn={isEnabled}
            onColor="#408639"
            offColor="#EEE"
            size=" Medium"
            onToggle={() => setIsEnabled(!isEnabled)} />
        </View>
        {isEnabled && (
          <View style={{ paddingTop: 5, marginTop: -1, paddingBottom: 13 }}>
            {timeSlots.length === 0 ? (
              <View style={{ paddingTop: 30 }}>
                <FontAwesome name='calendar-times-o' style={{ textAlign: 'center', color: '#6F6F6F', fontSize: 60 }} />
                <Text style={styles.empltyText}>
                  No hay ranuras de Hora disponibles en este momento.
                </Text>
              </View>
            ) : (
              <View style={{ marginTop: 10, paddingLeft: 10, paddingRight: 5, flexDirection: 'row', justifyContent: 'flex-start', width: 380, flexWrap: 'wrap', gap: 5 }}>
                {timeSlots.map((slots, index) => (
                  <TouchableOpacity
                      style={[styles.timeSlotsText, { backgroundColor: selectedTime.includes(slots._id) ? '#408639' : (slots.isBooked ? '#408639' : 'transparent'), color: slots.isBooked || selectedTime.includes(slots._id) ? 'white' : 'black' }]}
                      key={slots._id}
                      onPress={() => handleTimeSlotPress(slots._id)}
                      disabled={slots.isBooked}
                    >
                      <Text style={[{ fontSize: 13, fontFamily: Fonts.MEDIUM, color: slots.isBooked || selectedTime.includes(slots._id) ? 'white' : 'black' }]}>{slots.time}</Text>
                    </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
       
     <Modal visible={PopupVisibleSession} transparent animationType="slide">
      <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <View style={[styles.DisplayFlexProp,{width:"100%"}]}>
                        <Text style={[styles.bookingHeeading,{paddingTop:0,fontSize:20}]}>Detalles de la reserva</Text>
                        <TouchableOpacity onPress={handleClosePopup}>
                      <Plus name="close"  style={styles.iconstyleCross} />
                      </TouchableOpacity>
                      </View>
                      <View style={{width:'100%'}}>
                      <CustomInputFeild focus={true} labelName='Precio' value={UpdatePrice}
          onChangeText={(text) => setUpdatePrice(text)} />  
        <Button text="Actualizar precio"  Link={UpdatePriceSession} />
                      </View>
                    
                     
                     
                    </View>
                </View>
            </Modal>
        {/* <View style={{ marginTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 15 }}>
          <TouchableOpacity onPress={() => console.log('getTime', selectedDate)}>
            <FirstIconsButton text="Agregar comentario" FirstIcon="plus-box-outline" />
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSelcetDateClen: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 5
  },
  timeSlotsText: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 13,
    color: '#000',
    borderWidth: 1,
    borderColor: 'rgba(33, 33, 33, 0.50)',
    width: 85,
    textAlign: 'center',
    borderRadius: 8,
    padding: 8
  },
  empltyText: {
    textAlign: 'center',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 10,
    fontFamily: Fonts.MEDIUM,
    paddingTop: 20
  },
  buttonEdit: {
    marginRight: 15,
    marginTop: 10,
    backgroundColor: 'rgba(64, 134, 57, 0.15)',
    borderRadius: 42,
    borderColor: 'rgba(64, 134, 57, 0.25);',
    borderWidth: 0.5,
    textAlign: 'center',
    width: 60,
    padding: 3,
    color: '#408639',
    fontFamily: Fonts.REGULAR,
    fontSize: 12,
  },
  containerFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainerSheduleTiming: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  day: {
    fontSize: 16,
    color: '#6F6F6F',
    fontFamily: Fonts.MEDIUM,
    letterSpacing: 0.2
  },
  timing: {
    fontSize: 13,
    color: '#000',
    fontFamily: Fonts.MEDIUM,
    letterSpacing: 0.2
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectTime: {
    fontSize: 16,
    color: '#000',
    fontFamily: Fonts.MEDIUM,
    letterSpacing: 0.2
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    width: 350
  },
  calendar: {
    borderRadius: 10,
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
    paddingTop: 10
  },
  scrollEdit: {
    flex: 1
  },modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
      
},
modalContent: {
  backgroundColor: 'white',
  padding: 25,
  borderRadius: 20,
  alignItems: 'center',
  width:345
},
modalTitle: {
  fontSize:15,
  fontFamily:Fonts.MEDIUM,
            color:'black',
            letterSpacing:0.1,
            textAlign:"left",
            width:'100%',
},
modalText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign:'center'
},
closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
},
closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
},
iconstyleCross:{
  color:'black',
  fontSize:25
},
DisplayFlexProp:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
},
MainHeading:{
  color:'black'
}
});

export default Dashboard;
