import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { ThemeContext } from '../App';
import { convertApiDate, trimString } from '../services/helper';

function NewsCard({ item, navigation }) {
  const { theme } = React.useContext(ThemeContext);
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
        <Text
          style={{
            ...styles.news_title,
            color: theme.selectedTextColor,
            backgroundColor: theme.selectedBgColor + '80',
          }}
        >
          {trimString(item.title, 200)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 30,
          }}
        >
          <Text
            style={{
              ...styles.text_author,
              color: theme.selectedTextColor,
              backgroundColor: theme.selectedBgColor + '80',
            }}
          >
            {trimString(item.author, 30)}
          </Text>
          <Text
            style={{
              ...styles.text_author,
              color: theme.selectedTextColor,
              backgroundColor: theme.selectedBgColor + '80',
            }}
          >
            {convertApiDate(item.publishedAt || '')}
          </Text>
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
    fontStyle: 'italic',
    padding: 10,
    borderRadius: 10,
  },
  text_author: {
    fontSize: 14,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});

export default NewsCard;
