import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function Home({ navigation }) {
    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                aBao
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    text: {
        fontSize: 40,
        width: '80%',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    }
});
export default Home;
