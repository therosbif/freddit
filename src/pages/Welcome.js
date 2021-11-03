import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAuth} from '../providers/AuthProvider';
import {useRuntimeInfo} from '../providers/RuntimeInfoProvider';
import {useTheme, Button, Title} from 'react-native-paper';

export default Welcome = () => {
  const theme = useTheme();
  const auth = useAuth();
  const runtimeInfo = useRuntimeInfo();
  const styles = useStyle(theme.colors);

  return (
    <View style={styles.root}>
      <Title size={30}>Welcome to Freddi(t)!</Title>
      <Button
        style={styles.button}
        onPress={() => {
          auth.setAuth().then(() => runtimeInfo.setFirstRun(false));
        }}
        mode="contained">
        Sign In
      </Button>
    </View>
  );
};

const useStyle = (colors) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: '10%',
    },
    button: {
      margin: '2%',
    },
    btext: {
      overflow: 'visible',
    },
  });
