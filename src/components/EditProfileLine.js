import React from 'react';
import { View, ProgressBarAndroid, ProgressViewIOS, Platform, StyleSheet, Text } from 'react-native';
import { Fonts } from '../screens/style';

const YourComponent = ({ level }) => {
  const calculateProgressColor = (level) => {
    if (level <= 0) {
      return 'rgba(64, 134, 57, 0.25)'; // Color for levels less than or equal to 0
    } else {
      return '#408639'; // Color for levels greater than 2
    }
  };

  const validLevel = isNaN(level) ? 50 : Math.min(Math.max(level, 0), 100);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.levelText}>Nivel: 
         <Text style={{color:'#408639',fontFamily:Fonts.MEDIUM}}>
          {validLevel}
          </Text> 
          </Text>
      </View>
      {/* {Platform.OS === 'android' ? (
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={validLevel / 100}
          color={calculateProgressColor(validLevel)}
          style={styles.progressBar}
        />
      ) : (
        <ProgressViewIOS
          progress={validLevel / 100}
          progressTintColor={calculateProgressColor(validLevel)}
          style={styles.progressBar}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 16,
    paddingRight:50,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,

  },
  progressBar: {
    height: 10,
    width: '60%',
    marginLeft: 30,
    borderRadius: 5,
  },
  levelText: {
    textAlign: 'center',
    fontFamily: Fonts.REGULAR,
    fontSize: 15
  },
});

export default YourComponent;
