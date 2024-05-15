import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Fonts } from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../../Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { clearCourtId } from '../../../reduxfolder/reducers/action';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getChatHistory';
const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const userData = useSelector(state => state.ID);
  const [senderId, setSenderId] = useState();
  const [resendMessages,setresendMessages] = useState([])
  const dispatch = useDispatch();
  const [isLoggingOut, setisLoggingOut] = useState(true);
  const receiverId = userData.courtId;
  const socket = useSocket();
  const { data } = route?.params;
  const [IsMessageRecived,setIsMessageRecived] = useState(false)
  function generateRandomEightDigitNumber() {
    // Ensure the generated number is at least 8 digits
    return Math.floor(Math.random() * (100000000 - 10000000) + 10000000);
  }
  
  useEffect(() => {
    
    fetchImagesFromServer(data);
    if(receiverId){
      setisLoggingOut(false)
    }else{
      setisLoggingOut(true)
    }
    getData();
    
  }, []);

  useEffect(()=>{
    
    const handleMessage =(value) => { 
        console.log('respinse player emit-to cleint');   
        fetchImagesFromServer(data);
       
      }
    
    socket.on('emit-to-client', handleMessage);
    return () => socket.off('emit-to-client',handleMessage)
  },[socket])
 console.log('resendMesage',resendMessages,)

