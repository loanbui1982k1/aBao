import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../App';
import Text, { ButtonText } from '../components/Text';

export default function CustomButton({ children, style, ...props }) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <TouchableOpacity {...props} style={{ backgroundColor: theme.selectedButtonColor, ...style }}>
      {children}
    </TouchableOpacity>
  );
}

// props.pos = 'left' or 'right' to pick position of icon

export function IconButton(props) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.selectedButtonColor, ...props.buttonStyles }]}
      onPress={props.onPress}
    >
      {props.pos === 'left' && (
        <MaterialCommunityIcons
          name={props.iconName}
          size={props.iconSize}
          color={props.iconColor || theme.selectedButtonTextColor}
        />
      )}
      <ButtonText
        style={{ ...styles.text, color: theme.selectedButtonTextColor, ...props.textStyles }}
        numberOfLines={1}
      >
        {props.text}
      </ButtonText>
      {props.pos === 'right' && (
        <MaterialCommunityIcons
          name={props.iconName}
          size={props.iconSize}
          color={props.iconColor || theme.selectedButtonTextColor}
        />
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
  },

  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: '10%',
    marginVertical: '6%',
  },
});
