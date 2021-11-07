import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Iuten from './iuten'

const padding = 10
const square = (wp("100%") - 10) / 9

export default function Jogo({route}) {
  const NPLAYERS = route.params.NPLAYERS
  const [iut, setIut] = useState(new Iuten());
  const [table, setTable] = useState(iut.getTable());
  const [marked, setMarked] = useState([[], []]);
  const [SELECTED, setSELECTED] = useState(null);

  const branco = '#FFF'
  const verde = '#0F0'
  const amarelo = '#F0F'
  const vermelho = '#F00'
  const azul = "#00F"

  const color = (i, j) => {

    if (marked == undefined || marked.length < 2)
      setMarked([[],[]])

    if (iut.includes(marked[0], [i, j])) {
      return verde
    } else if (iut.includes(marked[1], [i, j])) {
      return amarelo
    } else if (iut.includes([iut.TORRE1, iut.TORRE2], [i, j])) {
      return azul
    } else if (iut.includes([iut.TRONO2, iut.TRONO1], [i, j])) {
      return vermelho
    }

    return branco
  }


  const touch = (i, j) => {

    switch (color(i, j)) {
      case verde:
        iut.move(SELECTED, [i, j], iut.CURPLAYER, 'm')
        setMarked([[], []])
        setTable(iut.table)
        break
      case amarelo:
        iut.move(SELECTED, [i, j], iut.CURPLAYER, 's')
        setMarked([[], []])
        setTable(iut.table)
        break
      default:
        setSELECTED([i, j])
        let check = iut.checkMoves([i, j], iut.CURPLAYER)
        setMarked(check)
        break

    }


  }

  const longTouch = (i, j) => {

    switch (color(i, j)) {
      case verde:
        iut.move(SELECTED, [i, j], iut.CURPLAYER, 'm')
        setMarked([[], []])
        setTable(iut.table)
        break
      case amarelo:
        iut.move(SELECTED, [i, j], iut.CURPLAYER, 's')
        setMarked([[], []])
        setTable(iut.table)
        break
      default:
        setSELECTED([i, j])
        let check = iut.checkMoves([i, j], iut.CURPLAYER)
        setMarked([[], check[1]])
        break

    }


  }

  const ia = async () => {
    setTimeout( () => {

      if (NPLAYERS < 2){
        let u = iut.bogoSillyIneffectiveChoice(1, true)
        if (u != null) {
          iut.move(u[0], u[1], 1, u[2])
          setTable(iut.table)
          setMarked([[], []])
          setIut((iut))
        }
      }
      // FIXME Esse metodo de usar a IA acaba travando a tela,
      // Descobrir um método melhor de chamar a IA e reconstruir a tela
      if (NPLAYERS == 0){
        let u = iut.bogoSillyIneffectiveChoice(0, true)
        if (u != null) {
          iut.move(u[0], u[1], 0, u[2])
          setTable(iut.table)
          setMarked([[], []])
          setIut((iut))
        }
      }


    }, 100)
  }

  let reset = () => {
      iut.restart()
      setTable(iut.table)
      setMarked([[],[]])
      setSELECTED(null)
  }
  let ResetComponent = ({reset}) => {
        if (NPLAYERS != 0)
            return(
            <TouchableOpacity
            style = {{margin: 20, padding:5}}
            onPress={reset}>
                <Text>Restart</Text> 
            </TouchableOpacity>)
        return (<></>)
    }
  let texto = iut.gameover() == 0? `Vez de jogador: ${iut.CURPLAYER + 1}`: `Jogador ${iut.gameover()} Ganhou!`
  ia()
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, fontWeight:'bold',margin: 20}}>{texto}</Text>
      {table.map((e, i) => (<View key={i} style={styles.row}>

        {e.map((f, j) => {
          if (i < 2 || j < 1 || j > 9 || i > 12)
            return (<View key={j} style={styles.non}></View>)
          const peca = table[i][j]
          return (
            <TouchableOpacity key={j} style={{ ...styles.square, backgroundColor: color(j, i) }} onPress={() => touch(j, i)} onLongPress={() => longTouch(j, i)}>
              <Piece peca={peca}></Piece>
            </TouchableOpacity>
          );
        })
        }
      </View>
      ))

      }
        <ResetComponent reset={reset}></ResetComponent>
    </View>
  );
}



function Piece({ peca }) {
  if (peca == "_" || peca == "n")
    return (<></>)

  // Isso não é elegante, mas está de acordo com a documentação
  // não pode usar strings não estaticas no require

  let icon;
  switch (peca) {
    case 'p':
      icon = require('./images/p0.png')
      break
    case 'P':
      icon = require('./images/p1.png')
      break
    case 'd':
      icon = require('./images/d0.png')
      break
    case 'D':
      icon = require('./images/d1.png')
      break
    case 'c':
      icon = require('./images/c0.png')
      break
    case 'C':
      icon = require('./images/c1.png')
      break
    case 'a':
      icon = require('./images/a0.png')
      break
    case 'A':
      icon = require('./images/a1.png')
      break
    case 'e':
      icon = require('./images/e0.png')
      break
    case 'E':
      icon = require('./images/e1.png')
      break
  }

  return (<Image source={icon} />);
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: square,
    height: square,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  non: {
    height: 0,
    width: 0
  },
  row: {
    flexDirection: 'row'
  }
});