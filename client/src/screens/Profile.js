import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../utils/CustomButton';
import Input from '../utils/Input';
import ImagePicker from 'react-native-image-crop-picker';
import Storage from '@react-native-firebase/storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { setEmailRedux, setProfilePhotoPathRedux } from '../redux/actions';
import { API_URL } from '../services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile({ navigation }) {
    const { username, profilePhotoPath, idUser, email } = useSelector((state) => state.taskReducer);
    const dispatch = useDispatch();
    const [password, setPassword] = useState('123456');
    const [image, setNewImage] = useState(profilePhotoPath);
    const [newName, setNewName] = useState('');
    const [isNewImage, setIsNewImage] = useState(false);



    const editProfilePicture = () => {
        ImagePicker.openPicker({
            width: 600,
            height: 600,
            cropping: true,
        })
            .then((newImage) => {
                // Delete image in Android/emulator
                RNFS.exists(image).then((exists) => {
                    if (exists) {
                        RNFS.unlink(image);
                    }
                });
                setNewImage(newImage.path);
                setIsNewImage(true);
            })
            .catch((error) => {
                if (error.code === 'E_PICKER_CANCELLED') {
                    return false;
                }
            });
    };

    const uploadImageFirebase = async () => {
        // save the image as username
        let filename = username;
        // let filename = image.substring(image.lastIndexOf('/') + 1);
        try {
            await Storage().ref(filename).putFile(image);
        } catch (e) {
            console.log(e);
        }
    };

    const submit = () => {
        let userInfo = { idUser: idUser };
        if (isNewImage) {
            uploadImageFirebase().then(() => {
                Storage()
                    .ref(username)
                    .getDownloadURL()
                    .then((url) => {
                        // Save to redux and Async Storage
                        dispatch(setProfilePhotoPathRedux(url));
                        AsyncStorage.mergeItem(
                            'user',
                            JSON.stringify({
                                profilePhotoPath: url,
                            })
                        );
                        // // POST data to server
                        userInfo['profilePhotoPath'] = url;
                        axios.post(`${API_URL}/users/update`, userInfo).then(() => { });
                        // Delete image in Android/emulator
                        RNFS.exists(image).then((exists) => {
                            if (exists) {
                                RNFS.unlink(image);
                            }
                        });
                    });
            });
        }
        Toast.show({
            type: 'successToast',
            text1: 'Thay đổi thành công',
            visibilityTime: 2000,
        });
    };

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
                <View style={styles.containerImage}>
                    <Image style={styles.image} source={{ uri: image }} resizeMode='contain'></Image>
                    <FontAwesome5
                        size={25}
                        color="#14D39A"
                        name="pencil-alt"
                        onPress={editProfilePicture}
                    />
                </View>
                {/* <Text style={styles.textUsername}>{username}</Text> */}
                <View style={styles.container}>
                    <Input
                        placeholder="Email"
                        icon="email-outline"
                        value={email}
                        onChangeText={(value) => {
                            dispatch(setEmailRedux(value));
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
                        text={'Thay đổi thông tin'}
                        onPressFunc={submit}
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
    containerImage: {
        flexDirection: "row",
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'flex-end',
        marginBottom: '5%',
        marginTop: '5%',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
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
