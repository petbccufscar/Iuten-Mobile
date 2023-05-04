import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { PreferencesContext } from "./PreferencesContext";
import Slider from '@react-native-community/slider'

export default function Menu({ navigation }) {
  const theme = useTheme();
  const [sliderValue, setSliderValue] = useState(1)
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  let pvp = () => {
    navigation.navigate("Iuten Player x Player");
  };
  let pvpc = () => {
    navigation.navigate("Iuten Player x PC", {random : 1 - sliderValue});
  };
  let pcvpc = () => {
    navigation.navigate("Iuten PC x PC", {random : 1 - sliderValue});
  };
  let manual = () => {
    navigation.navigate("Manual");
  };

  return (
    <View style={styles.greater_container}>
    <View style={styles.container}>
    <Text style={{color:'magenta', fontWeight:'bold'}}>Dificuldade do BOT</Text>
    <Slider 
        style={{alignSelf: 'stretch', height: 30, marginHorizontal:20}}
        maximumValue={1}
        minimumValue={-0.1}
        step={0.1}
        value={sliderValue}
          onValueChange={
            (sliderValue) => setSliderValue(sliderValue)
          }
      />
      
      <TouchableOpacity style={styles.button} onPress={pvp}>
        <Text style={styles.text}>Player vs Player</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pvpc}>
        <Text style={styles.text}>Player vs PC</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={manual}>
        <Text style={styles.text}>Manual</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          toggleTheme();
        }}
      >
        <Text style={styles.text}>Trocar tema</Text>
      </TouchableOpacity>
    </View>
      <Text style={{color:'magenta', fontWeight:'bold'}}>Feito por PET-BCC UFSCar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  greater_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 20,
    backgroundColor: "magenta",
    padding: 10,
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
