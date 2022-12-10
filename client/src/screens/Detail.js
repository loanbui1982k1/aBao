import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_URL } from '../services/constants';
import axios from 'axios';
import { convertApiDate } from '../services/helper';
import Text, { SectionHeaderText } from '../components/Text';
import { ThemeContext } from '../App';
import CustomButton from '../utils/CustomButton';
import View from '../components/View';

function Detail(props) {
  const item = props.route.params.item;
  const window = useWindowDimensions();
  const { theme, font } = React.useContext(ThemeContext);
  const [topTitle, setTopTitle] = useState(window.width);
  const [heart, setHeart] = useState(false);
  const [updateView, setUpdateView] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    const url = props.route.params.item.url;
    try {
      axios.get(API_URL + `/detail?url=${url}`).then((res) => {
        if (res?.data?.success) setContent(res.data.data);
      });
    } catch (error) {}
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          ...styles.title,
          marginTop: updateView ? 0 : window.width * 0.65 - topTitle,
          backgroundColor: theme.selectedButtonColor,
        }}
      >
        <Text style={{ display: updateView ? 'none' : 'flex' }}>
          {convertApiDate(item.publishedAt || '')}
        </Text>
        <SectionHeaderText style={{ marginVertical: 6 }}>{item.title}</SectionHeaderText>
        <Text style={{ ...styles.boldText, display: updateView ? 'none' : 'flex' }}>
          Đăng bởi {item.author || 'Ẩn danh'}
        </Text>
      </View>
      <CustomButton
        onPress={() => props.navigation.goBack()}
        style={{
          ...styles.linearGradient,
          top: 40,
          left: 40,
          display: updateView ? 'none' : 'flex',
        }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color={theme.selectedButtonTextColor}
          size={font.fontSize + 14}
        />
      </CustomButton>
      <LinearGradient
        colors={['#FF3A44', '#FF8086']}
        style={[
          styles.linearGradient,
          updateView ? { bottom: 40, right: 40 + 80 } : { top: 40, right: 40 },
        ]}
      >
        <MaterialCommunityIcons name="volume-high" color={'white'} size={font.fontSize + 14} />
      </LinearGradient>
      <LinearGradient
        colors={['#FF3A44', '#FF8086']}
        style={[styles.linearGradient, { bottom: 40, right: 40 }]}
        onTouchStart={() => setHeart(!heart)}
      >
        <MaterialCommunityIcons
          name={heart ? 'heart' : 'heart-broken'}
          color={'white'}
          size={font.fontSize + 14}
        />
      </LinearGradient>

      <ScrollView
        onScroll={(event) => {
          setTopTitle(event.nativeEvent.contentOffset.y);
          setUpdateView(topTitle > window.width * 0.65);
        }}
      >
        <View style={styles.body}>
          <Image
            style={{
              width: window.width,
              height: window.width,
            }}
            source={{
              uri:
                item.urlToImage ||
                'https://qph.cf2.quoracdn.net/main-qimg-3d69658bf00b1e706b75162a50d19d6c-pjlq',
            }}
          />
          <View style={styles.content}>
            <Text style={[styles.text]}>{content}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    position: 'absolute',
    margin: 20,
    borderRadius: 40,
    padding: 24,
    paddingLeft: 32,
    paddingRight: 32,
    zIndex: 1,
  },
  content: {
    padding: 28,
    paddingTop: 80,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
  },
  text: {
    paddingTop: 12,
  },
  boldText: {
    fontWeight: 'bold',
  },
  linearGradient: {
    zIndex: 1,
    position: 'absolute',
    padding: 14,
    borderRadius: 32,
  },
});
export default Detail;
