import React, { useState } from 'react';
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

function Detail({ navigation }) {
  const window = useWindowDimensions();
  const [topTitle, setTopTitle] = useState(window.width);
  const [heart, setHeart] = useState(false);
  const [updateView, setUpdateView] = useState(false);

  return (
    <SafeAreaView>
      <View style={[styles.title, { marginTop: updateView ? 0 : window.width * 0.65 - topTitle }]}>
        <Text style={{ display: updateView ? 'none' : 'flex' }}>Chủ nhật, 09/05/2021</Text>
        <Text
          style={[
            styles.text,
            {
              fontSize: 18,
              fontWeight: 'bold',
            },
          ]}
        >
          Các nhà đầu tư tiền điện tử nên sẵn sàng để mất tất cả tiền của họ, thống đốc BOE nói
        </Text>
        <Text
          style={[
            styles.boldText,
            {
              display: updateView ? 'none' : 'flex',
            },
          ]}
        >
          Đăng bởi Ryan Browne
        </Text>
      </View>
      <Pressable
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
              uri: 'https://cutecatsinhats-x7v0etsjgzjvirs3.netdna-ssl.com/wp-content/uploads/2016/03/reindeer-hat-kitty.jpg',
            }}
          />
          <View style={styles.content}>
            <Text style={[styles.text]}>
              <Text style={[styles.boldText]}>LONDON</Text> — Tiền điện tử “không có giá trị nội
              tại” và những người đầu tư vào chúng nên sẵn sàng để mất tất cả tiền của mình, Thống
              đốc Ngân hàng Trung ương Anh, Andrew Bailey cho biết.
            </Text>
            <Text style={[styles.text]}>
              Các loại tiền kỹ thuật số như bitcoin, ether và thậm chí cả dogecoin đã rơi vào tình
              trạng giảm giá trong năm nay, nhắc nhở một số nhà đầu tư về bong bóng tiền điện tử năm
              2017, trong đó bitcoin tăng vọt lên mức 20.000 đô la, chỉ giảm xuống mức 3.122 đô la
              một năm sau đó. Khi được hỏi trong một cuộc họp báo hôm thứ Năm về giá trị gia tăng
              của tiền điện tử, Bailey cho biết: “Chúng không có giá trị nội tại.
            </Text>
            <Text style={[styles.text]}>
              Điều đó không có nghĩa là mọi người không coi trọng chúng, bởi vì “Tôi sẽ nói lại điều
              này rất thẳng thắn,” anh ấy nói thêm. “Chỉ mua chúng nếu bạn chuẩn bị mất tất cả tiền
              của mình.” Nhận xét của Bailey lặp lại cảnh báo tương tự từ Cơ quan quản lý tài chính
              của Vương quốc Anh.
            </Text>
            <Text style={[styles.text]}>
              Điều đó không có nghĩa là mọi người không coi trọng chúng, bởi vì “Tôi sẽ nói lại điều
              này rất thẳng thắn,” anh ấy nói thêm. “Chỉ mua chúng nếu bạn chuẩn bị mất tất cả tiền
              của mình.” Nhận xét của Bailey lặp lại cảnh báo tương tự từ Cơ quan quản lý tài chính
              của Vương quốc Anh.
            </Text>
            <Text style={[styles.text]}>
              Điều đó không có nghĩa là mọi người không coi trọng chúng, bởi vì “Tôi sẽ nói lại điều
              này rất thẳng thắn,” anh ấy nói thêm. “Chỉ mua chúng nếu bạn chuẩn bị mất tất cả tiền
              của mình.” Nhận xét của Bailey lặp lại cảnh báo tương tự từ Cơ quan quản lý tài chính
              của Vương quốc Anh.
            </Text>
            <Text style={[styles.text]}>
              Cơ quan giám sát dịch vụ tài chính cho biết: “Đầu tư vào tiền điện tử, hoặc các khoản
              đầu tư và cho vay liên quan đến chúng, thường liên quan đến việc chấp nhận rủi ro rất
              cao với tiền của nhà đầu tư”. "Nếu người tiêu dùng đầu tư vào những loại sản phẩm này,
              họ nên chuẩn bị sẵn sàng để mất tất cả tiền của họ." Bailey, người trước đây là giám
              đốc điều hành của FCA, từ lâu đã là một người hoài nghi về tiền điện tử. Vào năm 2017,
              ông cảnh báo: “Nếu bạn muốn đầu tư vào bitcoin, hãy chuẩn bị sẵn sàng để mất tất cả
              tiền của mình”.
            </Text>
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
