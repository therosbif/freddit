import React from 'react';
import { StyleSheet } from 'react-native';
import {View, Text, Image, useTheme} from 'react-native-paper';

export default function Post({data}) {
  const theme = useTheme();
  const styles = useStyle(theme.colors);

  return (
    <View style={styles.card}>
      <View style={styles.infoView}>
        <Text style={styles.infoText}>{data.title}</Text>
        <Text style={styles.subText}>{data.author}</Text>
        <Text style={styles.subText}>{data.subreddit}</Text>
      </View>
      <View>
        <Text>{data.selftext}</Text>
        <br />
      </View>
    </View>
  );
}

const useStyle = colors =>
  StyleSheet.create({
    card: {
      height: 150,
      borderWidth: 1,
      borderColor: colors.foreground,
      flexDirection: 'row',
    },
    thumbnail: {
      height: 100,
      width: 100,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      flex: 1,
    },
    infoView: {
      flexDirection: 'column',
      flex: 3,
    },
    infoText: {
      paddingTop: 30,
      paddingLeft: 10,
      paddingRight: 10,
      flexWrap: 'wrap',
    },
    subText: {
      paddingLeft: 20,
      paddingTop: 10,
      fontSize: 13,
      color: 'gray',
    },
  });
