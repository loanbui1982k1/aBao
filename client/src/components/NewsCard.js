import React from 'react';
import { View, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { ThemeContext } from '../App';
import { convertApiDate, trimString } from '../services/helper';
import Text from './Text';

function NewsCard({ item, navigation }) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <Pressable onPress={() => navigation.push('Detail', { item: item })}>
      <View style={{ marginBottom: 10 }}>
        <ImageBackground
          source={{
            uri:
              item.urlToImage ||
              'https://qph.cf2.quoracdn.net/main-qimg-3d69658bf00b1e706b75162a50d19d6c-pjlq',
          }}
          resizeMode="cover"
          blurRadius={8}
          style={styles.imageNews}
          imageStyle={{
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              ...styles.newsTitle,
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
                ...styles.textAuthor,
                color: theme.selectedTextColor,
                backgroundColor: theme.selectedBgColor + '80',
              }}
            >
              {trimString(item.author, 30)}
            </Text>
            <Text
              style={{
                ...styles.textAuthor,
                color: theme.selectedTextColor,
                backgroundColor: theme.selectedBgColor + '80',
              }}
            >
              {convertApiDate(item.publishedAt || '')}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageNews: {
    justifyContent: 'space-between',
    padding: 10,
    height: 140,
  },
  newsTitle: {
    fontStyle: 'italic',
    padding: 10,
    borderRadius: 10,
  },
  textAuthor: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
});

export default NewsCard;
