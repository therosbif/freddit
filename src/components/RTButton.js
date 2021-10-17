import React, { useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text } from 'react-native';
import Easing from 'react-native/Libraries/Animated/Easing';
import { useTheme } from '../providers/ThemeProvider';

export default RTButton = ({ children, disabled = false, onPress, style, textStyle, title }) => {
  const theme = useTheme();
  const styles = useStyle(theme.palette, disabled);
  const minScale = 0.01;
  const minOpacity = 0.15;
  const scale = useRef(new Animated.Value(minScale)).current;
  const opacity = useRef(new Animated.Value(minOpacity)).current;
  const [buttonSize, setButtonSize] = useState([]);

  const Ripple = () => {

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: -(buttonSize[0] / 2) + (buttonSize[1] / 2),
          left: 0,
          width: buttonSize[0],
          height: buttonSize[0],
          borderRadius: buttonSize[0] / 2,
          transform: [{ scale: scale }],
          opacity: opacity,
          backgroundColor: 0xffffffff,
        }}
      />
    )
  }

  const onPressIn = () => {
    Animated.timing(opacity, {
      toValue: minOpacity,
      duration: 0,
      useNativeDriver: Platform.OS === 'android',
    }).start(() => Animated.timing(scale, {
      toValue: 1,
      duration: 125,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android',
    }).start());
  }

  const onPressOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: Platform.OS === 'android',
    }).start(() => Animated.timing(scale, {
      toValue: minScale,
      duration: 0,
      useNativeDriver: Platform.OS === 'android',
    }).start())
  }

  return (
    <>
      <Pressable
        disabled={false}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{ ...styles.button, ...style }}
        onLayout={(event) => {
          setButtonSize([event.nativeEvent.layout.width, event.nativeEvent.layout.height]);
        }}
      >
        {buttonSize.length !== 0 &&
          <>
            <Ripple />
            {children}
            {title && <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>}
          </>
        }
      </Pressable>
    </>
  )
}

const useStyle = (palette, disabled = false) => StyleSheet.create({
  button: {
    backgroundColor: disabled
      ? 0x8a230dff
      : palette.PRIMARY,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: "white",
    fontWeight: 'bold',
  }
});