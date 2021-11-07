import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Jogo from './Jogo';
import Iuten from './iuten'
import Menu from './Menu'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Tutorial from './Tutorial';

const Stack = createStackNavigator();

export default function App() {
    return (
      <NavigationContainer>

        <MyStack>

        </MyStack>
      </NavigationContainer>
    
  );
}


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Iuten" component={Menu} />
      <Stack.Screen name="Iuten Player x Player" component={Jogo} initialParams={{ NPLAYERS: 2 }} />
      <Stack.Screen name="Iuten Player x PC" component={Jogo} initialParams={{ NPLAYERS: 1 }}/>
      <Stack.Screen name="Iuten PC x PC" component={Jogo} initialParams={{ NPLAYERS: 0 }}/>
      <Stack.Screen name="Manual" component={Tutorial}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
