// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet,RefreshControl, TextInput  } from 'react-native';
// import { Fonts } from '../style';
// import Skeleton from "@thevsstech/react-native-skeleton";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import Icons from 'react-native-vector-icons/Ionicons'
// const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getProfile';
// const API_URL_GET = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getPlayersLeaderboard';
// const UserProfile = ({ name, image, isFollowing, onPressFollow }) => (
//   <View style={styles.userProfileContainer}>
//     <Image source={{ uri: image }} style={styles.profileImage} />
//     <View style={styles.userInfo}>
//       <Text style={styles.userName}>{name}</Text>
//       <TouchableOpacity
//         style={[styles.followButton, { backgroundColor: isFollowing ? '#408639' : 'transparent', borderBlockColor:'green' }]}
//         onPress={onPressFollow}
//         disabled={isFollowing}
//       >
//         <Text style={[styles.followButtonText, {color:  '#408639'}]}>Mensaje</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// );

// const filterData = () => {
//   return userList.filter(player => player.name.toLowerCase().includes(filterName.toLowerCase()));
// };
// const UserProfileList = () => {
//   const [ID, setId] = useState('');
//   const [userList, setUserList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterName, setFilterName] = useState('');
 
//   const  userData={
//     "playerId":ID
//   }
  
//   console.log('userList',userList)
//   const fetchDataAndStoreIDGEt = async () => {
//     try {
//       const token = await AsyncStorage.getItem('accessToken');
  
//       if (token) {
//         const response = await fetch(API_URL, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
         
//         });
//         // console.warn(token)
//         if (response.ok) {
//           const data = await response.json();
//           setId(data.data._id);
//         } 
//         else {
//           console.error('Error fetching user data:', response.statusText);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching and storing user data:', error);
//     }
//   };
//   const dispatch = useDispatch();
//   const navigation = useNavigation()
//   const fetchDataAndStore = async () => {
//     try {
//       const token = await AsyncStorage.getItem('accessToken');

//       if (token) {
//         const response = await fetch(API_URL_GET, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setUserList(data.data); // Set API response data to userList
//         } else {
//           console.error('Error fetching user data:', response);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching and storing user data:', error);
//     } finally {
//       setLoading(false); // Set loading to false after fetching data
//     }
//   };
  
//   const handleFollowToggle = async (item) => {
//     console.log('userId',item._id,item.name)
//     dispatch({
//       type: 'COURTId',
//       payload: { courtId: item._id }
//     });
//      navigation.navigate('chatscreen', { userName: item.name, userImg: 'https://imageio.forbes.com/specials-images/imageserve/5f5be112e7f395dc08ef8e58/Lionel-Messi-celebrating-scoring-a-goal-in-the-2019-20-UEFA-Champions-League/1960x0.jpg?format=jpg&width=960', messageTime: '' })
//   };
//   useEffect(() => {
//     fetchDataAndStore();
//     fetchDataAndStoreIDGEt();
//   }, []);
//   const fectDataReload = ()=>{
//     fetchDataAndStore();
//     fetchDataAndStoreIDGEt();
//   }

//   return (
//     <View style={styles.mainContainerFollow} 
//     >
//        <View style={styles.searchbarContainer}>
//                         <Icons name='location-outline' style={styles.Searchicon} size={25} />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Ubicación"

//                             placeholderTextColor="rgba(33, 33, 33, 0.60)"
//                         />
//                     </View>
//       {loading ? (
//         <FlatList
//             data={[1, 2, 3, 4,5,6,7,8,9,10,12]} 
//             renderItem={() => (
//                 <Skeleton
//                     highlightColor={'rgba(64, 134, 57, 0.25)'} 
//                     backgroundColor={'rgba(64, 134, 57, 0.05)'} 
//                     borderRadius={'20'} 
//                     visible={false}
//                 >
//                     <View style={{ height: 50, borderRadius: 10, marginTop: 10 }} />
//                     <View style={{ flexDirection: "row", alignItems: "center", justifyContent:'space-between', marginTop: 10 }}>
                      
