import React from 'react';
import {Text} from 'react-native';
import {Avatar, Card, IconButton, Paragraph} from 'react-native-paper';

export default function SubredditBanner({data}) {
  return (
    <Card>
      <Card.Content>
        <Card.Cover resizeMode="cover" source={{uri: data.data.header_img}} />
      </Card.Content>
      <Card.Content>
        <Avatar.Image size={24} source={{uri: data.data.icon_img}} />
        <Card.Title title={data.data.title} titleNumberOfLines={0} />
      </Card.Content>
      <Card.Content>
        <Paragraph numberOfLines={3}>{data.data.public_description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="add_circle" color="blue" />
        <Text>Join</Text>
      </Card.Actions>
    </Card>
  );
}
