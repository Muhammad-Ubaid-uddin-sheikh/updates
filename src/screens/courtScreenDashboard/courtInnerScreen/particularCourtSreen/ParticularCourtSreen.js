import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import FeildNavigation from './feildcourtnavigations/Feildcourtnavigations';
import LocationIcon from 'react-native-vector-icons/FontAwesome6';
import { Fonts } from '../../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Button from '../../../../components/ButtonTransparentBlack';
const API_URL_POST = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/deleteField';

const ParticularGroundScreen = ({ route }) => {
  const { item ,fetchCourtData} = route.params;
  const [isLoggingOut, setIsLoggingOut] = useState(false);
const navigation = useNavigation();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const deleteCourtField = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessTokenCourt');
      const response = await axios.post(API_URL_POST, { fieldId: item._id }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data) {
        console.log('APIDATA', response.data);
        setIsLoggingOut(true);
        fetchCourtData()
      } else {
        Alert.alert('Failed to delete court field');
      }
    } catch (error) {
      console.error('Delete Error:', error.response);
      Alert.alert('Failed to delete court field');
    } finally {
      navigation.navigate('CourtDashboard')
      toggleDeleteModal();
    }
  };

  return (
    <View style={styles.container}>
      {/* Your other UI components */}
      <Image
        source={{ uri: item.images.length > 0 ? item.images[0] : 'https://github.com/Muhammad-Ubaid-uddin-sheikh/Kicker-AfterAPK/blob/master/src/assets/WhatsApp%20Image%202024-04-20%20at%2000.11.53.jpeg?raw=true' }}
        style={styles.backgroundImage}
      />

      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, width: '100%', alignItems: 'center', position: 'absolute', top: 25 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="keyboard-arrow-left" color="white" size={18} style={styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDeleteModal}>
          <Icons name="delete" size={16} color={'white'} style={styles.iconStyle} />
        </TouchableOpacity>
      </View>


      <View style={styles.titleGroundDiv}>
        <Text style={styles.textGroundTitle}>{item.name}</Text>
         <Text style={[styles.buttonText, { color: item.isActive ? 'green' : '#A0A0A0' }]}>
                        {item.isActive ? 'Disponible' : 'No disponible'}
                    </Text>
      </View>

      {/* Location Info */}
      <View style={styles.locationTextContainer}>
        <LocationIcon name="location-dot" style={{ color: '#408639' }} size={15} /> 
        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.textLocation,{width:'75%'}]}> {item.location} </Text>
        <Image source={require('../../../../assets/AvalibleIcon.png')} style={{width:16,height:16,objectFit:'contain',paddingRight:25}} />
        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.textLocation,{width:'20%'}]}>{item.turfType}</Text>
      </View>

      {/* Navigation */}
      <FeildNavigation item={item} PerHour={item.PerHour} ThirdHour={item.ThirdHour} SecHour={item.SecHour} />
      <Modal
        isVisible={isDeleteModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.paragraphsHeadingMain}>Quieres borrar?</Text>
            <Text style={styles.paragraphspoup}>¿Estás seguro de eliminar este campo judicial?</Text>

            <View style={styles.containerButton}>
            <View style={styles.mainContent}> 
                <Button text="Cancelar"  ColorIcon="white" Link={toggleDeleteModal} ColorText="#408639" />
                </View>
            <View style={styles.mainContent} >
                 <Button text="Cerrar sesión"  Link={deleteCourtField} />
                 <Spinner
        visible={isLoggingOut}
        textContent={'Relojándose...'}
        textStyle={styles.loaderText}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.7)"
        color="white" 
      />
                 </View>
            
                </View>
              
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginTop: 0,
    padding: 0,
    backgroundColor: 'white',
  },
  iconStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 5,
    borderRadius: 50,
  },
  backgroundImage: {
    width: '100%',
    height: 223,
    objectFit: 'cover',
  },
  titleGroundDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  textGroundTitle: {
    fontSize: 19,
    color: 'black',
    letterSpacing: 0.1,
    lineHeight: 36,
    fontFamily: Fonts.MEDIUM,
    paddingTop: 5,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: Fonts.MEDIUM,
  },
  locationTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  textLocation: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: '#A0A0A0',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 5,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width:'auto',
    marginLeft:5,
    marginRight:5
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    
  },
  paragraphspoup:{
    fontSize:14,
    color:'#424242',
    letterSpacing:0.1,
    fontFamily: 'Satoshi-Medium',
    paddingTop:18,
    paddingBottom:10,
    textAlign:"left",
    width:300,
  },
  paragraphsHeadingMain:{
    fontSize:20,
    color:'black',
    letterSpacing:0.1,
    fontFamily: 'Satoshi-Medium',
    fontWeight:'bold',
    textAlign:"left",
    width:300,
  },
paragraphsHeading:{
    fontSize:20,
    color:'black',
    letterSpacing:0.3,
  width:'auto',
  lineHeight: 36,
  fontFamily: 'Satoshi-Medium',
  marginLeft:2,
  marginTop:20
},  
  loaderText:{
    color:'white',
    fontFamily:Fonts.BOLD
},
containerButton:{// Arrange points and text horizontally
    alignItems: 'center', // Center content vertically
    justifyContent:'space-between',
    width:'50%',
    position:'relative',
    flexDirection: 'row',
    gap:10,
},
mainContent:{
  width:'100%'
}
});

export default ParticularGroundScreen;
