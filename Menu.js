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
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pvp}>
        <Text style={styles.text}>Player vs Player</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pvpc}>
        <Text style={styles.text}>Player vs PC</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={pcvpc}>
        <Text style={styles.text}>PC vs PC</Text>
      </TouchableOpacity> */}
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
      <Text>Dificuldade do BOT</Text>
      <Slider 
        style={{width: 150, height: 30}}
        maximumValue={1}
        minimumValue={-0.1}
        step={0.1}
        value={sliderValue}
          onValueChange={
            (sliderValue) => setSliderValue(sliderValue)
          }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 20,
    backgroundColor: "magenta",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
