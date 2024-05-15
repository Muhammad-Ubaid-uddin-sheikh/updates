import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Button from '../../../components/ButtonTransparentBlack';
import Spinner from 'react-native-loading-spinner-overlay';
// import { useSelector } from 'react-redux';
import { Fonts } from '../../style';
const PasswordChangeCourt = ({ navigation }) => {

//   const userData = useSelector(state => state.user);
  const [PreviousPassword, setPreviousPassword] = useState('');
  const [Feildpassword, setFeildpassword] = useState('');
  const [Setpassword, Setsetpassword] = useState('');
  const [firstPasswordVisible, setfirstPasswordVisibility] = useState(false);
  const [SecondPasswordVisible, setSecondPasswordVisibility] = useState(false);
  const [ThirdPasswordVisible, setThirdPasswordVisibility] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {

      navigation.navigate('SecurityCourt')
    }, 500);


  };

  return (
    // <ScrollView backgroundColor={'white'}>
      <View style={styles.MainContainer}>

        <View>
          <Text style={styles.Text}>
            Genera tu nueva contraseña
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ingresa la contraseña actual"
              placeholderTextColor="rgba(33, 33, 33, 0.60)"
              secureTextEntry={!firstPasswordVisible}
              value={PreviousPassword}
              onChangeText={(text) => setPreviousPassword(text)}
              letterSpacing={0.1}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setfirstPasswordVisibility(!firstPasswordVisible)}>
              <Text style={styles.eyeText}>{firstPasswordVisible ? <Icon name="eye" style={styles.eyeIcon} size={17} /> : <Icon name="eye-slash" style={styles.eyeIcon} size={17} />}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ingresa la nueva contraseña"
              placeholderTextColor="rgba(33, 33, 33, 0.60)"
              secureTextEntry={!SecondPasswordVisible}
              value={Feildpassword}
              onChangeText={(text) => setFeildpassword(text)}
              letterSpacing={0.1}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecondPasswordVisibility(!SecondPasswordVisible)}>
              <Text style={styles.eyeText}>{SecondPasswordVisible ? <Icon name="eye" style={styles.eyeIcon} size={17} /> : <Icon name="eye-slash" style={styles.eyeIcon} size={17} />}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirma la nueva contraseña "
              placeholderTextColor="rgba(33, 33, 33, 0.60)"
              secureTextEntry={!ThirdPasswordVisible}
              value={Setpassword}
              onChangeText={(text) => Setsetpassword(text)}
              letterSpacing={0.1}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setThirdPasswordVisibility(!ThirdPasswordVisible)}>
              <Text style={styles.eyeText}>{ThirdPasswordVisible ? <Icon name="eye" style={styles.eyeIcon} size={17} /> : <Icon name="eye-slash" style={styles.eyeIcon} size={17} />}</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View>

          <View style={styles.inputContainer}>
            <View style={styles.buttoncontainer} >
              <View style={styles.mainContent}>
                <Button text="Cancelar" ColorIcon="white" Link={() => navigation.goBack()} ColorText="#212121" />
              </View>
              <View style={styles.mainContent} >
                <Button text="Guardar contraseña" Link={handleLogout} />
                <Spinner
                  visible={isLoggingOut}
                  textContent={'Guardar contraseña...'}
                  textStyle={styles.loaderText}
                  animation="fade"
                  overlayColor="rgba(0, 0, 0, 0.7)"
                  color="white"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    
  )
}
const styles = StyleSheet.create({
  buttoncontainer:{
    marginBottom:16
  },
  mainContent: {
    width: 345,
  },
  Text: {
    fontFamily: Fonts.BOLD,
    paddingHorizontal: 24,
    color: '#212121',
    fontSize: 16,
    paddingBottom: 3
  },
  MainContainer: {
    width: 'auto',
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 10,
    justifyContent: 'space-between',


  }, inputContainer: {
    position: 'relative',
    marginBottom: 8,
    width: 345,
    marginLeft: 22,
    marginRight: 30
  },
  input: {
    marginTop: 12,
    paddingLeft: 12,
    padding: 16,
    paddingRight: 40,
    fontSize: 14,
    lineHeight: 20,
    width: 345,
    borderRadius: 12,
    borderWidth: 0.25,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    color: '#212121',
    fontFamily: 'Satoshi-Medium',
    backgroundColor: 'rgba(64, 134, 57, 0.05)'
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
    top: 35,
    color: '#408639'
  },
})
export default PasswordChangeCourt
