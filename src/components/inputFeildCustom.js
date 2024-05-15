import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, Platform } from 'react-native';
import { Fonts } from '../screens/style';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const App = ({labelName,value,onChangeText,focus,maxLength,Type}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = new Animated.Value(value === '' ? 0 : 1);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(value !== '');
    Animated.timing(animatedValue, {
      toValue: value === '' ? 0 : 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  };
  const keyboardType = Type === 'number' ? 'numeric' : Platform.select({ ios: 'default', android: 'default' });
  return (
    <View style={styles.container}>
      <AnimatedTextInput
        style={[styles.input, { borderBottomColor: isFocused ? '#007bff' : '#aaa' }]}
        placeholder=" "
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        editable={focus}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
      <Animated.Text
        style={[
          styles.label,
          {
            top: animatedValue.interpolate({
              inputRange: [0, 0],
              outputRange: [27, 15],
            }),
            fontSize: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [15, 13],
            }),
            color: animatedValue.interpolate({
              inputRange: [0, 10],
              outputRange: ['#aaa', '#007bff'],
            }),
          },
        ]}
      >
       {labelName}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 9,
  },
  input: {
    paddingLeft: 15,
    paddingRight: 40,
    fontSize: 14,
    borderRadius: 8,
    borderWidth: 0.50,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    // shadowOpacity: 1,
    color: '#212121',
    fontFamily:Fonts.MEDIUM,
    backgroundColor: 'rgba(64, 134, 57, 0.05)',
    height: 55,
    paddingTop: Platform.OS === 'ios' ? 15 : 20,
    width:'100%',
  },
  label: {
    position: 'absolute',
    left: 12,
    color:"212121",
    fontFamily:Fonts.MEDIUM,
  
  },
});

export default App;

