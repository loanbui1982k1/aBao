import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ThemeContext } from '../App';
import { disableStyles, FONT_WEIGHT } from './Text';

export default function ({ children, style, ...props }) {
  const { theme, font } = React.useContext(ThemeContext);
  const { fontWeight = '400', fontStyle } = StyleSheet.flatten(style || {});
  const retFont = `${font.fontFamily}-${FONT_WEIGHT[fontWeight]}${
    fontStyle === 'italic' ? 'Italic' : ''
  }`;

  return (
    <TextInput
      {...props}
      style={[
        {
          fontFamily: retFont,
          color: theme.selectedTextColor,
          fontSize: font.fontSize,
          lineHeight: font.lineHeight,
          letterSpacing: font.letterSpacing,
        },
        style,
        disableStyles,
      ]}
    >
      {children}
    </TextInput>
  );
}
