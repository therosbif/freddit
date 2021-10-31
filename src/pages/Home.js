import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {
  useTheme,
  Text,
  Card,
  Avatar,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import {getSubPostsListing} from '../api/posts';
import PostCard from '../components/home/PostCard';
import SubredditBanner from '../components/home/SubredditBanner';
import LoadingModal from '../components/LoadingModal';
import useListing from '../hooks/useListing';
import useSubredditInfo from '../hooks/useSubredditInfo';
import {useSubreddit} from '../providers/SubredditProvider';

export default Home = () => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);
  const [mode, setMode] = useState('Hot');
  const [subreddit, setSubreddit] = useSubreddit();
  const {data, getPrev, getNext, reload, loading} = useListing(
    getSubPostsListing,
    subreddit,
    mode.toLowerCase(),
    25,
  );
  const {data: subData, loading: subLoading} = useSubredditInfo(subreddit);

  useEffect(() => {
    reload();
    console.log('mode: ' + mode);
  }, [mode]);

  const renderPost = ({item, index}) => {
    if (item.kind.substring(0, 3) === 't3') {
      return <PostCard postData={item.data} key={index} />;
    }
  };

  const ModeSelector = () => {
    const modes = ['Best', 'Hot', 'New', 'Rising', 'Top'];

    return (
      <View style={styles.selector}>
        {modes.map((mode_text, index) => (
          <Text
            key={index}
            onPress={() => {
              setMode(mode_text);
            }}
            style={{
              ...styles.mode,
              backgroundColor: mode === mode_text ? '#88888888' : '#00000000',
            }}>
            {mode_text}
          </Text>
        ))}
      </View>
    );
  };

  const Header = () => {
    if (subLoading) {
      return <LoadingModal enabled={subLoading} />;
    }
    console.log(subreddit.substr(2) + ' subData: ' + JSON.stringify(subData));
    return (
      <View>
        {!subreddit || subreddit.length === 0 ? (
          <></>
        ) : subData.error ? (
          <Text>No subreddit data. {subData.error}</Text>
        ) : (
          <SubredditBanner data={subData} />
        )}
        <ModeSelector />
      </View>
    );
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
        ListHeaderComponent={() => <Header />}
        onEndReached={getNext}
        onEndReachedThreshold={2}
        onRefresh={reload}
        refreshing={loading}
        style={{...styles.root}}
      />
    </SafeAreaView>
  );
};

const useStyle = (colors) =>
  StyleSheet.create({
    root: {
      backgroundColor: colors.background,
    },
    selector: {
      backgroundColor: 'rgba(255, 255, 255, .12)',
      flexDirection: 'row',
      borderRadius: 50,
      borderColor: colors.background,
      borderWidth: 4,
      margin: 10,
      height: 45,
      width: '95%',
      alignSelf: 'flex-end',
      justifyContent: 'space-evenly',
    },
    mode: {
      flex: 1,
      justifyContent: 'center',
      borderRadius: 50,
      textAlign: 'center',
      textAlignVertical: 'center',
      height: '100%',
    },
  });