//                         {/* <View style={{ marginLeft: 20 }}>
//                             <View style={{ width: 120, height: 20, borderRadius: 4 }} />
//                         </View> */}
//                     </View>
//                     {/* <View style={{ width: 120, height: 20, borderRadius: 4, marginTop: 5 }} />       */}
//                 </Skeleton>
//             )}
//             showsVerticalScrollIndicator={false}
//             showsHorizontalScrollIndicator={false}
//         />
//     ) :
//       <FlatList
//       refreshControl={
//         <RefreshControl
//           refreshing={loading}
//           onRefresh={() => {
//             setLoading(true);
//             fectDataReload()
//           }}
//         />}
//         data={userList} // Use API response data for FlatList data
//         keyExtractor={(item) => item._id.toString()} // Assuming _id is unique identifier for each item
//         renderItem={({ item }) => (
//           <UserProfile
//             name={item.name}
            
//             image={item.avatar ? `https://kickers-backend-5e360941484b.herokuapp.com/${item.avatar}`: 'https://randomuser.me/api/portraits/men/1.jpg'} // Use item.avatarPath if available, else use default image URL
//             isFollowing={item.isFollowing} // Assuming isFollowing is available in API response
//             onPressFollow={() => handleFollowToggle(item)} // Assuming item._id is unique identifier for each item
//           />
//         )}
//       />
//       }
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainerFollow:{
//     backgroundColor:'white',
//     paddingTop:10,
//     flex:1,
//     paddingHorizontal:15,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   userProfileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 5,
//     borderTopWidth: 0.25,
//     borderBottomWidth: 0.25,
//     borderRightWidth: 0.25,
//     borderLeftWidth: 0.25,
//     backgroundColor:'rgba(64, 134, 57, 0.05)',
//     borderRadius:10,
//     borderColor:'rgba(0, 0, 0, 0.25)',
//     marginBottom:10
//   },
//   profileImage: {
//     width: 45,
//     height: 45,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   userInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   userName: {
//     fontSize: 16,
//     fontFamily:Fonts.BOLD,
//     color:'#212121'
//   },
//   followButton: {
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     borderWidth:1,
//     borderColor:'green',
//     marginRight:10
    
//   },
//   followButtonText: {
//     fontFamily:Fonts.MEDIUM,
//   },
//   searchbarContainer: {
//     position: 'relative',
//     width: 'auto',
//     flexDirection: 'row',
//     marginLeft: 0
// },
// Searchicon: {
//   position: 'absolute',
//   top: 20,
//   left: 10,
//   color: 'rgba(33, 33, 33, 1)',

// },
// input: {
//   marginTop: 2,
//   paddingLeft: 40,
//   padding: 16,
//   marginBottom: 10,
//   paddingRight: 10,
//   fontSize: 14,
//   lineHeight: 20,
//   width: '100%',
//   borderRadius: 12,
//   borderWidth: 0.25,
//   borderColor: 'rgba(0, 0, 0, 0.25)',
//   color: '#212121',
//   fontFamily: 'Satoshi-Medium',
//   backgroundColor: 'rgba(64, 134, 57, 0.05)',

// },
// });

// export default UserProfileList;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, RefreshControl, TextInput } from 'react-native';
import { Fonts } from '../style';
import Skeleton from "@thevsstech/react-native-skeleton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/EvilIcons';

const API_URL_GET = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getPlayersLeaderboard';

const UserProfile = ({ name, image, isFollowing, onPressFollow, isSearchMatch }) => (
  <View style={[styles.userProfileContainer, { backgroundColor:  'rgba(64, 134, 57, 0.05)' }]}>
    <Image source={{ uri: image }} style={styles.profileImage} />
    <View style={styles.userInfo}>
      <Text style={[styles.userName, { color: isSearchMatch ? '#408639' : '#212121' }]}>{name}</Text>
      <TouchableOpacity
        style={[styles.followButton, { backgroundColor: isFollowing ? '#408639' : 'transparent', borderBlockColor:'green' }]}
        onPress={onPressFollow}
        disabled={isFollowing}
      >
        <Text style={[styles.followButtonText, {color:  '#408639',}]}>Mensaje</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const UserProfileList = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [matchedPlayer, setMatchedPlayer] = useState(null);
   console.log('asdasdasdmatchplaer',userList)
const navigation = useNavigation()
const dispatch = useDispatch();
  const fetchDataAndStore = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');

      if (token) {
        const response = await fetch(API_URL_GET, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserList(data.data);
        } else {
          console.error('Error fetching user data:', response);
        }
      }
    } catch (error) {
      console.error('Error fetching and storing user data:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleFollowToggle = async (item) => {
    console.log('userId',item._id,item.name)
    dispatch({
      type: 'COURTId',
      payload: { courtId: item._id }
    });
     navigation.navigate('chatscreen', { userName: item.name, userImg: 'https://imageio.forbes.com/specials-images/imageserve/5f5be112e7f395dc08ef8e58/Lionel-Messi-celebrating-scoring-a-goal-in-the-2019-20-UEFA-Champions-League/1960x0.jpg?format=jpg&width=960', messageTime: '' })
  };
  useEffect(() => {
    fetchDataAndStore();
  }, []);

  useEffect(() => {
    if (filterName.trim() === '') {
      setMatchedPlayer(null);
      return;
    }
    const match = userList.find(user => user.name.toLowerCase().includes(filterName.toLowerCase()));
    setMatchedPlayer(match);
  }, [filterName, userList]);

  return (
    <View style={styles.mainContainerFollow}>
      <View style={styles.searchbarContainer}>
        <Icons name='search' style={styles.Searchicon} size={35} />
        <TextInput
          style={styles.input}
          placeholder="buscar por nombre de jugador  "
          placeholderTextColor="rgba(33, 33, 33, 0.60)"
          onChangeText={text => setFilterName(text)}
          value={filterName}
        />
      </View>
      {loading ? (
        <FlatList
          data={[1, 2, 3, 4,5,6,7,8,9,10,12]} 
          renderItem={() => (
            <Skeleton
              highlightColor={'rgba(64, 134, 57, 0.25)'} 
              backgroundColor={'rgba(64, 134, 57, 0.05)'} 
              borderRadius={'20'} 
              visible={false}
            >
              <View style={{ height: 50, borderRadius: 10, marginTop: 10 }} />
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent:'space-between', marginTop: 10 }} />
            </Skeleton>
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        // https://raw.githubusercontent.com/Muhammad-Ubaid-uddin-sheikh/Kicker-AfterAPK/master/src/assets/avatorimg.png
        <>
          {matchedPlayer && (
            <UserProfile
              name={matchedPlayer.name}
              image={matchedPlayer.avatar ? `https://kickers-backend-5e360941484b.herokuapp.com/${matchedPlayer.avatar}` : 'https://raw.githubusercontent.com/Muhammad-Ubaid-uddin-sheikh/Kicker-AfterAPK/master/src/assets/avatorimg.png'}
              isFollowing={matchedPlayer.isFollowing}
              onPressFollow={() => handleFollowToggle(matchedPlayer)}
              isSearchMatch={true}
            />
          )}
          <FlatList
            data={userList.filter(user => !matchedPlayer || user !== matchedPlayer)}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <UserProfile
                name={item.name}
                image={item.avatar ? `https://kickers-backend-5e360941484b.herokuapp.com/${item.avatar}` : 'https://raw.githubusercontent.com/Muhammad-Ubaid-uddin-sheikh/Kicker-AfterAPK/master/src/assets/avatorimg.png'}
                isFollowing={item.isFollowing}
                onPressFollow={() => handleFollowToggle(item)}
                isSearchMatch={false}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainerFollow:{
    backgroundColor:'white',
    paddingTop:10,
    flex:1,
    paddingHorizontal:15,
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
    borderRightWidth: 0.25,
    borderLeftWidth: 0.25,
    borderRadius:10,
    borderColor:'rgba(0, 0, 0, 0.25)',
    marginBottom:10
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontFamily:Fonts.BOLD,
  },
  followButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth:1,
    borderColor:'green',
    marginRight:10,
  },
  followButtonText: {
    fontFamily:Fonts.MEDIUM,
  },
  searchbarContainer: {
    position: 'relative',
    width: 'auto',
    flexDirection: 'row',
    marginLeft: 0,
  },
  Searchicon: {
    position: 'absolute',
    top: 17,
    left: 5,
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
    backgroundColor: 'rgba(64, 134, 57, 0.05)',
    fontFamily:Fonts.MEDIUM
  },
});

export default UserProfileList;


