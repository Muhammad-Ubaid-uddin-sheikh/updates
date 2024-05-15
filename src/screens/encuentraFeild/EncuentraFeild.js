// import React, { useEffect, useState } from 'react';
// import { ScrollView, StyleSheet, Text, TextInput, View, RefreshControl } from 'react-native';
// import MatchPlayerDetails from '../../components/MatchesPlayerDetails';
// import Icons from 'react-native-vector-icons/Ionicons';
// import SearchICon from 'react-native-vector-icons/EvilIcons';
// import ClockICon from 'react-native-vector-icons/AntDesign';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { Fonts } from '../style';

// const APIURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getAllGames';

// const FindGames = ({ navigation }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
// console.log('data',data)
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const token = await AsyncStorage.getItem('accessToken');
//       const url = APIURL;

//       const response = await fetch(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         const gamesWithAddresses = await Promise.all(
//           responseData.data.map(async (game) => {
//             const address = await getAddressFromCoordinates(game.location.coordinates[1], game.location.coordinates[0]);
//             return { ...game, address };
//           })
//         );
//         setData(gamesWithAddresses);
//       } else {
//         console.error('API Error:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getAddressFromCoordinates = async (latitude, longitude) => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB_nNvYWSCB2haI7DCgR6chQmsg-T4oj8s`
//       );
//       if (response.data.results.length > 0) {
//         const address = response.data.results[0].formatted_address;
//         return address;
//       } else {
//         return 'Address not found';
//       }
//     } catch (error) {
//       console.error('Error fetching address:', error);
//       return 'Error fetching address';
//     }
//   };

