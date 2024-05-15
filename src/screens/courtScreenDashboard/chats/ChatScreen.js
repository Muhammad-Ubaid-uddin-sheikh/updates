
// import React, { useState, useEffect, useCallback } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
// import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Fonts } from '../../style';
// import { useSelector } from 'react-redux';
// import io from 'socket.io-client';
// import { useSocket } from '../../../../Socket';
// // const socketUrl ='https://kickers-backend-5e360941484b.herokuapp.com';

// const ChatScreen = ({route}) => {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const userData = useSelector(state => state.ID);
//   const senderId = userData.playerId;
//   const receiver = userData.courtId;
//   const socket = useSocket();
//   const { data } = route?.params;
//   console.log("chatroom dataaS",data)
//   const [SocketData,setSocketData] =  useState()
//   console.log(SocketData)
//   // useEffect(() => {
//   //   // Connect to the socket server
//   //   socket.connect();

//   //   // Listen for new messages from the server
//   //   socket.on('emit-to-client', (data) => {
//   //     // Update the chat interface with the new message
//   //     console.log('New message received:', data);
//   //     // Update your chat state or UI accordingly
//   //   });
//   // }, []);
//   socket.on('emit-to-client', (data) => {
     
//     setSocketData(data)
//   });
//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hey there, this is my test for a post of my social app in React Native.',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//       {
//         _id: 2,
//         text: 'Hey there, how are you',
//         createdAt: new Date(),
//         user: {
//           _id: 1,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages),
//     );
//     const room = `court_${userData.courtId}`;
//     const textMessage = messages[0].text
//     socket.emit('send-message-owner', { senderId, receiver, message: textMessage, user:{profile:"www.google.com", name:"test",  id:"65def3215f448728e6650d3a"} });
//   }, [senderId, receiver, userData.courtId]);

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

//   const onInputTextChanged = text => {
//     setInputText(text);
//   };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{ _id: 1 }}
//       renderBubble={renderBubble}
//       alwaysShowSend
//       renderSend={renderSend}
//       scrollToBottom
//       scrollToBottomComponent={scrollToBottomComponent}
//       style={{ paddingBottom: 20 }}
//       renderInputToolbar={renderInputToolbar}
//       onInputTextChanged={onInputTextChanged}
//       text={inputText}
//     />
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



// import React, { useState, useEffect, useCallback } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
// import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Fonts } from '../../style';
// import { useSelector } from 'react-redux';
// import { useSocket } from '../../../../Socket';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/getChatHistory';

// const ChatScreen = ({ route }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const userData = useSelector(state => state.ID);
//   const senderId = userData.playerId;
//   const receiverId = userData.courtId;
//   const socket = useSocket();
//   const { data } = route?.params;
//   console.log('data', senderId);

//   const fetchMessagesFromServer = async (chatroomId) => {
//     try {
//       const token = await AsyncStorage.getItem('accessTokenCourt');
//       const res = await axios.get(`${API_URL}?chatRoomId=${chatroomId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res && res.data && res.data.data) {
//         const messages = res.data.data.map(message => ({
//           _id: message._id,
//           text: message.message,
//           createdAt: new Date(message.createdAt),
//           user: {
//             _id: message.sender && message.sender.id ? message.sender.id : '',
//             name: message.sender ? message.sender.name : '',
//             avatar: message.sender ? message.sender.profile : '',
//           },
//         }));
//         console.log('court chatsreen data',messages)
//         setMessages(messages);
//       }
//     } catch (error) {
//       console.log("Error fetching messages:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMessagesFromServer(data);
//   }, []);

//   const onSend = useCallback((newMessages = []) => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, newMessages),
//     );
//     const room = `court_${userData.courtId}`;
//     const textMessage = newMessages[0].text;
//     socket.emit('send-message', { senderId, receiverId, chatRoomId: data, message: textMessage, user: { profile: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg", name: "test", id: senderId } });
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
//       messages={messages}
//       onSend={onSend}
//       user={{ _id: senderId }}
//       renderBubble={renderBubble}
//       alwaysShowSend
//       renderSend={renderSend}
//       scrollToBottom
//       inverted={false}
//       style={{ paddingBottom: 20 }}
//       renderInputToolbar={renderInputToolbar}
//       onInputTextChanged={onInputTextChanged}
//       text={inputText}
//     />
//   );
// };

// export default ChatScreen;


import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useSocket } from '../../../../Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Fonts } from '../../style';
import Spinner from 'react-native-loading-spinner-overlay';
const API_URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/getChatHistory'

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const userData = useSelector(state => state.ID);
  const [senderId, setSenderId] = useState();
  // const senderID = senderId?.id
  const [isLoggingOut, setisLoggingOut] = useState(true);
  const receiverId = userData.courtId;
  const socket = useSocket();
  const { data } = route?.params;
  console.log('receiverId------------',receiverId)

  useEffect(() => {
    fetchImagesFromServer(data);
    
    getData();
    
  }, []);
  console.log('senderId-----------',senderId?.id)
  useEffect(()=>{
    
    const handleMessage =(value) => { 
        console.log('respinse player emit-to cleint');   
        fetchImagesFromServer(data);
       
      }
    
    socket.on('emit-to-client', handleMessage);
    return () => socket.off('emit-to-client',handleMessage)
  },[socket])
    console.log('messages cpourt-------',messages)
  // }, []);
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
  // useEffect(() => {
  //   const refreshDataInterval = setInterval(() => {
  //     fetchImagesFromServer(data);
  //   }, 4000);

  //   return () => clearInterval(refreshDataInterval);
  // }, [data]);
  const fetchImagesFromServer = async (data) => {
    try {
      const token = await AsyncStorage.getItem('accessTokenCourt');
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
          setMessages(previousMessages => [...messages, ...previousMessages]);
        setMessages(messages.reverse()); // Reverse the order of messages after setting in state
       
      }
    } catch (error) {
      console.log("Error fetching chat history:", error);
    }finally{
      setisLoggingOut(false);
   }
  };
 
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
    // <GiftedChat
    //   messages={messages}
    //   onSend={messages => onSend(messages)}
    //   user={{ _id: senderId?.id }}
    //   renderBubble={renderBubble}
    //   alwaysShowSend
    //   renderSend={renderSend}
    //   scrollToBottom
    //   scrollToBottomComponent={scrollToBottomComponent}
    //   style={{ paddingBottom: 20 }}
    //   renderInputToolbar={renderInputToolbar}
    //   onInputTextChanged={onInputTextChanged}
    //   text={inputText}
    // />
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
