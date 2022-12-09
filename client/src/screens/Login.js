import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import CustomButton from '../utils/CustomButton';
import Input from '../utils/Input';
import { API_URL } from '../services/constants';
import { setEmailRedux, setIdUserRedux, setProfilePhotoPathRedux, setUsernameRedux } from '../redux/actions';
import Profile from './Profile';

function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [onSubmit, setOnSubmit] = useState(false);
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPass, setErrorPass] = useState('');

    const dispatch = useDispatch();

    const validateEmail = (value) => {
        if (!value) {
            setErrorEmail('Trường này không được bỏ trống');
        } else {
            const check = value
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            if (check) {
                setErrorEmail('');
                return true;
            } else setErrorEmail('Email không hợp lệ');
        }

        return false;
    };

    const validatePass = (value) => {
        if (!value) {
            setErrorPass('Trường này không được bỏ trống');
        } else {
            setErrorPass('');
            return true;
        }
        return false;
    };

    const submit = () => {
        setOnSubmit(true);
        const valid1 = validateEmail(email);
        const valid2 = validatePass(password);
        if (valid1 && valid2) {
            axios
                .post(`${API_URL}/users/login`, { email, password })
                .then((res) => {
                    if (res.data.error) {
                        Toast.show({
                            type: 'errorToast',
                            text1: res.data.error,
                            visibilityTime: 2000,
                        });
                        //   setErrorText(true);
                    } else {
                        Toast.show({
                            type: 'successToast',
                            text1: 'Đăng nhập thành công',
                            visibilityTime: 2000,
                        });
                        dispatch(setEmailRedux(email));
                        dispatch(setUsernameRedux(res.data.username));
                        dispatch(setIdUserRedux(res.data.idUser));
                        dispatch(setProfilePhotoPathRedux(res.data.profile_photo_path));
                        // Save to Async Storage
                        AsyncStorage.setItem(
                            'user',
                            JSON.stringify({
                                idUser: res.data.idUser,
                                email: res.data.email,
                                username: res.data.username,
                                profilePhotoPath: res.data.profile_photo_path
                            })
                        ).then(() => {
                            navigation.replace("Profile")
                        });
                    }
                });
        }

    };
    return (
        <View style={styles.view}>
            <ScrollView>
                <View style={styles.header}>
                    {/* <TouchableOpacity
                        style={styles.back}
                    >
                        <Ionicons name="chevron-back" size={25} color="black" />
                    </TouchableOpacity> */}
                    <Text style={styles.textHeader}>Đăng nhập</Text>
                </View>
                <Image style={styles.image} source={require('../../assets/logo.png')} resizeMode='contain'></Image>
                <View style={styles.container}>
                    <Input
                        placeholder="Email"
                        icon="email-outline"
                        value={email}
                        textError={errorEmail}
                        error={errorEmail !== ''}
                        onChangeText={(value) => {
                            setEmail(value);
                            if (onSubmit) validateEmail(value);
                        }}
                    />
                    <Input
                        placeholder="Mật khẩu"
                        secureTextEntry
                        icon="lock-outline"
                        value={password}
                        textError={errorPass}
                        error={errorPass !== ''}
                        onChangeText={(value) => {
                            setPassword(value);
                            if (onSubmit) validatePass(value);
                        }}
                    />
                    <TouchableOpacity >
                        <Text style={styles.forget} >Quên mật khẩu</Text>
                    </TouchableOpacity>


                </View>
                <View style={styles.button}>
                    <CustomButton
                        buttonStyles={{ backgroundColor: '#FF3A44', marginTop: 20 }}
                        textStyles={{ color: 'white' }}
                        text={'Đăng nhập'}
                        onPressFunc={submit}
                    />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.textFooter}>Bạn chưa có tài khoản?</Text>
                    <Text style={styles.navigation} onPress={() => navigation.replace("Signup")}>Đăng ký</Text>
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
        marginLeft: 'auto',
        marginRight: 'auto',
        fontStyle: "italic"
    },
    image: {
        marginBottom: '20%',
        marginTop: '20%',
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

export default Login;
