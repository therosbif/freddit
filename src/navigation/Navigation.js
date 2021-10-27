import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { StyleSheet } from 'react-native';
import Home from "../pages/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRuntimeInfo } from "../providers/RuntimeInfoProvider";
import Welcome from "../pages/Welcome";
import Search from "../pages/Search";
import Post from "../pages/Post";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import SplashScreen from "./SplashScreen";
import { useTheme } from "react-native-paper";
import LoadingModal from "../components/LoadingModal";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default Navigation = () => {
  const { colors } = useTheme();
  const { loading, splashScreen, firstRun } = useRuntimeInfo();
  const styles = useStyle(colors);

  return (
    <NavigationContainer >
      <LoadingModal enabled={loading} />
      {splashScreen &&
        <SplashScreen />
        || (!firstRun &&
          <Tab.Navigator initialRouteName="Home" labeled={false} barStyle={styles.barStyle}>
            <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: "home" }} />
            <Tab.Screen name="Search" component={Search} options={{ tabBarIcon: "magnify" }} />
            <Tab.Screen name="Post" component={Post} options={{ tabBarIcon: "plus" }} />
            <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: "account" }} />
            <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: "cog" }} />
          </Tab.Navigator>
          ||
          <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
          </Stack.Navigator>)
      }
    </NavigationContainer>
  )
}

const useStyle = (colors) => StyleSheet.create({
  barStyle: {
    backgroundColor: colors.background,
    borderTopColor: '#4F4F4F',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
});