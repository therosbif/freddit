import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Divider, Text, Title } from "react-native-paper";
import { useState } from "react/cjs/react.development";

const desc = 'OUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU';

export default Banner = ({ coverSource, profileSource }) => {
  const [maxLines, setMaxLines] = useState(0);
  const [lines, setLines] = useState(2);

  return (
    <View style={styles.banner}>
      <Card.Cover
        resizeMode="contain"
        source={coverSource}
        style={styles.image}
      />
      <View>
        <View style={styles.description}>
          <Avatar.Image style={{ backgroundColor: 'gray', alignSelf: 'flex-start' }} source={profileSource} />
          <Title style={styles.title}>u/User</Title>
        </View>
        <Text
          numberOfLines={lines}
          onTextLayout={(e) => setMaxLines(e.nativeEvent.lines.length)}
          onPress={() => setLines((lines === maxLines) ? 2 : maxLines)}
          style={styles.descriptionText}
        >
          {desc}
        </Text>
        <Divider />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
  },
  image: {
    backgroundColor: 'gray',
    width: '100%',
  },
  description: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginTop: 10
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginLeft: 10
  },
  descriptionText: {
    margin: 10,
    fontSize: 12,
    fontWeight: '100',
  }
})