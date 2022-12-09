import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import CustomButton, { IconButton } from '../utils/CustomButton';
import IconInput from '../utils/Input';
import ImagePicker from 'react-native-image-crop-picker';
import Storage from '@react-native-firebase/storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmailRedux,
  setIdUserRedux,
  setProfilePhotoPathRedux,
  setUsernameRedux,
} from '../redux/actions';
import { API_URL } from '../services/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmModal from '../utils/ConfirmModal';
import { HeaderText } from '../components/Text';
import { ThemeContext } from '../App';

function Profile({ navigation }) {
  const { font, theme } = React.useContext(ThemeContext);
  const { username, profilePhotoPath, idUser, email } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('123456');
  const [image, setNewImage] = useState(profilePhotoPath);
  const [isNewImage, setIsNewImage] = useState(false);
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState(username);
  const [passNew, setPassNew] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [passCurrent, setPassCurrent] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorPassNew, setErrorPassNew] = useState('');
  const [errorCheckPass, setErrorCheckPass] = useState('');
  const [errorPassCurrent, setErrorPassCurrent] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const logOut = () => {
    setShowModal(false);
    dispatch(setEmailRedux(''));
    dispatch(setUsernameRedux(''));
    dispatch(setIdUserRedux(''));
    dispatch(setProfilePhotoPathRedux(''));
    AsyncStorage.clear();
    navigation.replace('Login');
  };
  const cancelLogOut = () => {
    setShowModal(false);
  };
  const validateName = (value) => {
    if (!value) {
      setErrorName('Trường này không được bỏ trống');
    } else if (value.length > 30) {
      setErrorName('Tên người dùng quá dài');
    } else {
      setErrorName('');
      return true;
    }
    return false;
  };

  const validatePassNew = (value) => {
    if (onSubmit) {
      validateCheckPass(checkPass, value);
      validatePassCurrent(passCurrent, value);
    }
    if (value && value.length < 6 && value.length > 0) {
      setErrorPassNew('Mật khẩu quá ngắn(tối thiểu 6 kí tự)');
    } else if (value && value.length > 20) {
      setErrorPassNew('Mật khẩu quá dài');
    } else {
      setErrorPassNew('');
      return true;
    }
    return false;
  };

  const validateCheckPass = (value, passNew) => {
    if (passNew && passNew !== value) {
      setErrorCheckPass('Mật khẩu xác nhận không trùng khớp');
    } else {
      setErrorCheckPass('');
      return true;
    }
    return false;
  };
  const validatePassCurrent = (value, passNew) => {
    if (passNew && !value) {
      setErrorPassCurrent('Trường này không được bỏ trống');
    } else if (passNew && value.length < 6) {
      setErrorPassCurrent('Mật khẩu quá ngắn(tối thiểu 6 kí tự)');
    } else if (passNew && value.length > 20) {
      setErrorPassCurrent('Mật khẩu quá dài');
    } else {
      setErrorPassCurrent('');
      return true;
    }
    return false;
  };

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
    let filename = username;
    try {
      await Storage().ref(filename).putFile(image);
    } catch (e) {
      console.log(e);
    }
  };

  const submit = () => {
    setOnSubmit(true);
    let userInfo = { idUser: idUser };
    let valid1 = validateName(name);
    let valid2 = validatePassNew(passNew);
    let valid3 = validateCheckPass(checkPass, passNew);
    let valid4 = validatePassCurrent(passCurrent, passNew);
    if (valid1 && valid2 && valid3 && valid4) {
      if (name !== username) {
        userInfo['username'] = name;
        axios.patch(`${API_URL}/users/update`, userInfo).then((res) => {
          dispatch(setUsernameRedux(name));
          AsyncStorage.mergeItem(
            'user',
            JSON.stringify({
              username: name,
            })
          );
        });
      }
      if (passNew !== '') {
        axios.patch(`${API_URL}/users/changePass`, { idUser, passCurrent, passNew }).then((res) => {
          if (res.data.error) {
            Toast.show({
              type: 'errorToast',
              text1: res.data.error,
              visibilityTime: 2000,
            });
          } else {
            setEdit(false);
            Toast.show({
              type: 'successToast',
              text1: 'Thay đổi thành công',
              visibilityTime: 2000,
            });
          }
        });
      } else {
        setEdit(false);
        Toast.show({
          type: 'successToast',
          text1: 'Thay đổi thành công',
          visibilityTime: 2000,
        });
      }
      if (isNewImage) {
        uploadImageFirebase().then(() => {
          Storage()
            .ref(username)
            .getDownloadURL()
            .then((url) => {
              userInfo['profilePhotoPath'] = url;
              axios.patch(`${API_URL}/users/update`, userInfo).then((res) => {
                dispatch(setProfilePhotoPathRedux(url));
                AsyncStorage.mergeItem(
                  'user',
                  JSON.stringify({
                    profilePhotoPath: url,
                  })
                );
              });
              RNFS.exists(image).then((exists) => {
                if (exists) {
                  RNFS.unlink(image);
                }
              });
            });
        });
      }
    }
  };

  return (
    <View style={{ ...styles.view, backgroundColor: theme.selectedBgColor }}>
      <ScrollView>
        {showModal ? (
          <ConfirmModal
            showModal={showModal}
            negativeFunc={logOut}
            cancelFunc={cancelLogOut}
            positiveFunc={cancelLogOut}
            header="Đăng xuất"
            message="Bạn có chắc chắn muốn đăng xuất khỏi thiết bị này?"
            negativeMessage="Đồng ý"
            positiveMessage="Ở lại"
          />
        ) : null}
        <View style={styles.header}>
          <HeaderText>Trang cá nhân</HeaderText>
        </View>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={{ uri: image }} resizeMode="contain"></Image>
          {edit && (
            <FontAwesome5
              size={font.fontSize + 8}
              color={theme.selectedButtonColor}
              name="pencil-alt"
              onPress={editProfilePicture}
            />
          )}
        </View>

        <View style={styles.container}>
          <IconInput placeholder="Email" icon="email-outline" value={email} editable={false} />
          <IconInput
            placeholder="Tên người dùng"
            icon="account-outline"
            editable={edit ? true : false}
            value={name}
            error={errorName !== ''}
            textError={errorName}
            onChangeText={(value) => {
              setName(value);
              if (onSubmit) validateName(value);
            }}
          />
          {!edit && (
            <IconInput icon="lock-outline" value={password} secureTextEntry editable={false} />
          )}
          {edit && (
            <View>
              <IconInput
                placeholder="Mật khẩu mới"
                secureTextEntry
                error={errorPassNew !== ''}
                textError={errorPassNew}
                icon="lock-outline"
                value={passNew}
                onChangeText={(value) => {
                  setPassNew(value);
                  if (onSubmit) {
                    validatePassNew(value);
                  }
                }}
              />
              <IconInput
                placeholder="Xác nhận mật khẩu mới"
                secureTextEntry
                error={errorCheckPass !== ''}
                textError={errorCheckPass}
                icon="lock-outline"
                value={checkPass}
                onChangeText={(value) => {
                  setCheckPass(value);
                  if (onSubmit) validateCheckPass(value, passNew);
                }}
              />
              <IconInput
                placeholder="Mật khẩu cũ"
                secureTextEntry
                icon="lock-outline"
                error={errorPassCurrent !== ''}
                textError={errorPassCurrent}
                value={passCurrent}
                onChangeText={(value) => {
                  setPassCurrent(value);
                  if (onSubmit) validatePassCurrent(value, passNew);
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.button}>
          <IconButton
            buttonStyles={{ marginTop: 20 }}
            text={edit ? 'Cập nhật' : 'Thay đổi thông tin'}
            onPress={() => {
              if (edit) {
                submit();
              } else setEdit(true);
            }}
          />
          <IconButton
            buttonStyles={{
              marginTop: 20,
              borderWidth: 2,
              borderColor: theme.selectedButtonColor,
              backgroundColor: theme.selectedBgColor,
            }}
            textStyles={{ color: theme.selectedButtonColor }}
            text={edit ? 'Hủy' : 'Đăng xuất'}
            onPress={() => {
              if (edit) {
                setName(username);
                setEdit(false);
              } else setShowModal(true);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImage: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'flex-end',
    marginBottom: '5%',
    marginTop: '5%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Profile;
