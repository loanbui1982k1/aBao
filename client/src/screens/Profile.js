import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../utils/CustomButton';
import Input from '../utils/Input';

function Profile({ navigation }) {
    const [email, setEmail] = useState('loanbui1982k1');
    const [username, setUsername] = useState('loanbui');
    const [password, setPassword] = useState('123456');
    return (
        <View style={styles.view}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.back}
                    >
                        <Ionicons name="chevron-back" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Trang cá nhân</Text>
                </View>
                <Image style={styles.image} source={require('../../assets/avatar.png')} resizeMode='contain'></Image>
                <Text style={styles.textUsername}>{username}</Text>
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

                </View>
                <View style={styles.button}>
                    <CustomButton
                        buttonStyles={{ backgroundColor: '#FF3A44', marginTop: 20, minWidth: '80%', }}
                        textStyles={{ color: 'white' }}
                        text={'Thay đổi mật khẩu'}
                    />
                    <CustomButton
                        buttonStyles={styles.logout}
                        textStyles={{ color: '#FF3A44' }}
                        text={'Đăng xuất'}
                        pos="left"
                        iconColor='#FF3A44'
                        iconName='logout'
                        iconSize={28}
                    />
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
        marginLeft: '15%',
        fontStyle: "italic",
        fontFamily: 'notoserif'
    },
    image: {
        marginBottom: '5%',
        marginTop: '5%',
        width: '100%'
    },
    textUsername: {
        color: '#041E2F',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-light',
        textAlign: 'center',
        marginBottom: '5%',
    },
    forget: {
        color: '#FF3A44',
        fontSize: 14,
        textAlign: 'right'
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logout: {
        backgroundColor: '#ffffff',
        marginTop: 20,
        minWidth: '80%',
        borderWidth: 2,
        borderColor: '#FF3A44'
    }
});
export default Profile;
