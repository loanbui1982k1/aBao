import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNColorPanel from 'react-native-color-panel';
import { ThemeContext } from '../App';
import Text, { FONT_FAMILY, HeaderText, SectionHeaderText, ButtonText } from '../components/Text';
import { Picker } from '@react-native-picker/picker';
import TextInput from '../components/TextInput';
import CustomButton from '../utils/CustomButton';

const { width, height } = Dimensions.get('window');

function ColorModal(props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalConfig.visible}
      onRequestClose={props.setModalConfig}
    >
      <View style={styles.centeredView}>
        <View style={{ ...styles.modalView, backgroundColor: props.theme.selectedBgColor }}>
          <RNColorPanel
            style={styles.panel}
            color={props.selectedColor}
            brightnessLowerLimit={0}
            onColorChange={props.modalConfig.firstRender ? props.setFirstRender : props.setState}
          />
          <CustomButton style={styles.button} onPress={props.setModalConfig}>
            <ButtonText>Đóng</ButtonText>
          </CustomButton>
        </View>
      </View>
    </Modal>
  );
}

function Setting({ navigation }) {
  const [modalConfig, setModalConfig] = useState({ visible: false, type: null, firstRender: true });
  const { theme, setTheme, font, setFont } = React.useContext(ThemeContext);

  return (
    <View style={{ ...styles.container, backgroundColor: theme.selectedBgColor }}>
      <ColorModal
        modalConfig={modalConfig}
        setFirstRender={() => setModalConfig({ ...modalConfig, firstRender: false })}
        setModalConfig={() => setModalConfig({ ...modalConfig, visible: !modalConfig })}
        selectedColor={theme[modalConfig.type]}
        setState={(color) => {
          setTheme({ ...theme, [modalConfig.type]: color });
        }}
        selectedBgColor={theme.selectedBgColor}
        theme={theme}
      />
      <ScrollView style={{ width: '85%' }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.back}>
            <Ionicons name="chevron-back" size={25} color={theme.selectedTextColor} />
          </TouchableOpacity>
          <HeaderText style={styles.textHeader}>Cài đặt</HeaderText>
        </View>
        <View style={styles.section}>
          <SectionHeaderText style={styles.title}>Giao diện</SectionHeaderText>

          <View style={{ ...styles.row, paddingVertical: 8 }}>
            <Text style={styles.text}>Màu nền</Text>
            <TouchableOpacity
              onPress={() =>
                setModalConfig({
                  visible: !modalConfig.visible,
                  type: Object.keys(theme)[0],
                  firstRender: true,
                })
              }
            >
              <View
                style={{
                  ...styles.background,
                  backgroundColor: theme.selectedBgColor,
                  borderColor: theme.selectedActiveColor,
                }}
              ></View>
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.line, backgroundColor: theme.selectedTextColor }}></View>

          <View style={{ ...styles.row, paddingVertical: 8 }}>
            <Text style={styles.text}>Màu chữ</Text>
            <TouchableOpacity
              onPress={() =>
                setModalConfig({
                  visible: !modalConfig.visible,
                  type: Object.keys(theme)[1],
                  firstRender: true,
                })
              }
            >
              <View
                style={{
                  ...styles.background,
                  backgroundColor: theme.selectedTextColor,
                  borderColor: theme.selectedActiveColor,
                }}
              ></View>
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.line, backgroundColor: theme.selectedTextColor }}></View>

          <View style={{ ...styles.row, paddingVertical: 8 }}>
            <Text style={styles.text}>Màu đánh dấu</Text>
            <TouchableOpacity
              onPress={() =>
                setModalConfig({
                  visible: !modalConfig.visible,
                  type: Object.keys(theme)[2],
                  firstRender: true,
                })
              }
            >
              <View
                style={{
                  ...styles.background,
                  backgroundColor: theme.selectedActiveColor,
                  borderColor: theme.selectedTextColor,
                }}
              ></View>
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.line, backgroundColor: theme.selectedTextColor }}></View>

          <View style={{ ...styles.row, paddingVertical: 8 }}>
            <Text style={styles.text}>Màu nền nút</Text>
            <TouchableOpacity
              onPress={() =>
                setModalConfig({
                  visible: !modalConfig.visible,
                  type: Object.keys(theme)[3],
                  firstRender: true,
                })
              }
            >
              <View
                style={{
                  ...styles.background,
                  backgroundColor: theme.selectedButtonColor,
                  borderColor: theme.selectedButtonTextColor,
                }}
              ></View>
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.line, backgroundColor: theme.selectedTextColor }}></View>

          <View style={{ ...styles.row, paddingVertical: 8 }}>
            <Text style={styles.text}>Màu chữ nút</Text>
            <TouchableOpacity
              onPress={() =>
                setModalConfig({
                  visible: !modalConfig.visible,
                  type: Object.keys(theme)[4],
                  firstRender: true,
                })
              }
            >
              <View
                style={{
                  ...styles.background,
                  backgroundColor: theme.selectedButtonTextColor,
                  borderColor: theme.selectedButtonColor,
                }}
              ></View>
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.line, backgroundColor: theme.selectedTextColor }}></View>

          <View style={styles.row}>
            <Text>Phông chữ</Text>
            <Picker
              selectedValue={font.fontFamily}
              onValueChange={(itemValue) => setFont({ ...font, fontFamily: itemValue })}
              style={{ width: 180 }}
              mode="dropdown"
            >
              {FONT_FAMILY.map((item, index) => (
                <Picker.Item
                  label={item}
                  value={item}
                  key={index}
                  style={{
                    fontFamily: item + '-Regular',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                  }}
                />
              ))}
            </Picker>
          </View>
          <View style={{ ...styles.line, backgroundColor: theme.selectedTextColor }}></View>

          <View style={styles.row}>
            <Text style={styles.text}>Cỡ chữ</Text>
            <View style={styles.rowView}>
              <TextInput
                style={{ textAlign: 'right' }}
                onChangeText={(text) =>
                  text && text <= 40
                    ? setFont({ ...font, fontSize: Number.parseInt(text) })
                    : setFont({ ...font, fontSize: null })
                }
                onBlur={() =>
                  !font.fontSize || 0 === font.fontSize || font.fontSize > 40
                    ? setFont({ ...font, fontSize: 14 })
                    : null
                }
                value={font?.fontSize?.toString()}
                placeholder="Tối đa 40  "
                keyboardType="numeric"
              />
              <Text>px</Text>
            </View>
          </View>
          <View style={{ ...styles.line, backgroundColor: theme.selectedTextColor }}></View>

          <View style={styles.row}>
            <Text style={styles.text}>Độ cao dòng</Text>
            <View style={styles.rowView}>
              <TextInput
                style={{ textAlign: 'right' }}
                onChangeText={(text) =>
                  text && text <= 50
                    ? setFont({ ...font, lineHeight: Number.parseInt(text) })
                    : setFont({ ...font, lineHeight: null })
                }
                onBlur={() =>
                  !font.lineHeight || 0 === font.lineHeight || font.lineHeight > 50
                    ? setFont({ ...font, lineHeight: 14 })
                    : null
                }
                value={font?.lineHeight?.toString()}
                placeholder="Tối đa 50  "
                keyboardType="numeric"
              />
              <Text>px</Text>
            </View>
          </View>
          <View style={{ ...styles.line, backgroundColor: theme.selectedTextColor }}></View>

          <View style={styles.row}>
            <Text style={styles.text}>Giãn cách dòng</Text>
            <View style={styles.rowView}>
              <TextInput
                style={{ textAlign: 'right' }}
                onChangeText={(text) =>
                  text && text <= 10
                    ? setFont({ ...font, letterSpacing: Number.parseFloat(text) })
                    : setFont({ ...font, letterSpacing: null })
                }
                onBlur={() =>
                  !font.letterSpacing || font.letterSpacing > 10
                    ? setFont({ ...font, letterSpacing: 0 })
                    : null
                }
                value={font?.letterSpacing?.toString()}
                placeholder="Tối đa 10  "
                keyboardType="numeric"
              />
              <Text>px</Text>
            </View>
          </View>
          <View style={{ ...styles.line, backgroundColor: theme.selectedTextColor }}></View>
        </View>
        <View style={styles.section}>
          <SectionHeaderText style={styles.title}>Phiên đăng nhập</SectionHeaderText>
          <View style={styles.row}>
            <Text style={styles.text}>Đăng xuất</Text>
            <MaterialCommunityIcons color={theme.selectedTextColor} name="logout" size={28} />
          </View>
          <View style={{ ...styles.line, backgroundColor: theme.selectedTextColor }}></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  panel: {
    width: width - 80,
    height: (width - 80) * 1.0,
    margin: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  back: {
    marginTop: 5,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
    width: '100%',
  },
  textHeader: {
    marginLeft: '36%',
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '3%',
  },
  title: {
    marginVertical: '5%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  background: {
    height: 24,
    width: 40,
    borderWidth: 1,
    borderRadius: 6,
  },
  line: {
    width: '100%',
    height: 1,
    marginTop: 6,
    marginBottom: 10,
  },
});
export default Setting;
