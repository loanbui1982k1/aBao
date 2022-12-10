import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
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

function Home({ navigation }) {
  const { theme, font } = React.useContext(ThemeContext);
  const [hotNews, setHotNews] = useState([]);
  const [news, setNews] = useState([]);

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getCategory()
      .then((res) => {
        setTags(res.data.map((i) => i.nameCategory));
        setSelectedTag(res.data[0].nameCategory);
      })
      .catch(() => {});
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
    selectedTag &&
      getNews(selectedTag)
        .then((res) => {
          setNews(res.data);
          setHotNews([res.data[0]]);
        })
        .catch(() => {});
  }, [selectedTag]);

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
          <TextInput style={{ display: 'flex', flex: 1 }} placeholder="Tìm kiếm" />
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

        <ScrollView showsVerticalScrollIndicator={false}>
          {hotNews.map((item, index) => (
            <View
              key={index}
              style={{
                height: 210,
              }}
            >
              <ImageBackground
                source={{
                  uri:
                    item.image ||
                    'https://qph.cf2.quoracdn.net/main-qimg-3d69658bf00b1e706b75162a50d19d6c-pjlq',
                }}
                blurRadius={8}
                resizeMode="cover"
                style={styles.imageContent}
                imageStyle={styles.imageStyle}
              >
                <View
                  style={{
                    ...styles.topNewsText,
                    backgroundColor: theme.selectedButtonColor + '80',
                  }}
                >
                  <Text
                    style={{
                      color: theme.selectedButtonTextColor,
                      fontWeight: 'bold',
                      fontStyle: 'italic',
                    }}
                  >
                    Được đăng bởi {item.writer ? trimString(item.writer, 20) : 'Hehe'}
                  </Text>
                  <SectionHeaderText
                    style={{
                      color: theme.selectedButtonTextColor,
                    }}
                  >
                    {trimString(item.title)}
                  </SectionHeaderText>
                </View>
                <View>
                  <Text>{trimString(item.description, 200)}</Text>
                </View>
              </ImageBackground>
            </View>
          ))}
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
    height: '100%',
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
