
import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import { PreferencesContext } from './PreferencesContext';


export default function Menu({navigation}) {

    const theme = useTheme();
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

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
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    toggleTheme();
                }}
            ><Text>Trocar tema</Text></TouchableOpacity>
            
      </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        margin: 20
    }
  });
  