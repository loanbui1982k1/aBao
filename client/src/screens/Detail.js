import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text, { fontFamily, SectionHeaderText } from '../components/Text';
import { ThemeContext } from '../App';
import CustomButton from '../utils/CustomButton';
import View from '../components/View';
import { WebView } from 'react-native-webview';
import Tts from 'react-native-tts';

const html = [
  '<div>',
  '</div>',
  '<p>',
  '</p>',
  '<br>',
  '</br>',
  '<span>',
  '</span>',
  '\\n',
  '\n',
  '\\t',
  '\\r',
  '\\',
  '<image>',
  '</image>',
  '<img>',
  '</img>',
  '<strong>',
  '</strong>',
  '<em>',
  '</em>',
  '<b>',
  '</b>',
  '<i>',
  '</i>',
  '<u>',
  '</u>',
  '<a>',
  '</a>',
  '<h1>',
  '</h1>',
  '<h2>',
  '</h2>',
  '<h3>',
  '</h3>',
  '<h4>',
  '</h4>',
  '<caption>',
  '</caption>',
  '<blockquote>',
  '</blockquote>',
  '<li>',
  '</li>',
  '<ul>',
  '</ul>',
  '<ol>',
  '</ol>',
  '<pre>',
  '</pre>',
  '<code>',
  '</code>',
];

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, ' ');
}

function Detail(props) {
  const item = props.route.params.item;
  const window = useWindowDimensions();
  const { theme, font } = React.useContext(ThemeContext);
  const [topTitle, setTopTitle] = useState(window.width);
  const [heart, setHeart] = useState(false);
  const [updateView, setUpdateView] = useState(false);
  const [speak, setSpeak] = useState(false);

  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('vi-VN');
      Tts.stop();
    });
  }, []);

  useEffect(() => {
    if (speak) {
      Tts.speak(item.title);
      var speakText = item.content;
      speakText = urlify(speakText);
      html.forEach((i) => {
        speakText.replace(i, ' ');
      });
      speakText
        .split(/(.{400})/)
        .filter((x) => x.length == 400)
        .forEach((i) => {
          Tts.speak(i);
        });
    } else {
      Tts.stop();
    }
  }, [speak]);

  return (
    <SafeAreaView>
      <View
        style={{
          ...styles.title,
          marginTop: updateView ? 0 : window.width * 0.65 - topTitle,
          backgroundColor: theme.selectedActiveColor,
        }}
      >
        <Text style={{ display: updateView ? 'none' : 'flex' }}>
          {item.date?.slice(0, -15) || ''}
        </Text>
        <SectionHeaderText style={{ marginVertical: 6 }}>{item.title}</SectionHeaderText>
        <Text style={{ ...styles.boldText, display: updateView ? 'none' : 'flex' }}>
          Đăng bởi {item.writer || 'Ẩn danh'}
        </Text>
      </View>
      <CustomButton
        onPress={() => {
          Tts.stop();
          props.navigation.goBack();
        }}
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
        onTouchStart={() => setSpeak(!speak)}
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
                item.image ||
                'https://qph.cf2.quoracdn.net/main-qimg-3d69658bf00b1e706b75162a50d19d6c-pjlq',
            }}
          />
          <View style={styles.content}>
            <WebView
              source={{
                html: `<div style="overflow-wrap: break-word;">` + item.content + '</div>',
              }}
              style={{
                ...styles.text,
                width: window.width - 80,
                height:
                  ((item.content.length * font.fontSize) / (window.width - 80)) *
                  ((font.fontSize * 7) / 12),
                backgroundColor: theme.selectedBgColor,
              }}
              minimumFontSize={font.fontSize * 3}
            />
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
