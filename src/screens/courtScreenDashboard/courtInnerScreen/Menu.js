import React, { useCallback, useEffect, useState } from 'react';
import {  Image, StyleSheet, Text,RefreshControl, TouchableOpacity, View, TextInput, FlatList, BackHandler, Alert, } from 'react-native'
import SearchICon from 'react-native-vector-icons/EvilIcons'
import { Fonts } from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Skeleton from "@thevsstech/react-native-skeleton";
import { useFocusEffect } from '@react-navigation/native';
const API_URL_GET = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/getMyCourts'
const FindGames = ({ navigation }) => { 
    const [refreshing, setRefreshing] = React.useState(false);
  const [courtData, setCourtData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("use state courtData" , courtData)
useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', onPress: () => null, style: 'cancel' },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );
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
                // delete responseData.data[0].fields
              
                const id = responseData.data[0]._id
                await AsyncStorage.setItem('CourtId', id);
                
                const newFeilds = responseData.data[0].fields?.map((feild)=>{
            feild.location = responseData.data[0].address
      
                    // return  feild

                   
                })
                setCourtData(responseData.data[0].fields);
                console.log('setDataNEwfeild',responseData.data[0].fields)
                
            } else {
                console.error('Error fetching court dataasd:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching court data:', error);
        }finally {
            setLoading(false);
        }
    };

 


