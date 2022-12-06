import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { convertApiDate, trimString } from '../services/helper';

function NewsCard({ item, navigation }) {
  return (
    <Pressable onPress={() => navigation.push('Detail', { item: item })}>
      <ImageBackground
        source={{
          uri:
            item.urlToImage ||
            'https://qph.cf2.quoracdn.net/main-qimg-3d69658bf00b1e706b75162a50d19d6c-pjlq',
        }}
        resizeMode="cover"
        blurRadius={8}
        style={styles.image_news}
        imageStyle={{
          borderRadius: 15,
        }}
      >
        <Text style={styles.news_title}>{trimString(item.title, 200)}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 30,
          }}
        >
          <Text style={styles.text_author}>{trimString(item.author, 30)}</Text>
          <Text style={styles.text_author}>{convertApiDate(item.publishedAt || '')}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image_news: {
    justifyContent: 'center',
    height: 120,
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
  },
  news_title: {
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
  },
  text_author: {
    color: '#fff',
    fontSize: 14,
  },
});

export default NewsCard;
