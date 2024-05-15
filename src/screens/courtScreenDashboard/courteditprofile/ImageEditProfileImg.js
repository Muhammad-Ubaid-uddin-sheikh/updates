import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';

const EditImageScreen = ({title}) => {
  const [image, setImage] = useState('');
  const [isImageEdited, setIsImageEdited] = useState(false);

  useEffect(() => {
    loadEditedImage();
  }, []);

  const loadEditedImage = async () => {
    try {
      const editedImage = await AsyncStorage.getItem('editedImage');
      if (editedImage) {
        setImage(editedImage);
      }
    } catch (error) {
      console.error('Error loading edited image:', error);
    }
  };

  const handleImagePicker = async () => {
    try {
      const pickedImage = await ImageCropPicker.openPicker({
        width: 500,
        height: 400,
        cropping: true,
      });

      setImage(pickedImage.path);
      setIsImageEdited(true);
      saveEditedImage(pickedImage.path); // Save the edited image URI to AsyncStorage
    } catch (error) {
      console.log('Image picking error: ', error);
    }
  };

  const saveEditedImage = async (editedImagePath) => {
    try {
      await AsyncStorage.setItem('editedImage', editedImagePath);
    } catch (error) {
      console.error('Error saving edited image:', error);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.selectedImage}  />
      ) : (
        <Image source={require('../../../assets/profile.jpg')} style={styles.defaultImage} />
      )}

      <Text style={styles.TextLink}  onPress={handleImagePicker} >{title}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  TextLink:{
  fontSize: 13,
    lineHeight: 24,
    color: '#408639',
    fontWeight: '600',
    fontFamily: 'Satoshi-Medium',
    letterSpacing: 0.4}
    ,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultImage: {
    width: 100,
    height: 100,
   marginBottom:3,
    borderRadius:100,
    objectFit:'cover'
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom:3,
    borderRadius:100,
    objectFit:'cover'
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
});

export default EditImageScreen;
