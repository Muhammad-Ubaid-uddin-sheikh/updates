import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView,TextInput ,Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { addSoccer } from '../../../../reduxfolder/reducers/action';
import CustomInputFeild from '../../../components/inputFeildCustom';
import { Fonts } from '../../style';
import Icons from 'react-native-vector-icons/MaterialIcons';
import ButtonslipAndcencel from '../../../components/ButtonslipAndcencel';
import Dot from 'react-native-vector-icons/Entypo';
import Foot from '../../setting/Foot'
const SoccerForm = ({ addSoccer, navigation }) => {
  // const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [Turf, setTurf] = useState('');
  const [PricesFeild,setPricesFeild]= useState('')
  
   const Cancha = [
        { id: 1, name: '30 minutos' },
        { id: 2, name: '60 minutos' },
        { id: 3, name: '90 minutos' },
        { id: 4, name: '120 minutos' },
      ];
    const [iCanchavalVisible, setCanchavalVisible] = useState(false);
    const [Canchaval, setCanchaval] = useState(null);
    const handleSelectFirst = item => {
        setCanchaval(item);
        alert(item.name)
        setCanchavalVisible(false);
      };
  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setImageUri(image.path);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };
  const handleAddSoccer = () => {
    const soccerData = { name, imageUri, Turf,PricesFeild};
    
    if (
      name === '' ||
      Turf === '' ||
      PricesFeild === '' ||
      Canchaval === ''
      
    ) {
      Alert.alert('Error', 'Please fill all fields');
    } else {
    
    addSoccer(soccerData);
    setName('');
    setTurf('');
    setImageUri(null);
    setPricesFeild('')
    setCanchaval(null)
    navigation.navigate('CourtDetails');
  }
  };

  return (
    // <View>
   
      <View style={styles.inputContainer}>
      <ScrollView>
        <CustomInputFeild focus={true} labelName="Nombre del campo" value={name} onChangeText={(text) => setName(text)} />
        <CustomInputFeild focus={true} labelName="Tipo de césped" value={Turf} onChangeText={(text) => setTurf(text)} />

        <View style={{paddingTop:10}}>
<Foot visible={iCanchavalVisible}
        selectedValue={Canchaval ? Canchaval.name : ''}
         PopupOn={()=>setCanchavalVisible(true)}
onClose={() => setCanchavalVisible(false)}
onSelect={handleSelectFirst} options={Cancha} placeHolder="Duración de la sesión" />
</View>

<CustomInputFeild focus={true} labelName='Precios' value={PricesFeild} onChangeText={(text) => setPricesFeild(text)}/>
<TouchableOpacity style={styles.buttonContainer} onPress={handleImagePicker}>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>Imágenes</Text>
            <Icons name="arrow-forward-ios" size={20} color="rgba(64, 134, 57, 1)" />
          </View>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 340, height: 150, objectFit: 'cover', borderRadius: 12 }} />}
</ScrollView> 
      

        <View style={[styles.buttonNextButton, { marginTop: 50 }]}>
          <ButtonslipAndcencel IconName="check" text="Agregar detalles de campo" Link={handleAddSoccer} />
        </View>
        </View>
   
  
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginLeft: 22,
    marginRight: 30,
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
  buttonNextButton: {
    width: 340,
    bottom: 25,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingLeft: 12,
    padding: 16,
    paddingRight: 25,
    fontSize: 14,
    lineHeight: 20,
    borderRadius: 10,
    borderWidth: 0.25,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 1,
    color: '#212121',
    fontFamily: Fonts.MEDIUM,
    backgroundColor: 'rgba(64, 134, 57, 0.05)',
  },
  mainText: {
    paddingLeft: 8,
    color: '#212121',
    fontFamily: Fonts.MEDIUM,
    fontSize: 15,
    letterSpacing: 0.5,
  },




  

});

export default connect(null, { addSoccer })(SoccerForm);
