// AddCardScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet ,} from 'react-native';

const AddCardScreen = ({ navigation, route }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAddCard = () => {
    const newCardNumber = generateCardNumber();
    route.params.setAddedCards((prevCards) => [...prevCards, newCardNumber]);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Credit Card</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{cardNumber}</Text>
        <TextInput
          secureTextEntry={!showPassword}
          placeholder="Card Number"
          keyboardType="numeric"
          onChangeText={(text) => setCardNumber(text)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <Button title="Add to Card" onPress={handleAddCard} />
      {route.params.addedCards.map((card, index) => (
        <Text key={index}>{`**** ${card}`}</Text>
      ))}
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    // width: 200,
  },
});

export default AddCardScreen;
