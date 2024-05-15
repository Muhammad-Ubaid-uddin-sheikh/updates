// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/Octicons';
// import Button from '../../../components/ButtonslipAndcencel';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedImages, setFavoriteImageIndex } from '../../../../reduxfolder/reducers/FeildSelect';
// import axios from 'axios';
// // import ImaeUrlBased from '../../../apis/ImageBasedUrl';
// import ImageCropPicker from 'react-native-image-crop-picker';

// const Uplaod_ImageURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/upload';
// const Fetch_ImagesURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/fetch-images'; // Adjust the endpoint for fetching images

// const ImagePickerInput = ({ navigation,route }) => {
//   const dispatch = useDispatch();
//   const selectedImages = useSelector((state) => state.image.selectedImages);
//   const favoriteImageIndex = useSelector((state) => state.image.favoriteImageIndex);
//   const [uploadedImages, setUploadedImages] = useState([]);
// const {groundData} = route?.params;
// console.log("gorunsimage-------------------------",groundData.images)
//   const handleImagePicker = () => {
//     ImageCropPicker.openPicker({
//       multiple: true,
//       cropping: true,
//     })
//       .then((images) => {
//         images.forEach(image => {
//           uploadImage(image.path);
//         });
//         Alert.alert(`${images.length} image(s) selected`);
//       })
//       .catch((error) => {
//         console.log('ImagePicker Error: ', error);
//       });
//   };

//   const uploadImage = async (imagePath) => {
//     const formData = new FormData();
//     formData.append('image', {
//       uri: imagePath,
//       type: 'image/jpeg',
//       name: 'image.jpg',
//     });
//     try {
//       const token = await AsyncStorage.getItem('accessTokenCourt');
//       const res = await axios.post(Uplaod_ImageURL, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (res.data.code === 200) {
//         const uploadedImagePath = res.data.data.path;
//         dispatch(setSelectedImages([...selectedImages, { uri: uploadedImagePath }]));
//         console.log("Image uploaded successfully:", uploadedImagePath);
//       }
//     } catch (error) {
//       console.log("Error uploading image:", error.response)
//     }
//   };

// //   const fetchImagesFromServer = async () => {
// //     try {
// //       const token = await AsyncStorage.getItem('accessTokenCourt');
// //       const res = await axios.get(Fetch_ImagesURL, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       if (res.data.code === 200) {
// //         const fetchedImages = res.data.data.map(image => ({ uri: image.path }));
// //         setUploadedImages(fetchedImages);
// //       }
// //     } catch (error) {
// //       console.log("Error fetching images:", error.response);
// //     }
// //   };
// const fetchImagesFromServer = async () => {
//     try {
//       const token = await AsyncStorage.getItem('accessTokenCourt');
//       const res = await axios.get(Fetch_ImagesURL, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.data.code === 200) {
//         const fetchedImages = res.data.data.map(image => ({ uri: image.path }));
//         setUploadedImages(prevImages => [...prevImages, ...fetchedImages]); // Concatenate new images with existing ones
//       }
//     } catch (error) {
//       console.log("Error fetching images:", error.response);
//     }
//   };

//   const toggleFavoriteImage = (index) => {
//     dispatch(setFavoriteImageIndex(index));
//   };

//   const deleteImage = (index) => {
//     const filteredImages = selectedImages.filter((_, i) => i !== index);
//     dispatch(setSelectedImages(filteredImages));
//     if (favoriteImageIndex === index) {
//       dispatch(setFavoriteImageIndex(0));
//     }
//   };

//   const renderImage = (image, index) => {
//     return (
//       <TouchableOpacity key={index} onPress={() => toggleFavoriteImage(index)}>
//         <Image source={{ uri: image.uri }} style={[styles.image, index === favoriteImageIndex && styles.favoriteImage]} />
//         <TouchableOpacity style={styles.deleteButton} onPress={() => deleteImage(index)}>
//           <Text style={styles.deleteButtonText}>X</Text>
//         </TouchableOpacity>
//       </TouchableOpacity>
//     );
//   };

