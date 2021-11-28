import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Jogo from './Jogo';
import Iuten from './iuten'
import { IconButton, Title, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      
    >
      <Stack.Group screenOptions={{
      headerRight: () => <IconButton icon="help-circle-outline" onPress={() => {
        navigation.navigate('Manual')
      }} />,
      headerTitleAlign: 'center',
      headerTintColor: "blue",
  }}>
      <Stack.Screen name="Iuten" component={Menu} />
      <Stack.Screen name="Iuten Player x Player" component={Jogo} initialParams={{ NPLAYERS: 2 }} />
      <Stack.Screen name="Iuten Player x PC" component={Jogo} initialParams={{ NPLAYERS: 1 }}/>
      <Stack.Screen name="Iuten PC x PC" component={Jogo} initialParams={{ NPLAYERS: 0 }}/>
      </Stack.Group>
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
