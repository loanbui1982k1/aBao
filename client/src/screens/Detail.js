import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text, { fontFamily, SectionHeaderText } from '../components/Text';
import { ThemeContext } from '../App';
import CustomButton from '../utils/CustomButton';
import View from '../components/View';
import Tts from 'react-native-tts';
import { useSelector } from 'react-redux';
import { deleteFavourite, getFavouriteCheck, postFavourite } from '../services/api';
import Toast from 'react-native-toast-message';

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, ' ');
}

function Detail(props) {
  const { idUser } = useSelector((state) => state.taskReducer);
  const item = props.route.params.item;
  const window = useWindowDimensions();
  const { theme, font } = React.useContext(ThemeContext);

  const [heart, setHeart] = useState(false);
  const [updateView, setUpdateView] = useState(false);
  const [speak, setSpeak] = useState(false);

  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('vi-VN');
      Tts.stop();
    });
    item.content = urlify(item.content).replace('\\n', '');
    if (idUser) {
      getFavouriteCheck({ idUser: idUser, idNewspaper: item.idNewspaper })
        .then((res) => {
          setHeart(res.data.favourite);
        })
        .catch(() => {});
    }
  }, [props]);

  useEffect(() => {
    if (speak) {
      Tts.speak(item.title);
      var speakText = item.content;
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

  useEffect(() => {
    if (heart) {
      postFavourite({ idUser: idUser, idNewspaper: item.idNewspaper });
    } else {
      deleteFavourite({ idUser: idUser, idNewspaper: item.idNewspaper });
    }
  }, [heart]);

  return (
    <SafeAreaView>
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
        <MaterialCommunityIcons
          name={speak ? 'volume-off' : 'volume-high'}
          color={'white'}
          size={font.fontSize + 14}
        />
      </LinearGradient>
      <LinearGradient
        colors={['#FF3A44', '#FF8086']}
        style={[styles.linearGradient, { bottom: 40, right: 40 }]}
        onTouchStart={() => {
          if (idUser) {
            setHeart(!heart);
          } else {
            Toast.show({
              type: 'errorToast',
              text1: 'Bạn chưa đăng nhập',
              visibilityTime: 2000,
            });
          }
        }}
      >
        <MaterialCommunityIcons
          name={heart ? 'heart-broken' : 'heart'}
          color={'white'}
          size={font.fontSize + 14}
        />
      </LinearGradient>

      <ScrollView>
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
          <View
            style={{
              ...styles.title,
              marginTop: -140,
              backgroundColor: theme.selectedButtonColor,
            }}
          >
            <Text
              style={{
                display: updateView ? 'none' : 'flex',
                color: theme.selectedButtonTextColor,
              }}
            >
              {item.date?.slice(0, -15) || ''}
            </Text>
            <SectionHeaderText style={{ marginVertical: 6, color: theme.selectedButtonTextColor }}>
              {item.title}
            </SectionHeaderText>
            <Text
              style={{
                ...styles.boldText,
                display: updateView ? 'none' : 'flex',
                color: theme.selectedButtonTextColor,
              }}
            >
              Đăng bởi {item.writer || 'Ẩn danh'}
            </Text>
          </View>
          <View style={styles.content}>
            {/* <WebView
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
            /> */}
            <Text>{item.content}</Text>
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
    borderRadius: 40,
    padding: 24,
    zIndex: 1,
    width: '90%',
    marginHorizontal: '5%',
  },
  content: {
    padding: 28,
    paddingTop: 80,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    paddingBottom: 80,
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
