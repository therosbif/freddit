import React from 'react';
import {Modal, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default LoadingModal = ({enabled = false}) => {
  return enabled ? (
    <Modal transparent={true} animationType="fade" visible={enabled}>
      <View
        style={{
          backgroundColor: 0x00000055,
          flex: 1,
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  ) : (
    <></>
  );
};
