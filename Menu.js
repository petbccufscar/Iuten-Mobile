
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button } from 'react-native';



export default function Menu({navigation}) {


    let pvp = () => {
        navigation.navigate('Iuten Player x Player');
    }
    let pvpc = () => {
        navigation.navigate('Iuten Player x PC');
    }
    let pcvpc = () => {
        navigation.navigate('Iuten PC x PC')
    }
    let manual = () => {
        navigation.navigate('Manual')
    }


    return (
      <View style={styles.container}>
          <TouchableOpacity
                style={styles.button}
                onPress={pvp}
            ><Text>Player vs Player</Text></TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={pvpc}
            ><Text>Player vs PC</Text></TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={pcvpc}
            ><Text>PC vs PC</Text></TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={manual}
            ><Text>Manual</Text></TouchableOpacity>
            
      </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        margin: 20
    }
  });
  