//   return (
//     <ScrollView
//       style={styles.form}
//       showsVerticalScrollIndicator={false}
//       refreshControl={
//         <RefreshControl refreshing={loading} onRefresh={fetchData} />
//       }
//     >
//       <View style={styles.MainContainer}>
//         <View style={styles.rowContainer}>
//           <View style={styles.searchbarContainer}>
//             <Icons name='location-outline' style={styles.Searchicon} size={25} />
//             <TextInput
//               style={styles.input}
//               placeholder="Ubicación"
//               placeholderTextColor="rgba(33, 33, 33, 0.60)"
//             />
//           </View>
//           <View style={styles.flexPropertyInput}>
//             <View style={styles.ColmInput}>
//               <View style={styles.searchbarContainer}>
//                 <SearchICon name='search' style={styles.Searchicon} size={25} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Tipo de partido"
//                   placeholderTextColor="rgba(33, 33, 33, 0.60)"
//                 />
//               </View>
//             </View>
//             <View style={styles.ColmInput}>
//               <View style={styles.searchbarContainer}>
//                 <ClockICon name='clockcircleo' style={[styles.Searchicon, { top: 23 }]} size={18} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Hora"
//                   placeholderTextColor="rgba(33, 33, 33, 0.60)"
//                 />
//               </View>
//             </View>
//           </View>
//           <Text style={styles.MainHeading}>Partidos ocurriendo cerca de ti</Text>
//           <View style={styles.rowContainer}>
//             <View style={[styles.MainGroundContainer, { paddingTop: 20 }]}>
//               {data.map((item) => (
//                 <View style={{ paddingBottom: 10 }} key={item._id}>
//                   <MatchPlayerDetails
//                     Link={() => navigation.navigate('ParticularTeamJoinScreen', { item })}
//                     LookingFor={item.lookingFor}
//                     matchType={item.matchType}
//                     MatchDate={item.date}
//                     duration={item.duration}
//                     Address={item.address} // Pass the address as a prop
//                   />
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   ColmInput: {
//     width: "50%",
//   },
//   flexPropertyInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     gap: 10,
//     paddingRight: 10
//   },
//   MainHeading: {
//     fontSize: 19,
//     color: '#212121',
//     letterSpacing: 0.8,
//     width: 'auto',
//     marginTop: 10,
//     fontFamily: Fonts.BOLD,
//     marginLeft: 2,
//   },
//   MainGroundContainer: {
//     paddingBottom: 15
//   },
//   MainContainer: {
//     width: 'auto',
//     backgroundColor: 'white',
//     flex: 1,
//     paddingLeft: 15,
//     paddingRight: 20,
//     paddingBottom: 20,
//   },
//   form: {
//     backgroundColor: '#fff',
//     display: 'flex',
//     width: 'auto',
//     position: 'relative',
//     paddingTop: 10,
//     height: 'auto',
//     paddingBottom: 20
//   },
//   Searchicon: {
//     position: 'absolute',
//     top: 20,
//     left: 10,
//     color: 'rgba(33, 33, 33, 1)',
//   },
//   input: {
//     marginTop: 2,
//     paddingLeft: 40,
//     padding: 16,
//     marginBottom: 10,
//     paddingRight: 10,
//     fontSize: 14,
//     lineHeight: 20,
//     width: '100%',
//     borderRadius: 12,
//     borderWidth: 0.25,
//     borderColor: 'rgba(0, 0, 0, 0.25)',
//     color: '#212121',
//     fontFamily: Fonts.MEDIUM,
//     backgroundColor: 'rgba(64, 134, 57, 0.05)',
//   },
//   searchbarContainer: {
//     position: 'relative',
//     width: 'auto',
//     flexDirection: 'row',
//     marginLeft: 0
//   },
// });

// export default FindGames;
import React, { useEffect, useState } from 'react'
import { Alert, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MatchPlayerDetails from '../../components/MatchesPlayerDetails'
import { Fonts } from '../style'
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const APIGet= 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getGames'
const FindGames = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data , setdata] =useState([])
  const handleNavigate = () => {
    navigation.navigate('GameStart')
  }
  useEffect(()=>{
fetchData()
setLoading(false)
  },[])

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
          const queryParams = 'lookingFor=Team'; // Construct your query parameter string
          const url = `${APIGet}?${queryParams}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const gamesWithAddresses = await Promise.all(
          responseData.data.map(async (game) => {
            const address = await getAddressFromCoordinates(game.location.coordinates[1], game.location.coordinates[0]);
            return { ...game, address };
          })
        );
        setdata(gamesWithAddresses);
      } else {
        console.error('API Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB_nNvYWSCB2haI7DCgR6chQmsg-T4oj8s`
      );
      if (response.data.results.length > 0) {
        const address = response.data.results[0].formatted_address;
        return address;
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Error fetching address';
    }
  };

  return (


    <View style={styles.MainContainer}>
      <ScrollView style={styles.form} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(false);
              fetchData()
            }}
          />}
          >
        <View style={styles.rowContainer} >
          {/* <Text style={styles.MainHeading}>Partidos programados</Text> */}
          
          <View style={[styles.MainGroundContainer, { }]} >
          {data?.map((item)=>{
            
            return(
            <View style={{paddingBottom:10}} key={item._id}>
              
               <MatchPlayerDetails Status={item.status === 'joined' ? 'Unirse' : 'No Unirse'} Address={item.address} Link={()=> navigation.navigate('ParticularTeamJoinScreen',{item:item})} LookingFor={item.lookingFor} matchType={item.matchType}  MatchDate={item.date} duration={item.duration} />
            
              </View>
           )
          })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.nextButton}>
        <Button text="Comenzar un partido" Link={handleNavigate} />
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  MainHeading: {
    fontSize: 19,
    color: '#212121',
    letterSpacing: 0.2,
    width: 'auto',
    fontFamily: Fonts.BOLD,
    marginLeft: 2,
  },
  MainGroundContainer: {
    paddingBottom: 15
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
    paddingBottom: 5,
  },
  form: {
    backgroundColor: 'white',
    flex: 1,
  },
})

export default FindGames