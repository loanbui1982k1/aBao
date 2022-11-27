import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../utils/CustomButton';
import Input from '../utils/Input';

function Signup({ navigation }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.view}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.back}
                    >
                        <Ionicons name="chevron-back" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Đăng ký</Text>
                </View>
                <Image style={styles.image} source={require('../../assets/logo.png')} resizeMode='contain'></Image>
                <View style={styles.container}>
                    <Input
                        placeholder="Email"
                        icon="email-outline"
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value);
                        }}
                    />
                    <Input
                        placeholder="Tên người dùng"
                        icon="account-outline"
                        value={username}
                        onChangeText={(value) => {
                            setUsername(value);
                        }}
                    />
                    <Input
                        placeholder="Mật khẩu"
                        secureTextEntry
                        icon="lock-outline"
                        value={password}
                        onChangeText={(value) => {
                            setPassword(value);
                        }}
                    />
                    <Input
                        placeholder="Mật khẩu"
                        secureTextEntry
                        icon="lock-outline"
                        value={password}
                        onChangeText={(value) => {
                            setPassword(value);
                        }}
                    />

                </View>
                <View style={styles.button}>
                    <CustomButton
                        buttonStyles={{ backgroundColor: '#FF3A44', marginTop: 20 }}
                        textStyles={{ color: 'white' }}
                        text={'Đăng ký'}
                    />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.textFooter}>Bạn đã có tài khoản?</Text>
                    <Text style={styles.navigation}>Đăng nhập</Text>
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
        marginLeft: -5
    },
    header: {
        flex: 1,
        height: '10%',
        flexDirection: "row",
        marginTop: '3%'
    },
    textHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF3A44',
        marginLeft: '23%',
        fontStyle: "italic"
    },
    image: {
        marginBottom: '10%',
        marginTop: '10%',
        width: '100%'
    },
    forget: {
        color: '#FF3A44',
        fontSize: 14,
        textAlign: 'right',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    },
    textFooter: {
        color: '#041E2F',
        fontSize: 14,
        textAlign: 'center'
    },
    navigation: {
        color: '#FF3A44',
        fontSize: 14,
        textAlign: 'center',
        marginLeft: 5
    }
});
export default Signup;
