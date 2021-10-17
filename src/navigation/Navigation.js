import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { StyleSheet, View } from 'react-native';
import Home from "../pages/Home";
import { useTheme } from "../providers/ThemeProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RTIcon from "../components/RTIcon";
import { useRuntimeInfo } from "../providers/RuntimeInfoProvider";
import Welcome from "../pages/Welcome";
import Search from "../pages/Search";
import Post from "../pages/Post";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import SplashScreen from "./SplashScreen";

export default Navigation = () => {
  const theme = useTheme();
  const runtimeInfo = useRuntimeInfo();
  const styles = useStyle(theme.palette);

  const Tab = createMaterialBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const Icons = {
    Home: () => (<RTIcon source={require('../assets/icons8-cute-monster-24.png')} />),
    Search: () => (<RTIcon source={require('../assets/icons8-search-24.png')} />),
    Post: () => (<RTIcon source={require('../assets/icons8-add-24.png')} />),
    Profile: () => (<RTIcon source={require('../assets/icons8-user-24.png')} />),
    Settings: () => (<RTIcon source={require('../assets/icons8-settings-24.png')} />),
  }

  return (
    <NavigationContainer >
      {runtimeInfo.splashScreen &&
        <SplashScreen />
        || (!runtimeInfo.firstRun &&
          <Tab.Navigator initialRouteName="Home" labeled={false} barStyle={styles.barStyle}>
            <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: Icons.Home }} style={{ flex: 1 }} />
            <Tab.Screen name="Search" component={Search} options={{ tabBarIcon: Icons.Search }} />
            <Tab.Screen name="Post" component={Post} options={{ tabBarIcon: Icons.Post }} />
            <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: Icons.Profile }} />
            <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: Icons.Settings }} />
          </Tab.Navigator>
          ||
          <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
          </Stack.Navigator>)
      }
    </NavigationContainer>
  )
}

const useStyle = (palette) => StyleSheet.create({
  barStyle: {
    backgroundColor: palette.BACKGROUND,
    borderTopColor: '#4F4F4F',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
});