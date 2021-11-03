import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, Button, useTheme, IconButton } from 'react-native-paper';

export default ImageViewer = ({ enabled = false, onDismiss, url }) => {
  const theme = useTheme();
  const styles = useStyle(theme);

  return (
    <Portal>
      <Modal visible={enabled} onDismiss={onDismiss} contentContainerStyle={styles.container}>
        <Image source={{ uri: url }} resizeMode="contain" style={{ width: "100%", height: "100%" }} />
      </Modal>
    </Portal>
  );
};

const useStyle = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignContent: "flex-end"
  }
})