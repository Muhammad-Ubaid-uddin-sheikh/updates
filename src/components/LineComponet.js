import React from 'react';
import { View, StyleSheet } from 'react-native';

const ColoredLine = ({flex}) => {
  return (
    <View style={styles.lineContainer}>
    <View style={styles.blackLine} />
    <View style={[styles.redFill,{ flex}]} />
  </View>
  );
};

const styles = StyleSheet.create({
    lineContainer: {
        height: 5,
        flexDirection: 'row',
        overflow: 'hidden',
        width:'auto' ,
        marginTop:2,
        display:'flex',
        justifyContent:'center',
        paddingLeft:20,
        paddingRight:20,
        borderRadius:5,
      },
      blackLine: {
        flex: 1,
        backgroundColor: '#408639',
        borderRadius:5,
      },
      redFill: {
        // flex: 4,
        backgroundColor: 'rgba(64, 134, 57, 0.25)',
        borderTopLeftRadius: 0, 
    borderTopRightRadius: 5, 
    borderBottomLeftRadius:0, 
    borderBottomRightRadius: 5,
      },
    });

export default ColoredLine;
