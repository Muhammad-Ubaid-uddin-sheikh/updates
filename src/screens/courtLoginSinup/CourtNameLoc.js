import React, { useEffect, useRef } from 'react'
import Icons from 'react-native-vector-icons/MaterialIcons'
import CustomInputFeild from '../../components/inputFeildCustom'
import { useState } from 'react';
import { Fonts } from '../style';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert, ScrollView, Image, Modal,  } from 'react-native';
import Button from '../../components/Button';
import Dot from 'react-native-vector-icons/Entypo';
import Watch from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
const API_URL_POST = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/createCourt';
Geocoder.init('AIzaSyB_nNvYWSCB2haI7DCgR6chQmsg-T4oj8s');
const CustomizeProfilePrefferd = () => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const [pinCoordinate, setPinCoordinate] = useState(null);
    const [mapReady, setMapReady] = useState(false);
    const [areaName, setAreaName] = useState('');
  console.log("pinCoordinate",pinCoordinate?.latitude)
    const handleMapPress = event => {
      const { coordinate } = event.nativeEvent;
      console.log('Selected Location:', coordinate.latitude, coordinate.longitude);
      setPinCoordinate(coordinate);
      reverseGeocode(coordinate.latitude, coordinate.longitude);
    };
  
    const handleMapReady = () => {
      setMapReady(true);
    };
    const requestLocationPermission = async () => {
        try {
          let permission;
          if (Platform.OS === 'android') {
            permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
          } else if (Platform.OS === 'ios') {
            permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
          }
      
          const result = await request(permission);
      
          if (result !== RESULTS.GRANTED) {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };
      useEffect(() => {
        requestLocationPermission();
      }, []);
    const reverseGeocode = async (latitude, longitude) => {
        try {
          const res = await Geocoder.from({ latitude, longitude });
          const addressComponents = res.results[0].address_components;
          
          // Extract address components except for the country
          const filteredAddressComponents = addressComponents.filter(component =>
            !component.types.includes('country')
          );
    
          const formattedAddress = filteredAddressComponents.map(component => component.short_name).join(', ');
          
          console.log('Area Name:', formattedAddress);
          setAreaName(formattedAddress);
        } catch (error) {
          console.error('Error getting area name:', error);
        }
      };
  
    useEffect(() => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log('Initial Location:', latitude, longitude);
          setPinCoordinate({ latitude, longitude });
          reverseGeocode(latitude, longitude);
        },
        error => console.log('Error getting current location:', error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }, []);
  

  
    const [loading, setLoading] = useState(false);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [showDropdown, setShowDropdown] = useState(true);
    const [selectedDays, setSelectedDays] = useState([]);
    const [openingHour, setOpeningHour] = useState('');
    const [openingMinute, setOpeningMinute] = useState('');
    const [openingPeriod, setOpeningPeriod] = useState('AM');
    const [closingHour, setClosingHour] = useState('');
    const [closingMinute, setClosingMinute] = useState('');
    const [closingPeriod, setClosingPeriod] = useState('AM');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [CourtName, setCourtName] = useState('')
    const [Location, setLocation] = useState('')
    const ImagesData = useSelector(state => state.image);
    const openingTime = `${openingHour.padStart(2, '0')}:${openingMinute.padStart(2, '0')} ${openingPeriod}`;
    const closingTime = `${closingHour.padStart(2, '0')}:${closingMinute.padStart(2, '0')} ${closingPeriod}`;
    
    const handleFocus = (index) => {
        setFocusedIndex(index);
    };

    const handleBlur = () => {
        setFocusedIndex(-1);
    };

    const toggleDaySelection = (day) => {
        const isSelected = selectedDays.includes(day);
        if (isSelected) {
            setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };
    const handleClear = () => {
        setOpeningHour('');
        setOpeningMinute('');
        setOpeningPeriod('AM');
        setClosingHour('');
        setClosingMinute('');
        setClosingPeriod('AM');
        setSelectedDays([]);
    };
    const handleSave = () => {
        if (
            openingHour === '' ||
            openingMinute === '' ||
            closingHour === '' ||
            closingMinute === ''
        ) {
            Alert.alert('Error', 'Please fill all fields');
        } else {
            // Convert opening and closing hour/minute to integers
            const openingHourInt = parseInt(openingHour, 10);
            const openingMinuteInt = parseInt(openingMinute, 10);
            const closingHourInt = parseInt(closingHour, 10);
            const closingMinuteInt = parseInt(closingMinute, 10);
    
            // Add leading zero to opening and closing hour/minute if needed
            setOpeningHour(openingHourInt < 10 ? `0${openingHourInt}` : `${openingHourInt}`);
            setOpeningMinute(openingMinuteInt < 10 ? `0${openingMinuteInt}` : `${openingMinuteInt}`);
            setClosingHour(closingHourInt < 10 ? `0${closingHourInt}` : `${closingHourInt}`);
            setClosingMinute(closingMinuteInt < 10 ? `0${closingMinuteInt}` : `${closingMinuteInt}`);
        }
    };
    const selectedDaysFullNames = selectedDays.map((day) => {
        const fullName = daysOfWeek.find((fullDay) => fullDay.startsWith(day));
        return fullName || day;
    });
   


    const saveCourtToLocalStroge = async (perm) => {
        await AsyncStorage.setItem('Court', JSON.stringify(perm));
    }
    const [responseData, setResponseData] = useState(null);
    const handleNavigate = async () => {
        try {
            if (
                openingHour === '' ||
                openingMinute === '' ||
                closingHour === '' ||
                closingMinute === '' ||
                CourtName === '' ||
                areaName === ''
            ) {
                Alert.alert('Please fill select the Número de dorsal');
            } else {
                const formattedOpeningHour = openingHour.padStart(2, '0');
                const formattedOpeningMinute = openingMinute.padStart(2, '0');
                const formattedClosingHour = closingHour.padStart(2, '0');
                const formattedClosingMinute = closingMinute.padStart(2, '0');
                let payloay = {
                    name: CourtName,
                    address: areaName,
                    openingTime: `${formattedOpeningHour}:${formattedOpeningMinute} ${openingPeriod}`,
                    days: selectedDaysFullNames,
                    closingTime: `${formattedClosingHour}:${formattedClosingMinute} ${closingPeriod}`,
                    images: ImagesData.selectedImages.map(image => image.uri),
                    long:pinCoordinate.longitude,
                    lat:pinCoordinate.latitude
                };
                setLoading(true);
                setTimeout(() => {
     
                    setLoading(false);
                    
                    console.log('Data posted successfully:', payloay);
                }, 2000);
            
            
                const accessToken = await AsyncStorage.getItem('accessTokenCourt');
                const apiUrl = API_URL_POST;
                console.log(openingTime, closingTime)
                const response = await axios.post(apiUrl, payloay, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                setResponseData(response.data.data);
                saveCourtToLocalStroge(response.data.data)
                console.log('Data posted successfully:', response.data.data,);
                navigation.navigate('CourtDashboard');
                
            }
            

        } catch (error) {
            console.error('Error posting data:', error.response);
        }
    }

    return (

        // <View style={styles.container}>

        <View style={[styles.inputContainer, { paddingTop: 0 }]}>
           
   <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              showsUserLocation={true}
              onPress={handleMapPress}
              onMapReady={handleMapReady}
            >
              {pinCoordinate && (
                <Marker
                  coordinate={pinCoordinate}
                  title='Selected Location'
                  pinColor='green'
                  draggable
                  onDragEnd={(e) => {
                    reverseGeocode(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
                  }}
                />
              )}
            </MapView>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Icons name='close' size={30} color="rgba(64, 134, 57, 1)" />
          </TouchableOpacity>
        </View>
      </Modal>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  >
                <Text style={styles.MainHeading} >
                    ¿Cuál es el número que utilizas?
                </Text>
                
                <CustomInputFeild focus={true} labelName='Nombre del terreno' value={CourtName}
                    onChangeText={(text) => setCourtName(text)}
                />
                <CustomInputFeild focus={true} labelName='Ubicación' value={areaName} onChangeText={(text) => setLocation(text)} />
<TouchableOpacity style={{marginLeft:10}} onPress={() => setModalVisible(true)}>
        <Text style={{color:'#408639',fontFamily:Fonts.MEDIUM,fontSize:12}}>Abrir Mapa selecciona tu ubicación</Text>
      </TouchableOpacity>
                
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ImagesAdd')}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.mainText,{color:'black'}]}>Imágenes</Text>
                        <Icons name='arrow-forward-ios' size={20} color="rgba(64, 134, 57, 1)" />

                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => setShowDropdown(!showDropdown)}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.mainText,{color:'black'}]}>Horarios</Text>
                        <Icons name="arrow-forward-ios" size={20} color="rgba(64, 134, 57, 1)" />
                    </View>
                </TouchableOpacity>

                {showDropdown &&

                    <View style={styles.mainContainerSlip}>
                        <Text style={styles.TextHeading}>Día</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                            {daysOfWeek.map(day => day.slice(0, 3)).map((day) => (
                                <TouchableOpacity
                                    key={day}
                                    onPress={() => toggleDaySelection(day)}
                                    style={[styles.WeekDays, {
                                        backgroundColor: selectedDays.includes(day) ? '#408639' : 'rgba(33, 33, 33, 0.15)',
                                        height: 35,
                                        width: 35,
                                    }
                                    ]}
                                >
                                    <Text style={[styles.WeekDaysText, { color: selectedDays.includes(day) ? 'white' : 'black' }]}>{day}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.TextHeading,{color:'black'}]}>Hora de apertura</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <TextInput
                                        placeholderTextColor='#212121'
                                        backgroundColor="white"
                                        placeholder="HH"
                                        keyboardType="numeric"
                                        maxLength={2}
                                        value={openingHour}
                                        onChangeText={(text) => setOpeningHour(text.replace(/[^0-9]/g, ''))}
                                        onFocus={() => handleFocus(1)}
                                        onBlur={handleBlur}
                                        style={[
                                            styles.inputfeildD,
                                            { borderColor: focusedIndex === 1 ? '#212121' : 'white' },
                                        ]}
                                    />
                                    <Text style={[styles.TextHeading, { paddingTop: 2 ,color: 'black'}]}>Hora</Text>
                                </View>
                                <View>
                                    <Dot name='dots-two-vertical' style={{ fontSize: 38, color: '#408639', width: 30, textAlign: 'center', paddingBottom: 30 }} />
                                </View>
                                <View>
                                    <TextInput
                                        placeholder="MM"
                                        keyboardType="numeric"
                                        placeholderTextColor='#212121'
                                        backgroundColor="white"
                                        maxLength={2}
                                        value={openingMinute}
                                        onChangeText={(text) => setOpeningMinute(text.replace(/[^0-9]/g, ''))}
                                        onFocus={() => handleFocus(2)}
                                        onBlur={handleBlur}
                                        style={[
                                            styles.inputfeildD,
                                            { borderColor: focusedIndex === 2 ? '#212121' : 'white' },
                                        ]}
                                    />
                                    <Text style={[styles.TextHeading, { paddingTop: 2, paddingLeft: 10 ,color: 'black'}]}>Minuto</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <TouchableOpacity onPress={() => setOpeningPeriod('AM')} style={[styles.periodButton, { backgroundColor: openingPeriod === 'AM' ? '#408639' : 'white' }]}>
                                        <Text style={[styles.periodText, { color: openingPeriod === 'AM' ? 'white' : 'black' }]}>AM</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setOpeningPeriod('PM')} style={[styles.periodButton, { backgroundColor: openingPeriod === 'PM' ? '#408639' : 'white', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, borderTopRightRadius: 0, borderTopLeftRadius: 0 }]}>
                                        <Text style={[styles.periodText, { color: openingPeriod === 'PM' ? 'white' : 'black' }]}>PM</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View >
                            <Text style={[styles.TextHeading,{color:'black'}]}>Horario de cierre</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <TextInput
                                        placeholder="HH"
                                        keyboardType="numeric"
                                        placeholderTextColor='black'
                                        backgroundColor="white"
                                        maxLength={2}
                                        value={closingHour}
                                        onChangeText={(text) => setClosingHour(text.replace(/[^0-9]/g, ''))}
                                        onFocus={() => handleFocus(3)}
                                        onBlur={handleBlur}
                                        style={[
                                            styles.inputfeildD,
                                            { borderColor: focusedIndex === 3 ? '#212121' : 'white' },
                                        ]}
                                    />
                                    <Text style={[styles.TextHeading, { paddingTop: 2 ,color: 'black'}]}>Hora</Text>
                                </View>
                                <View>
                                    <Dot name='dots-two-vertical' style={{ fontSize: 38, color: '#408639', width: 30, textAlign: 'center', paddingBottom: 30 }} />
                                </View>
                                <View >
                                    <TextInput
                                        placeholder="MM"
                                        keyboardType="numeric"
                                        placeholderTextColor='#212121'
                                        backgroundColor="white"
                                        maxLength={2}
                                        value={closingMinute}
                                        onChangeText={(text) => setClosingMinute(text.replace(/[^0-9]/g, ''))}
                                        onFocus={() => handleFocus(4)}
                                        onBlur={handleBlur}
                                        style={[
                                            styles.inputfeildD,
                                            { borderColor: focusedIndex === 4 ? '#212121' : 'white' },
                                        ]}
                                    />
                                    <Text style={[styles.TextHeading, { paddingTop: 2, paddingLeft: 10 ,color: 'black'}]}>Minuto</Text>
                                </View>
                                <View style={{ marginTop: -30 }}>
                                    <TouchableOpacity onPress={() => setClosingPeriod('AM')} style={[styles.periodButton, { backgroundColor: closingPeriod === 'AM' ? '#408639' : 'white', }]}>
                                        <Text style={[styles.periodText, { color: closingPeriod === 'AM' ? 'white' : 'black' }]}>AM</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setClosingPeriod('PM')} style={[styles.periodButton, { backgroundColor: closingPeriod === 'PM' ? '#408639' : 'white', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, borderTopRightRadius: 0, borderTopLeftRadius: 0 }]}>
                                        <Text style={[styles.periodText, { color: closingPeriod === 'PM' ? 'white' : 'black' }]}>PM</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View >
                        <View style={styles.buttonSetClear}>
                            <Watch name="time-outline" style={{ color: 'black', fontSize: 25 }} />
                            <View style={{ flexDirection: 'row', justifyContent: "flex-end", alignItems: 'center' }}>
                                <TouchableOpacity onPress={handleClear} style={[styles.button,]}>
                                    <Text style={{ color: 'black', textAlign: 'center' }}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleSave} style={[styles.button,]}>
                                    <Text style={{ color: '#408639', textAlign: 'center' }}>Colocar</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                }

            </ScrollView>
            <View style={styles.nextButton}>
                <Button loading={loading} text='Siguiente' Link={handleNavigate} />
            </View>

        </View>

        // </View>


    )
}

