// import React, { useState } from 'react';
// import { View, FlatList, Image, Text, Dimensions, TouchableOpacity, Modal, StyleSheet } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { Fonts } from '../../../style';

// const Gallery = ({GroundImageGalary}) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const handleImagePress = (index) => {
//     setSelectedImageIndex(index);
//     setModalVisible(true);
//   };
// console.log('',GroundImageGalary)
//   return (
//     <View style={styles.container}>
//       <FlatList
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         data={GroundImageGalary}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item, index }) => (
//           <TouchableOpacity onPress={() => handleImagePress(index)}>
//             <View style={[styles.imageContainer,{textAlign:"left"}]}>
//            <View>
//             <Image
//                         source={{ uri: item.images.length > 0 ? item.images[0] : 'https://5.imimg.com/data5/XM/YM/JY/SELLER-54500078/football-ground-flooring.jpg' }}
//                         style={styles.imageThumbnail}
//                     />
//                      <Text style={[styles.imageText,{position:'absolute',backgroundColor:'rgba(64, 134, 57, 0.25)',top:100,right:80,color:'white',fontFamily:Fonts.BOLD}]}>{item.turfType}</Text>
//                     </View>
//              <View style={{width:'80%',textAlign:'left',marginTop:-5}}>
//              <Text style={[styles.imageText,]}>{item.name}</Text>
//               {/* <Text style={styles.imageText}>{item.turfType}</Text> */}
//              </View>
          
//             </View>
//           </TouchableOpacity>
//         )}
//       />

//       <Modal visible={modalVisible} transparent>
//         <ScrollView
//           contentContainerStyle={styles.modalContainer}
//           pagingEnabled
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           onMomentumScrollEnd={(event) => {
//             const page = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
//             setSelectedImageIndex(page);
//           }}
//         >
//           {GroundImageGalary.map((image, index) => (
//             <TouchableOpacity key={image._id} onPress={() => setModalVisible(false)}>
//              <Image
//                         source={{ uri: image.images.length > 0 ? image.images[0] : 'https://5.imimg.com/data5/XM/YM/JY/SELLER-54500078/football-ground-flooring.jpg' }}
//                         style={styles.modalImage}
//                     />
//               {/* <Image source={{ uri: image.source }} style={styles.modalImage} /> */}
//               <Text style={styles.modalText}>{image.name}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 0,
//   },
//   imageContainer: {
//     alignItems: 'center',
//   },
//   imageThumbnail: {
//     width: 200,
//     height: 120,
//     margin: 10,
//     borderRadius:15
//   },
//   imageText: {
//     fontSize: 14,
//     textAlign:'left',
//     color: '#2F2F2F',
//     fontFamily:Fonts.MEDIUM,
//     justifyContent:'flex-start'
//   },
//   modalContainer: {
//     flexGrow: 1,
//     justifyContent:'flex-start',
//     // justifyContent: 'left',
//     // alignItems: 'left',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
    
//   },
//   modalImage: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//     resizeMode: 'contain',
//   },
//   modalText: {
//     fontSize: 16,
//     color: '#2F2F2F',
//     justifyContent:'flex-start',
//     textAlign:'left',
//     marginTop: 10,
//   },
// });

// export default Gallery;

import React, { useState } from 'react';
import { View, FlatList, Image, Text, Dimensions, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { Fonts } from '../../../style';


const Gallery = ({ GroundImageGalary }) => {
  const navigation = useNavigation(); // Initialize useNavigation hook
 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={GroundImageGalary}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => {
            
            navigation.navigate('Reservar', { courtId: item })

            }}>
            <View style={[styles.imageContainer, { textAlign: "left" }]}>
              <View>
                <Image
                  source={{ uri: item.images.length > 0 ? item.images[0] : 'https://5.imimg.com/data5/XM/YM/JY/SELLER-54500078/football-ground-flooring.jpg' }}
                  style={styles.imageThumbnail}
                />
                <Text style={[styles.imageText, { position: 'absolute', backgroundColor: 'rgba(64, 134, 57, 0.25)', top: 100, right: 80, color: 'white', fontFamily: Fonts.BOLD }]}>{item.turfType}</Text>
              </View>
              <View style={{ width: '80%', textAlign: 'left', marginTop: -5 }}>
                <Text style={[styles.imageText,]}>{item.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} transparent>
        <ScrollView
          contentContainerStyle={styles.modalContainer}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const page = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
            setSelectedImageIndex(page);
          }}
        >
          {GroundImageGalary.map((image, index) => (
            <TouchableOpacity key={image._id} onPress={() => setModalVisible(false)}>
              <Image
                source={{ uri: image.images.length > 0 ? image.images[0] : 'https://5.imimg.com/data5/XM/YM/JY/SELLER-54500078/football-ground-flooring.jpg' }}
                style={styles.modalImage}
              />
              <Text style={styles.modalText}>{image.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageThumbnail: {
    width: 200,
    height: 120,
    margin: 10,
    borderRadius: 15
  },
  imageText: {
    fontSize: 14,
    textAlign: 'left',
    color: '#2F2F2F',
    fontFamily: Fonts.MEDIUM,
    justifyContent: 'flex-start'
  },
  modalContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
  modalText: {
    fontSize: 16,
    color: '#2F2F2F',
    justifyContent: 'flex-start',
    textAlign: 'left',
    marginTop: 10,
  },
});

export default Gallery;
