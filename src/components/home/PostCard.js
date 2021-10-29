import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Avatar, Card, IconButton, Paragraph, Text, TouchableRipple } from "react-native-paper";
import useProfile from "../../hooks/useProfile";
import RTURL from "../../utils/RTUrl";
import StringFormatter from "../../utils/StringFormatter";

export default PostCard = ({ postData }) => {
  const { data, loading } = useProfile(postData.author);

  const Header = () => {
    if (loading) {
      return <ActivityIndicator size={24} animating={true} />
    }
    return (
      <TouchableRipple
        rippleColor="rgba(255, 255, 255, .32)"
        borderless={true}
        onPress={() => console.log("zefibze")}
        style={{ borderRadius: 50 }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Avatar.Image size={24} source={{ uri: RTURL.removeQueryParams(data.subreddit.icon_img) }} />
          <Text style={{ textAlignVertical: 'center', marginLeft: 5, fontSize: 12 }} numberOfLines={1}>
            {'u/' + data.subreddit.display_name.substr(2)}
          </Text>
        </View>
      </TouchableRipple>
    )
  }

  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Content>
        <Header />
      </Card.Content>
      <Card.Title
        title={postData.title}
        titleNumberOfLines={0}
      />
      <Card.Content>
        <Paragraph numberOfLines={3}>{postData.selftext}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="arrow-up-bold" color='red' />
        <Text>{StringFormatter.abbrevNumber(postData.ups)}</Text>
        <IconButton icon="arrow-down-bold" color='blue' />
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    margin: 5,
  }
})