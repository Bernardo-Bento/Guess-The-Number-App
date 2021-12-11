import React from "react";
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

const Card = props => {
    return (
        <View style={{ ...styles.inputContainer, ...props.style }}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({

    inputContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 10,
    },

});

export default Card;