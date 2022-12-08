import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../App';

export const FONT_WEIGHT = {
  normal: 'Regular',
  bold: 'Bold',
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
};

export const disableStyles = {
  fontStyle: 'normal',
  fontWeight: 'normal',
};

export const FONT_FAMILY = ['Roboto', 'RobotoMono', 'NotoSerif', 'PlayfairDisplay'];
export const FONT_CONFIG = { fontSize: 14, lineHeight: 20, letterSpacing: 0 };

export default function ({ children, style, ...props }) {
  const { fontWeight = '400', fontStyle } = StyleSheet.flatten(style || {});
  const { theme, font } = React.useContext(ThemeContext);
  const retFont = `${font.fontFamily}-${FONT_WEIGHT[fontWeight]}${
    fontStyle === 'italic' ? 'Italic' : ''
  }`;

  return (
    <Text
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
    </Text>
  );
}
