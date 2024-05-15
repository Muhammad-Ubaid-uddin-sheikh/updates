
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity ,Alert} from 'react-native';
import NewIcons from 'react-native-vector-icons/Fontisto'
import axios from 'axios';
import Dot from 'react-native-vector-icons/Entypo';
import Watch from 'react-native-vector-icons/Ionicons'
import CustomInputFeild from '../../../components/inputFeildCustom'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Buttons from '../../../components/Button';
import { Fonts } from '../../style';
import Icons from 'react-native-vector-icons/MaterialIcons'
const API_URL_GET_GROUND = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/getMyCourts';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/getProfile';
const API_URL_POST = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/editProfile';
const API_URL_POSTCOURT = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/updateCourt';
const Sigup = ({ navigation }) => {
    const [showDropdown, setShowDropdown] = useState(true);
    const [openingHour, setOpeningHour] = useState('');
    const [openingMinute, setOpeningMinute] = useState('');
    const [openingPeriod, setOpeningPeriod] = useState('AM');
    const [closingHour, setClosingHour] = useState('');
    const [closingMinute, setClosingMinute] = useState('');
    const [closingPeriod, setClosingPeriod] = useState('PM');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [CourtName, setCourtName] = useState('')
    const [address, setaddress] = useState('')
    const [groundData, setGroundData] = useState({
      name: "",
      type: "",
      pricing: '',
      openingTime: "",
      closingTime: "",
      days: '',
      address: "",
      courtId:""
  });
  console.log('Grounddata',groundData)

    const [selectedDays, setSelectedDays] = useState([]);
    const toggleDaySelection = (day) => {
      const isSelected = groundData.days.includes(day);
      if (isSelected) {
          setSelectedDays(groundData.days.filter((groundData) => groundData !== day));
      } else {
          setSelectedDays([...groundData.days, day]);
      }
    }

    const openingTime = `${openingHour.padStart(2, '0')}:${openingMinute.padStart(2, '0')} ${openingPeriod}`;
    const closingTime = `${closingHour.padStart(2, '0')}:${closingMinute.padStart(2, '0')} ${closingPeriod}`;
    const handleFocus = (index) => {
        setFocusedIndex(index);
    };

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    _id: '',
    email: '',
    username: '',
    name: '',
    dob: '',
  });
    const handleBlur = () => {
        setFocusedIndex(-1);
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
           const payload = {
                name: CourtName,
                location: Location,
                openingTime: openingTime,
                days: groundData,
                closingTime: closingTime
            };
            console.log(payload)
        }
    };


  const fetchUserData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessTokenCourt');
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.status) {
        setUserData(response.data.data || {});
        console.log(JSON.stringify(response.data.data))
      } else {
        Alert.alert('Failed to fetch user data');
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error.response));
    }
  };
  const fetchGroundData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessTokenCourt');
      const groundResponse = await fetch(API_URL_GET_GROUND, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
  
    if (groundResponse.ok) {
      const responseData = await groundResponse.json();
      if (responseData.data && responseData.data.length > 0) {
        const ground = responseData.data[0];
        // const daysFromAPI = responseData.data[0].days
        // setSelectedDays(daysFromAPI);
        setGroundData(ground)

      }
      } else {
        Alert.alert('Failed to fetch ground data');
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error.response));
    }
  };
  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessTokenCourt');
      const response = await axios.post(API_URL_POST, userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.status && response.data.data === 'updated') {
        alert('Profile updated successfully');
        fetchUserData();
      } else {
        Alert.alert('Failed to update profile');
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error.response));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key, value) => {
    setUserData({
      ...userData,
      [key]: value
    });
    
  };
  const handleChangeClender = (key, value) => {
    setGroundData({
      ...groundData,
      [key]: value
      
    });
  };
  useEffect(() => {
    fetchUserData();
    fetchGroundData()
  }, []);
  return (

    <ScrollView style={styles.form} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

<View style={{flex:1,justifyContent:'center'}}>
      <View style={[styles.inputContainer,{paddingTop:0}]}>
      <View>
      <CustomInputFeild focus={true} labelName='Nombre' value={userData.name} onChangeText={(text) => handleInputChange('name', text)} />
        <CustomInputFeild focus={false} labelName='Nombre de usuario' value={userData.username}
          onChangeText={(text) => handleInputChange('username', text)} />
      </View>
      
      <View>
        <CustomInputFeild focus={true} labelName='Fecha de nacimiento' value={userData.dob}
          onChangeText={(text) => handleInputChange('dob', text)} />
        <NewIcons name='date' style={styles.eyeIcon} size={17} />
        </View>
      <CustomInputFeild focus={false} labelName='Email' value={userData.email}
          onChangeText={(text) => handleInputChange('email', text)} />
        <CustomInputFeild focus={true} labelName='Nombre del terreno' value={groundData.name}
          onChangeText={(text) => handleChangeClender('name', text)} />
        <CustomInputFeild  focus={true} labelName='Ubicación' value={groundData.address}
          onChangeText={(text) => handleChangeClender('address', text)} />
           <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('EditImagesGalary',{groundData})}>
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
                            <Text style={[styles.TextHeading,{color:'black'}]}>Día</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                    <TouchableOpacity
                        key={day}
                        onChangeText={(text) => handleChangeClender('days', text)}
                        onPress={() => toggleDaySelection(day)}
                        style={[styles.WeekDays, {
                            backgroundColor: groundData.days.includes(day) ? '#408639' : 'rgba(33, 33, 33, 0.15)',
                            height: 35,
                            width: 35,
                        }
                        ]}
                                    >
                                        <Text style={[styles.WeekDaysText, { color: groundData.days.includes(day) ? 'white' : 'black' }]}>{day.substr(0, 3)}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.TextHeading}>Hora de apertura</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <TextInput
                                            placeholderTextColor='#212121'
                                            backgroundColor="white"
                                            placeholder="HH"
                                            keyboardType="numeric"
                                            maxLength={2}
                                            value={groundData.openingTime}
                                            // onChangeText={(text) => setOpeningHour(text.replace(/[^0-9]/g, ''))}
                                            onChangeText={(text) => handleChangeClender('openingTime', text)}
                                            onFocus={() => handleFocus(1)}
                                            onBlur={handleBlur}
                                            style={[
                                                styles.inputfeildD,
                                                { borderColor: focusedIndex === 1 ? '#212121' : 'white' },
                                            ]}
                                        />
                                        <Text style={[styles.TextHeading, { paddingTop: 2 }]}>Hora</Text>
                                    </View>
                                    <View>
                                        <Dot name='dots-two-vertical' style={{ fontSize: 38, color: '#212121', width: 30, textAlign: 'center', paddingBottom: 30 }} />
                                    </View>
                                    <View>
                                        <TextInput
                                            placeholder="MM"
                                            keyboardType="numeric"
                                            placeholderTextColor='#212121'
                                            backgroundColor="white"
                                            maxLength={2}
                                            value={groundData.openingTime?.slice(3)}
                                            onChangeText={(text) => handleChangeClender('openingTime', text)}
                                            onFocus={() => handleFocus(2)}
                                            onBlur={handleBlur}
                                            style={[
                                                styles.inputfeildD,
                                                { borderColor: focusedIndex === 2 ? '#212121' : 'white' },
                                            ]}
                                        />
                                        <Text style={[styles.TextHeading, { paddingTop: 2, paddingLeft: 10 }]}>Minuto</Text>
                                    </View>
                                    <View style={{ marginTop: -30 }}>
                                        <TouchableOpacity onPress={() => setOpeningPeriod('AM')} style={[styles.periodButton, { backgroundColor: openingPeriod === 'AM' ? 'black' : 'white' }]}>
                                            <Text style={[styles.periodText, { color: openingPeriod === 'AM' ? 'white' : 'black' }]}>AM</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setOpeningPeriod('PM')} style={[styles.periodButton, { backgroundColor: openingPeriod === 'PM' ? 'black' : 'white', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, borderTopRightRadius: 0, borderTopLeftRadius: 0 }]}>
                                            <Text style={[styles.periodText, { color: openingPeriod === 'PM' ? 'white' : 'black' }]}>PM</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View >
                                <Text style={styles.TextHeading}>Horario de cierre</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <TextInput
                                            placeholder="HH"
                                            keyboardType="numeric"
                                            placeholderTextColor='#212121'
                                            backgroundColor="white"
                                            maxLength={2}
                                            value={groundData.closingTime}
                                            onChangeText={(text) => handleChangeClender('closingTime', text)}
                                            onFocus={() => handleFocus(3)}
                                            onBlur={handleBlur}
                                            style={[
                                                styles.inputfeildD,
                                                { borderColor: focusedIndex === 3 ? '#212121' : 'white' },
                                            ]}
                                        />
                                        <Text style={[styles.TextHeading, { paddingTop: 2 }]}>Hora</Text>
                                    </View>
                                    <View>
                                        <Dot name='dots-two-vertical' style={{ fontSize: 38, color: '#212121', width: 30, textAlign: 'center', paddingBottom: 30 }} />
                                    </View>
                                    <View >
                                        <TextInput
                                            placeholder="MM"
                                            keyboardType="numeric"
                                            placeholderTextColor='#212121'
                                            backgroundColor="white"
                                            maxLength={2}
                                            value={groundData.closingTime?.slice(3)}
                                            onChangeText={(text) => handleChangeClender('closingTime', text)}
                                            onFocus={() => handleFocus(4)}
                                            onBlur={handleBlur}
                                            style={[
                                                styles.inputfeildD,
                                                { borderColor: focusedIndex === 4 ? '#212121' : 'white' },
                                            ]}
                                        />
                                        <Text style={[styles.TextHeading, { paddingTop: 2, paddingLeft: 10 }]}>Minuto</Text>
                                    </View>
                                    <View style={{ marginTop: -30 }}>
                                        <TouchableOpacity onPress={() => setClosingPeriod('AM')} style={[styles.periodButton, { backgroundColor: closingPeriod === 'AM' ? 'black' : 'white', }]}>
                                            <Text style={[styles.periodText, { color: closingPeriod === 'AM' ? 'white' : 'black' }]}>AM</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setClosingPeriod('PM')} style={[styles.periodButton, { backgroundColor: closingPeriod === 'PM' ? 'black' : 'white', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, borderTopRightRadius: 0, borderTopLeftRadius: 0 }]}>
                                            <Text style={[styles.periodText, { color: closingPeriod === 'PM' ? 'white' : 'black' }]}>PM</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View >
                            {/* <View style={styles.buttonSetClear}>
                                <Watch name="time-outline" style={{ color: 'black', fontSize: 25 }} />
                                <View style={{ flexDirection: 'row', justifyContent: "flex-end", alignItems: 'center' }}>
                                    <TouchableOpacity onPress={handleClear} style={[styles.button,]}>
                                        <Text style={{ color: 'black', textAlign: 'center' }}>Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={handleSave} style={[styles.button,]}>
                                        <Text style={{ color: '#408639', textAlign: 'center' }}>Colocar</Text>
                                    </TouchableOpacity>

                                </View> */}
                            {/* </View> */}
                        </View>

                    }
          <View style={{marginTop:20,marginBottom:20}}>
          <Buttons loading={loading} text='Actualizar' Link={handleProfileUpdate} />
          </View>
          
      </View>
      </View>
    </ScrollView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
    paddingTop: 10,
  },

  paragraphs: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#61646B',
    letterSpacing: 1,
    fontFamily: Fonts.MEDIUM
  },
  inputContainer: {
    position: 'relative',
    marginLeft: 22,
    marginRight: 30,

  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    padding: 16,
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 30,
    top: 30,
    color: '#408639'
  },

  eyeText: {
    fontSize: 20,
  }, phoneInputContainer: {
    width: '100%',
    fontSize: 14,
    // width: 345,
    borderRadius: 12,
    borderWidth: 0.25,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    shadowRadius: 2,
    color: '#212121',
    backgroundColor: 'rgba(64, 134, 57, 0.05)', opacity: 1,
    fontFamily: Fonts.MEDIUM
  },
  phoneInputTextContainer: {
    marginLeft: -10,
    padding: 0,
    margin: 0,
    fontSize: 14,
    borderRadius: 12,
    color: '#212121',
    backgroundColor: 'transparent',
    opacity: 1,
    fontFamily: Fonts.MEDIUM,

  },
  phoneInputText: {
    fontSize: 14,
    color: '#212121',
    fontFamily: Fonts.MEDIUM,

  },
  phoneInputCodeText: {
    fontSize: 14,
    color: '#212121',
  },
  phoneInputFlagButton: {
    borderWidth: 0,

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
    color:'black'
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
    width: 87,
    borderRadius: 8,
    borderWidth: 2,
    textAlign: 'center',
    fontSize: 30,
    color: '#212121',
    fontFamily: Fonts.REGULAR,
    marginRight: 10,
    paddingTop:8,
    paddingBottom:8,
    padding:8
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
    // marginBottom:20,
    marginTop:10
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
    color: '#212121',
    fontFamily: Fonts.MEDIUM,
    backgroundColor: 'rgba(64, 134, 57, 0.05)'

},
buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontFamily: Fonts.MEDIUM,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: 10,
    paddingTop: 10,
  },
});

export default Sigup;
