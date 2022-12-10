import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../App';
import NewsCard from '../components/NewsCard';
import { HeaderText } from '../components/Text';
import { API_KEY, BASE_URL } from '../services/constants';
import { TAGS } from './Home';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import LinearGradient from 'react-native-linear-gradient';

function Favorite({ navigation }) {
  const { theme, font } = React.useContext(ThemeContext);
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + '/top-headlines?country=us&pageSize=10' + API_KEY)
      .then((res) => setNews(res.data.articles));
  }, []);

  return (
    <View style={{ ...styles.container, backgroundColor: theme.selectedBgColor }}>
      <View style={styles.header}>
        <HeaderText>Yêu thích</HeaderText>
      </View>
      <View
        style={{
          ...styles.header,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            ...styles.headerSearch,
            borderColor: theme.selectedButtonColor,
            height: font.lineHeight * 3,
          }}
        >
          <TextInput style={{ display: 'flex', flex: 1 }} placeholder="Tìm kiếm" />
          <MaterialCommunityIcons
            name="magnify"
            color={theme.selectedButtonColor}
            size={font.fontSize + 10}
          />
        </View>
        <LinearGradient
          colors={['#FF3A44', '#FF8086']}
          style={{
            padding: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
          }}
        >
          <MaterialCommunityIcons name="bell-ring" color="#fff" size={font.fontSize + 8} />
        </LinearGradient>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}
      >
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {TAGS.map((item, index) => (
            <View
              key={index}
              style={{
                ...styles.tag,
                borderColor: theme.selectedButtonColor,
                backgroundColor: item.selected ? theme.selectedButtonColor : 'transparent',
              }}
            >
              <Text
                style={{
                  color: item.selected ? theme.selectedButtonTextColor : theme.selectedButtonColor,
                }}
              >
                {item.title}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {news.map((item, index) => {
          return <NewsCard key={index} item={item} navigation={navigation} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
    justifyContent: 'center',
  },
  headerSearch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    width: '80%',
    paddingHorizontal: 10,
  },
  linearGradient: {
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },
});
export default Favorite;
