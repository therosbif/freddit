import React, { useState } from "react"
import { StyleSheet, View } from "react-native";
import { Button, Divider, useTheme } from "react-native-paper";
import Banner from "../../components/profile/Banner";

export default About = ({ data }) => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);
  const profilePic = data.subreddit.icon_img;
  const coverPic = data.subreddit.banner_img;
  const description = data.subreddit.public_description;
  const displayName = data.subreddit.display_name;

  return (
    <View style={styles.root}>
      <Banner
        icon_img={profilePic}
        banner_img={coverPic}
        description={description}
        display_name={displayName}
        public_description={description}
      />
    </View>
  )
}

const useStyle = (colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})