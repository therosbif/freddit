import React, {useState} from 'react';
import {Modal, Platform, StyleSheet, ToastAndroid, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import WebView from 'react-native-webview';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Button, useTheme, Text} from 'react-native-paper';

export default RTWebView = ({onClose, onLoad, source}) => {
  const theme = useTheme();
  const [uri, setUri] = useState(source.uri);

  const Header = () => {
    const styles = useStyle(theme.colors);

    return (
      <View style={styles.container}>
        <Pressable
          style={styles.textContainer}
          onPress={() => {
            Clipboard.setString(uri);
            if (Platform.OS === 'android') {
              ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
            } else {
              alert('Copied to clipboard');
            }
          }}>
          <Text numberOfLines={1} style={styles.text}>
            {uri}
          </Text>
        </Pressable>
        <Button title="Close" onPress={onClose} style={styles.button} />
      </View>
    );
  };

  return (
    <Modal animationType="slide">
      <Header />
      <WebView
        source={{uri: uri}}
        onLoad={onLoad}
        onLoadProgress={(syntheticEvent) => {
          const {nativeEvent} = syntheticEvent;

          setUri(nativeEvent.url);
        }}
        autoManageStatusBarEnabled={true}
        forceDarkOn={theme.darkMode}
      />
    </Modal>
  );
};

const useStyle = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      backgroundColor: colors.background,
    },
    button: {
      borderRadius: 0,
    },
    textContainer: {
      flex: 1,
      overflow: 'hidden',
      backgroundColor: 0xffffff55,
      margin: 2,
      borderRadius: 10,
      paddingHorizontal: 5,
      justifyContent: 'center',
    },
    text: {
      overflow: 'hidden',
    },
  });
