import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from "../components/Card";
import Colors from "../constants/Colors";
import Input from "../components/Input";


const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(undefined);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };
    const resetInputText = () => {
        setEnteredValue('');
        setIsConfirmed(false);
    };

    const confirmInputButton = () => {
        const chosenNum = parseInt(enteredValue);
        if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
            Alert.alert(
                "Number is not Valid",
                "The chosen number must be greater than 0 and smaller then 100",
                [
                    {
                        text: "Change Number",
                        onPress: resetInputText,
                        style: "destructive",
                    }
                ]
            );
            return;
        }
        setIsConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss();

    };


    // show confirm number in UI
    let showConfirmedNumber;

    if (isConfirmed === true) {
        showConfirmedNumber =
            <View style={styles.showConfirmed}>
                <Text style={styles.confirmedNumberText}> Chosen Number: </Text>
                <Text style={styles.confirmedNumber}> {selectedNumber} </Text>
                <Button title="Start Game" onPress={() => props.onStartGame(selectedNumber)} />
            </View >
    }
    // done

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a new Game </Text>
                <Card style={styles.card}>
                    <Text style={styles.selectNumber}> Select a number </Text>
                    <Input
                        style={styles.input}
                        textAlign='center'
                        keyboardType='number-pad'
                        maxLength={2}
                        autoCompleate='false'
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttons}>
                        <View style={styles.resetBtn}>
                            <Button title='Reset' color={Colors.secondary} onPress={resetInputText} />
                        </View>
                        <View style={styles.confirmBtn}>
                            <Button title='Confirm' color={Colors.primary} onPress={confirmInputButton} />
                        </View>
                    </View>
                </Card>
                {showConfirmedNumber}


            </View>
        </TouchableWithoutFeedback >

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        paddingBottom: 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    card: {
        width: '100%',
        maxWidth: 300,
        height: 200,
    },
    selectNumber: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: Colors.primary
    },

    title: {
        marginTop: -70,
        marginBottom: 30,
        fontSize: 20,
    },
    numberInput: {
        // fontSize: 40,
        // alignContent: 'center',
        // borderBottomWidth: 2,
        // width: '50%',
        // borderColor: 'blue',

    },
    input: {
        width: '20%',
        fontSize: 40,
        textAlign: 'center',
    },

    buttons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },

    resetBtn: {
        width: 85,
    },

    confirmBtn: {
        width: 85,
    },

    showConfirmed: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    confirmedNumberText: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    confirmedNumber: {
        fontSize: 100,
        color: Colors.primary,
        fontStyle: "italic",
    },
});

export default StartGameScreen; 