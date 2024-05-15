import React from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import AvatarPlayer from './AvatarPlayer';
import DataObj from './dataObj/DataObj'

const PlayerData = () => {
    const dataValues = Object.values(DataObj);

    // const renderPlayer = ({ item }) => (
    //   <AvatarPlayer key={item.id} name={item.name} rank={item.rank} image={item.image} />
    // );
  return (
    <ScrollView >
      <View style={styles.avatarContainer}>
        {dataValues.slice(0, 6).map((player) => (
          <AvatarPlayer key={player.id} name={player.name} rank={player.rank}  image={player.image} />
        ))}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 'auto',
gap:11,
    alignItems:'flex-start',
    paddingLeft:10, 
      paddingRight:15,
    //    flexWrap: 'wrap',
       height:'auto'
  },
})
export default PlayerData