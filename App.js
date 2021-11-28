import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Jogo from './Jogo';
import Iuten from './iuten'
import { IconButton, Title, useTheme, 
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider, } from 'react-native-paper';
import { useNavigation,
  DarkTheme as NavigationDarkTheme,
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { PreferencesContext } from './PreferencesContext';
import Menu from './Menu'

import { createStackNavigator } from '@react-navigation/stack';
import Tutorial from './Tutorial';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};


const Stack = createStackNavigator();

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('isThemeDark')
    if(value !== null) {
      return JSON.parse(value);
    }
  } catch(e) {
    // error reading value
  }

  return false;
}

export default function App() {


  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const [isInitialState, setIsInitialState] = React.useState(true);

  React.useEffect(() => {
    const initialUrl = async () => { 
      setIsThemeDark(await getData())
    }

    if(isInitialState){
      initialUrl()
      setIsInitialState(false)
    }
  }, []);
  

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;



  const toggleTheme = React.useCallback(() =>  {

    try {
      
      const jsonValue = JSON.stringify(!isThemeDark)
      AsyncStorage.setItem('isThemeDark', jsonValue)
    } catch (e) {
      // algoritmo do avestruz
      console.log("erro", e)

    }

    return setIsThemeDark(!isThemeDark);

  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );
    return (
      
      <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>

        <MyStack>

        </MyStack>
      </NavigationContainer>
      </PaperProvider>
      </PreferencesContext.Provider>
    
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
