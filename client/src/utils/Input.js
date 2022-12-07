import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-gesture-handler';

const Input = (props) => {
  return (
    <View style={[props.style, styles.view]}>
      <View style={styles.row}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name={props.icon} size={25} color={'#FF3A44'} />
        </View>
        <TextInput
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor="#7E7E7E"
          secureTextEntry={props.secureTextEntry ? true : false}
          style={[styles.input, props.error && styles.inputError]}
          onChangeText={(value) => props.onChangeText(value)}
        />
      </View>
      <Text style={styles.textError}>{props.textError}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginBottom: 5,
  },
  textError: {
    color: '#FF3A44',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: '20%',
    marginTop: 15
  },
  row: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '75%',
    height: 50,
    borderBottomColor: '#F0F1FA',
    borderBottomWidth: 2,
    marginTop: 10,
    fontSize: 20,
    textAlign: 'left',
    color: '#000000',
    fontSize: 18
  },
  inputError: {
    borderBottomColor: 'red'
  },
  icon: {
    marginTop: 10,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconError: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    borderLeftWidth: 2,
    borderLeftColor: 'red',
    borderTopWidth: 2,
    borderTopColor: 'red',
  },
});

export default Input;
