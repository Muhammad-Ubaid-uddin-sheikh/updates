import React, { useState } from 'react'
import { Alert, Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ButtonslipAndcencel from '../../components/ButtonslipAndcencel'
import { Fonts } from '../style'
import Button from '../../components/Button';
import NewIcons from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checking from '../../components/inputFeildCustom'
import axios from 'axios';
const API_Create = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/startAGame';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getMyBookings';
const FindGames = ({ navigation }) => {
    const [CourtPopup, setCourtPopup] = useState(false);
    const [courtName, setCourtName] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [data,setData] = useState()
    const [timingRange,settimingRange] = useState([null])
    const [numberofPlayer,setnumberofPlayer] = useState('')
    const [jarasycolor,setjarasycolor] =  useState('')
    const [text, setText] = useState('');
    const [date,setdate] = useState('')
    const [matchType,setmatchType] = useState('')
    const [PricePer,setPricePer] = useState('')
    const[feildId,setfieldId] = useState(null)
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const handlePoupupNavigate = () => {
      navigation.navigate('DashboardMain')
      setIsLogoutModalVisible(false)
     
  };
  const handleCancel = () => {
    setIsLogoutModalVisible(false);
  };
    console.log(selectedId,timingRange)
    const dateString = date
const dateConvert = new Date(dateString);
const formattedDate = dateConvert.toLocaleDateString();
   
const paylod = {
  players: [],
  fieldId:feildId,
  maxPlayers:numberofPlayer,
  duration:"1 Hours",
  matchType:matchType,
  pricePerPerson:PricePer,
  teamOneJerseyColor:jarasycolor,
  teamSecondJerseyColor:"",
  startTime:timingRange[0],
  date:formattedDate,
  lookingFor:"Individual",
  note:text,
  bookingId:selectedId
}
const handleNavigate = async()  => {
  // navigation.navigate('GameStart')
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(API_Create, paylod ,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data) {
      console.log('APIDATA', response.data);
      setIsLogoutModalVisible(true);
      // setIsLoggingOut(true);
      // fetchCourtData()
    } else {
      Alert.alert('Failed to delete court field');
    }
  } catch (error) {
    console.error('Delete Error:', error.response.data);
    Alert.alert('Failed to delete court field');
  }
  console.log('paylod',paylod)
}
    const handleCourtnamePress = async (id, name,date,timingRange,fieldId) => {
        setCourtName(name);
        setSelectedId(id);
        setfieldId(fieldId)
        setdate(date)
        setCourtPopup(false);
       
        settimingRange(timingRange)
        console.log('asdasdasdas',date)
      };
    const handleSelectFirst = item => {
        setCanchaval(item);
        setCanchavalVisible(false);
    };
    const handlePressCheck = ()=>{
        setCourtPopup(!CourtPopup)
        fetchData();
      }
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem('accessToken');
          // setsenderId(token)
          const response = await fetch(API_URL, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.ok) {
            const responseData = await response.json();
            setData(responseData.data)
            
            console.log('responseasdasd',responseData.data,)
        
          } else {
            console.error('API Error:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } 
      };
  console.log(timingRange)
    return (


      <View style={styles.MainContainer}>
           {/* <StatusBar backgroundColor={'white'}  barStyle="dark-content" /> */}
          <ScrollView style={[styles.form,]} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

                <Text style={styles.headingMain}>
                    Comienza un partido
                </Text>
                <Text style={[styles.headingMain,{fontSize:20,paddingBottom:0,paddingTop:5}]}>Detalles de partido</Text>
               
                <TouchableOpacity onPress={handlePressCheck}>
            <TextInput
              placeholderTextColor="black"
              editable={false}
              placeholder="Por favor seleccione una cancha  "
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
              {data?.length === 0 ? (
                <View style={{ paddingTop: 10 }}>
                  <Text style={styles.empltyText}>No available Courts plz book the court</Text>
                </View>
              ) : (
                <View style={{ marginTop: 10, paddingLeft: 10, paddingRight: 5, flexDirection: 'row', justifyContent: 'flex-start', width: '100%', flexWrap: 'wrap', gap: 5 }}>
                  {data?.map(({ _id,courtName,date,timingRange,fieldId }) => (
                    <TouchableOpacity key={_id} onPress={() => handleCourtnamePress(_id, courtName,date,timingRange,fieldId)}>
                      <Text style={{ fontSize: 15, color: 'black', width: 300, fontFamily: Fonts.MEDIUM }}>{courtName}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
               )}
               
                {timingRange?.map((timing,index) => (
               <Checking key={index} focus={false} labelName='Hora de inicio' value={timing}  />
                ))}
                <View style={[styles.inputContainer,]}>
              
                <Checking  focus={false} labelName='Duración' value={'1 horas'}  />
                <Checking  focus={false} labelName='Fecha' value={formattedDate}  />
                <Checking  focus={false} labelName='Buscando'  value={'Individual'}/>
                <Checking Type='number'  focus={true} labelName='Precio Por Persona' onChangeText={(text) =>  setPricePer(text)} value={PricePer}/>
                <Checking  focus={true} labelName='Tipo de partido' value={matchType} onChangeText={(text) =>  setmatchType(text)}  />
                <Checking   Type='number' focus={true} labelName='Maximo de jugadores' onChangeText={(text) => setnumberofPlayer(text)} value={numberofPlayer}/>
                <Checking  focus={true} labelName='Color de playera' onChangeText={(text) => setjarasycolor(text)} value={jarasycolor}/>
                <TextInput
        style={[styles.input,{marginTop:10}]}
        multiline={true}
        numberOfLines={3}
        value={text}
        onChangeText={setText}
        placeholder="Escriba su nota  "
      />
                {/* <Checking  focus={true} labelName='Tipo de partido' onChangeText={(text) => setMatch(text)} value={Match}/> */}
                </View>
               
            {/* </View> */}
          </ScrollView>
          <Modal
        visible={isLogoutModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancel}
        onBackdropPress={handleCancel}
        onBackButtonPress={handleCancel}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={{backgroundColor:'white',width:120,borderRadius:100,height:120,alignItems:'center',opacity:1}}>
            <Image source={require('../../assets/CheckIconImg.png')} style={{width:'100%',height:100,objectFit:'contain',zIndex:1}} />
            </View>
          
            <Text style={[styles.modalText,{marginTop:10}]}>Partido creado con éxito</Text>
            <Text style={{fontFamily:Fonts.REGULAR,fontSize:14,color:'white',paddingBottom:10,marginTop:20}}>Por favor envíe un mensaje al otro equipo para obtener más detalles.</Text>
<Text style={{fontFamily:Fonts.REGULAR,fontSize:14,color:'white',paddingBottom:15,marginTop:10}}>Gracias !</Text>
            <View style={{width:'100%'}}>
            
                <Button text='Exitosa' Link={handlePoupupNavigate}/>
        
                
            </View>
          </View>
        </View>
       
      </Modal>
            <View style={styles.nextButton}>
                <View style={{marginBottom:5}}> 
                <ButtonslipAndcencel ColorIcon='white'IconColor="#212121" ColorText="#212121" IconName="clear" text="Cancelar" Link={()=>navigation.navigate('Discovery')} />
                </View>
           
                <Button text="Reservar una cancha" Link={handleNavigate} />
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
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
        width:'100%'
      },
    headingMain: {
        fontSize: 24,
        color: '#212121',
        letterSpacing: 0.2,
        width: 'auto',
        fontFamily: Fonts.BOLD,
        marginLeft: 2,
        textAlign: 'left',
        // paddingBottom: 20,
        paddingTop: 20,
        // paddingHorizontal:20
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 10,
       width:'100%',
        paddingBottom:20
    },
    MainHeading: {
        fontSize: 19,
        color: '#212121',
        letterSpacing: 0.2,
        width: 'auto',
        fontFamily: Fonts.BOLD,
        marginLeft: 2,
        textAlign: 'left'
    },
    MainContainer: {
        backgroundColor: 'white',
        flex: 1,
        // paddingLeft: 10,
        // paddingRight: 10,
        paddingBottom: 5,
        alignItems: 'center',justifyContent:'space-between',
        paddingHorizontal:20
    },
    nextButton: {
        // position: 'absolute',
        bottom: 10,
        width: '100%',
        paddingTop:10,

    },
    form: {
        backgroundColor: '#fff',
        // height:200,
         position: 'relative',
        //  paddingTop: 15,
        //  paddingLeft:18,
        //  paddingRight:18,
         paddingBottom:10,
         width:'100%',
         marginTop:20

    },
    eyeIcon: {
        position: 'absolute',
        right: 30,
        top: 20,
        color: '#408639',
      },
      modalBackground: {
        flex: 1,
        backgroundColor: '#4d4d4d',
        justifyContent: 'center',
        alignItems: 'center',
        opacity:0.8,
        
       
      },
      modalContent: {
        // backgroundColor: 'white',
        padding: 35,
        alignItems: 'center',
        width:'90%'
      },
      modalText: {
        // marginBottom: 15,
        textAlign: 'center',
        fontFamily:Fonts.BOLD,
        color:'#E7F0EE',
        fontSize:30
      },
})

export default FindGames