import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, useTheme, Text} from 'react-native-paper';
import Post from '../components/Post';
import {useRuntimeInfo} from '../providers/RuntimeInfoProvider';

export default Home = () => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);
  const rtInfo = useRuntimeInfo();

  return (
    <View style={styles.root}>
      <Text>HOME PAGE</Text>
      <Button onPress={rtInfo.reset}>clear</Button>
    </View>
  );
};

const useStyle = colors =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