//   useEffect(() => {
//     dispatch(setSelectedImages([])); // Clear selected images when component mounts
//     fetchImagesFromServer(); // Fetch images from the server when component mounts
//   }, []);

//   useEffect(() => {
//     // Save selected images to AsyncStorage whenever selectedImages changes
//     AsyncStorage.setItem('selectedImages', JSON.stringify(selectedImages))
//       .catch(error => console.log('Error saving selected images:', error));
//   }, [selectedImages]);

//   return (
//     <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
//       <View style={styles.container}>
//         <TouchableOpacity style={styles.inputContainer} onPress={handleImagePicker}>
//           <Icon name="plus" style={styles.iconEdit} />
//         </TouchableOpacity>
//         {selectedImages.map((image, index) => renderImage(image, index))}
//         {uploadedImages.map((image, index) => renderImage(image, index + selectedImages.length))}
//         <View style={{ width: 350, paddingTop: 10 }}>
//           <Button text="agregar" IconName="done" Link={() => navigation.goBack()} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   iconEdit: {
//     color: 'black',
//     fontSize: 45,
//   },
//   container: {
//     alignItems: 'center',
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//     paddingHorizontal: 14
//   },
//   inputContainer: {
//     marginTop: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.07)',
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 110,
//     width: 110,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',

