import React from 'react';
import { View, StyleSheet, Text, TextInput, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewsCard from '../components/NewsCard';

const TAGS = [
  {
    title: "Lọc",
    selected: true
  },
  {
    title: "Văn hóa",
    selected: false
  },
  {
    title: "Kinh tế",
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

function Favorite({ navigation }) {
  return (
    <View>
      <View style={styles.topTitle}>
        <MaterialCommunityIcons name="chevron-left" color="#000" size={30} />
        <Text style={styles.text_topTitle}>Yêu thích</Text>
      </View>
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
  topTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 16,
  },
  text_topTitle: {
    fontSize: 24,
    color: '#FF3A44',
    paddingLeft: 120,
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
export default Favorite;
