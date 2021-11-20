import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React, { useState } from 'react';
import { List, Paragraph, Headline } from 'react-native-paper';



export default function Tutorial() {
  return (
    <ScrollView>
    <List.Section>
      <List.Accordion
        title="Introdução"
        left={props => <List.Icon {...props} icon="book-open" />}>
          <View style={styles.textbox}>
          <Headline>Sobre o Iuten</Headline>
        <Paragraph style={styles.paragraph}>
          O projeto denominado Iuten, surgiu com o intuito de proporcionar uma experiência diferente para a comunidade do 
          Departamento de Computação da Universidade Federal de São Carlos e  seus arredores, 
          como outros departamentos e a própria cidade de São Carlos.
          </Paragraph>
        <Paragraph style={styles.paragraph}>
          O Iuten é um jogo de tabuleiro que foi desenvolvido pelos alunos do Programa de Educação Tutorial do curso de bacharelado em ciência da computação (PET-BCC),
           o jogo foi inspirado em um ambiente de fantasia medieval, por isso as peças têm nomes e funções que remetem a essa situação.
          </Paragraph>
          <Paragraph style={styles.paragraph}>
          O intuito do jogo é o de desenvolver um pensamento estratégico e de tomada de decisões por parte dos jogadores, e fazê-los interagir com outras pessoas, 
          pois o jogo foi pensado para que duas pessoas o jogassem simultaneamente.
          </Paragraph>
          </View>
      </List.Accordion>
      <List.Accordion
        title="Tabuleiro"
        left={props => <List.Icon {...props} icon="grid" />}>
          <View style={styles.textbox}>
        <Headline>Tabuleiro</Headline>
        <Paragraph style={styles.paragraph}>
        O tabuleiro é retangular, na dimensão 9 x 11, ou seja possui nove colunas e 11 linhas, a seguir se encontra uma imagem do tabuleiro.
        </Paragraph>
        <Image style={{ width: 250, height: 300 }}  source={require('./images/tutorial/1.png')}/>

        <Headline>Casas Especiais</Headline>
        
        <Paragraph style={styles.paragraph}>
          No Iuten, existem algumas casas especiais, as vermelhas são os tronos, as cinzas representam os palácios dos jogadores.
        </Paragraph>
        <Paragraph style={styles.paragraph}> As casas azuis são torres de promoção de arqueiros, QUALQUER PEÇA TERÁ SEU MOVIMENTO CANCELADO AO PASSAR POR CIMA DESSA CASA, ou seja, se uma peça capturar a peça que está na torre, esse será o fim do turno. Caso uma peça, diferente do arqueiro esteja na torre, o próximo movimento será OBRIGATORIAMENTE mover essa peça para uma casa adjacente, podendo capturar outra peça nesse movimento.

        </Paragraph>
        <Headline>Tipos de Peças</Headline>
        <Paragraph style={styles.paragraph}>
        Tipos de Peças
        O jogo possui 15 peças para cada jogador inicialmente, sendo elas distribuídas em:
        </Paragraph>
        <Paragraph style={styles.paragraph}>8 Peões (P)</Paragraph>
        <Paragraph style={styles.paragraph}>2 Druidas (D)</Paragraph>
        <Paragraph style={styles.paragraph}>2 Arqueiros (A)</Paragraph>
        <Paragraph style={styles.paragraph}>2 Elefantes (E)</Paragraph>
        <Paragraph style={styles.paragraph}>1 Cavaleiro (C)</Paragraph>

        <Headline>Disposição das Peças</Headline>
        <Image style={{ width: 250, height: 300 }}  source={require('./images/tutorial/2.png')}/>


          </View>
      </List.Accordion>

      <List.Accordion
        title="Movimentação"
        left={props => <List.Icon {...props} icon="account-group" />}>
          <View style={styles.textbox}>
        <Paragraph style={styles.paragraph}>
        Nenhum movimento pode pular peças, seja inimiga ou aliada.
          </Paragraph>
          <List.Accordion
          title="Peão/ Principe Herdeiro"
          left={props => <List.Icon {...props} icon={() => (<Image source={require('./images/p1.png')} />)} />}>
            <View style={styles.textbox}>
              <Headline>Movimentação</Headline>
              <Paragraph style={styles.paragraph}>
              Peões são capazes de se movimentar em qualquer direção, apenas uma casa de distância
              </Paragraph>
              <Image style={{ width: 150, height: 150 }}  source={require('./images/tutorial/3.png')}/>

              <Headline>Ataque</Headline>
              <Paragraph style={styles.paragraph}>
              O peão é capaz de capturar qualquer peça nas direções que é capaz de se mover, quando ele captura a peça, ele toma o lugar dela na casa.
              </Paragraph>          
          
            </View>
        </List.Accordion>

        <List.Accordion
          title="Druida"
          left={props => <List.Icon {...props} icon={() => (<Image source={require('./images/d1.png')} />)} />}>
            <View style={styles.textbox}>
              <Headline>Movimentação</Headline>
              <Paragraph style={styles.paragraph}>
              Druidas são capazes de andar na vertical e horizontal, no máximo duas casas em uma dessas direções por vez.
              </Paragraph>
              <Image style={{ width: 150, height: 150 }}  source={require('./images/tutorial/4.png')}/>

              <Headline>Ataque</Headline>
              <Paragraph style={styles.paragraph}>
              O Druida é capaz de capturar qualquer peça nas direções que é capaz de se mover, quando ele captura a peça, ele toma o lugar dela na casa. Quando um elefante inimigo é capturado, o Druida é capaz de reviver ele para ser utilizado como aliado em qualquer casa adjacente não ocupada.
              </Paragraph>          
          
            </View>
        </List.Accordion>

        <List.Accordion
          title="Arqueiro"
          left={props => <List.Icon {...props} icon={() => (<Image source={require('./images/a1.png')} />)} />}>
            <View style={styles.textbox}>
              <Headline>Movimentação</Headline>
              <Paragraph style={styles.paragraph}>
              Arqueiros são capazes de se movimentar na horizontal e na diagonal, sendo uma casa no máximo na horizontal e até duas na diagonal.
              </Paragraph>
              <Image style={{ width: 150, height: 150 }}  source={require('./images/tutorial/4.png')}/>

              <Headline>Ataque</Headline>
              <Paragraph style={styles.paragraph}>
              Inicialmente o Arqueiro é capaz de capturar qualquer peça nas direções que é capaz de se mover, quando ele captura uma peça, ele toma o lugar dela na casa. Quando o Arqueiro está em cima da torre, ele é capaz de capturar qualquer peça na diagonal daquela torre, porém ele não sairá da torre.
              </Paragraph>          
          
            </View>
        </List.Accordion>


        <List.Accordion
          title="Elefante"
          left={props => <List.Icon {...props} icon={() => (<Image source={require('./images/e1.png')} />)} />}>
            <View style={styles.textbox}>
              <Headline>Movimentação</Headline>
              <Paragraph style={styles.paragraph}>
              Elefantes são capazes de se movimentar apenas na linha à frente dele, formando um T.
A frente de um elefante é sempre voltada para a base inimiga.

              </Paragraph>
              <Image style={{ width: 150, height: 150 }}  source={require('./images/tutorial/5.png')}/>

              <Headline>Ataque</Headline>
              <Paragraph style={styles.paragraph}>
              O Elefante é capaz de capturar qualquer peça nas direções que é capaz de se mover.
              </Paragraph>          
          
            </View>
        </List.Accordion>

        <List.Accordion
          title="Cavaleiro"
          left={props => <List.Icon {...props} icon={() => (<Image source={require('./images/p1.png')} />)} />}>
            <View style={styles.textbox}>
              <Headline>Movimentação</Headline>
              <Paragraph style={styles.paragraph}>
              O cavaleiro é capaz de andar na horizontal e vertical, podendo andar quantas casas forem possíveis nessas direções, apenas sendo parado por peças aliadas, peças inimigas (que ele pode capturar, mas será descrito melhor na seção Ataque) e pela casa que representa a torre.

              </Paragraph>
              <Image style={{ width: 150, height: 150 }}  source={require('./images/tutorial/6.png')}/>

              <Headline>Ataque</Headline>
              <Paragraph style={styles.paragraph}>
              O Cavaleiro é capaz de capturar qualquer peça nas direções que é capaz de se mover. Quando ele percorre três casas ou mais para capturar uma peça, ele ganha um movimento bônus, que faz com que ele obrigatoriamente se movimente para uma casa adjacente a aquela que a peça capturada estava.
              </Paragraph>          
          
            </View>
        </List.Accordion>
          </View>
      
      </List.Accordion>
      <List.Accordion
        title="Condição de Vitória"
        left={props => <List.Icon {...props} icon="trophy" />}>
          <View style={styles.textbox}>
        <Paragraph style={styles.paragraph}>
          O jogo termina quando um peão de algum jogador chegar no trono inimigo ou todos os peões de um jogador forem capturados.
          </Paragraph>
          </View>
      </List.Accordion>
    </List.Section></ScrollView>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbox: {
    marginRight: 30,
    marginVertical: 10,
    padding: 10
  },
  paragraph: {
    justifyContent: 'center',
    textAlign: "justify",
  },
  img :{

  }
});
