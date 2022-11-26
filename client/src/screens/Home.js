import React from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewsCard from '../components/NewsCard';

const DATA = [
  {
    title: "Các nhà đầu tư tiền điện tử nên sẵn sàng để mất tất cả tiền của họ, thống đốc BOE nói",
    author: "Ryan Browne",
    data: "“Tôi sẽ nói lại điều này rất thẳng thắn,” anh ấy nói thêm. “Chỉ mua chúng nếu bạn chuẩn bị mất tất cả tiền của mình.”",
    image: "https://thuthuatnhanh.com/wp-content/uploads/2022/06/anh-meo-Ba-Tu-mau-den-mat-vang-dep.jpg"
  },
];

const TAGS = [
  {
    title: "Công nghệ",
    selected: true
  },
  {
    title: "Kinh tế",
    selected: false
  },
  {
    title: "Giáo dục",
    selected: false
  },
];

const NEWS = [
  {
    title: "Sở Tài nguyên và Môi trường thông tin vụ nước ngập khu dân cư ở TP.HCM có màu đỏ",
    author: "Matt Villano",
    date: "Chủ nhật, 09/05/2021",
    image: "https://thuthuatnhanh.com/wp-content/uploads/2022/06/anh-meo-Ba-Tu-mau-den-mat-vang-dep.jpg"
  },
  {
    title: "Sở Tài nguyên và Môi trường thông tin vụ nước ngập khu dân cư ở TP.HCM có màu đỏ",
    author: "Matt Villano",
    date: "Chủ nhật, 09/05/2021",
    image: "https://thuthuatnhanh.com/wp-content/uploads/2022/06/anh-meo-Ba-Tu-mau-den-mat-vang-dep.jpg"
  }
]

function Home({ navigation }) {
  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <View style={styles.search_input}>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm"
          />
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
            <Text style={{
              color: '#0080FF',
              fontSize: 14
            }}>Tất cả</Text>
            <MaterialCommunityIcons name="arrow-right" color="#0080FF" size={16} style={{
              paddingLeft: 16
            }} />
          </View>
        </View>
        {/* <Carousel
          ref={isCarousel}
          data={DATA}
          renderItem={renderItem}
          sliderWidth={260}
          itemWidth={260}
        /> */}
        {
          DATA.map((item, index) => {
            return (
              <ImageBackground key={index} source={{ uri: item.image }} resizeMode="cover" style={styles.image} imageStyle={{
                borderRadius: 15
              }}>
                <View style={{
                  paddingBottom: 40
                }}>
                  <Text style={styles.text_author}>Được đăng bởi {item.author}</Text>
                  <Text style={styles.news_laster_tittle}>{item.title}</Text>
                </View>
                <View>
                  <Text style={styles.text}>{item.data}</Text>
                </View>
              </ImageBackground>
            )
          })
        }
      </View>
      <View style={{
        flexDirection: 'row',
        marginLeft: 16,
        marginBottom: 16,
        marginTop: 16
      }}>
        {TAGS.map((item, index) => {
          return item.selected ?
            (<View key={index} style={styles.tag_selected}>
              <Text style={styles.text}>{item.title}</Text>
            </View>)
            :
            (<View key={index} style={styles.tag}>
              <Text style={styles.text_tag}>{item.title}</Text>
            </View>)
        })}
      </View>
      {
        NEWS.map((item, index) => {
          return (
            <NewsCard key={index} item={item} />
          )
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  title: {
    fontSize: 20,
    width: '80%',
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 16
  },
  header: {
    flexDirection: 'row',
    marginTop: 16,
    marginLeft: 16
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
    borderTopRightRadius: 20
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
    borderBottomLeftRadius: 20
  },
  header_ring: {
    right: 24,
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3A44',
    borderRadius: 45
  },
  news_laster_header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 16,
    alignItems: 'center'
  },
  all_news_laster: {
    flexDirection: 'row',
  },
  image: {
    justifyContent: "center",
    height: 210,
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 16,
    marginRight: 24
  },
  news_laster_tittle: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 20
  },
  tag: {
    height: '100%',
    width: '25%',
    height: 40,
    borderWidth: 1,
    borderColor: '#A6A6A6',
    marginRight: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tag_selected: {
    height: '100%',
    width: '25%',
    height: 40,
    backgroundColor: '#FF3A44',
    borderWidth: 1,
    borderColor: '#A6A6A6',
    marginRight: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_tag: {
    color: '#000',
    fontSize: 13
  },
  text: {
    color: '#fff',
    fontSize: 13
  },
});
export default Home;
