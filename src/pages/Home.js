import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import {getSubPostsListing} from '../api/posts';
import ModeSelector from '../components/home/ModeSelector';
import PostCard from '../components/home/PostCard';
import useListing from '../hooks/useListing';
import {useMode} from '../providers/ModeProvider';

export default Home = () => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);
  const {mode} = useMode();
  const {data, getPrev, getNext, reload, loading} = useListing(
    getSubPostsListing,
    'r/pics',
    // mode.toLowerCase(),
    10,
  );

  useEffect(() => {
    reload();
    console.log('mode: ' + mode);
  }, [mode]);

  const renderPost = ({item, index}) => {
    if (item.kind.substring(0, 3) === 't3') {
      return <PostCard postData={item?.data} key={index} />;
    }
  };

  if (data[0]?.error) {
    return (
      <View style={{...styles.root, flex: 1}}>
        <Text style={{textAlign: 'center'}}>Error: {data[0].error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{...styles.root}}>
      <FlatList
        data={data}
        renderItem={renderPost}
        ListHeaderComponent={() => <ModeSelector />}
        onEndReached={getNext}
        onEndReachedThreshold={2}
        onRefresh={reload}
        refreshing={loading}
      />
    </SafeAreaView>
  );
};

const useStyle = colors =>
  StyleSheet.create({
    root: {
      backgroundColor: colors.background,
    },
  });
