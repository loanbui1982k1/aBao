import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, BASE_URL } from '../services/constants';
import { trimString } from '../services/helper';
import NewsCard from '../components/NewsCard';
import { setEmailRedux, setIdUserRedux, setProfilePhotoPathRedux, setUsernameRedux } from '../redux/actions';


export const TAGS = [
  { title: 'Kinh tế', api: 'business', selected: true },
  { title: 'Giải trí', api: 'entertainment', selected: false },
  { title: 'Chung', api: 'general', selected: false },
  { title: 'Sức khỏe', api: 'health', selected: false },
  { title: 'Khoa học', api: 'science', selected: false },
  { title: 'Thể thao', api: 'sports', selected: false },
  { title: 'Công nghệ', api: 'technology', selected: false },
];

function Home({ navigation }) {
  const isCarousel = React.useRef(null);
  const [hotNews, setHotNews] = useState([]);
  const [news, setNews] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      let userData = JSON.parse(user)
      if (userData) {
        dispatch(setEmailRedux(userData.email));
        dispatch(setUsernameRedux(userData.username));
        dispatch(setIdUserRedux(userData.idUser));
        dispatch(setProfilePhotoPathRedux(userData.profilePhotoPath));
      }
    });
    axios
      .get(BASE_URL + '/top-headlines?country=us&sortBy=popularity&pageSize=1' + API_KEY)
      .then((res) => setHotNews(res.data.articles));
    axios
      .get(BASE_URL + '/top-headlines?country=us&pageSize=20' + API_KEY)
      .then((res) => setNews(res.data.articles));
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <View style={styles.search_input}>
          <TextInput style={styles.input} placeholder="Tìm kiếm" />
          <MaterialCommunityIcons name="magnify" color="#818181" size={16} style={styles.icon} />
        </View>
        <View style={styles.header_ring}>
          <MaterialCommunityIcons name="bell-ring" color="#fff" size={16} />
        </View>
      </View>
      <View style={styles.news_laster}>
        <View style={styles.news_laster_header}>
          <Text style={styles.title}>Mới nhất</Text>
          <View style={styles.all_news_laster}>
            <Text
              style={{
                color: '#0080FF',
                fontSize: 14,
              }}
            >
              Tất cả
            </Text>
            <MaterialCommunityIcons
              name="arrow-right"
              color="#0080FF"
              size={16}
              style={{
                paddingLeft: 16,
              }}
            />
          </View>
        </View>
        {hotNews.map((item, index) => (
          <ImageBackground
            key={index}
            source={{
              uri:
                item.urlToImage ||
                'https://qph.cf2.quoracdn.net/main-qimg-3d69658bf00b1e706b75162a50d19d6c-pjlq',
            }}
            blurRadius={8}
            resizeMode="cover"
            style={styles.image}
            imageStyle={{
              borderRadius: 15,
            }}
          >
            <View
              style={{
                paddingBottom: 40,
              }}
            >
              <Text style={styles.text_author}>Được đăng bởi {trimString(item.author, 20)}</Text>
              <Text style={styles.news_laster_tittle}>{trimString(item.title)}</Text>
            </View>
            <View>
              <Text style={styles.text}>{trimString(item.description, 200)}</Text>
            </View>
          </ImageBackground>
        ))}

      </View>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 16,
          marginRight: 16,
          marginBottom: 16,
          marginTop: 16,
          alignItems: 'center',
        }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          {TAGS.map((item, index) => (
            <View key={index} style={item.selected ? styles.tag_selected : styles.tag}>
              <Text style={item.selected ? styles.text : styles.text_tag}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {news.map((item, index) => {
          return <NewsCard key={index} item={item} />;
        })}
      </ScrollView>

    </View >
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    width: '80%',
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 16,
  },
  header: {
    flexDirection: 'row',
    marginTop: 16,
    marginLeft: 16,
  },
  search_input: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  icon: {
    fontSize: 24,
    paddingTop: 6,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: '#818181',
    paddingRight: 10,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    height: 36,
    width: '80%',
    paddingLeft: 24,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: '#818181',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  header_ring: {
    right: 24,
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3A44',
    borderRadius: 45,
  },
  news_laster_header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  all_news_laster: {
    flexDirection: 'row',
  },
  image: {
    justifyContent: 'center',
    height: 210,
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  text_author: {
    color: '#fff',
    fontSize: 14,
  },
  news_laster_tittle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  tag: {
    height: '100%',
    width: '20%',
    height: 40,
    borderWidth: 1,
    borderColor: '#A6A6A6',
    marginRight: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag_selected: {
    height: '100%',
    width: '20%',
    height: 40,
    backgroundColor: '#FF3A44',
    borderWidth: 1,
    borderColor: '#A6A6A6',
    marginRight: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_tag: {
    color: '#000',
    fontSize: 13,
  },
  text: {
    color: '#fff',
    fontSize: 13,
  },
});
export default Home;