const combineMessages = useMemo(()=>{[...messages, ...resendMessages]},[resendMessages,messages])


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue !== null) {
        const user = JSON.parse(jsonValue);
        setSenderId(user);
      } else {
        
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  const fetchImagesFromServer = async (data) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await axios.get(`${API_URL}?chatRoomId=${data}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.data) {
        const messages = res.data.data
          .map((e, i) => ({
            _id: e._id,
            text: e.message,
            createdAt: new Date(e.createdAt),
            user: {
              _id: e.sender?.id,
              name: e.sender?.name,
              avatar: e.avatar
            }
          }));
          console.log('chatHIstory-----',messages)
  // await AsyncStorage.setItem('chatMessages',JSON.stringify(messages))
        setMessages(messages.reverse()); // Reverse the order of messages after setting in state
          // dispatch({ type:"SetMessage",payload:{messages:messages.reverse()}})
      }
    } catch (error) {
      console.log("Error fetching chat history:", error);
    }finally{
      setisLoggingOut(false)
    }
  };
 
  console.log('combineMessages-----',combineMessages)
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const room = `court_${userData.courtId}`;
    const textMessage = messages[0].text
    console.log('textMessage----------------------',textMessage)
    let obj = {
      senderId: senderId?.id,
      message: textMessage,
      user: { profile: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg", name:  senderId.username, id: senderId.id }
    }
    
    if(!!receiverId){
      obj.receiverId = receiverId   
    }else{
      obj.chatRoomId = data
    }
    // socket.emit('test','test emmit to client')
    console.log('message send log a=obj',obj)
    dispatch({
      type: 'COURT_ID',
      payload: { courtId: receiverId  },
    });

    // Clear the court ID after 2 seconds
    setTimeout(() => {
      dispatch(clearCourtId());
    }, 2000);
    socket.emit('send-message-owner', obj);
   
  }, [senderId, receiverId, userData.courtId]);

  const renderSend = props => (
    <Send {...props}>
      <View>
        <MaterialCommunityIcons
          name="send"
          style={{ paddingBottom: 10, marginRight: 5, paddingRight: 10 }}
          size={22}
          color="#408639"
        />
      </View>
    </Send>
  );

  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#212121',
          borderRadius: 12,
        },
      }}
      textStyle={{
        right: {
          color: '#fff',
          fontFamily: Fonts.MEDIUM,
          padding: 3,
          fontSize: 14,
        },
      }}
    />
  );

  const scrollToBottomComponent = () => (
    <FontAwesome name="angle-double-down" size={22} color="#333" />
  );

  const renderInputToolbar = props => (
    <InputToolbar
      {...props}
      containerStyle={{ backgroundColor: 'white', paddingBottom: 2, paddingTop: 2 }}
      placeholderTextColor={'#212121'}
      textInputStyle={{ color: '#212121' }}
    />
  );

  const onInputTextChanged = text => {
    setInputText(text);
  };

  return (
    <View style={{ flex: 1 }}>

    {isLoggingOut ? ( // Render spinner if loading is true
    <ActivityIndicator size="large" color="#408639" />
  ) : (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{ _id: senderId?.id }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      style={{ paddingBottom: 20 }}
      renderInputToolbar={renderInputToolbar}
      onInputTextChanged={onInputTextChanged}
      text={inputText}
    />
  )}
  </View>
  );
};

export default ChatScreen;








// import React, { useState, useEffect, useCallback } from 'react';
// import { View } from 'react-native';
// import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
// import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Fonts } from '../style';
// import { useSelector } from 'react-redux';
// import { useSocket } from '../../../Socket';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getChatHistory';

// const ChatScreen = ({ route }) => {
//   const [messages, setMessages] = useState([]);
//   const userData = useSelector(state => state.ID);
//   const senderId = userData.playerId;
//   const receiverId = userData.courtId;
//   const socket = useSocket();
//   const { data } = route?.params;

//   const fetchChatHistory = async () => {
//     try {
//       const token = await AsyncStorage.getItem('accessToken');
//       const res = await axios.get(`${API_URL}?chatRoomId=${data}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res && res.data && res.data.data) {
//         const chatHistory = res.data.data.map(message => ({
//           _id: message._id,
//           text: message.message,
//           createdAt: new Date(message.createdAt),
//           user: {
//             _id: message.sender.id,
//             name: message.sender.name,
//             avatar: message.sender.profile,
//           },
//         }));
//         setMessages(chatHistory.reverse()); // Reverse the array to display latest messages at the bottom
//       }
//     } catch (error) {
//       console.error('Error fetching chat history:', error);
//     }
//   };

//   useEffect(() => {
//     fetchChatHistory();
//   }, []);

//   const onSend = useCallback((newMessages = []) => {
//     const room = `court_${userData.courtId}`;
//     const textMessage = newMessages[0].text;
//     socket.emit('send-message-owner', {
//       senderId,
//       receiverId,
//       chatRoomId: data,
//       message: textMessage,
//       user: { profile: "www.google.com", name: "test", id: "65def3215f448728e6650d3a" }
//     });
//     // Update state to add the new message at the bottom
//     setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
//   }, [senderId, receiverId, userData.courtId]);

//   const renderSend = props => (
//     <Send {...props}>
//       <View>
//         <MaterialCommunityIcons
//           name="send"
//           style={{ paddingBottom: 10, marginRight: 5, paddingRight: 10 }}
//           size={22}
//           color="#408639"
//         />
//       </View>
//     </Send>
//   );

//   const renderBubble = props => (
//     <Bubble
//       {...props}
//       wrapperStyle={{
//         right: {
//           backgroundColor: '#212121',
//           borderRadius: 12,
//         },
//         left: {
//           backgroundColor: '#eee',
//           borderRadius: 12,
//         },
//       }}
//       textStyle={{
//         right: {
//           color: '#fff',
//           fontFamily: Fonts.MEDIUM,
//           padding: 3,
//           fontSize: 14,
//         },
//         left: {
//           color: '#212121',
//           fontFamily: Fonts.MEDIUM,
//           padding: 3,
//           fontSize: 14,
//         },
//       }}
//     />
//   );

//   const scrollToBottomComponent = () => (
//     <FontAwesome name="angle-double-down" size={22} color="#333" />
//   );

//   const renderInputToolbar = props => (
//     <InputToolbar
//       {...props}
//       containerStyle={{ backgroundColor: 'white', paddingBottom: 2, paddingTop: 2 }}
//       placeholderTextColor={'#212121'}
//       textInputStyle={{ color: '#212121' }}
//     />
//   );

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{ _id: senderId }} // Assuming the sender's ID is used to differentiate between users
//       renderBubble={renderBubble}
//       alwaysShowSend
//       renderSend={renderSend}
//       scrollToBottom
//       scrollToBottomComponent={scrollToBottomComponent}
//       style={{ paddingBottom: 20 }}
//       renderInputToolbar={renderInputToolbar}
//     />
//   );
// };

// export default ChatScreen;







// import React, { useState, useEffect, useCallback } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
// import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Fonts } from '../style';
// import { useSelector } from 'react-redux';
// import { useSocket } from '../../../Socket';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getChatHistory';

// const ChatScreen = ({ route }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const userData = useSelector(state => state.ID);
//   const senderId = userData.playerId;
//   const receiverId = userData.courtId;
//   const socket = useSocket();
//   const { data } = route?.params;
//   const [sender1Messages, setSender1Messages] = useState([]);
//   const [sender2Messages, setSender2Messages] = useState([]);
//   const fetchMessagesFromServer = async (chatroomId) => {
//     try {
//       const token = await AsyncStorage.getItem('accessToken');
//       const res = await axios.get(`${API_URL}?chatRoomId=${chatroomId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//       if (res && res.data && res.data.data) {
//         const messages = res.data;
//         const sender1Messages = [];
//         const sender2Messages = [];
//   console.log('messagesData',messages)
//         messages.forEach(message => {
//           const { _id, message: text, createdAt, sender } = message;
//           const formattedMessage = {
//             _id,
//             text,
//             createdAt: new Date(createdAt),
//             user: {
//               _id: sender.id === 'SENDER_ID_1' ? 1 : 2,
//               name: sender.name,
//               avatar: sender.profile,
//             },
//           };

//           if (sender.id === 'SENDER_ID_1') {
//             sender1Messages.push(formattedMessage);
//           } else {
//             sender2Messages.push(formattedMessage);
//           }
//         });

//         setSender1Messages(sender1Messages);
//         setSender2Messages(sender2Messages);
//       }
//     } catch (error) {
//       console.log("Error fetching messages:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMessagesFromServer(data);
//   }, []);

//   const onSend = useCallback((newMessages = []) => {
//         setMessages(previousMessages =>
//           GiftedChat.append(previousMessages, newMessages),
//         );
//         const room = `court_${userData.courtId}`;
//         const textMessage = newMessages[0].text;
//         socket.emit('send-message-owner', { senderId, receiverId, chatRoomId: data, message: textMessage, user: { profile: "www.google.com", name: "test", id: "65def3215f448728e6650d3a" } });
//       }, [senderId, receiverId, userData.courtId]);


//   const renderSend = props => (
//     <Send {...props}>
//       <View>
//         <MaterialCommunityIcons
//           name="send"
//           style={{ paddingBottom: 10, marginRight: 5, paddingRight: 10 }}
//           size={22}
//           color="#408639"
//         />
//       </View>
//     </Send>
//   );

//   const renderBubble = props => (
//     <Bubble
//       {...props}
//       wrapperStyle={{
//         left: {
//           backgroundColor: '#69f0ae', // Green color for recipient's messages
//           borderRadius: 12,
//         },
//         right: {
//           backgroundColor: '#212121', // Black color for user's messages
//           borderRadius: 12,
//         },
//       }}
//       textStyle={{
//         right: {
//           color: '#fff',
//           fontFamily: Fonts.MEDIUM,
//           padding: 3,
//           fontSize: 14,
//         },
//       }}
//     />
//   );

//   const renderInputToolbar = props => (
//     <InputToolbar
//       {...props}
//       containerStyle={{ backgroundColor: 'white', paddingBottom: 2, paddingTop: 2 }}
//       placeholderTextColor={'#212121'}
//       textInputStyle={{ color: '#212121' }}
//     />
//   );

//   const onInputTextChanged = text => {
//     setInputText(text);
//   };

//   return (
//     <GiftedChat
//     messages={sender1Messages.concat(sender2Messages)}
//     onSend={onSend}
//     user={{ _id: 1 }}
//     renderBubble={renderBubble}
//     alwaysShowSend
//     renderSend={renderSend}
//     scrollToBottom
//     inverted={false}
//     style={{ paddingBottom: 20 }}
//     renderInputToolbar={renderInputToolbar}
//     onInputTextChanged={onInputTextChanged}
//     text={inputText}
//   />
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
