import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import About from "../components/profile/About";
import useProfile from "../hooks/useProfile";
import { errors } from "../api/constants";
import { useAuth } from "../providers/AuthProvider";
import LoadingModal from "../components/LoadingModal";

const Tab = createMaterialTopTabNavigator();

export default Profile = ({ username = "" }) => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);
  const { data, loading } = useProfile(username);
  const { setAuth } = useAuth();

  const Test = () => (<View style={{ backgroundColor: theme.colors.background, flex: 1 }}></View>);
  const PassProps = (component, props) => () => (component(props))

  if (loading) {
    return (<View style={styles.root}><LoadingModal enabled /></View>)
  } else if (data.resStatus === errors.NETWORK_ERROR) {
    return (
      <View style={styles.notAuthRoot}>
        <Text>
          An error occured.
        </Text>
        <Text>Check your network connection.</Text>
      </View>
    )
  } else if (data.resStatus === errors.ANONYMOUS) {
    return (
      <View style={styles.notAuthRoot}>
        <LoadingModal enabled={loading} />
        <Text>You're browsing anonymously</Text>
        <Button style={styles.signIn} onPress={() => { setAuth() }} mode="contained">Sign In</Button>
      </View>
    )
  }

  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: styles.barStyle, tabBarLabelStyle: styles.barLabelStyle }}>
      <Tab.Screen name="Posts" component={Test} />
      <Tab.Screen name="Comments" component={Test} />
      <Tab.Screen name="About" component={PassProps(About, { data: data })} />
    </Tab.Navigator>
  );
}

const useStyle = (colors) => StyleSheet.create({
  barStyle: {
    backgroundColor: colors.background,
    borderBottomColor: '#4F4F4F',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  barLabelStyle: {
    color: colors.text
  },
  notAuthRoot: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signIn: {
    margin: "2%"
  }
});