import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Text, Title} from 'react-native-paper';
import RTURL from '../../utils/RTUrl';

export default Banner = ({
  display_name,
  banner_img,
  icon_img,
  public_description,
}) => {
  const [maxLines, setMaxLines] = useState(0);
  const [lines, setLines] = useState(2);

  const username = 'u/' + display_name.substr(2);
  const bannerImg = RTURL.removeQueryParams(banner_img);
  const iconImg = RTURL.removeQueryParams(icon_img);
  const description = public_description;

  const styles = useStyle();

  return (
    <View style={styles.banner}>
      <Card.Cover
        resizeMode="cover"
        source={{uri: bannerImg}}
        style={styles.image}
      />
      <>
        <View style={styles.description}>
          <Avatar.Image
            style={{backgroundColor: 'gray', alignSelf: 'flex-start'}}
            source={{uri: iconImg}}
          />
          <Title style={styles.title}>{username}</Title>
        </View>
        <Text
          numberOfLines={lines}
          onTextLayout={(e) => setMaxLines(e.nativeEvent.lines.length)}
          onPress={() => setLines(lines === maxLines ? 2 : maxLines)}
          style={styles.descriptionText}>
          {description}
        </Text>
      </>
    </View>
  );
};

const useStyle = () =>
  StyleSheet.create({
    banner: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: '#00000000',
    },
    image: {
      backgroundColor: 'gray',
      width: '100%',
    },
    description: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      marginTop: 10,
    },
    title: {
      fontWeight: 'bold',
      alignSelf: 'flex-end',
      marginLeft: 10,
    },
    descriptionText: {
      margin: 10,
      fontSize: 12,
      fontWeight: '100',
    },
  });
