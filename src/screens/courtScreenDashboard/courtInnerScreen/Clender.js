
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Button from '../../../components/ButtonCourtOwner';
import { Fonts } from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewIcons from 'react-native-vector-icons/Fontisto';
import Clander from './clander/Clander';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { format } from 'date-fns';

const API_URL_GET = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/getMyCourts';
const API_URL_CLENDER = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/getFieldOccupancyCalendar';
const Clender = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [Feilds, setFeilds] = useState([]);
  const [courtName, setCourtName] = useState([]);
  const [CourtPopup, setCourtPopup] = useState(false);
const [ClenderData,setClenderData] = useState()
const currentDate = new Date();
const formattedDate = format(currentDate, 'eee, MMM dd yyyy');
  const handleCourtnamePress = async (id, name) => {
    await fetchCourtData(); // Fetch court data when the button is pressed
    setCourtName(name);
    setSelectedId(id);
    setCourtPopup(false);
  };

  const clenderdata = ClenderData
  console.log('Feilds',Feilds)
const handlePressCheck = ()=>{
  setCourtPopup(!CourtPopup)
  fetchCourtData();
}
  useEffect(() => {
    fetchCourtData();
  }, []);

  const fetchCourtData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessTokenCourt');
      const response = await fetch(API_URL_GET, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setFeilds(responseData.data[0].fields);
        console.log("dasdasdasdasdsad",responseData.data[0])
      } else {
        console.error('Error fetching court data:');
      }
    } catch (error) {
      console.error('Error fetching court data:');
    }
  };
  const fetchCourtOpaciyClender = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessTokenCourt');
      const response = await fetch(`${API_URL_CLENDER}?fieldId=${selectedId}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
console.log(selectedId,'response',response.data)
      if (response.ok) {
        const responseData = await response.json();
        setClenderData(responseData.data)
        console.log('responseDataopcaty clander',responseData.data)
      } else {
        console.log('Error fetching court data:',);
      }
    } catch (error) {
      console.error('Error fetching court data:',);
    }
  };
  useEffect(() => {
    fetchCourtOpaciyClender();
  }, [selectedId]);
  return (
   <ScrollView style={{backgroundColor:'white',paddingBottom:20}} >
    <View style={styles.MainContainer}>
      <View style={styles.buttonContainer}>
        <View style={[styles.inputContainer, { paddingTop: 10 }]}>
        
          <TouchableOpacity onPress={handlePressCheck}>
            <TextInput
              placeholderTextColor="black"
              editable={false}
              placeholder="Revisa tus instalaciones"
              style={[styles.input, { borderColor: CourtPopup ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.25)', borderRadius: CourtPopup ? 0 : 12, borderTopLeftRadius: CourtPopup ? 12 : 12, borderTopRightRadius: CourtPopup ? 12 : 12, borderTopWidth: CourtPopup ? 0.25 : 0.25, borderBottomWidth: CourtPopup ? 0 : 0.25, borderLeftWidth: CourtPopup ? 0.25 : 0.25, borderRightWidth: CourtPopup ? 0.25 : 0.25 }]}
              value={courtName}
            />
            {CourtPopup ? (
              <NewIcons name='angle-up' style={styles.eyeIcon} size={15} />
            ) : (
              <NewIcons name='angle-down' style={styles.eyeIcon} size={15} />
            )}
          </TouchableOpacity>
          {CourtPopup && (
            <View style={{ backgroundColor: 'rgba(64, 134, 57, 0.05)', paddingTop: 5, marginTop: -1, paddingBottom: 13, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.25)', borderTopWidth: 0, borderWidth: 0.25, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
              {Feilds?.length === 0 ? (
                <View style={{ paddingTop: 10 }}>
                  <Text style={styles.empltyText}>No available Courts</Text>
                </View>
              ) : (
                <View style={{ marginTop: 10, paddingLeft: 10, paddingRight: 5, flexDirection: 'row', justifyContent: 'flex-start', width: 380, flexWrap: 'wrap', gap: 5 }}>
                  {Feilds?.map(({ _id, name }) => (
                    <TouchableOpacity key={_id} onPress={() => handleCourtnamePress(_id, name)}>
                      <Text style={{ fontSize: 15, color: 'black', width: 300, fontFamily: Fonts.MEDIUM }}>{name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      <View >
        <Text style={styles.textHeading}>Filtrar por fecha</Text>
        <Button backgroundIcon="rgba(64, 134, 57, 0.05)" text={formattedDate} FontName="date" ColorIcon="green" Link={() => navigation.navigate('Shadule',{selectedId})} />
        {/* <Button backgroundIcon="rgba(64, 134, 57, 0.05)" text="DD/MM/YYYY" FontName="date" ColorIcon="green" Link={() => navigation.navigate('CourtNameLoc')} />  */}
      </View>
      <View >
        <Text style={[styles.textHeading, { paddingBottom: 15 }]}>Disponibilidad</Text>
        <Clander  apiResponse={ClenderData}/>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 20,
    color: '#000',
    marginTop: 20,
    fontFamily: Fonts.BOLD,
  },
  MainContainer: {
    width: 'auto',
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 30,
    top: 20,
    color: '#408639',
  },
  inputContainer: {
    position: 'relative',
  },
  empltyText: {
    textAlign: 'center',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 10,
    fontFamily: Fonts.MEDIUM,
    paddingTop: 20,
    color:'#408639'
  },
  input: {
    paddingLeft: 12,
    padding: 16,
    fontSize: 14,
    lineHeight: 20,
    borderRadius: 5,
    borderWidth: 0.25,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    color: '#212121',
    fontFamily: 'Satoshi-Medium',
    backgroundColor: 'rgba(64, 134, 57, 0.05)',
  },
});

export default Clender;
