
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import CustomInputFeild from '../../../../../../components/inputFeildCustom'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Buttons from '../../../../../../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Foot from '../../../../../setting/Foot'
import NewIcons from 'react-native-vector-icons/Fontisto';
import ImaeUrlBased from '../../../../../../apis/ImageBasedUrl'
import { Fonts } from '../../../../../style';
const Uplaod_ImageURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/upload'
const API_URL_POST = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/updateFieldDetails'
const EditCourtFeilds = ({ route,navigation}) => {
    const {item} = route.params;
    const [imageUriItem] = item.images
  const [Fieldname, setFieldname] = useState(item.name)
  const [TurfType, setTurfType] = useState(item.turfType)
  const [imagePaths, setImagePaths]  = useState([])
  const [imageUri, setImageUri] = useState(imageUriItem);
  const [CourtPopup, setCourtPopup] = useState(false);
const handleSelect = (value) => {
  setSelectedSessionDuration(value);
  setCourtPopup(!CourtPopup)
};
  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        uploadImage(image.path);
        setImageUri(image.path)
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };
const [selectedSessionDuration, setSelectedSessionDuration] = useState(null);
console.log('selectedSessionDuration',item._id)
const [iCanchavalVisible, setCanchavalVisible] = useState(false);
useEffect(() => {
    if (item.sessionDuration) {
      setSelectedSessionDuration(item.sessionDuration.toString());
    }
  }, [item.sessionDuration]);

  const Cancha = [
    { id: 1, name: '30' },
    { id: 2, name: '60' },
    { id: 3, name: '90' },
    { id: 4, name: '120' },
  ];
  
  console.log("imagePath",imagePaths ,'items',item)
  const handleNavigate = async () => {
    const Paylod ={ 
      name:Fieldname,
      turfType:TurfType,
      images:imagePaths,
      sessionDuration:selectedSessionDuration,
      fieldId:item._id
    }
   try {
    if (
      Fieldname === '' ||
      TurfType === '' ||
      imageUri === null 
  ) {
      Alert.alert('Error', 'Please fill all fields');
  } else {  
    const accessToken = await AsyncStorage.getItem('accessTokenCourt'); // Replace with your actual access token
    const apiUrl = API_URL_POST; 
    const response = await axios.post(apiUrl, Paylod, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(Paylod)
    navigation.navigate('AnalyticsScreen')
    Alert.alert('update Your Court Feild')
  }
        
   } catch (error) {
    
    console.error('Error posting data:', error);
 
   }
  }
  const uploadImage = async (image)=> {
   
    console.log('useefftworking')
    const formdData = new FormData()
    formdData.append('image', {
      uri: image,
      type: 'image/jpeg', 
      name: 'image.jpg', 
    });
    try {
      const token = await AsyncStorage.getItem('accessTokenCourt')
      const res = await axios.post(Uplaod_ImageURL,formdData, {
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }
      })
     if(res.data.code == 200) setImagePaths([...imagePaths, res.data.data.path])
      console.log("imageRes", res.data.data)

      
    } catch (error) {
      console.log("errror", error.response)
    }
   

  }

  useEffect(()=>{
    if(Boolean(imageUriItem)){
      setImagePaths(imageUriItem)
    }
  },[imageUriItem])


  return (
<View style={{paddingHorizontal:20,flex:1}}>


    <View style={[styles.inputContainer, { paddingTop: 0 }]}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <CustomInputFeild focus={true} labelName='Nombre de la cancha' value={Fieldname}
          onChangeText={(text) => setFieldname(text)}
        />
        <CustomInputFeild focus={true} labelName='Tipo de superficie' value={TurfType} onChangeText={(text) => setTurfType(text)} />
       <View style={{paddingTop:10}}>
       <View style={[styles.inputContainer, { paddingTop: 0 }]}>
          <TouchableOpacity onPress={() => setCourtPopup(!CourtPopup)}>
            <TextInput
              placeholderTextColor="rgba(0, 0, 0, 0.25)"
              editable={false}
              placeholder="Duración de la sesión"
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
              value={selectedSessionDuration}
            />
            {CourtPopup ? (
              <NewIcons name='angle-up' style={styles.eyeIcon} size={15} />
            ) : (
              <NewIcons name='angle-down' style={styles.eyeIcon} size={15} />
            )}
          </TouchableOpacity>
          {CourtPopup && (
            <View style={{
              backgroundColor: 'rgba(64, 134, 57, 0.05)',
              paddingTop: 5,
              marginTop: -1,
              paddingBottom: 13,
              borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.25)',
              borderTopWidth: 0.25,
              borderBottomWidth: 0.25,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}>
              {Cancha.map(option => (
                <TouchableOpacity key={option.id} onPress={() => handleSelect(option.name)}>
                  <Text style={{ padding: 5,paddingLeft:10,fontFamily:Fonts.MEDIUM ,color:'black'}}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          </View>
       </View>      
        <TouchableOpacity style={styles.buttonContainer} onPress={handleImagePicker}>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>Imágenes</Text>
            <Icons name="arrow-forward-ios" size={20} color="rgba(64, 134, 57, 1)" />
          </View>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri:imageUri }} style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 12 }} />}
      </ScrollView>
      <View style={[styles.buttonNextButton, { marginTop: 10, backgroundColor: 'white' }]}>
        <Buttons text='¿Terminaste de actualizar los campos?' Link={handleNavigate} />
      </View>

    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontFamily: Fonts.MEDIUM,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10
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
  mainText: {
    paddingLeft: 8,
    color: '#212121',
    fontFamily: Fonts.MEDIUM,
    fontSize: 15,
    letterSpacing: 0.5
  },

  container: {
    flex: 1,
  },
  buttonNextButton: {
    bottom: 30,
    backgroundColor: 'white',
    position:'absolute',
    width:'100%'
  },
  inputContainer: {
    flex: 1,
    justifyContent:'center',
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

  },
  eyeIcon: {
    position: 'absolute',
    right: 30,
    top: 20,
    color: '#408639'
  },

});

export default EditCourtFeilds;
