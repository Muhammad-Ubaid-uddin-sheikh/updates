import React, { useEffect, useState } from 'react';
import { Text, View,FlatList, Modal, StyleSheet, TouchableOpacity, Alert  } from 'react-native'
import SheduleGreen from '../../components/SheduleGreencolor'
import Button from '../../components/ButtonTransparentBlack';
import Plus from 'react-native-vector-icons/AntDesign'
import { Fonts } from '../style';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Skeleton from "@thevsstech/react-native-skeleton";
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/getBookingsByDate';
const ShaduleRevisa = ({route}) => {
  const { selectedId} = route.params
  console.log("Seled",selectedId)
  const [data, setData] = useState([]);
  console.log("checkingData",data)
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };
  const fieldId = { selectedId}
  if (selectedId === null) {
    Alert.alert('Note','Por favor seleccione el campo de la cancha.')
  }else{
    useEffect(() => {
      const fetchData = async () => {
        try {
          const accessToken = await AsyncStorage.getItem('accessTokenCourt');
          const response = await fetch(`${API_URL}?fieldId=${selectedId}`, {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          });
  
          if (response.ok) {
              
              const responseData = await response.json();
              setData(responseData.data[0].bookings)
              console.log('fatchadata',responseData.data[0].bookings)
              
              
          } else {
              console.error('Error fetching court data:', response.statusText);
          }
      } catch (error) {
          console.error('Error fetching court data:', error);
      }finally {
          setLoading(false);
      }
      };
    
      fetchData();
    }, []);
  }
 
const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => setSelectedItem(item)}>
    
      <View style={styles.itemContainer}>
        <View style={styles.DisplayFlexProp}>
        <Text style={styles.itemName}>{item?.courtName || 'N/A'}</Text>
          <Text style={styles.itemDate}>{item?.date ? formatDate(item.date) : 'N/A'} | {item?.timingRange}</Text>
        </View>
        <View style={styles.DisplayFlexProp}>
        <Text style={styles.itemGround}>{item?.fieldName || 'N/A'}</Text>
        <Text style={styles.itemPay}>{item?.paymentStatus === 'PAID' ? 'Pagado' : 'No Pagado' || 'N/A'}</Text>
      
        </View>
      </View>
  </TouchableOpacity>
);

