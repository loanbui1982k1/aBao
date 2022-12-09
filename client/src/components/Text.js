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
export const FONT_CONFIG = { fontSize: 14, lineHeight: 14, letterSpacing: 0 };

export default function CustomText({ children, style, ...props }) {
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

export function ButtonText({ children, style, ...props }) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <CustomText
      {...props}
      style={{
        color: theme.selectedButtonTextColor,
        ...style,
      }}
    >
      {children}
    </CustomText>
  );
}

export function HeaderText({ children, style, ...props }) {
  const { font, theme } = React.useContext(ThemeContext);
  return (
    <CustomText
      {...props}
      style={[
        {
          fontSize: font.fontSize + 12,
          lineHeight: font.lineHeight + 14,
          fontWeight: 'bold',
          fontStyle: 'italic',
          color: theme.selectedActiveColor,
        },
        style,
      ]}
    >
      {children}
    </CustomText>
  );
}

export function SectionHeaderText({ children, style, ...props }) {
  const { font } = React.useContext(ThemeContext);
  return (
    <CustomText
      {...props}
      style={[
        {
          fontSize: font.fontSize + 4,
          lineHeight: font.lineHeight + 8,
          fontWeight: 'bold',
        },
        style,
      ]}
    >
      {children}
    </CustomText>
  );
}
