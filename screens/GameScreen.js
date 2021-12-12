import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import App from "../App";
import Card from "../components/Card";
import Colors from "../constants/Colors";


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const randomNumber = Math.floor(Math.random() * (max - min) + min);
    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNumber;
    }

};
const GameScreen = props => {
    const userNumber = props.userChosenNumber();
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, null));
    const [currentMin, setCurrentMin] = useState(1);
    const [currentMax, setCurrentMax] = useState(100); //done by Carolina //

    const checkWin = (number) => {
        if (number === userNumber) {
            Alert.alert(
                "Computer Wins [number: " + number + "]",
                "The Computer had a right Guess this time",
                [
                    {
                        text: "Try Again",
                        onPress: props.resetGame()
                    }
                ]
            );
        }
    };

    const nextGuessHandler = (direction) => {
        if (direction === 'lower' && userNumber > currentGuess || direction === 'greater' && userNumber < currentGuess) {
            Alert.alert(
                "Do not cheat",
                "Give the computer a right hint"
            );
            return;
        }
        if (direction === 'lower') {
            const newRand = generateRandomBetween(currentMin, currentGuess, currentGuess);
            setCurrentMax(currentGuess - 1);
            setCurrentGuess(newRand);
            checkWin(newRand);
        }
        if (direction === 'greater') {
            const newRand = generateRandomBetween(currentGuess, currentMax, currentGuess);
            setCurrentMin(currentGuess + 1);
            setCurrentGuess(newRand);
            checkWin(newRand);
        }
    };

    return (
        <View style={styles.screen}>
            
            <Text style={styles.computerGuessText}> Computer guess is: </Text>
            <Card style={styles.guessCard}>
                <Text style={styles.computerGuess}> {currentGuess} </Text>
            </Card>
            <View style={styles.buttonContainer}>
                <View style={styles.lowerButton}>
                    <Button title="Lower" onPress={nextGuessHandler.bind(this, 'lower')} color={'red'} />
                </View>
                <View style={styles.greaterButton}>
                    <Button title="Greater" onPress={nextGuessHandler.bind(this, 'greater')} color={'green'} />
                </View>
            </View>
            <Text style={styles.userNumberReminder}> your number is: {userNumber} </Text>
            <View style={styles.resetButton}>
                <Button title="Reset" onPress={() => { props.resetGame(true) }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    computerGuessText: {
        marginTop: -80,
        fontSize: 30,
        fontWeight: 'bold',
        borderBottomColor: 'black',
        borderBottomWidth: 2,

    },

    guessCard: {
        marginVertical: 50,
    },
    computerGuess: {
        fontSize: 100,
        fontStyle: 'italic',
        color: Colors.primary,
    },

    buttonContainer: {
        padding: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        height: 60,
        maxHeight: '80%',
    },

    lowerButton: {
        width: 100,
    },
    greaterButton: {
        width: 100,
    },

    userNumberReminder: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 20,
    },

    resetButton: {
        padding: 10,
        position: 'absolute',
        width: '100%',
        margin: 10,
        right: 0,
        left: 0,
        bottom: 0,
    },
});

export default GameScreen;