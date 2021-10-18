import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native";
import RTButton from "../components/core/RTButton";
import SignInModal from "../components/SignInModal";
import { useTheme } from "../providers/ThemeProvider";

export default Profile = () => {
  const theme = useTheme();
  const styles = useStyle(theme.palette);
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Welcome to Freddi(t)!</Text>
      <View style={styles.buttonContainer}>
        <RTButton
          style={styles.button}
          title="Browse anonymously"
          onPress={() => { console.log("pressed") }}
        />
        <RTButton
          style={styles.button}
          title="Sign in"
          onPress={() => setShowModal(true)}
        />
      </View>
      {showModal &&
        <SignInModal
          onClose={() => setShowModal(false)}
        />
      }
    </View>
  )
}

const useStyle = (palette) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: palette.TEXT,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    margin: "4%",
  }
})