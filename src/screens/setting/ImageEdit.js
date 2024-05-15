// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ImageCropPicker from 'react-native-image-crop-picker';
// const Uplaod_ImageURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/avatar';
// const EditImageScreen = ({title}) => {
//   const [image, setImage] = useState('');
//   const [isImageEdited, setIsImageEdited] = useState(false);

//   useEffect(() => {
//     loadEditedImage();
//   }, []);

//   const loadEditedImage = async () => {
//     try {
//       const editedImage = await AsyncStorage.getItem('editedImage');
//       if (editedImage) {
//         setImage(editedImage);
//       }
//     } catch (error) {
//       console.error('Error loading edited image:', error);
//     }
//   };

//   const handleImagePicker = async () => {
//     try {
//       const pickedImage = await ImageCropPicker.openPicker({
//         width: 500,
//         height: 400,
//         cropping: true,
//       });

//       setImage(pickedImage.path);
//       setIsImageEdited(true);
//       saveEditedImage(pickedImage.path); // Save the edited image URI to AsyncStorage
//     } catch (error) {
//       console.log('Image picking error: ', error);
//     }
//   };

//   const saveEditedImage = async (editedImagePath) => {
//     try {
//       await AsyncStorage.setItem('editedImage', editedImagePath);
//     } catch (error) {
//       console.error('Error saving edited image:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {image ? (
//         <Image source={{ uri: image }} style={styles.selectedImage}  />
//       ) : (
//         <Image source={require('../../assets/DefualtImg.png')} style={styles.defaultImage} />
//       )}

//       <Text style={styles.TextLink}  onPress={handleImagePicker} >{title}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   TextLink:{
//   fontSize: 13,
//     lineHeight: 24,
//     color: '#408639',
//     fontWeight: '600',
//     fontFamily: 'Satoshi-Medium',
//     letterSpacing: 0.4,
//   }
//     ,
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//   },
//   defaultImage: {
//     width: 80,
//     height: 80,
//    marginTop:10,
//     borderRadius:100,
//     objectFit:'cover'
//   },
//   selectedImage: {
//     width: 80,
//     height: 80,
//     marginBottom:3,
//     borderRadius:100,
//     objectFit:'cover'
//   },
//   successText: {
//     color: 'green',
//     marginTop: 10,
//   },
// });

// export default EditImageScreen;
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
const ImageUploadImg = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/avatar'
const Uplaod_ImageURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/player/upload';
const GetProfile =  'https://kickers-backend-5e360941484b.herokuapp.com/api/player/getProfile'
const ImageUpload = () => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
console.log('imageUri',imageUri)
 
  const [uploadedImages, setUploadedImages] = useState([]);
useEffect(()=>{
  fetchImagesFromServer()
},[])
  const handleImagePicker = () => {
    ImageCropPicker.openPicker({
      multiple: true,
      cropping: true,
    })
      .then((images) => {
        images.forEach(image => {
          uploadImage(image.path);
        });
        Alert.alert(`${images.length} image(s) selected`);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const uploadImage = async (imagePath) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imagePath,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await axios.post(Uplaod_ImageURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.code === 200) {
        const uploadedImagePath = res.data.data.path;
        console.log("Image uploaded successfully:", uploadedImagePath);
        setImageUri(uploadedImagePath)
       
      }
    } catch (error) {
      console.log("Error uploading image:", error.response)
    }
  };

  const fetchImagesFromServer = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const res = await axios.get(GetProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.code === 200) {
        const fetchedImages = res.data;
        // setImageUri(fetchedImages);
        console.log('da5asdasd',fetchedImages)
      
      }
    } catch (error) {
      console.log("Error fetching images:", error.response);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
      {imageUri ? (
         <Image source={{ uri: imageUri }} style={styles.selectedImage}  />
      ) : (
         <Image source={require('../../assets/DefualtImg.png')} style={styles.defaultImage} />
       )}

      <Text style={styles.TextLink}  onPress={handleImagePicker} >Editar foto</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4078c0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
    TextLink:{
  fontSize: 13,
    lineHeight: 24,
    color: '#408639',
    fontWeight: '600',
    fontFamily: 'Satoshi-Medium',
    letterSpacing: 0.4,
    marginLeft:10
  }
    ,
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  defaultImage: {
    width: 80,
    height: 80,
   marginTop:10,
    borderRadius:100,
    objectFit:'cover'
  },
  selectedImage: {
    width: 80,
    height: 80,
    marginBottom:3,
    borderRadius:100,
    objectFit:'cover'
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
});

export default ImageUpload;
