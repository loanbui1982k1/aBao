import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from '../App';
import Text, { SectionHeaderText } from '../components/Text';
import { IconButton } from './CustomButton';

const ConfirmModal = (props) => {
  const { theme } = React.useContext(ThemeContext);
  const [showConfirmModal, setShowConfirmModal] = useState(props.showModal);

  return (
    <Modal
      visible={showConfirmModal}
      onRequestClose={() => setShowConfirmModal(false)}
      transparent={true}
      animationType="fade"
      hardwareAccelerated
    >
      <TouchableWithoutFeedback onPress={() => props.cancelFunc()}>
        <View
          style={{ ...styles.confirmContainer, backgroundColor: theme.selectedActiveColor + '50' }}
        >
          <View
            style={{
              ...styles.confirmModal,
              backgroundColor: theme.selectedBgColor,
              borderColor: theme.selectedActiveColor,
            }}
          >
            <View style={styles.confirmHeader}>
              <SectionHeaderText
                style={{
                  textAlign: 'center',
                }}
              >
                {props.header}
              </SectionHeaderText>
            </View>

            <View style={styles.confirmBody}>
              <Text>{props.message}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <IconButton
                text={props.negativeMessage}
                onPress={() => props.negativeFunc()}
                textStyles={{ fontWeight: 400 }}
              />
              <IconButton
                text={props.positiveMessage}
                onPress={() => props.positiveFunc()}
                textStyles={{ fontWeight: 400, color: theme.selectedButtonColor }}
                buttonStyles={{
                  borderWidth: 2,
                  borderColor: theme.selectedButtonColor,
                  backgroundColor: theme.selectedBgColor,
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  confirmContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmModal: {
    width: 320,
    borderRadius: 20,
    borderWidth: 1,
    padding: 4,
    paddingBottom: 20,
  },
  confirmHeader: {
    marginTop: 20,
    marginLeft: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  confirmBody: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ConfirmModal;
