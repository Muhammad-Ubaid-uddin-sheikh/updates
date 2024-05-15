
import React, { useState } from 'react';
import { View,Text,FlatList,TouchableOpacity,Modal,TextInput,Image,Button,StyleSheet,Alert,} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import ReservaFeild from '../../../reservaFeild/ReservaFeild'
const App = () => {
  // const [modalVisible, setModalVisible] = useState(false);
  // const [todos, setTodos] = useState([]);
  // const [selectedTodo, setSelectedTodo] = useState(null);
  // const [name, setName] = useState('');
  // const [price, setPrice] = useState('');
  // const [image, setImage] = useState(null);

  // const addTodo = () => {
  //   if (!name || !price || !image) {
  //     Alert.alert('Please fill in all fields');
  //     return;
  //   }

  //   setTodos((prevTodos) => [
  //     ...prevTodos,
  //     { id: Math.random().toString(), name, price, image },
  //   ]);
  //   setModalVisible(false);
  //   clearForm();
  // };

  // const editTodo = () => {
  //   if (!name || !price || !image) {
  //     Alert.alert('Please fill in all fields');
  //     return;
  //   }

  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) =>
  //       todo.id === selectedTodo.id ? { ...todo, name, price, image } : todo
  //     )
  //   );
  //   setModalVisible(false);
  //   clearForm();
  //   setSelectedTodo(null);
  // };

  // const deleteTodo = (id) => {
  //   setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  // };

  // const handleImagePicker = async () => {
  //   try {
  //     const pickedImage = await ImageCropPicker.openPicker({
  //       width: 500,
  //       height: 400,
  //       cropping: true,
  //     });

  //     setImage(pickedImage.path);
  //   } catch (error) {
  //     console.log('Image picking error: ', error);
  //   }
  // };

  // const openEditModal = (todo) => {
  //   setSelectedTodo(todo);
  //   setName(todo.name);
  //   setPrice(todo.price);
  //   setImage(todo.image);
  //   setModalVisible(true);
  // };

  // const clearForm = () => {
  //   setName('');
  //   setPrice('');
  //   setImage(null);
  // };

  // const renderTodoItem = ({ item }) => (
  //   <TouchableOpacity onPress={() => openEditModal(item)}>
  //     <View style={styles.todoItem}>
  //       <Image source={{ uri: item.image }} style={styles.todoImage} width={100} height={100}/>
  //       <View>
  //         <Text style={{color:'black'}}>{item.name}</Text>
  //         <Text style={{color:'black'}}>{item.price}</Text>
  //       </View>
  //       <TouchableOpacity onPress={() => deleteTodo(item.id)}>
  //         <Text style={styles.deleteText}>Delete</Text>
  //       </TouchableOpacity>
        
  //     </View>
  //     <View> 
  //       <Image source={{ uri: item.image }} style={styles.background} width={100} height={100}/>
  //       </View>
      
  //   </TouchableOpacity>
  // );

  return (
    // <View style={styles.container}>
    //   <FlatList
    //     data={todos}
    //     keyExtractor={(item) => item.id}
    //     renderItem={renderTodoItem}
    //   />
  
    //   <Modal
    //     animationType="slide"
    //     transparent={false}
    //     visible={modalVisible}
    //     onRequestClose={() => setModalVisible(false)}
    //   >
    //     <View style={styles.modalContainer}>
    //       <TextInput
    //         placeholder="Enter name"
    //         style={styles.input}
    //         value={name}
    //         onChangeText={(text) => setName(text)}
    //         color='black'
    //       />
    //       <TextInput
    //         placeholder="Enter price"
    //         style={styles.input}
    //         value={price}
    //         onChangeText={(text) => setPrice(text)}
    //         color='black'
    //       />

    //       <Button title="Select Image" onPress={handleImagePicker} />

    //       {image && <Image source={{ uri: image }} style={styles.selectedImage} />}

    //       <Button style={{backgrounColor:'red'}}
    //         title={selectedTodo ? 'Edit Todo' : 'Add Todo'}
    //         onPress={selectedTodo ? editTodo : addTodo}
    //       />

    //       <Button title="Cancel" onPress={() => setModalVisible(false)} />
    //     </View>
    //   </Modal>

    //   <Button title="Add Todo" onPress={() => setModalVisible(true)} />
      <ReservaFeild/>
      
    // </View>
  );
};

const styles = StyleSheet.create({
  background:{
    width:500,
    height:200,
    objectFit:'cover'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color:'black'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color:'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: 200,
    paddingHorizontal: 8,
    color:'black'
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    color:'black'
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    
  },
  deleteText: {
    color: 'red',
    marginLeft: 10,
  },
});

export default App;
// import React, { useState } from 'react';
// import { View, Button, StyleSheet } from 'react-native';
// import TodoList from './TodoList';
// import TodoDetails from './TodoItem';

// const App = () => {
//   const [todos, setTodos] = useState([]);
//   const [selectedTodo, setSelectedTodo] = useState(null);

//   const handleTodoPress = (todo) => {
//     setSelectedTodo(todo);
//   };

//   const handleAddTodo = (newTodo) => {
//     setTodos([...todos, { id: Date.now(), ...newTodo }]);
//     setSelectedTodo(null);
//   };

//   const handleSaveTodo = (updatedTodo) => {
//     const updatedTodos = todos.map((todo) => (todo.id === selectedTodo.id ? { ...todo, ...updatedTodo } : todo));
//     setTodos(updatedTodos);
//     setSelectedTodo(null);
//   };

//   return (
//     <View style={styles.container}>
//       {!selectedTodo ? (
//         <>
//           <TodoList todos={todos} onTodoPress={handleTodoPress} />
//           <Button title="Add Todo" onPress={() => setSelectedTodo({})} />
//         </>
//       ) : (
//         <TodoDetails todo={selectedTodo} onSave={selectedTodo ? handleSaveTodo : handleAddTodo} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
// });

// export default App;

