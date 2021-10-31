import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PostFeed from '../components/PostFeed';

const Stack = createNativeStackNavigator();
const PassProps = (props, component) => () => component(props);

export default Home = () => {
  return (
    <Stack.Navigator initialRouteName="BaseFeed" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BaseFeed" component={PostFeed} options={{
        animationTypeForReplace: 'push',
      }} />
      <Stack.Screen name="SubReddit" component={PostFeed} getId={({ params }) => params.subreddit} options={{
        animationTypeForReplace: 'push',
      }} />
    </Stack.Navigator>
  )
};