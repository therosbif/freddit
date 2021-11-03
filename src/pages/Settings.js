import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react"
import { Platform, StyleSheet, ToastAndroid, View } from "react-native";
import { useTheme, Button, List, Surface } from "react-native-paper";
import LoadingModal from "../components/LoadingModal";
import CountryCodeSelector from "../components/settings/CountryCodeSelector";
import PMSelector from "../components/settings/PMSelector";
import SwitchSetting from "../components/settings/SwitchSetting";
import useSettings from "../hooks/useSettings";
import { useAuth } from "../providers/AuthProvider";

export default Settings = () => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);
  const { logout } = useAuth();
  const nav = useNavigation();
  const { loading: settingsLoading, data, patch } = useSettings();
  const [modData, setModData] = useState(null);
  const [loading, setLoading] = useState(settingsLoading);

  useEffect(() => {
    setLoading(settingsLoading);
  }, [settingsLoading]);

  useEffect(() => {
    console.log(modData);
  }, [modData])

  return (
    <View style={styles.root}>
      {(loading && <LoadingModal enabled={true} />) || (
        <>
          <List.Section style={{ flex: 1, width: '100%' }}>
            <List.Item
              title="Accepts private messages"
              titleNumberOfLines={0}
              left={() => <List.Icon icon="message" />}
              right={() => (
                <PMSelector
                  baseValue={data.accept_pms}
                  setter={(v) => setModData({ ...modData, accept_pms: v })}
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
                  setter={(v) => setModData({ ...modData, country_code: v })}
                />
              )}
            />
            <List.Item
              title="Log out"
              left={() => <List.Icon icon="logout-variant" />}
              onPress={logout}
            />
            <List.Item
              title="Relevant ads"
              titleNumberOfLines={0}
              left={() => <List.Icon icon="chart-donut" />}
              right={() => <SwitchSetting baseValue={data.activity_relevant_ads} setter={(v) => setModData({ ...modData, activity_relevant_ads: v })} />}
            />
            <List.Item title="Log out" left={() => <List.Icon icon="logout-variant" />} onPress={logout} />
          </List.Section >

          <Surface style={{ width: "100%" }}>
            <Button
              disabled={!modData}
              onPress={() => {
                patch(modData).then((res) => {
                  if (!res.ok || res.status !== 200) {
                    (Platform.OS === "android")
                      ? ToastAndroid.show("An error occured", ToastAndroid.SHORT)
                      : alert("An error occured");
                  }
                  setModData(null);
                })
              }}>save</Button>
          </Surface>
        </>
      )}
    </View >
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
