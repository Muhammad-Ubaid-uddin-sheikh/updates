import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import Button from '../../components/ButtonTransparentBlack'
import NewIcons from 'react-native-vector-icons/Fontisto'
import { Fonts } from '../style';
const DropdownInputExample = ({options,placeHolder,selectedValue,visible, onClose,PopupOn,onSelect}) => {
 
  

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={PopupOn}>
        <TextInput
          style={styles.input}
          // placeholder="Pie dominante"
          placeholder={placeHolder}
          value={selectedValue}
          editable={false}
          placeholderTextColor="rgba(33, 33, 33, 0.60)"
          letterSpacing={0.6}
        />
      </TouchableOpacity>
      <NewIcons name='angle-down' style={styles.eyeIcon} size={15} />
      <Modal
       animationIn="slideInUp"
       animationOut="slideOutDown"
        visible={visible}
        transparent={true}
        

      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            
            <FlatList
            data={options}
            renderItem={({ item }) => (
              
              <TouchableOpacity style={styles.optionItem} onPress={() => onSelect(item)}>
                <Text style={styles.optionText}>{item.name}</Text>
              </TouchableOpacity>
             
            )}
            keyExtractor={item => item.id.toString()}
          />
            <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Button text="Cancelar"  Link={onClose}  />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    marginBottom: 0,
    // width: 345,
    // marginRight: 30
  },
  input: {

    paddingLeft: 12,
    padding: 16,
    paddingRight: 40,
    fontSize: 14,
    lineHeight: 20,
    // width: 345,
    borderRadius: 12,
    borderWidth: 0.25,
    borderColor: 'rgba(0, 0, 0, 0.25)',
   
    color: '#212121',
    fontFamily: 'Satoshi-Medium',
    backgroundColor: 'rgba(64, 134, 57, 0.05)'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    height:250
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#408639',
  },
  optionText: {
    fontSize: 16,
    color:'black',
    fontFamily:Fonts.MEDIUM
  },
  eyeIcon: {
    position: 'absolute',
    right: 30,
    top: 20,
    color: '#408639'
  },
 
});

export default DropdownInputExample;
