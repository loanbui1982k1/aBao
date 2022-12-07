import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';

const ConfirmModal = (props) => {
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
        <View style={styles.confirmContainer}>
          <View style={styles.confirmModal}>
            <View style={styles.confirmHeader}>
              <Text style={styles.headerText}>{props.header}</Text>
            </View>

            <View style={styles.confirmBody}>
              <Text style={{ color: "#000000" }}>{props.message}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                onPress={() => props.negativeFunc()}
                style={styles.negativeButton}
                android_ripple={{ color: '#fff' }}
              >
                <Text style={styles.buttonText}>{props.negativeMessage}</Text>
              </Pressable>

              <Pressable
                onPress={() => props.positiveFunc()}
                style={styles.normalButton}
                android_ripple={{ color: '#fff' }}
              >
                <Text style={styles.buttonText}>{props.positiveMessage}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  confirmContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  confirmModal: {
    backgroundColor: '#fff',
    width: 320,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  confirmHeader: {
    marginTop: 20,
    marginLeft: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#000000'
  },
  confirmBody: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  negativeButton: {
    backgroundColor: '#f5425d',
    borderRadius: 20,
    padding: 10,
    width: '40%',
  },
  normalButton: {
    backgroundColor: '#627D98',
    borderRadius: 20,
    padding: 10,
    width: '40%',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
});

export default ConfirmModal;
