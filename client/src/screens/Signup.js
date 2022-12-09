import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { IconButton } from '../utils/CustomButton';
import IconInput from '../utils/Input';
import { API_URL } from '../services/constants';
import Text, { HeaderText } from '../components/Text';
import { ThemeContext } from '../App';

function Signup({ navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [errorCheckPass, setErrorCheckPass] = useState('');

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

  const validatePass = (value) => {
    if (!value) {
      setErrorPass('Trường này không được bỏ trống');
    } else if (value.length < 6) {
      setErrorPass('Mật khẩu quá ngắn(tối thiểu 6 kí tự)');
    } else if (value.length > 20) {
      setErrorPass('Mật khẩu quá dài');
    } else {
      setErrorPass('');
      return true;
    }
    return false;
  };

  const validateCheckPass = (value) => {
    if (!value) {
      setErrorCheckPass('Trường này không được bỏ trống');
    } else if (password !== value) {
      setErrorCheckPass('Mật khẩu xác nhận không trùng khớp');
    } else {
      setErrorCheckPass('');
      return true;
    }
    return false;
  };
  const submit = () => {
    setOnSubmit(true);
    const valid1 = validateEmail(email);
    const valid2 = validateName(username);
    const valid3 = validatePass(password);
    const valid4 = validateCheckPass(checkPass);
    if (valid1 && valid2 && valid3 && valid4) {
      axios
        .post(`${API_URL}/users/`, {
          username,
          email,
          password,
        })
        .then((res) => {
          if (res.data.error) {
            Toast.show({
              type: 'errorToast',
              text1: res.data.error,
              visibilityTime: 2000,
            });
            setErrorEmail(res.data.error);
          } else {
            Toast.show({
              type: 'successToast',
              text1: 'Đăng ký thành công',
              visibilityTime: 2000,
            });
            navigation.navigate('Login');
          }
        });
    }
  };
  return (
    <View style={{ ...styles.view, backgroundColor: theme.selectedBgColor }}>
      <ScrollView>
        <View style={styles.header}>
          <HeaderText>Đăng ký</HeaderText>
        </View>
        <Image
          style={styles.image}
          source={require('../../assets/logo.png')}
          resizeMode="contain"
        ></Image>
        <View style={styles.container}>
          <IconInput
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
          <IconInput
            placeholder="Tên người dùng"
            icon="account-outline"
            value={username}
            textError={errorName}
            error={errorName !== ''}
            onChangeText={(value) => {
              setUsername(value);
              if (onSubmit) validateName(value);
            }}
          />
          <IconInput
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
          <IconInput
            placeholder="Xác nhận mật khẩu"
            secureTextEntry
            icon="lock-outline"
            value={checkPass}
            textError={errorCheckPass}
            error={errorCheckPass !== ''}
            onChangeText={(value) => {
              setCheckPass(value);
              if (onSubmit) validateCheckPass(value);
            }}
          />
        </View>
        <View style={styles.button}>
          <IconButton buttonStyles={{ padding: 12 }} text={'Đăng ký'} onPress={submit} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.textFooter}>Bạn đã có tài khoản?</Text>
          <Text
            style={{ ...styles.navigation, color: theme.selectedActiveColor }}
            onPress={() => navigation.replace('Login')}
          >
            Đăng nhập
          </Text>
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
  image: {
    marginVertical: '5%',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  textFooter: {
    textAlign: 'center',
  },
  navigation: {
    textAlign: 'center',
    marginLeft: 5,
  },
});
export default Signup;
