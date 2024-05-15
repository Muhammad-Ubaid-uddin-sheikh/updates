import React,{useState} from 'react'
import { View ,Text,ScrollView,StyleSheet,} from 'react-native'
import { Fonts } from '../style'
import Foot from './Foot'
import ToggleSwitch from 'toggle-switch-react-native'
const Editarperfil = () => {

  const [LastseenVisible, setLastseenVisible] = useState(false);
  const [Lastseenval, setLastseenval] = useState(null);
  const handleSelectFirst = item => {
    setLastseenval(item);
    setLastseenVisible(false);
  };
  const [BlockVisible, setBlockVisible] = useState(false);
  const [Blockval, setBlockval] = useState(null);
  const handleSelectSecond = item => {
    setBlockval(item);
    setBlockVisible(false);
  };
  const [MessageVisible, setMessageVisible] = useState(false);
  const [Messageval, setMessageval] = useState(null);
  const handleSelectThird = item => {
    setMessageval(item);
    setMessageVisible(false);
  };


  const optionsLastseen = [
    {id:1 , name: 'Todo el mundo'},
  {id:2 , name: "Amigos"},
  {id:3 , name: 'Nadie'},
];
  const optionsBlock = [
    {  id:1 , name: 'Usuario1'},
  {id:2 , name: "Usuario2"},
  {id:3 , name: 'Usuario3'},
  ];
   const optionsMessage = [
    {id:1 , name: 'Todo el mundo '},
    {id:2,name:"Amigos"},
    {id:3,name:'Nadie'},
  ];
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <ScrollView backgroundColor={'white'}>
     
    <View style={styles.MainContainer}>
        <Text style={styles.TextMain}>
        ¿Quién puede ver la información de mi perfil?
        </Text>
        <View style={styles.containerToggle}>
      <Text style={styles.leftText}>Cuenta privada</Text>
      <Text style={styles.rightToggle}>
   <ToggleSwitch
  isOn={isEnabled}
  onColor="#408639"
  offColor="#EEE"
  size=" Medium"
  onToggle={() =>  setIsEnabled(!isEnabled)}/>
  
  </Text>


    </View>
    <Text style={styles.Textparagraph}>
    Cuando su cuenta es privada, otros usuarios no podrán ver su contenido o interactuar con usted. Tampoco podrá participar en actividades públicas como partidos o torneos
        </Text>
       
      <View style={styles.inputContainer}>
      <Foot visible={LastseenVisible}
                   selectedValue={Lastseenval ? Lastseenval.name : ''}
                    PopupOn={()=>setLastseenVisible(true)}
        onClose={() => setLastseenVisible(false)}
         onSelect={handleSelectFirst} options={optionsLastseen} placeHolder="Última conexión y en línea" />
     
      </View>
      <Text style={styles.TextMain}>
      Usuarios bloqueados
        </Text>
        <View style={styles.inputContainer}>
        <Foot visible={BlockVisible}
                   selectedValue={Blockval ? Blockval.name : ''}
                    PopupOn={()=>setBlockVisible(true)}
        onClose={() => setBlockVisible(false)}
         onSelect={handleSelectSecond} options={optionsBlock} placeHolder="Lista de bloqueados" />
      
      </View>
      <Text style={styles.TextMain}>
      ¿Quién puede enviarme mensajes?
        </Text>
        <View style={styles.inputContainer}>
        <Foot visible={MessageVisible}
                   selectedValue={Messageval ? Messageval.name : ''}
                    PopupOn={()=>setMessageVisible(true)}
        onClose={() => setMessageVisible(false)}
         onSelect={handleSelectThird} options={optionsMessage} placeHolder="Pueden enviarme mensajes" />

      </View>
    </View>
    
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  Textparagraph:{
    fontFamily:Fonts.MEDIUM,
  letterSpacing:0.2,
  color: 'rgba(33, 33, 33, 0.60)',
  fontSize: 14,
  paddingBottom:25,
  paddingHorizontal: 23,
  marginTop:10
  },
  MainContainer:{
    width:'auto',
    backgroundColor:'white',
    flex:1,
},
TextMain:{
  fontFamily:Fonts.BOLD,
  letterSpacing:0.2,
  color: '#212121',
  fontSize: 16,
  paddingBottom:15,
  paddingHorizontal: 23,
  marginTop:12
},
inputContainer: {
  position: 'relative',
  marginBottom: 14,
  // width: 345,
  marginLeft: 22,
  marginRight: 22,
  
},
containerToggle: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 23, 
  textAlignVertical:'center',
  paddingBottom:20

},
leftText: {
  textAlign: 'left',
  color:'#424242',
  fontFamily: Fonts.MEDIUM,
  fontSize: 16,
  letterSpacing: 0.2
},
rightToggle: {
  textAlign: 'right',
  // Additional styling for the right text if needed
},
})
export default Editarperfil
