import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Image, StyleSheet, RefreshControl,Text, TouchableOpacity, View, TextInput, FlatList, Dimensions } from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons'
import Clock from 'react-native-vector-icons/MaterialCommunityIcons'
import LocationIcon from 'react-native-vector-icons/FontAwesome6'
import StarIcons from 'react-native-vector-icons/Fontisto'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fonts } from '../style';
import Skeleton from "@thevsstech/react-native-skeleton";
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PERMISSIONS, RESULTS ,request,} from 'react-native-permissions';
const API_URL_GETLOCATION = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getCourtsByLocation';
const API_URL_GET = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getAvailableCourts';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getCourtFields';
const FindGames = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [groundsData, setGroundsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [data , setData] = useState()
    const [latitude ,setlatitude] = useState()
    const [longitude ,setlongitude] = useState()
console.log(data)
    const [currentLocation, setCurrentLocation] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
console.log(selectedCoordinates)
const requestLocationPermission = async () => {
  try {
    let permission;
    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    }

    const result = await request(permission);

    if (result !== RESULTS.GRANTED) {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
  useEffect(() => {
    requestLocationPermission();
  }, []);
  const fetchCourtData = async (latitude, longitude, radius = 5000) => {
    setIsLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`${API_URL_GETLOCATION}?lat=${latitude}&long=${longitude}&radius=${radius}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setGroundsData(responseData.data);
        console.log('responseData', responseData.images);
      } else {
        console.log('Error fetching court data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching court data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (data, details) => {
    setSelectedLocation(details.description);
    setSelectedCoordinates({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    // Fetch court data for the selected location
    fetchCourtData(details.geometry.location.lat, details.geometry.location.lng);
  };

  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Current latitude:', latitude);
        console.log('Current longitude:', longitude);
        fetchCourtData(latitude, longitude);
      },
      (error) => {
        console.log('Error getting location:', error.message);
        setIsLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    requestLocationPermission();
    getCurrentLocation();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCurrentLocation();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, [getCurrentLocation]);
useEffect(() => {
    fetchCourtData();
}, []);

useEffect(() => {
    const filtered = groundsData.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
}, [searchText, groundsData]);




  const renderDescription = (row) => row.description;

   const renderItem = ({ item }) => {
    const addressParts = item.address.split(',').slice(0, 5).join(',');
   return(
  
    <TouchableOpacity onPress={() => handleItemClick(item)} style={{ marginBottom: 20 }}>
        <Image
            source={{ uri: item.images.length > 0 ? item.images[0] : 'https://github.com/Muhammad-Ubaid-uddin-sheikh/Kicker-AfterAPK/blob/master/src/assets/WhatsApp%20Image%202024-04-20%20at%2000.11.53.jpeg?raw=true' }}
            style={{ width: '100%', height: 170, borderRadius: 15, objectFit: 'cover' }}
        />
        <View style={styles.TextContainerImage}>
            <Text style={styles.GroundName}>{item.name}</Text>
            <Text style={[styles.buttonText, { color: item.isActive ? '#408639' : '#408639' }]}>
                        {item.isActive ? 'No disponible' : 'Disponible'}
                    </Text>
        </View>
        <View style={styles.locationTextContainer}>
        
            <LocationIcon name='location-dot' style={{ color: '#408639' }} size={15} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.textLocation,{width:'80%'}]}> {addressParts}</Text>
            <StarIcons name='star' style={{ color: '#FCC767', marginLeft: 10 }} size={12} />
            <Text style={[styles.textLocation,]}> 4.5</Text>
        </View>
    </TouchableOpacity>
);

}

const handleItemClick = async (item) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}?courtId=${item._id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            setData(responseData.data) // Save clicked ground data in state
            navigation.navigate('ParticularGroundScreen', { item, dataFeild: responseData.data });
        } else {
            console.log('Error fetching court data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching court data:', error);
    }
};
    return (
        <View style={styles.container}>
            <View style={styles.MainContainer}>
          
                        <View style={{zIndex:1}}>
                        <View style={styles.searchbarContainer}>
                            <Icons name='location-outline' style={styles.Searchicon} size={25}/>
                        <GooglePlacesAutocomplete
                         textInputStyle={{ color: 'black', placeholderTextColor: 'black' }}
        placeholder="Enter Location"
        onPress={handleLocationSelect}
        defaultValue={selectedLocation}
        query={{
          key: 'AIzaSyB_nNvYWSCB2haI7DCgR6chQmsg-T4oj8s',
          language: 'en',
          components: 'country:MX',
        }}
        
        fetchDetails={true}
        enablePoweredByContainer={false}
        renderDescription={renderDescription}
        styles={{
            textInputContainer: {
              borderTopWidth: 0,
              borderBottomWidth: 0,
              zIndex: 99,
            },
            textInput: {
          fontFamily:Fonts.MEDIUM,
              marginTop: 2,
        paddingLeft: 40,
        height:60,
        marginBottom: 10,
        paddingRight: 10,
        fontSize: 14,
        borderRadius: 8,
        borderWidth: 0.25,
        borderColor: 'rgba(0, 0, 0, 0.25)',
        color: 'black',
        backgroundColor: 'rgba(64, 134, 57, 0.05)',
        zIndex:99,
            },
            listView: {
              position: 'absolute',
              top:63,
              color: 'blue',
              zIndex:99
            },
            row: {
                backgroundColor: '#408639', 
                borderRadius:5,
                zIndex:99
              },
              text: {
                color: 'blue',
                fontSize:30 ,
                zIndex:99
              },
          }}
      />
    
                        </View>
                        </View>
               
                {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={[styles.searchbarContainer,{width:'48%',marginRight:7}]}>
                    <Icons name='search-outline' style={styles.Searchicon} size={25} />
                    <TextInput
                        style={styles.input}
                        placeholder="Tipo de campo "
                        placeholderTextColor="rgba(33, 33, 33, 0.60)"
                        onChangeText={setSearchText}
                        value={searchText}
                    />
                </View>
                <View style={[styles.searchbarContainer,{width:'48%',}]}>
                    <Clock name='clock-outline' style={styles.Searchicon} size={25} />
                    <TextInput
                        style={styles.input}
                        placeholder="Tiempo"
                        placeholderTextColor="rgba(33, 33, 33, 0.60)"
                        onChangeText={setSearchText}
                        value={searchText}
                    />
                </View>
                </View>   */}
                  
                <View style={styles.rowContainer}>
    <Text style={styles.MainHeading}>Canchas cercanas</Text>
    {isLoading ? (
    <FlatList
        data={[1, 2, 3, 4]} 
        renderItem={() => (
            <Skeleton 
                highlightColor={'rgba(64, 134, 57, 0.25)'} 
                backgroundColor={'rgba(64, 134, 57, 0.05)'} 
                borderRadius={'20'} 
                visible={false}
            >
                <View style={{ height: 150, borderRadius: 10, marginTop: 10 }} />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent:'space-between', marginTop: 10 }}>
                    <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                    <View style={{ marginLeft: 20 }}>
                        <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                    </View>
                </View>
                <View style={{ width: 120, height: 20, borderRadius: 4, marginTop: 5 }} />      
            </Skeleton>
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
    />
) : (
    // Show data when loaded
    (groundsData && groundsData.length > 0) ? (
        <FlatList
            height={'88%'}
            // paddingBottom={40}
            data={groundsData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#9Bd35A', '#689F38']}
                    tintColor="#9Bd35A"
                    title="Loading..."
                    titleColor="#9Bd35A"
                />
            }
        />
    ) : (
        // Show message if no courts are available at the current location
        <View style={{justifyContent:'center',alignItems:'center',height:350}}>

                    <Icons name='football-outline' style={{fontSize:60,color:'#408639'}}/>
                    <Text style={styles.MainHeading}>No hay canchas disponibles</Text>
    
        </View>
    )
)}
</View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    suggestionText: {
        color: 'blue', // Change this to the desired color
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
      },
      textInput: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        color:'black'
      },
    map: {
        width: '100%',
        height: 300,
        marginTop: 20,
      },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 30,
    },
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
        // alignItems: "center",
        paddingLeft: 3,
    },
    textLocation: {
        fontSize: 14,
        fontFamily: Fonts.REGULAR,
        color: '#A0A0A0',
        alignItems: 'center',
        flexDirection: 'row'
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
        top: 20,
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
      map: {
        ...StyleSheet.absoluteFillObject,
      },
});

export default FindGames;
