import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, useTheme, Text} from 'react-native-paper';
import {getPostsListing} from '../api/subreddits';
import PostCard from '../components/home/PostCard';
import LoadingModal from '../components/LoadingModal';
import useListing from '../hooks/useListing';
import {useAuth} from '../providers/AuthProvider';
import {useRuntimeInfo} from '../providers/RuntimeInfoProvider';

export default Home = () => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);
  const rtInfo = useRuntimeInfo();
  const {refreshAccessToken} = useAuth();
  const {data, getPrev, getNext, loading} = useListing(
    getPostsListing,
    'r/darkjokes',
    1,
  );

  useEffect(() => {
    refreshAccessToken();
  }, []);

  if (data[0]?.error) {
    return (
      <View style={{...styles.root, flex: 1}}>
        <Text>{data[0].error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{...styles.root}}>
      <LoadingModal enabled={loading} />
      {data.map((child, index) => (
        <PostCard postData={child.data} key={index} />
      ))}
      <Button
        onPress={() => {
          getNext();
        }}>
        next
      </Button>
    </ScrollView>
  );
};

const useStyle = colors =>
  StyleSheet.create({
    root: {
      backgroundColor: colors.background,
    },
  });
