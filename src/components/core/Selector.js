import React, {useEffect, useState} from 'react';
import {FlatList, Modal, View} from 'react-native';
import {
  Button,
  Menu,
  Searchbar,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';

export default Selector = ({values, baseValue, setter, type = 'menu'}) => {
  const theme = useTheme();
  const [value, setValue] = useState(baseValue);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (type === 'menu') {
      setter(value);
    }
  }, [value]);

  return type === 'menu' ? (
    <View style={{justifyContent: 'center'}}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            onPress={() => setVisible(!visible)}
            icon="menu-down"
            labelStyle={{color: theme.colors.text}}>
            {baseValue}
          </Button>
        }>
        {values.map((v, index) => (
          <Menu.Item
            key={index}
            title={v}
            onPress={() => {
              setValue(v);
              setVisible(false);
            }}
          />
        ))}
      </Menu>
    </View>
  ) : (
    <>
      <Button
        onPress={() => setVisible(!visible)}
        icon="menu-down"
        labelStyle={{color: theme.colors.text}}>
        {value}
      </Button>
      <Modal
        animationType="slide"
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{backgroundColor: theme.colors.background}}>
        <>
          <Surface style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              theme={{...theme, roundness: 0}}
              style={{flex: 1}}
              labelStyle={{color: theme.colors.text}}
              onPress={() => setVisible(false)}>
              cancel
            </Button>
            <Button
              theme={{...theme, roundness: 0}}
              style={{flex: 1}}
              labelStyle={{color: theme.colors.text}}
              onPress={() => {
                setter(value);
                setVisible(false);
              }}>
              apply
            </Button>
          </Surface>
          <FlatList
            style={{backgroundColor: theme.colors.background, height: '10%'}}
            data={values}
            renderItem={({item, index}) => (
              <Button
                key={index}
                theme={{...theme, roundness: 0}}
                onPress={() => {
                  setValue(item);
                }}
                labelStyle={value === item ? {color: theme.colors.text} : {}}>
                {item}
              </Button>
            )}
          />
        </>
      </Modal>
    </>
  );
};
