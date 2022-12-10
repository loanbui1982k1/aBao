import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../App';
import NewsCard from '../components/NewsCard';
import { HeaderText } from '../components/Text';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import LinearGradient from 'react-native-linear-gradient';
import { getCategory, getFavouriteNewsByTag, getFavouriteTags, getNews } from '../services/api';
import CustomButton from '../utils/CustomButton';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

function Favorite({ navigation }) {
  const { idUser } = useSelector((state) => state.taskReducer);
  const { theme, font } = React.useContext(ThemeContext);
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const getTags = async () => {
    if (idUser) {
      await getFavouriteTags(idUser)
        .then((res) => {
          setTags(res.data.map((i) => i.nameCategory));
          setSelectedTag(res.data[0].nameCategory);
        })
        .catch(() => {});
    } else {
      await getCategory()
        .then((res) => {
          setTags(res.data.map((i) => i.nameCategory));
          setSelectedTag(res.data[0]?.nameCategory);
        })
        .catch(() => {});
    }
  };

  const getAllNews = async () => {
    if (idUser) {
      await getFavouriteNewsByTag({ idUser: idUser, nameCategory: selectedTag })
        .then((res) => {
          setNews(res.data);
        })
        .catch(() => {});
    } else {
      await getNews(selectedTag)
        .then((res) => {
          setNews(res.data);
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    getTags();
    if (!idUser) {
      Toast.show({
        type: 'errorToast',
        text1: 'Bạn chưa đăng nhập',
        visibilityTime: 2000,
      });
    }
  }, [idUser]);

  useEffect(() => {
    if (selectedTag) getAllNews();
  }, [selectedTag]);

  const onRefresh = () => {
    setRefreshing(true);
    setSearchInput('');
    getTags().then(() => getAllNews().then(() => setRefreshing(false)));
  };

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

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
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.selectedActiveColor}
            />
          }
        >
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
  },
});
export default Favorite;
