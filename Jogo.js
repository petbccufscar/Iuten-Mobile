import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Iuten from "./iuten";
import { PreferencesContext } from "./PreferencesContext";
import { Audio } from 'expo-av';

const padding = 10;
const square = (wp("100%") - 10) / 9;

let timer = null;

export default function Jogo({ route }) {
  const NPLAYERS = route.params.NPLAYERS;
  const RANDOM = route.params.random;
  timer = null;
  return <Tabuleiro NPLAYERS={NPLAYERS} RANDOM={RANDOM}/>;
}

function Tabuleiro(props) {
  const NPLAYERS = props.NPLAYERS;
  const RANDOM = props.RANDOM;
  const cooldown = 1000;
  const [play, setplay] = useState(true);
  


  useEffect(() => {
    return () => {
      setplay(false);
    };
  }, []);

  if (timer == null) {
    timer = setInterval(() => {
      BOT();
    }, cooldown);
  }

  let myTeam = 1;
  const [iut, setIut] = useState(new Iuten())
  const [table, setTable] = useState(iut.getTable());
  const [marked, setMarked] = useState([[], []]);
  const [enemyMoves, setEnemyMoves] = useState([[], []]);
  const [SELECTED, setSELECTED] = useState(null);
  const [flip, setFlip] = useState(false);

  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  const branco = isThemeDark ? "#333" : "#fff";
  const verde = "rgba(0, 255, 0, 0.5)";
  const amarelo = "rgba(255, 0, 255, 0.5)";
  const vermelho = "rgba(255, 0, 0, 0.5)";
  const azul = "rgba(0, 0, 255, 0.5)";
  const orange100 = "rgba(255, 224, 178, 1)";
  const orange400 = "rgba(255, 183, 77, 1)";
  const ciano = "rgba(0, 255, 255, 0.5)";
  switch (NPLAYERS) {
    case 1:
      myTeam = 1;
      break;
    case 2:
      myTeam = iut.CURPLAYER;
      break;
    case 0:
    default:
      myTeam = 3;
  }
  async function playSound() {
    const {sound} = await Audio.Sound.createAsync(require('./assets/tac.mp3'));
    await sound.playAsync();
  }

  async function loadSound() {
    const {sound} = await Audio.Sound.createAsync(require('./assets/tac.mp3'));
    return sound
  }
  const color = (i, j) => {
    if (iut.gameover() != 0) {
      if (iut.includes([iut.TORRE1, iut.TORRE2], [i, j])) {
        return azul;
      } else if (iut.includes([iut.TRONO2, iut.TRONO1], [i, j])) {
        return vermelho;
      }
      return "transparent";
    }

    if (enemyMoves == undefined || enemyMoves.length < 2)
      setEnemyMoves([[], []]);
    if (marked == undefined || marked.length < 2) setMarked([[], []]);

    if (iut.includes(marked[0], [i, j])) {
      return verde;
    } else if (iut.includes(marked[1], [i, j])) {
      return amarelo;
    } else if (iut.includes(enemyMoves[0], [i, j])) {
      return orange100;
    } else if (iut.includes(enemyMoves[1], [i, j])) {
      return orange400;
    } else if (iut.includes(iut.lastMove, [i, j])) {
      return ciano;
    } else if (iut.includes([iut.TORRE1, iut.TORRE2], [i, j])) {
      return azul;
    } else if (iut.includes([iut.TRONO2, iut.TRONO1], [i, j])) {
      return vermelho;
    }

    return 'transparent';
  };
  const touch = (i, j) => {
    switch (color(i, j)) {
      case verde:
        loadSound().then(async (s) => {
          iut.move(SELECTED, [i, j], iut.CURPLAYER, "m");
          setMarked([[], []]);
          setTable(iut.table);
          await s.playAsync()
        })
        break;
      case amarelo:
        iut.move(SELECTED, [i, j], iut.CURPLAYER, "s");
        if (iut.table[j][i].toLowerCase() == "c") {
          setSELECTED([i, j]);
          let check = iut.checkMoves([i, j], myTeam);
          setMarked(check);
        } else {
          setMarked([[], []]);
        }
        setTable(iut.table);
        break;
      default:
        setSELECTED([i, j]);
        if (iut.isMy([i, j], myTeam)) {
          let check = iut.checkMoves([i, j], myTeam);
          setMarked(check);
          setEnemyMoves([[], []]);
        } else {
          let check = iut.checkEnemyMoves([i, j], myTeam);
          setEnemyMoves(check);
          setMarked([[], []]);
        }

        break;
    }
  };

  const longTouch = (i, j) => {
    switch (color(i, j)) {
      case verde:
        iut.move(SELECTED, [i, j], iut.CURPLAYER, "m");
        setMarked([[], []]);
        setTable(iut.table);
        break;
      case amarelo:
        iut.move(SELECTED, [i, j], iut.CURPLAYER, "s");
        if (iut.table[j][i].toLowerCase() == "c") {
          setSELECTED([i, j]);
          let check = iut.checkMoves([i, j], myTeam);
          setMarked(check);
        } else {
          setMarked([[], []]);
        }
        setTable(iut.table);
        break;
      default:
        setSELECTED([i, j]);
        let check = iut.checkMoves([i, j], iut.CURPLAYER);
        setMarked([[], check[1]]);
        break;
    }
  };

  async function BOT() {
    if (play) {
      let iaTeam;
      if (NPLAYERS < 2) {
        iaTeam = 0;
      }
      if (NPLAYERS == 0) {
        iaTeam = iut.CURPLAYER;
      }
      if (NPLAYERS != 2 && iut.CURPLAYER == iaTeam) {
        let u = iut.DecisiveChoice(iaTeam, RANDOM);

        if (u != null) {
          iut.move(u[0], u[1], iaTeam, u[2]);
          setTable(iut.table);
          setMarked([[], []]);
          setIut(iut);
          playSound();
        }
      }
    }
  }


  let reset = () => {
    iut.restart();
    setTable(iut.table);
    setMarked([[], []]);
    setEnemyMoves([[], []]);
    setSELECTED(null);
  };

  let ResetComponent = ({ reset }) => {
    if (NPLAYERS != 0)
      return (
        <TouchableOpacity style={{ margin: 20, padding: 5 }} onPress={reset}>
          <Text>Restart</Text>
        </TouchableOpacity>
      );
    return <></>;
  };

  let texto =
    iut.gameover() == 0
      ? `Vez de jogador: ${iut.CURPLAYER + 1}`
      : `Jogador ${iut.gameover()} Ganhou!`;
  const flipper = (a) => flip? a.slice().reverse(): a;
  const ftable = flipper(table);
  let turi = require("./images/bg.jpg");
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", margin: 20 }}>
        {texto}
      </Text>
    <ImageBackground source={turi} style={styles.table}>
      {table.map((e, i) => (
        <View key={i} style={styles.row}>
          <Space />
          {flipper(e).map((f, j) => {
            if (i < 2 || j < 1 || j > 9 || i > 12)
              return <React.Fragment key={j}></React.Fragment>;
            const peca = flip? table[14 - i][10 - j]: table[i][j];
            return (
              <TouchableOpacity
                key={j}
                style={{ ...styles.square, backgroundColor: flip? color(10 - j, 14 - i): color(j, i)}}
                onPress={() => flip?  touch(10 - j, 14 - i): touch(j, i)}
                onLongPress={() => flip?longTouch(10 - j, 14 - i) :longTouch(j, i)}
              >
                <Piece peca={peca}></Piece>
              </TouchableOpacity>
            );
          })}
          <Space />
        </View>
      ))}
      </ImageBackground>
      <View style={{flexDirection:'row', width:'100%'}}>
        <ResetComponent reset={reset}></ResetComponent>
        <View style={{flex:1}}/>
        <TouchableOpacity style={{ margin: 20, padding: 5}} onPress={() => setFlip(!flip)}>
          <Text>Flip Vertical</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
}

function Space() {
  return <View style={{ flex: 1 }} />;
}

function Piece({ peca }) {
  if (peca == "_" || peca == "n") return <></>;

  // Isso não é elegante, mas está de acordo com a documentação
  // não pode usar strings não estaticas no require

  let icon;
  switch (peca) {
    case "p":
      icon = require("./images/p0.png");
      break;
    case "P":
      icon = require("./images/p1.png");
      break;
    case "d":
      icon = require("./images/d0.png");
      break;
    case "D":
      icon = require("./images/d1.png");
      break;
    case "c":
      icon = require("./images/c0.png");
      break;
    case "C":
      icon = require("./images/c1.png");
      break;
    case "a":
      icon = require("./images/a0.png");
      break;
    case "A":
      icon = require("./images/a1.png");
      break;
    case "e":
      icon = require("./images/e0.png");
      break;
    case "E":
      icon = require("./images/e1.png");
      break;
  }

  return <Image source={icon} style={{width:48, height:48}}/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: square,
    height: square,
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  non: {
    height: 0,
    width: 0,
    margin: 0,
    padding: 0,
  },
  row: {
    flexDirection: "row",
  },
});