const closeModal = () => setSelectedItem(null);

  return (
    <View style={[styles.inputContainer, { paddingTop: 0 }]}>
        {/* <View style={{paddingTop:30}}>
        <SheduleGreen Date="08/17/2023" text="Date" />
        </View> */}
        <Text style={[styles.bookingHeeading,{textAlign:'center',paddingTop:0}]}>detalles de la reserva</Text>
        {/* <ReserveFeild/> */}
        <View style={styles.container}>
        
        {loading ? (
          // Show shimmer if loading
          <FlatList
          
            data={[1, 2, 3,4]} // Dummy data to render shimmer
            renderItem={() => (

<Skeleton highlightColor={'rgba(64, 134, 57, 0.25)'} backgroundColor={'rgba(64, 134, 57, 0.05)'} borderRadius={'20'} visible={false}>
          <Skeleton.Item width={'100%'} height={48} borderRadius={8} marginTop={6} />
          <Skeleton.Item width={'100%'} height={48} borderRadius={8} marginTop={6} />
          <Skeleton.Item width={'100%'} height={48} borderRadius={8} marginTop={6} />
         
    </Skeleton>
            )}
            
            // keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        ) :  data.length === 0 ? (
          <View style={{justifyContent:'center',alignItems:'center',height:350}}>

              <Ionicons name='book-outline' style={{fontSize:80,color:'#408639'}}/>
              <Text style={[styles.MainHeading,{fontFamily:Fonts.MEDIUM,fontSize:17}]}>No Bookings are available</Text>
              
              </View>
      
      ) : (
        
        // (
          // Show data when loaded
          <FlatList
            data={data}
            renderItem={renderItem}
            // keyExtractor={(item) => item.id.toString()} // Make sure to use a unique key
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
           
            <Modal visible={selectedItem !== null} transparent animationType="slide" >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <View style={[styles.DisplayFlexProp,{width:"100%"}]}>
                        <Text style={[styles.bookingHeeading,{paddingTop:0,fontSize:20}]}>Detalles de la reserva</Text>
                        <TouchableOpacity onPress={closeModal}>
                      <Plus name="close"  style={styles.iconstyleCross} />
                      </TouchableOpacity>
                      </View>
                      <View style={[styles.DisplayFlexProp,{width:"100%",paddingTop:30,borderBottomColor:'rgba(33, 33, 33, 0.25)',borderBottomWidth:0.5,paddingBottom:5}]}>
                        <View>
                        <Text style={[styles.itemGround,{color:'#21212199',fontFamily:Fonts.MEDIUM}]}>Hora</Text>
                        </View>
                        <View>
                        <Text style={styles.modalTitle}>{selectedItem?.timingRange}</Text>
                        </View>                   
                      </View>
                      <View style={[styles.DisplayFlexProp,{width:"100%",paddingTop:10,borderBottomColor:'rgba(33, 33, 33, 0.25)',borderBottomWidth:0.5,paddingBottom:5}]}>
                        <View>
                        <Text style={[styles.itemGround,{color:'#21212199',fontFamily:Fonts.MEDIUM}]}>Fecha</Text>
                        </View>
                        <View>
                        <Text style={styles.modalTitle}>{selectedItem?.date ? formatDate(selectedItem.date) : 'N/A'}</Text>
                        </View>                   
                      </View>
                      <View style={[styles.DisplayFlexProp,{width:"100%",paddingTop:10,borderBottomColor:'rgba(33, 33, 33, 0.25)',borderBottomWidth:0.5,paddingBottom:5}]}>
                        <View>
                        <Text style={[styles.itemGround,{color:'#21212199',fontFamily:Fonts.MEDIUM}]}>Campo</Text>
                        </View>
                        <View>
                        <Text style={styles.modalTitle}>{selectedItem?.fieldName}</Text>
                        </View>                   
                      </View>
                      <View style={[styles.DisplayFlexProp,{width:"100%",paddingTop:10,borderBottomColor:'rgba(33, 33, 33, 0.25)',borderBottomWidth:0.5,paddingBottom:5}]}>
                        <View>
                        <Text style={[styles.itemGround,{color:'#21212199',fontFamily:Fonts.MEDIUM}]}>Cantidad</Text>
                        </View>
                        <View>
                        <Text style={styles.modalTitle}>{selectedItem?.amount}.00</Text>
                        </View>                   
                      </View>
                      <View style={[styles.DisplayFlexProp,{width:"100%",paddingTop:10,borderBottomColor:'rgba(33, 33, 33, 0.25)',borderBottomWidth:0.5,paddingBottom:5}]}>
                        <View>
                        <Text style={[styles.itemGround,{color:'#21212199',fontFamily:Fonts.MEDIUM}]}>Reservado por</Text>
                        </View>
                        <View>
                        <Text style={styles.modalTitle}>{selectedItem?.bookedByName}</Text>
                        </View>                   
                      </View>
                      <View style={[styles.DisplayFlexProp,{width:"100%",paddingTop:10,borderBottomColor:'rgba(33, 33, 33, 0.25)',borderBottomWidth:0.5,paddingBottom:5}]}>
                        <View>
                        <Text style={[styles.itemGround,{color:'#21212199',fontFamily:Fonts.MEDIUM}]}>Estado de pago</Text>
                        </View>
                        <View>
                        {/* Status={item.status === 'joined' ? 'Unirse' : 'No Unirse'} */}
                        <Text style={styles.modalTitle}>{selectedItem?.paymentStatus === 'PAID' ? 'Pagado' : 'No Pagado'}</Text>
                        </View>                   
                      </View>
                        {/* <View style={{width:'100%'}}>
                        <Button text="mensaje"  Link={''} />
                        </View> */}
                    </View>
                </View>
            </Modal>
        </View>
    </View>

  )
}
const styles = StyleSheet.create({
  
  inputContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 25,
  },
  bookingHeeading:{
    fontFamily:Fonts.BOLD,
    fontSize:23,
    color:'black',
    paddingTop:20,
    letterSpacing:0.1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:20
},
itemContainer: {
  marginTop: 2,
  padding: 5,
  paddingBottom:10,
  marginBottom: 10,
  fontSize: 14,
  lineHeight: 20,
  paddingLeft:15,
  paddingRight:15,
  borderRadius: 8,
  borderWidth: 0.25,
  borderColor: 'rgba(0, 0, 0, 0.25)',
  color: '#212121',
  fontFamily: Fonts.MEDIUM,
  backgroundColor: 'rgba(64, 134, 57, 0.05)',
},
itemName: {
    fontSize: 16,
    fontFamily:Fonts.BOLD,
    color:'#212121'
},
itemDate: {
    color: '#212121',
    fontFamily:Fonts.REGULAR,
    fontSize:12
},
itemGround: {
    color: '#212121',
    fontFamily:Fonts.REGULAR,
    fontSize:14
},
itemPay:{
  color: '#212121',
  fontFamily:Fonts.BOLD
},
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
      
},
modalContent: {
  backgroundColor: 'white',
  padding: 25,
  borderRadius: 20,
  alignItems: 'center',
  width:345
},
modalTitle: {
  fontSize:15,
  fontFamily:Fonts.MEDIUM,
            color:'black',
            letterSpacing:0.1,
            textAlign:"left",
            width:'100%',
},
modalText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign:'center'
},
closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
},
closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
},
iconstyleCross:{
  color:'black',
  fontSize:25
},
DisplayFlexProp:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
},
MainHeading:{
  color:'black'
}
})

export default ShaduleRevisa