const styles = StyleSheet.create({
    closeButton:{
        textAlign:'center',
        marginTop:20,
        marginLeft:10,
        width:100
    },
    mapReady: {
        backgroundColor: 'green',
        color:'blue',
        marginRight:40 // Change background color when map is ready
      },
    buttonContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        fontFamily: Fonts.MEDIUM,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
    inputContainer: {
paddingHorizontal:20,
        flex: 1,
        // marginLeft: 20,
        // marginRight: 30,
        width: '100%'
    },
    nextButton: {
        bottom: 10,
        backgroundColor: 'white'
    },
    MainContainer: {
        flex: 1,
        alignItems: 'center',

        width: 'auto',
        paddingLeft: 5,
        paddingRight: 5

    },
    MainHeading: {
        fontSize: 28,
        color: 'black',
        textAlign: 'center',
        fontFamily: Fonts.BOLD,
        width: 330,
        lineHeight: 36,
        paddingTop: 20,
        paddingBottom: 20
    },
    buttonSetClear: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    TextHeading: {
        fontFamily: Fonts.MEDIUM,
        fontSize: 12,
        paddingBottom: 10,
        paddingTop: 10,
    },
    WeekDays: {
        backgroundColor: 'rgba(33, 33, 33, 0.15)',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
    },
    WeekDaysText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: Fonts.MEDIUM,
        fontSize: 12,
    },
    inputfeildD: {
        width: 85,
        borderRadius: 8,
        borderWidth: 2,
        textAlign: 'center',
        fontSize: 30,
        color: '#212121',
        fontFamily: Fonts.REGULAR,
        marginRight: 10,
    },
    periodButton: {
        backgroundColor: 'white',
        padding: 6,
        marginLeft: 10,
        borderWidth: 0.5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        width: 70,

    },
    periodText: {
        fontFamily: Fonts.MEDIUM,
        fontSize: 14,
        textAlign: 'center',
    },
    button: {
        padding: 10,
    },
    mainContainerSlip: {
        backgroundColor: 'rgba(64, 134, 57, 0.05)',
        padding: 15,
        borderRadius: 16,
        borderColor: '#408639',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 20
    },
    MainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    textContainer: {
        flex: 1, // Take remaining space
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,// width: 345,
        paddingLeft: 12,
        padding: 16,
        paddingRight: 25,
        fontSize: 14,
        lineHeight: 20,
        borderRadius: 10,
        borderWidth: 0.25,
        borderColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 1 },
        color: '#212121',
        fontFamily: Fonts.MEDIUM,
        backgroundColor: 'rgba(64, 134, 57, 0.05)'

    },
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        // justifyContent: 'flex-end',
        alignItems: 'center',
        flex:1,
        zIndex:99,
        marginTop:20
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      modalContainer:{
        backgroundColor:'red',
        width:'100%',
        height:'100%',
      },
      mapContainer:{
        flex:1,
        ...StyleSheet.absoluteFillObject,
        
     
      }
});

export default CustomizeProfilePrefferd