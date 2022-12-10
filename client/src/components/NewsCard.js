import React from 'react';
import { View, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { ThemeContext } from '../App';
import { convertApiDate, trimString } from '../services/helper';
import Text from './Text';

function NewsCard({ item, navigation }) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <View style={{ marginBottom: 14 }}>
      <Pressable onPress={() => navigation.push('Detail', { item: item })}>
        <ImageBackground
          source={{
            uri:
              item.image ||
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
              {trimString(item.writer, 20)}
            </Text>
            <Text
              style={{
                ...styles.textAuthor,
                color: theme.selectedTextColor,
                backgroundColor: theme.selectedBgColor + '80',
              }}
            >
              {item.date?.slice(0, -15) || ''}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
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
    padding: 5,
    borderRadius: 4,
    maxWidth: '50%',
  },
});

export default NewsCard;
