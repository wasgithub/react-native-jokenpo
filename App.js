/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const OPCOES = ['pedra', 'papel', 'tesoura']
const img_topo = require(`./src/assets/images/${"jokenpo.png"}`)
const imgEscolhas = {
  pedra: require(`./src/assets/images/pedra.png`),
  papel: require(`./src/assets/images/papel.png`),
  tesoura: require(`./src/assets/images/tesoura.png`),
}

class MeuComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      escolhaUsuario: '',
      escolhaComputador: '',
      resultado: ''
    }
  }

  jokenpo(escolhaUsuario) {
    let escolhaComputador = this.geraEscolhaComputador()
    let resultado = this.calculaResultado(escolhaUsuario, escolhaComputador)
    this.setState({escolhaUsuario, escolhaComputador, resultado})
  }

  geraEscolhaComputador() {
    let escolha = Math.floor(Math.random() * 3)
    return OPCOES[escolha]
  }

  calculaResultado(usuario, computador) {
    let result
    
    if(usuario === computador) {
      result = 'Empate'
    } else if (usuario == OPCOES[0] && computador == OPCOES[1]) {
      result = 'Você perdeu'
    } else if (usuario == OPCOES[1] && computador == OPCOES[2]) {
      result = 'Você perdeu'
    } else if (usuario == OPCOES[2] && computador == OPCOES[0]) {
      result = 'Você ganhou'
    } else if (usuario == OPCOES[2] && computador == OPCOES[1]) {
      result = 'Você ganhou'
    } else if (usuario == OPCOES[0] && computador == OPCOES[2]) {
      result = 'Você ganhou'
    } else if (usuario == OPCOES[1] && computador == OPCOES[2]) {
      result = 'Você ganhou'
    } else if (usuario == OPCOES[1] && computador == OPCOES[0]) {
      result = 'Você ganhou'
    }

    return result
  }

  botoes = () => {
    return(
      <View style={styles.containerBtn}>
      {
        OPCOES.map((opcao) => {
          return(
            <View style={styles.btnEscolha} key={opcao}> 
              <Button title={opcao} onPress={() => this.jokenpo(opcao)} />
            </View>
          )
        })
      }
     </View>
    )  
  }
  
  render() {
    let resultado
    if(this.state.resultado == 'Você ganhou') {
      resultado = styles.ganhou
    } else if (this.state.resultado == "Você perdeu"){
      resultado = styles.perdeu
    } else {
      resultado = styles.empate
    }
    return(
      <View>
        <Topo />
        {this.botoes()}
        <View style={styles.containerResultados}>
        <Text style={resultado}>{this.state.resultado}</Text>
        <Icone jogador="computador" escolha={this.state.escolhaComputador}/>
        <Icone jogador="Você" escolha={this.state.escolhaUsuario} />
        </View>
      </View>
    )
  }
}

const Topo = () => {
  return(
    <View>
      <Image source={img_topo}/>
    </View>
  )
}

class Imagem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.icone}>
        <Text>{`${this.props.jogador}: ${this.props.escolha}`}</Text>
      </View>

    )
  }
}

const Icone = ({jogador, escolha, imagem}) => {
  return(
    <View style={styles.icone}>
      <View>
        <Image source={imgEscolhas[escolha]}/>
      </View>
      <Text>{`${jogador}: ${escolha}`}</Text>
    </View>
  )  
}

const App: () => React$Node = () => {
  return (
    <>
    <MeuComponent></MeuComponent>
    </>
  );
};

const styles = StyleSheet.create({
  btnEscolha: {
    width: 90
  },
  containerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10
  },
  containerResultados: {
    alignItems: 'center',
    marginTop: 10
  },
  resultado: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
  },
  perdeu: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10, 
    color: 'red'   
  },
  ganhou: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10, 
    color: 'green'   
  },
  empate: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10, 
    color: 'blue'   
  },  
  icone: {
    alignItems: 'center',
    marginBottom: 30
  }
});

export default App;
