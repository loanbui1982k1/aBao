import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

function NewsCard({ item }) {
    return (
        <ImageBackground source={{ uri: item.image }} resizeMode="cover" style={styles.image_news} imageStyle={{
            borderRadius: 15
        }}>
            <Text style={styles.news_title}>{item.title}</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 30
            }}>
                <Text style={styles.text_author}>{item.author}</Text>
                <Text style={styles.text_author}>{item.date}</Text>
            </View>
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    image_news: {
        justifyContent: "center",
        height: 120,
        paddingLeft: 16,
        paddingRight: 16,
        marginLeft: 16,
        marginRight: 24,
        marginBottom: 10
    },
    news_title: {
        fontSize: 14,
        color: "#fff",
        fontStyle: 'italic'
    },
    text_author: {
        color: "#fff",
        fontSize: 14
    },
});
export default NewsCard;
