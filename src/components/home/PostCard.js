import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Card,
  IconButton,
  Paragraph,
  Text,
  TouchableRipple,
  Image,
} from 'react-native-paper';
import useProfile from '../../hooks/useProfile';
import useSubredditInfo from '../../hooks/useSubredditInfo';
import RTURL from '../../utils/RTUrl';
import StringFormatter from '../../utils/StringFormatter';

export default PostCard = ({ postData }) => {
  const { data: profileData, loading: profileLoading } = useProfile(postData?.author);
  const { data: subData, loading: subLoading } = useSubredditInfo(postData?.subreddit);

  if (!postData) {
    return <Text>post undefined</Text>;
  }

  const Header = () => {
    if (profileLoading || subLoading) {
      return <ActivityIndicator size={24} animating={true} />;
    }
    console.log('subData: ' + JSON.stringify(subData));
    console.log('profileData: ' + JSON.stringify(profileData));
    if (!profileData) {
      return <Text>No profile data.</Text>
    } else if (!subData) {
      return <Text>No subreddit data.</Text>
    }
    return (
      <TouchableRipple
        rippleColor="rgba(255, 255, 255, .32)"
        borderless={true}
        onPress={() => console.log('zefibze')}
        style={{ borderRadius: 50 }}>
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Avatar.Image
              size={24}
              source={{
                uri: RTURL.removeQueryParams(profileData.subreddit.icon_img),
              }}
            />
            <Text
              style={{ textAlignVertical: 'center', marginLeft: 5, fontSize: 12 }}
              numberOfLines={1}>
              u/{profileData.subreddit.display_name.substr(2)}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {/* <Avatar.Image
            size={24}
            source={{uri: RTURL.removeQueryParams(subData)}}
          /> */}
            <Text
              style={{ textAlignVertical: 'center', marginLeft: 5, fontSize: 12 }}
              numberOfLines={1}>
              r/{postData.subreddit}
            </Text>
          </View>
        </>
      </TouchableRipple>
    );
  };

  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Content>
        <Header />
      </Card.Content>
      <Card.Title title={postData.title} titleNumberOfLines={0} />
      <Card.Content>
        <Paragraph numberOfLines={3}>{postData.selftext}</Paragraph>
      </Card.Content>
      {/.*\.(jpg|gif|png)$/.test(postData.url) &&
        <Card.Cover resizeMode='cover' source={{ uri: postData.url }} />
      }
      <Card.Actions>
        <IconButton icon="arrow-up-bold" color="red" />
        <Text>{StringFormatter.abbrevNumber(postData.ups)}</Text>
        <IconButton icon="arrow-down-bold" color="blue" />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    margin: 5,
  },
});
