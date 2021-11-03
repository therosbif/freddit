import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, Button, List} from 'react-native-paper';
import LoadingModal from '../components/LoadingModal';
import CountryCodeSelector from '../components/settings/CountryCodeSelector';
import PMSelector from '../components/settings/PMSelector';
import useSettings from '../hooks/useSettings';
import {useAuth} from '../providers/AuthProvider';

export default Settings = () => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);
  const {logout} = useAuth();
  const nav = useNavigation();
  const {loading: settingsLoading, data} = useSettings();
  const [modData, setModData] = useState(null);
  const [loading, setLoading] = useState(settingsLoading);

  useEffect(() => {
    setLoading(settingsLoading);
  }, [settingsLoading]);

  return (
    <View style={styles.root}>
      {(loading && <LoadingModal enabled={true} />) || (
        <List.Section style={{flex: 1, width: '100%'}}>
          <List.Item
            title="Accepts private messages"
            titleNumberOfLines={0}
            left={() => <List.Icon icon="message" />}
            right={() => (
              <PMSelector
                baseValue={data.accept_pms}
                setter={(v) => setModData({...modData, accept_pms: v})}
              />
            )}
          />
          <List.Item
            title="Country code"
            titleNumberOfLines={0}
            left={() => <List.Icon icon="earth" />}
            right={() => (
              <CountryCodeSelector
                baseValue={data.country_code}
                setter={(v) => setModData({...modData, country_code: v})}
              />
            )}
          />
          <List.Item
            title="Log out"
            left={() => <List.Icon icon="logout-variant" />}
            onPress={logout}
          />
        </List.Section>
      )}
    </View>
  );
};

const useStyle = (colors) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
