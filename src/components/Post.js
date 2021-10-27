import React from 'react';
import {View, Text} from 'react-native-paper';

export default function Post({
  author,
  permalink,
  selftext,
  title,
  downs,
  ups,
  url,
}) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{author}</Text>
      <View>
        <Text>{selftext}</Text>
        <br />
      </View>
    </View>
  );
}
