import React from "react"
import { StyleSheet, View } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import { Button, useTheme, Text, Card, Avatar } from "react-native-paper";
import useMe from "../hooks/useMe";
import LoadingModal from "../components/LoadingModal";
import Banner from "../components/profile/Banner";

export default Profile = () => {
  const theme = useTheme();
  const { data, loading } = useMe();
  const { token, setAuth } = useAuth();
  const styles = useStyle(theme.colors);

  if (loading) {
    return (<View style={styles.root}><LoadingModal enabled /></View>)
  }

  return token
    ? (
      <View style={styles.root}>
        <Banner
          coverSource={require("../assets/jack.png")}
          profileSource={require("../assets/jack.png")}
        />
      </View>
    )
    : (
      <View style={styles.notAuthRoot}>
        <LoadingModal enabled={loading} />
        <Text>You're browsing anonymously</Text>
        <Button style={styles.signIn} onPress={() => { setAuth() }} mode="contained">Sign In</Button>
      </View>
    )
}

const useStyle = (colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
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
})