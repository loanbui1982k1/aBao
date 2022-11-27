import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function Setting({ navigation }) {
    return (
        <View style={styles.view}>
            <ScrollView style={{ width: '85%' }}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.back}
                    >
                        <Ionicons name="chevron-back" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Cài đặt</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Giao diện</Text>
                    <View style={styles.row}>
                        <Text style={styles.text}>Màu nền</Text>
                        <View style={styles.background}></View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Màu chữ</Text>
                        <View style={{ ...styles.background, backgroundColor: '#2E0505' }}></View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Phông chữ</Text>
                        <Text style={styles.text}>Nunito</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Cỡ chữ</Text>
                        <Text style={styles.text}>14px</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Độ cao dòng</Text>
                        <Text style={styles.text}>20px</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Giãn cách dòng</Text>
                        <Text style={styles.text}>Tự động</Text>
                    </View>
                    <View style={styles.line}></View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Thông báo</Text>
                    <View style={styles.row}>
                        <Text style={styles.text}>Thời gian</Text>
                        <Text style={styles.text}>19:00, 21:00</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Âm thanh</Text>
                        <Text style={styles.text}>Beep beep</Text>
                    </View>
                    <View style={styles.line}></View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Phiên đăng nhập</Text>
                    <View style={styles.row}>
                        <Text style={styles.text}>Đăng xuất</Text>
                        <MaterialCommunityIcons
                            color='#FF3A44'
                            name='logout'
                            size={28}
                        />
                    </View>
                    <View style={styles.line}></View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    back: {
        marginTop: 5,
        // marginLeft: -5
    },
    header: {
        flex: 1,
        height: '10%',
        flexDirection: "row",
        marginTop: '3%',
        width: '100%',
    },
    textHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF3A44',
        marginLeft: '28%',
        fontStyle: "italic"
    },
    section: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '3%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#041E2F',
        marginBottom: '5%'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 14,
        color: '#2E0505'
    },
    background: {
        height: 24,
        width: 40,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#2E0505'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#2E0505',
        marginTop: 6,
        marginBottom: 10,
    }
});
export default Setting;
