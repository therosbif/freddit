import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import {useMode} from '../../providers/ModeProvider';

export default function ModeSelector() {
  const {mode, setMode} = useMode();
  const theme = useTheme();
  const styles = useStyle(theme.colors);
  const modes = ['Best', 'Hot', 'New', 'Random', 'Rising', 'Top'];

  return (
    <View style={styles.selector}>
      {modes.map((mode_text, index) => (
        <Text
          key={index}
          onPress={() => {
            setMode(mode_text);
          }}
          style={{
            ...styles.mode,
            backgroundColor: mode === mode_text ? '#88888888' : '#00000000',
          }}>
          {mode_text}
        </Text>
      ))}
    </View>
  );
}

const useStyle = colors =>
  StyleSheet.create({
    selector: {
      backgroundColor: 'rgba(255, 255, 255, .12)',
      flexDirection: 'row',
      borderRadius: 50,
      borderColor: colors.background,
      borderWidth: 4,
      margin: 10,
      height: 45,
      width: '95%',
      alignSelf: 'flex-end',
      justifyContent: 'space-evenly',
    },
    mode: {
      flex: 1,
      justifyContent: 'center',
      borderRadius: 50,
      textAlign: 'center',
      textAlignVertical: 'center',
      height: '100%',
    },
  });
