import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import About from '../components/profile/About';
import useProfile from '../hooks/useProfile';
import {errors} from '../api/constants';
import LoadingModal from '../components/LoadingModal';
import {PostFeed} from '../components/PostFeed';

const Tab = createMaterialTopTabNavigator();

export default Profile = ({username = ''}) => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);
  const {data, loading} = useProfile(username);

  if (loading) {
    return (
      <View style={styles.root}>
        <LoadingModal enabled />
      </View>
    );
  } else if (data.resStatus === errors.NETWORK_ERROR) {
    return (
      <View style={styles.notAuthRoot}>
        <Text>An error occured.</Text>
        <Text>Check your network connection.</Text>
      </View>
    );
  }

  return <About data={data} />;
};

const useStyle = (colors) =>
  StyleSheet.create({
    barStyle: {
      backgroundColor: colors.background,
      borderBottomColor: '#4F4F4F',
      borderBottomWidth: 1,
      borderStyle: 'solid',
    },
    barLabelStyle: {
      color: colors.text,
    },
    notAuthRoot: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    signIn: {
      margin: '2%',
    },
  });