const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCourtData(); // Call your fetch function to refresh the data
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  useEffect(() => {
    fetchCourtData();
  }, []);


    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const data = [
        { id: 1, name: 'Jefferson Parkasdasd', rating: '4.5', available: true, address: 'E. 112th St & First Ave', source: 'https://global-uploads.webflow.com/5ca5fe687e34be0992df1fbe/61b5911c9d37d0449acee390_soccer-ball-on-grass-in-corner-kick-position-on-so-2021-08-29-10-46-54-utc-min.jpg',PerHour:100,ThirdHour:50,SecHour:20 },
        { id: 2, name: 'Ben Vitale Fieldsasdas', rating: '4.8', available: false, address: 'D. 112th St & First Ave', source: 'https://en.reformsports.com/oxegrebi/2023/07/why-do-they-sprinkle-football-pitches.jpg',PerHour:90,ThirdHour:50,SecHour:60 },
        { id: 3, name: 'Ground 3', rating: '4.2', available: true, address: 'F. 112th St & First Ave', source: 'https://c4.wallpaperflare.com/wallpaper/892/527/605/football-pitch-wallpaper-preview.jpg',PerHour:90,ThirdHour:50,SecHour:60 },
        { id: 4, name: 'Ground 4', rating: '4.2', available: true, address: 'F. 112th St & First Ave', source: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vdGJhbGwlMjBzdGFkaXVtfGVufDB8fDB8fHww',PerHour:'30' },
        { id: 5, name: 'Ground 5', rating: '4.2', available: true, address: 'F. 112th St & First Aase', source: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdyk2rqCaUDs1ygXLLxjlymyBGe-fZtvZtqVTdAdpsq4eeyRjPRtbGKS4OgFMAXug10vI&usqp=CAU',PerHour:50 },
        { id: 6, name: 'Ground 6', rating: '4.2', available: true, address: 'F. 112th St & First Aveaaa', source: 'https://www.pommietravels.com/wp-content/uploads/2023/11/camp-nou-spain.jpg',PerHour:'60' },
        { id: 7, name: 'Ground 7', rating: '4.2', available: true, address: 'F. 112th St & First Aveasdas', source: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWtrdH13yvwwmZ5rcStztHz8lfEPyft5SAH5nBAYqjzBQVi9S4MN0LhCaWb2gZQvk02lY&usqp=CAU',PerHour:'200' },

        // Add more data as needed
    ];
    const handleItemClick = (item) => {
        navigation.navigate('ParticularCourtGround', { item,fetchCourtData });

    };
    
    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = data.filter(
            (item) =>
                item.name.toLowerCase().includes(text.toLowerCase()) ||
                item.address.toString().includes(text)
        );
        setFilteredData(filtered);
    };

 
    const renderItem = ({ item }) => { 
        console.log('render Item' , item)

        
        return (
    
    
        <View style={{ marginBottom: 20 }}>
          
                
                <TouchableOpacity key={item._id} onPress={() => handleItemClick(item)}>
                  
                    <Image
                        source={{ uri: item.images.length > 0 ? item.images[0] : 'https://github.com/Muhammad-Ubaid-uddin-sheikh/Kicker-AfterAPK/blob/master/src/assets/WhatsApp%20Image%202024-04-20%20at%2000.11.53.jpeg?raw=true' }}
                        style={{ width: 'auto', height: 170, borderRadius: 15, objectFit: 'cover' }}
                    />
                    <View style={styles.TextContainerImage} key={item._id}>
                   
                    <Text style={styles.GroundName}>{item.name}</Text>
                   <View style={[styles.locationTextContainer,]}>
                <Image source={require('../../../assets/AvalibleIcon.png')} style={{width:16,height:16,objectFit:'contain',paddingRight:25}} />
                <Text style={[styles.availability, { color: '#454545', }]}>
               {item.turfType && <Text  numberOfLines={1} ellipsizeMode="tail" style={[styles.availability, { color: '#454545',width:'20%' }]}>{item.turfType}</Text>}
               </Text>
               </View>
            </View>
                </TouchableOpacity>
            {/* ))} */}
        </View>
    ) }
   

    return (

        <View style={styles.form} >
            <View style={styles.MainContainer}>
                <View style={styles.rowContainer}>
                    

                    <View style={styles.searchbarContainer}>
                        <SearchICon name='search' style={styles.Searchicon} size={30} />
                        <TextInput
                            style={styles.input}
                            placeholder="Tipo de superficie, nombre"
                            placeholderTextColor="rgba(33, 33, 33, 0.60)"
                            onChangeText={handleSearch}
                            value={searchText}
                        />
                    </View>
                    


                    {/* </View> */}
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={styles.MainHeading}>Tus canchas</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CourtDetails',{fetchCourtData})}>
              <Text style={styles.buttonText}>Añadir cancha</Text>
            </TouchableOpacity>
                    </View>
                    

                    <View style={{height:'90%', paddingTop: 20,paddingBottom:20 }}>
                    {loading ? (
               <FlatList
               data={[1, 2, 3,4]} 
               renderItem={() => (
   
   <Skeleton highlightColor={'rgba(64, 134, 57, 0.25)'} backgroundColor={'rgba(64, 134, 57, 0.05)'} borderRadius={'20'} visible={false}>
             <View style={{  height: 150, borderRadius: 10,marginTop:10 }} />
             <View style={{ flexDirection: "row", alignItems: "center",justifyContent:'space-between',marginTop:10 }}>
   <View style={{ width: 120, height: 20, borderRadius: 4 }} />
   
   <View style={{ marginLeft: 20 }}>
     <View style={{ width: 120, height: 20, borderRadius: 4 }} />
   </View>
 </View>
 {/* <View style={{ width: 120, height: 20, borderRadius: 4 ,marginTop:5}} />       */}
       </Skeleton>
               )}
               
               // keyExtractor={(item, index) => index.toString()}
               showsVerticalScrollIndicator={false}
               showsHorizontalScrollIndicator={false}
             />
            ) : courtData.length === 0 ? (
                <View style={{justifyContent:'center',alignItems:'center',height:350}}>

                    <Ionicons name='football-outline' style={{fontSize:60,color:'#408639'}}/>
                    <Text style={styles.MainHeading}>No hay canchas disponibles</Text>
                    <TouchableOpacity style={[styles.button,{marginTop:20}]} onPress={() => navigation.navigate('CourtDetails',{fetchCourtData})}>
              <Text style={styles.buttonText}>Añadir cancha</Text>
            </TouchableOpacity>
                    </View>
            
            ) : (
                        <FlatList
                        refreshControl={
                            <RefreshControl
                              refreshing={refreshing}
                              onRefresh={onRefresh}
                              colors={['#9Bd35A', '#689F38']}
                              progressBackgroundColor="#ffffff"
                            />
                          }
                               showsVerticalScrollIndicator={false}
                               data={courtData}
                               renderItem={renderItem}
                               keyExtractor={(item) => item._id.toString()}
                            contentContainerStyle={{ flexGrow: 1, paddingBottom: 10, }}
                        />
            )}
                    </View>
                </View>
            </View>
        </View>
        // </ScrollView>



    )
}

const styles = StyleSheet.create({
    GroundName: {
        fontSize: 17,
        color: 'black',
        letterSpacing: 0.1,
        lineHeight: 36,
        fontFamily: Fonts.MEDIUM,

        paddingTop: 2
    },
    TextContainerImage: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 3,
        paddingRight: 15
    },
    locationTextContainer: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 3,

    },
    textLocation: {
        fontSize: 14,
        fontFamily: Fonts.REGULAR,
        color: '#A0A0A0',
        alignItems: 'center',
        flexDirection: 'row'
    },
    ColmInput: {
        width: "50%",

    },
    flexPropertyInput: {
        flexDirection: 'row', // Arrange points and text horizontally
        alignItems: 'center', // Center content vertically
        justifyContent: 'space-between',
        gap: 10,
        //    paddingLeft:10,
        paddingRight: 10
    },
    MainHeading: {
        fontSize: 19,
        color: '#212121',
        letterSpacing: 0.8,
        width: 'auto',
        marginTop: 10,
        fontFamily: Fonts.BOLD,
        marginLeft: 2,

    },
    MainGroundContainer: {
        flex: 1,
        // paddingBottom: 15
    },
    GroundContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'flex-start',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10
    },
    Groundname: {
        fontSize: 16,
        color: '#61646B',
        fontFamily: Fonts.MEDIUM,
    },
    DistanceTExt: {
        fontFamily: 'Satoshi-Medium',
        fontSize: 14,
        color: '#AFB1B6'

    },

    MainContainer: {
        width: 'auto',
        backgroundColor: 'white',
        flex: 1,
        paddingLeft: 15,
        paddingRight: 20,

    },
    form: {
        backgroundColor: 'white',
        flex: 1,
        position: 'relative',
        paddingBottom: 10
    },
    Searchicon: {
        position: 'absolute',
        top: 18,
        left: 10,
        color: 'rgba(33, 33, 33, 1)',

    },
    input: {
        marginTop: 2,
        paddingLeft: 40,
        padding: 16,
        marginBottom: 10,
        paddingRight: 10,
        fontSize: 14,
        lineHeight: 20,
        width: '100%',
        borderRadius: 12,
        borderWidth: 0.25,
        borderColor: 'rgba(0, 0, 0, 0.25)',
        color: '#212121',
        fontFamily: 'Satoshi-Medium',
        backgroundColor: 'rgba(64, 134, 57, 0.05)',

    },
    searchbarContainer: {
        position: 'relative',
        width: 'auto',
        flexDirection: 'row',
        marginLeft: 0
    },
      button:{
    marginRight:5,
    backgroundColor:'rgba(64, 134, 57, 0.15)',
    borderRadius:42,
    borderColor:'rgba(64, 134, 57, 0.25)',
    borderWidth:0.5,
    paddingTop:5,
    paddingBottom:5,
    paddingRight:10,
    paddingLeft:10
  },
  buttonText:{
    color:'#408639',
    fontFamily:Fonts.REGULAR,
    fontSize:12
  }
})

export default FindGames