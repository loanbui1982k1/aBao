import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../App';
import Text from '../components/Text';
import TextInput from '../components/TextInput';

const IconInput = (props) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <View style={[props.style, styles.view]}>
      <View style={styles.row}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name={props.icon} size={25} color={theme.selectedTextColor} />
        </View>
        <TextInput
          editable={props.editable === false ? false : true}
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor={theme.selectedTextColor + '60'}
          secureTextEntry={props.secureTextEntry ? true : false}
          style={[
            {
              ...styles.input,
              color: theme.selectedTextColor,
              borderBottomColor: theme.selectedTextColor + '60',
            },
            props.error && { borderBottomColor: theme.selectedActiveColor },
          ]}
          onChangeText={(value) => props.onChangeText(value)}
        />
      </View>
      {props.textError ? (
        <Text style={{ ...styles.textError, color: theme.selectedActiveColor }}>
          {props.textError}
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textError: {
    fontWeight: '500',
    marginLeft: '20%',
    marginVertical: 12,
  },
  row: {
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '75%',
    borderBottomWidth: 2,
    textAlign: 'left',
  },
  icon: {
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconInput;
