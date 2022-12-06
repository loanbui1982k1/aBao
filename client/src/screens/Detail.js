import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_URL } from '../services/constants';
import axios from 'axios';
import { convertApiDate } from '../services/helper';

function Detail(props) {
  const item = props.route.params.item;
  const window = useWindowDimensions();
  const [topTitle, setTopTitle] = useState(window.width);
  const [heart, setHeart] = useState(false);
  const [updateView, setUpdateView] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    const url = props.route.params.item.url;
    try {
      axios.get(API_URL + `/detail?url=${url}`).then((res) => {
        if (res?.data?.success) setContent(res.data.data);
        else setContent('SOS');
      });
    } catch (error) {}
  }, []);

  return (
    <SafeAreaView>
      <View style={[styles.title, { marginTop: updateView ? 0 : window.width * 0.65 - topTitle }]}>
        <Text style={{ display: updateView ? 'none' : 'flex' }}>
          {convertApiDate(item.publishedAt || '')}
        </Text>
        <Text
          style={[
            styles.text,
            {
              fontSize: 18,
              fontWeight: 'bold',
            },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.boldText,
            {
              display: updateView ? 'none' : 'flex',
            },
          ]}
        >
          Đăng bởi {item.author}
        </Text>
      </View>
      <Pressable
        onPress={() => props.navigation.goBack()}
        style={[
          styles.linearGradient,
          {
            top: 40,
            left: 40,
            shadowColor: '#FF8086',
            backgroundColor: 'white',
            display: updateView ? 'none' : 'flex',
          },
        ]}
      >
        <MaterialCommunityIcons name="chevron-left" color={'black'} size={20} />
      </Pressable>
      <LinearGradient
        colors={['#FF3A44', '#FF8086']}
        style={[
          styles.linearGradient,
          updateView ? { bottom: 40, right: 40 + 80 } : { top: 40, right: 40 },
        ]}
      >
        <MaterialCommunityIcons name="volume-high" color={'white'} size={32} />
      </LinearGradient>
      <LinearGradient
        colors={['#FF3A44', '#FF8086']}
        style={[styles.linearGradient, { bottom: 40, right: 40 }]}
        onTouchStart={() => setHeart(!heart)}
      >
        <MaterialCommunityIcons name={heart ? 'heart' : 'heart-broken'} color={'white'} size={32} />
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
  body: {
    flex: 1,
  },
  title: {
    position: 'absolute',
    margin: 20,
    backgroundColor: '#D9D9D9',
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
    backgroundColor: 'white',
  },
  text: {
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
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
