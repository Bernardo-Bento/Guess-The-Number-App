import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';


export default function App() {
  const [userNumber, setUserNumber] = useState(undefined);
  const [currentScreen, setCurrentScreen] = useState('StartGameScreen');

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setCurrentScreen('GameScreen');
  };

  const getUserNumber = () => {
    return userNumber;
  };

  const goToMainScreen = () => {
    setUserNumber(undefined);
    setCurrentScreen('StartGameScreen');
  };


  //Screen selector
  let screen;
  if (currentScreen === 'StartGameScreen') {
    screen = <StartGameScreen onStartGame={startGameHandler} />
  }
  if (currentScreen === 'GameScreen') {
    screen = <GameScreen userChosenNumber={getUserNumber} resetGame={() => { goToMainScreen() }} />;
  }

  // let screen = <StartGameScreen onStartGame={startGameHandler} />;
  // if (userNumber !== undefined) {
  //   screen = <GameScreen userChosenNumber={getUserNumber} resetGame={(state) => {
  //     if (state === true) {
  //       setUserNumber(undefined);
  //     }
  //     else {
  //       return;
  //     }
  //   }} />;
  // }


  return (
    <View style={styles.screen}>
      <Header title={'Guess The Number'} />
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

});
