import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { trimString } from '../services/helper';
import NewsCard from '../components/NewsCard';
import {
  setEmailRedux,
  setIdUserRedux,
  setProfilePhotoPathRedux,
  setUsernameRedux,
} from '../redux/actions';
import { ThemeContext } from '../App';
import LinearGradient from 'react-native-linear-gradient';
import Text, { SectionHeaderText } from '../components/Text';
import TextInput from '../components/TextInput';
import { getCategory, getNews } from '../services/api';
import CustomButton from '../utils/CustomButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Home({ navigation }) {
  const { theme, font } = React.useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [news, setNews] = useState([]);
  const [hotNews, setHotNews] = useState(null);
  const window = useWindowDimensions();
  const newsLengthRef = useRef(0);

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const dispatch = useDispatch();

  const getAllTags = async () => {
    await getCategory()
      .then((res) => {
        setTags(res.data.map((i) => i.nameCategory));
        setSelectedTag(res.data[0].nameCategory);
      })
      .catch(() => {});
  };

  const getAllNews = async () => {
    await getNews(selectedTag)
      .then((res) => {
        setNews(res.data);
        setHotNews(res.data ? 0 : null);
        newsLengthRef.current = res.data.length;
      })
      .catch(() => {});
  };

  useEffect(() => {
    getAllTags();
    AsyncStorage.getItem('user').then((user) => {
      let userData = JSON.parse(user);
      if (userData) {
        dispatch(setEmailRedux(userData.email));
        dispatch(setUsernameRedux(userData.username));
        dispatch(setIdUserRedux(userData.idUser));
        dispatch(setProfilePhotoPathRedux(userData.profilePhotoPath));
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (1 < newsLengthRef.current) setHotNews((hotNews) => (hotNews + 1) % newsLengthRef.current);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    selectedTag && getAllNews();
  }, [selectedTag]);

  const onRefresh = () => {
    setRefreshing(true);
    setSearchInput('');
    getAllNews().then(() => setRefreshing(false));
  };

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <View style={{ ...styles.container, backgroundColor: theme.selectedBgColor }}>
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
          <TextInput
            style={{ display: 'flex', flex: 1 }}
            placeholder="Tìm kiếm"
            value={searchInput}
            onChangeText={(value) => setSearchInput(value)}
          />
          <MaterialCommunityIcons
            name="magnify"
            color={theme.selectedButtonColor}
            size={font.fontSize + 10}
          />
        </View>
        <LinearGradient colors={['#FF3A44', '#FF8086']} style={styles.linearGradient}>
          <MaterialCommunityIcons name="bell-ring" color="#fff" size={font.fontSize + 8} />
        </LinearGradient>
      </View>

      <View style={styles.topNewsContainer}>
        <View style={styles.topNewsContent}>
          <Text
            style={{
              ...styles.topNewsTitle,
              fontSize: font.fontSize + 4,
              lineHeight: font.lineHeight + 4,
              color: theme.selectedTextColor,
            }}
          >
            Mới nhất
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                ...styles.topNewsTitle,
                color: theme.selectedActiveColor,
              }}
            >
              Tất cả
            </Text>
            <MaterialCommunityIcons
              name="arrow-right"
              color={theme.selectedButtonColor}
              size={font.fontSize + 10}
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
          {hotNews !== null && (
            <View
              style={{
                width: window.width - 40,
              }}
            >
              <TouchableOpacity onPress={() => navigation.push('Detail', { item: news[hotNews] })}>
                <ImageBackground
                  source={{
                    uri:
                      news[hotNews].image ||
                      'https://qph.cf2.quoracdn.net/main-qimg-3d69658bf00b1e706b75162a50d19d6c-pjlq',
                  }}
                  blurRadius={3}
                  resizeMode="cover"
                  style={styles.imageContent}
                  imageStyle={styles.imageStyle}
                >
                  <View
                    style={{
                      ...styles.topNewsText,
                      backgroundColor: theme.selectedButtonColor,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.selectedButtonTextColor,
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                      }}
                    >
                      Được đăng bởi{' '}
                      {news[hotNews].writer ? trimString(news[hotNews].writer, 20) : 'Hehe'}
                    </Text>
                    <SectionHeaderText
                      style={{
                        color: theme.selectedButtonTextColor,
                      }}
                    >
                      {trimString(news[hotNews].title)}
                    </SectionHeaderText>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: theme.selectedBgColor,
                    }}
                  >
                    <Text>{trimString(news[hotNews].description, 200)}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}
      >
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {tags.map((item, index) => (
            <CustomButton
              key={index}
              onPress={() => {
                setSelectedTag(item);
              }}
              style={{
                ...styles.tag,
                borderColor: theme.selectedButtonColor,
                backgroundColor: item === selectedTag ? theme.selectedButtonColor : 'transparent',
              }}
            >
              <Text
                style={{
                  color:
                    item === selectedTag
                      ? theme.selectedButtonTextColor
                      : theme.selectedButtonColor,
                }}
              >
                {item}
              </Text>
            </CustomButton>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.selectedActiveColor}
          />
        }
      >
        {filteredNews.map((item, index) => {
          return <NewsCard key={index} item={item} navigation={navigation} />;
        })}
      </ScrollView>

      <LinearGradient
        colors={['#FF3A44', '#FF8086']}
        style={[styles.linearGradient, { position: 'absolute', zIndex: 1, bottom: 40, right: 40 }]}
        onTouchStart={onRefresh}
      >
        <MaterialCommunityIcons name={'reload'} color={'white'} size={font.fontSize + 14} />
      </LinearGradient>
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
    marginTop: 0,
  },
  topNewsTitle: {
    fontWeight: 'bold',
  },
  imageStyle: {
    borderRadius: 15,
  },
  imageContent: {
    display: 'flex',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  topNewsContainer: {
    display: 'flex',
    width: '100%',
    marginVertical: 10,
  },
  topNewsContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topNewsText: {
    padding: 10,
    borderRadius: 10,
  },
});
export default Home;