//   },
//   imageContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 110,
//     height: 100,
//     margin: 5,
//   },
//   favoriteImage: {
//     borderColor: 'blue',
//     borderWidth: 2,
//   },
//   deleteButton: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     backgroundColor: 'red',
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   deleteButtonText: {
//     color: 'white',
//   },
// });

// export default ImagePickerInput;



// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/Octicons';
// import Button from '../../../components/ButtonslipAndcencel';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedImages, setFavoriteImageIndex } from '../../../../reduxfolder/reducers/FeildSelect';
// import axios from 'axios';
// import ImageCropPicker from 'react-native-image-crop-picker';

// const Uplaod_ImageURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/upload';
// const Fetch_ImagesURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/fetch-images'; // Adjust the endpoint for fetching images

// const ImagePickerInput = ({ navigation, route }) => {
//   const dispatch = useDispatch();
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const { groundData } = route?.params;

//   const handleImagePicker = () => {
//     ImageCropPicker.openPicker({
//       multiple: true,
//       cropping: true,
//     })
//       .then((images) => {
//         const newImages = [...groundData.images, ...images.map(image => ({ uri: image.path }))];
//         updateImagesArray(newImages);
//         Alert.alert(`${images.length} image(s) selected`);
//       })
//       .catch((error) => {
//         console.log('ImagePicker Error: ', error);
//       });
//   };

//   const updateImagesArray = (newImages) => {
//     // Update the images array in the groundData object
//     groundData.images = newImages;
//     // Force update the component by setting an empty state
//     setUploadedImages([]);
//   };

//   useEffect(() => {
//     // Fetch images from the server when the component mounts
//     fetchImagesFromServer();
//   }, []);

//   const fetchImagesFromServer = async () => {
//     try {
//       const token = await AsyncStorage.getItem('accessTokenCourt');
//       const res = await axios.get(Fetch_ImagesURL, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.data.code === 200) {
//         const fetchedImages = res.data.data.map(image => ({ uri: image }));
//         setUploadedImages(fetchedImages);
//       }
//     } catch (error) {
//       console.log("Error fetching images:", error.response);
//     }
//   };

//   return (
//     <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
//       <View style={styles.container}>
//         <TouchableOpacity style={styles.inputContainer} onPress={handleImagePicker}>
//           <Icon name="plus" style={styles.iconEdit} />
//         </TouchableOpacity>
//         {groundData.images.map((image, index) => (
//           <Image key={index} source={{ uri: image }} style={styles.image} />
//         ))}
//         {uploadedImages.map((image, index) => (
//           <Image key={index + groundData.images.length} source={{ uri: image.uri }} style={styles.image} />
//         ))}
//         <View style={{ width: 350, paddingTop: 10 }}>
//           <Button text="agregar" IconName="done" Link={() => navigation.goBack()} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   iconEdit: {
//     color: 'black',
//     fontSize: 45,
//   },
//   container: {
//     alignItems: 'center',
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//     paddingHorizontal: 14
//   },
//   inputContainer: {
//     marginTop: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.07)',
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 110,
//     width: 110,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',

//   },
//   image: {
//     width: 110,
//     height: 100,
//     margin: 5,
//   },
// });

// export default ImagePickerInput;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/Octicons';
// import Button from '../../../components/ButtonslipAndcencel';
// import axios from 'axios';
// import ImageCropPicker from 'react-native-image-crop-picker';

// const Uplaod_ImageURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/upload';
// const Fetch_ImagesURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/fetch-images'; // Adjust the endpoint for fetching images

// const ImagePickerInput = ({ navigation, route }) => {
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [formImages, setFormImages] = useState([]);
//   const { groundData } = route?.params;
//   const [favoriteImageIndex, setFavoriteImageIndex] = useState(null);

//   const handleImagePicker = () => {
//     ImageCropPicker.openPicker({
//       multiple: true,
//       cropping: true,
//     })
//       .then((images) => {
//         const newImages = [...groundData.images, ...images.map(image => ({ uri: image.path }))];
//         updateImagesArray(newImages);
//         Alert.alert(`${images.length} image(s) selected`);
//       })
//       .catch((error) => {
//         console.log('ImagePicker Error: ', error);
//       });
//   };
// console.log('formImages',formImages,uploadedImages)
//   const updateImagesArray = (newImages) => {
//     groundData.images = newImages;
//     setUploadedImages([]);
//     setFormImages(newImages);
//   };

//   const deleteImage = (index) => {
//     const filteredImages = groundData.images.filter((_, i) => i !== index);
//     updateImagesArray(filteredImages);
//     if (favoriteImageIndex === index) {
//       setFavoriteImageIndex(null);
//     }
//   };

//   const handleSubmit = () => {
//     const formData = new FormData();
//     formImages.forEach((image, index) => {
//       formData.append(`image${index}`, {
//         uri: image.uri,
//         type: 'image/jpeg',
//         name: `image${index}.jpg`,
//       });
//     });
//     console.log('Final FormData:', formData);
//   };

//   useEffect(() => {
//     fetchImagesFromServer();
//   }, []);

//   const fetchImagesFromServer = async () => {
//     try {
//       const token = await AsyncStorage.getItem('accessTokenCourt');
//       const res = await axios.get(Fetch_ImagesURL, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.data.code === 200) {
//         const fetchedImages = res.data.data.map(image => ({ uri: image }));
//         setUploadedImages(fetchedImages);
//         setFormImages(fetchedImages);
//       }
//     } catch (error) {
//       console.log("Error fetching images:", error.response);
//     }
//   };


//   return (
//     <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
//       <View style={styles.container}>
//         <TouchableOpacity style={styles.inputContainer} onPress={handleImagePicker}>
//           <Icon name="plus" style={styles.iconEdit} />
//         </TouchableOpacity>
//         {groundData.images.map((image, index) => (
//           <ImageWithDeleteButton key={index} uri={image} onDelete={() => deleteImage(index)} />
//         ))}
//         {uploadedImages.map((image, index) => (
//           <ImageWithDeleteButton key={index + groundData.images.length} uri={image} onDelete={() => deleteImage(index)} />
//         ))}
//         <View style={{ width: 350, paddingTop: 10 }}>
//           <Button text="agregar" IconName="done" onPress={handleSubmit} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const ImageWithDeleteButton = ({ uri, onDelete }) => {
//   return (
//     <View style={styles.imageContainer}>
//       <Image source={{ uri: uri }} style={styles.image} />
//       <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
//         <Text style={styles.deleteButtonText}>X</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   iconEdit: {
//     color: 'black',
//     fontSize: 45,
//   },
//   container: {
//     alignItems: 'center',
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//     paddingHorizontal: 14
//   },
//   inputContainer: {
//     marginTop: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.07)',
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 110,
//     width: 110,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',

//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   image: {
//     width: 110,
//     height: 100,
//     margin: 5,
//   },
//   deleteButton: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     backgroundColor: 'red',
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   deleteButtonText: {
//     color: 'white',
//   },
// });

// export default ImagePickerInput;
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Octicons';
import Button from '../../../components/ButtonslipAndcencel';
import axios from 'axios';
import ImageCropPicker from 'react-native-image-crop-picker';

const Uplaod_ImageURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/upload';
const Fetch_ImagesURL = 'https://kickers-backend-5e360941484b.herokuapp.com/api/court/fetch-images'; // Adjust the endpoint for fetching images

const ImagePickerInput = ({ navigation, route }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formImages, setFormImages] = useState([]);
  const { groundData } = route?.params;
  const [favoriteImageIndex, setFavoriteImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
console.log('formImages',formImages)
  const handleImagePicker = () => {
    ImageCropPicker.openPicker({
      multiple: true,
      cropping: true,
    })
      .then((images) => {
        const newImages = [...groundData.images, ...images.map(image => ({ uri: image.path }))];
        updateImagesArray(newImages);
        Alert.alert(`${images.length} image(s) selected`);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const updateImagesArray = (newImages) => {
    groundData.images = newImages;
    setUploadedImages([]);
    setFormImages(newImages);
  };

  const deleteImage = (index) => {
    const filteredImages = groundData.images.filter((_, i) => i !== index);
    updateImagesArray(filteredImages);
    if (favoriteImageIndex === index) {
      setFavoriteImageIndex(null);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formImages.forEach((image, index) => {
      formData.append(`image${index}`, {
        uri: image.uri,
        type: 'image/jpeg',
        name: `image${index}.jpg`,
      });
    });

    try {
      const token = await AsyncStorage.getItem('accessTokenCourt');
      const res = await axios.post(Uplaod_ImageURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.code === 200) {
        const uploadedImages = res.data.data.map(image => ({ uri: image.path }));
        updateImagesArray([...groundData.images, ...uploadedImages]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error uploading images:", error.response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImagesFromServer();
  }, []);

  const fetchImagesFromServer = async () => {
    try {
      const token = await AsyncStorage.getItem('accessTokenCourt');
      const res = await axios.get(Fetch_ImagesURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.code === 200) {
        const fetchedImages = res.data.data.map(image => ({ uri: image }));
        setUploadedImages(fetchedImages);
        setFormImages(fetchedImages);
      }
    } catch (error) {
      console.log("Error fetching images:", error.response);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.inputContainer} onPress={handleImagePicker}>
          <Icon name="plus" style={styles.iconEdit} />
        </TouchableOpacity>
        {groundData.images.map((image, index) => (
          <ImageWithDeleteButton key={index} uri={image} onDelete={() => deleteImage(index)} />
        ))}
        {uploadedImages.map((image, index) => (
          <ImageWithDeleteButton key={index + groundData.images.length} uri={image} onDelete={() => deleteImage(index)} />
        ))}
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={{ width: 350, paddingTop: 10 }}>
            <Button text="agregar" IconName="done" onPress={handleSubmit} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const ImageWithDeleteButton = ({ uri, onDelete }) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: uri }} style={styles.image} />
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconEdit: {
    color: 'black',
    fontSize: 45,
  },
  container: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 14
  },
  inputContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 110,
    height: 100,
    margin: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default ImagePickerInput;
