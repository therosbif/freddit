import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PostFeed from '../components/PostFeed';

const Stack = createNativeStackNavigator();

export default Home = () => {
  return (
    <Stack.Navigator
      initialRouteName="BaseFeed"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="BaseFeed"
        component={PostFeed}
        options={{
          animationTypeForReplace: 'push',
        }}
      />
      <Stack.Screen
        name="SubReddit"
        component={PostFeed}
        options={{
          animationTypeForReplace: 'push',
        }}
      />
    </Stack.Navigator>
  );
};
