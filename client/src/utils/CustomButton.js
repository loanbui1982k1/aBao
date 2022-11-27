import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

// props.pos = 'left' hoặc 'right' để chọn vị trí cho icon

export default function CustomButton(props) {
  return (
    <TouchableOpacity style={[styles.button, props.buttonStyles]} onPress={props.onPressFunc}>
      {props.pos === 'left' && (
        <MaterialCommunityIcons name={props.iconName} size={props.iconSize} color={props.iconColor} />
      )}
      <Text style={[styles.text, props.textStyles]} numberOfLines={1}>
        {props.text}
      </Text>
      {props.pos === 'right' && (
        <MaterialCommunityIcons name={props.iconName} size={props.iconSize} color={props.iconColor} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '50%',
    maxWidth: '100%'
  },

  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: '10%',
    marginVertical: '6%',
    fontFamily: 'sans-serif'
  },
});
