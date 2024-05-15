import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert, Platform, Image, FlatList } from 'react-native';
import { Fonts } from '../style';
import ChatScreen from './ChatScreen';
import NoMessage from 'react-native-vector-icons/Feather'
import Skeleton from "@thevsstech/react-native-skeleton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Socket, io } from 'socket.io-client';
import { useSocket } from '../../../Socket';
import SocketsUrl from '../Socket';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getMyChatRooms';
const Messages = [
    // {
    //   id: '1',
    //   userName: 'Jenny Doe',
    //   userImg: 'https://w0.peakpx.com/wallpaper/454/383/HD-wallpaper-football-super-wonderful-nice-awesone-ground-stadium.jpg',
    //   messageTime: '4 mins ago',
    //   messageText:
    //     'Hey there, this is my test for a post of my social app in React Native.',
    // },
    // {
    //   id: '2',
    //   userName: 'John Doe',
    //   userImg: 'https://w0.peakpx.com/wallpaper/454/383/HD-wallpaper-football-super-wonderful-nice-awesone-ground-stadium.jpg',
    //   messageTime: '2 hours ago',
    //   messageText:
    //     'Hey there, this is my test for a post of my social app in React Native.',
    // },
    // {
    //   id: '3',
    //   userName: 'Ken William',
    //   userImg: 'https://w0.peakpx.com/wallpaper/454/383/HD-wallpaper-football-super-wonderful-nice-awesone-ground-stadium.jpg',
    //   messageTime: '1 hours ago',
    //   messageText:
    //     'Hey there, this is my test for a post of my social app in React Native.',
    // },
    // {
    //   id: '4',
    //   userName: 'Selina Paul',
    //   userImg: 'https://www.shutterstock.com/image-photo/tenis-court-stadium-red-ground-600nw-700726393.jpg',
    //   messageTime: '1 day ago',
    //   messageText:
    //     'Hey there, this is my test for a post of my social app in React Native.',
    // },
    // {
    //   id: '5',
    //   userName: 'Christy Alex',
    //   userImg: 'https://thumbs.dreamstime.com/b/professional-basketball-court-arena-backgrounds-professional-basketball-court-arena-background-168018953.jpg',
    //   messageTime: '2 days ago',
    //   messageText:
    //     'Hey there, this is my test for a post of my social app in React Native.',
    // },
  ];
const Chat = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [ChatroomId,setChatroomId] = useState()
    const [ChatroomData,SetChatroomData] = useState()
    const socket = useSocket();
    console.log('ChatroomId-------------', ChatroomId,)
    useEffect(() => {
        const fetchDataAndStore = async () => {
          try {
            const token = await AsyncStorage.getItem('accessToken');
    
            if (token) {
              const response = await fetch(API_URL, {
                headers: {
                  Authorization: `Bearer ${token}`,
    
                },
              });
    
              if (response.ok) {
                const data = await response.json();
                const finalData = data.data
                console.log('datanewasd',finalData)
                console.log("chatroom data",data)
                // const extractedIds = finalData.map(item => item._id);
                SetChatroomData(finalData)
                setChatroomId(finalData);
              
              } else {
                console.error('Error fetching user data:', response.statusText);
              }
            }
           
          } catch (error) {
            console.error('Error fetching and storing user data:', error);
          }finally{
            setLoading(false)
          }
        };
        fetchDataAndStore();
      }, []);
      const handleChatRoomClick = (chatRoomId,name) => {
        // const socket = io(SocketsUrl);
        if (socket) {
          socket.emit('join', { chatRoomId:chatRoomId});
        console.log('emitfunction ID' ,chatRoomId)
        }
        
        navigation.navigate('chatscreen',{data: chatRoomId, userName: name, userImg:'https://w0.peakpx.com/wallpaper/454/383/HD-wallpaper-football-super-wonderful-nice-awesone-ground-stadium.jpg', messageTime: "nomessage" })
      };
    return (
        <View style={styles.container}>
        {loading ? (
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            renderItem={() => (
              <Skeleton
                highlightColor={'rgba(64, 134, 57, 0.25)'}
                backgroundColor={'rgba(64, 134, 57, 0.05)'}
                borderRadius={'20'}
                visible={false}
              >
                <View style={{ height: 50, borderRadius: 10, marginTop: 10 }} />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginTop: 10 }}>
                </View>
              </Skeleton>
            )}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        ) : ChatroomData?.length === 0 ? (
          <View style={styles.noMessagesContainer}>
            <Image source={require('../../assets/NoMessages.png')} style={styles.emptyIcon} />
            <Text style={styles.noMessagesText}>No hay mensajes... todavía</Text>
          </View>
        ) : (
          <FlatList
            data={ChatroomData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() =>handleChatRoomClick(item.chatRoomId,item.name)}>
                <View style={styles.userInfo}>
                  <View >
                    <Image style={{ width: 43, height: 45, borderRadius: 8 }} source={{ uri: 'https://w0.peakpx.com/wallpaper/454/383/HD-wallpaper-football-super-wonderful-nice-awesone-ground-stadium.jpg' }}/>
                      {/* item.userImg */}
                    
                  </View>
                  <View style={styles.textSec}>
                    <View style={styles.textInfoView}>
                      <Text style={styles.textNmae}>{item.name}</Text>
                      <Text style={styles.postTime}>{item.messageTime}</Text>
                    </View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.mesagesTextsty}>{item.messageText}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
  );
};

const styles = StyleSheet.create({
    noMessagesText:{
        fontFamily:Fonts.MEDIUM,
        fontSize:15,
        color:'#212121'
    },
    container: {
        backgroundColor:'white',
        flex:1,
        paddingHorizontal:15,
      },
      noMessagesContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
      },
      userInfo:{
        flexDirection:'row',
        justifyContent:'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderTopWidth: 0.25,
        borderBottomWidth: 0.25,
        borderRightWidth: 0.25,
        borderLeftWidth: 0.25,
        backgroundColor:'rgba(64, 134, 57, 0.05)',
        borderRadius:10,
        borderColor:'rgba(0, 0, 0, 0.25)',
        marginBottom:10
      },
      textSec:{
        flexDirection:'column',
        justifyContent:'center',
        // padding: 15,
        // paddingLeft: 0,
        paddingLeft: 15,
        width: '100%',
      },
      textInfoView: {
        flexDirection:'row',
        justifyContent:'space-between',
      },
      textNmae:{
        fontFamily:Fonts.BOLD,
        fontSize:14,
        color:'#212121'
      },
      postTime:{
        fontFamily:Fonts.REGULAR,
        fontSize:11,
        color:'#666',
        paddingRight:10
      },
      mesagesTextsty:{
color:'#333333',
fontFamily:Fonts.REGULAR,
fontSize:12,
paddingRight:10
      },
    
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyIcon:{
width:'80%',
height:280,
objectFit:'contain'
      }
      
});

export default Chat;
