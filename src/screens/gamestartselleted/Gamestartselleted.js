import React from 'react'
import { View, StyleSheet, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Fonts } from '../style';
import { useState } from 'react';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const CustomizeProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selected, setselected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageClick = (item) => {
    setselected(item === selected ? null : item);
  };

  const handleNavigate = () => {
    if (selected) {
      dispatch({
        type: 'WHICH_GAME',
        payload: {selected},
      });
      setLoading(true);
      setTimeout(() => {
        if (selected === 'Equipos') {
          navigation.navigate('StartATeam'); // Navigate to Home page if 'Equipos' is selected
        } else if (selected === 'Individuales') {
          navigation.navigate('StartAGame'); // Navigate to StartAGame page if 'Individuales' is selected
        }
        setLoading(false);
      }, 200);
    } else {
      console.warn('Please select the foot do you play.');
    }
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={'white'} barStyle="dark-content" /> */}
      <View style={styles.MainContainer}>
        <Text style={styles.MainHeading}>¿Qué buscas?</Text>
        <View style={styles.ShoeContainer}>
          <View style={styles.row}>
            <View style={styles.ShoeCon}>
              <TouchableOpacity onPress={() => handleImageClick('Equipos')}>
                <Image
                  source={selected === 'Equipos' ? require('../../assets/teamgreen.png') : require('../../assets/team.png')}
                  style={{ width: 130, height: 130 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleImageClick('Equipos')}>
                <Text style={[styles.textPoints, selected === 'Equipos' && styles.selectedText]}>
                  {selected === 'Equipos' ? 'Equipos' : 'Equipos'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ShoeCon}>
              <TouchableOpacity onPress={() => handleImageClick('Individuales')}>
                <Image
                  source={selected === 'Individuales' ? require('../../assets/singleplayergreen.png') : require('../../assets/singleplayer.png')}
                  style={{ width: 130, height: 130 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleImageClick('Individuales')}>
                <Text style={[styles.textPoints, selected === 'Individuales' && styles.selectedText]}>
                  {selected === 'Individuales' ? 'Individuales' : 'Individuales'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.nextButton}>
          <Button loading={loading} Link={handleNavigate} text="Siguiente"/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ShoeContainer: {
    position:'absolute',
    bottom:320
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 20,
  },
  textPoints: {
    fontSize: 16,
    lineHeight: 24,
    color: '#61646B',
    marginLeft: 38,
    marginTop: 30,
    fontFamily: 'Satoshi-Medium'
  },
  ShoeCon: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center'
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
    lineHeight: 36,
    marginTop:60,
  },
  ImageContainer: {
    marginTop: 30
  },
  nextButton: {
    position: 'absolute',
    bottom: 25,
    width:320
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 47,
  },
  selectedText: {
    color: '#408639',
  },
});

export default CustomizeProfile;
