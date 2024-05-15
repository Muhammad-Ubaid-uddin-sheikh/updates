import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import MatchesPlayDetail from '../../components/MatchesPlayerDetails'
const data = [
  { id: '1', content: <MatchesPlayDetail /> },
  { id: '2', content: <MatchesPlayDetail /> },
  { id: '3', content: <MatchesPlayDetail /> },
  // Add more components as needed
];

const HorizontalSlides = () => {
  const renderItem = ({ item, index }) => {
    const isFirstChild = index === 0;
    const isLastChild = index === data.length - 1;

    const containerStyle = [
      styles.slide,
      isFirstChild && styles.firstSlide,
      isLastChild && styles.lastSlide,
    ];

    return (
      <View style={containerStyle}>
        <Text style={styles.text}>{item.content}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingTop: 12,
    paddingLeft: 10
  },
  firstSlide: {
    // paddingLeft: 20,
    // Adjust the padding based on your requirement
  },
  lastSlide: {
    paddingRight: 20, // Adjust the padding based on your requirement
  },

});

export default HorizontalSlides;

