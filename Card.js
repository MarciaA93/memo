import * as React from 'react';
import { Pressable, Text, StyleSheet, Image } from 'react-native';


export default function Card({onPress, isTurnedOver, children}){
    return(
        <Pressable onPress={onPress} 
        style={isTurnedOver ? styles.cardUp : styles.cardDown}
        >
            {isTurnedOver ? (
        <Text style={styles.text}>{children}</Text>
        ) : (
        <Image style={styles.imagenCard} source={ require('./assets/question-mark.png')}></Image>     
        )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardUp: {
        width: 100,
        height:100,
        margin: 10,
        alignItems: "center",
        borderRadius:25,
        justifyContent:"center",
        backgroundColor:"#16A085",
        borderWidth: 10,
        borderColor: "#58D68D",
    },
    cardDown: {
        width: 100,
        height:100,
        margin: 10,
        borderRadius: 25,
        borderWidth: 10,
        borderColor: "#58D68D",
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"#16A085",
    },
    text:{
        fontSize:46,
    },

    imagenCard: {
        width: 50,
        height: 50,
    }
})