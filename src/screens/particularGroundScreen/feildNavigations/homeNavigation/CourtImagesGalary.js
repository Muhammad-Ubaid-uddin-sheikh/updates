import React, { useId, useState } from 'react';
import { View, FlatList, Image, Text, Dimensions, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Fonts } from '../../../style';

const Gallery = ({GroundImageGalary}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const imageID = useId()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const galleryData = GroundImageGalary || [];
  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };
// console.log('geildasdasdad',GroundImageGalary)
  return (
    <View style={styles.container}>
      <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={galleryData}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
    <TouchableOpacity onPress={() => handleImagePress(index)}>
      <View style={[styles.imageContainer, { textAlign: "left" }]}>
        <View>
          <Image
            source={{ uri:  item ? item : 'https://5.imimg.com/data5/XM/YM/JY/SELLER-54500078/football-ground-flooring.jpg' }}
            style={styles.imageThumbnail}
          />
        </View>
             <View style={{width:'80%',textAlign:'left',marginTop:-5}}>
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
          {GroundImageGalary?.map((image, index) => (
            <TouchableOpacity key={index+imageID} onPress={() => setModalVisible(false)}>
             <Image
                        source={{ uri: image ? image : 'https://5.imimg.com/data5/XM/YM/JY/SELLER-54500078/football-ground-flooring.jpg' }}
                        style={styles.modalImage}
                    />
              {/* <Image source={{ uri: image.source }} style={styles.modalImage} /> */}
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
    borderRadius:15
  },
  imageText: {
    fontSize: 14,
    textAlign:'left',
    color: '#2F2F2F',
    fontFamily:Fonts.MEDIUM,
    justifyContent:'flex-start'
  },
  modalContainer: {
    flexGrow: 1,
    justifyContent:'flex-start',
    // justifyContent: 'left',
    // alignItems: 'left',
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
    justifyContent:'flex-start',
    textAlign:'left',
    marginTop: 10,
  },
});

export default Gallery;
