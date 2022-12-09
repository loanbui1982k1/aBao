import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../components/Text';

function User({ navigation }) {
  return (
    <View style={styles.body}>
      <Text style={styles.text}>aBao</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    width: '80%',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
export default User;
