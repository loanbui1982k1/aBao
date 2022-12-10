import React from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../App';

export default function CustomView({ children, style, ...props }) {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View {...props} style={{ backgroundColor: theme.selectedBgColor, ...style }}>
      {children}
    </View>
  );
}
