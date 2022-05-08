import { Animated } from "react-native";

export const CloudLeftMove = (RightMove, Left) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(RightMove, {
        toValue: Left,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(RightMove, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ])
  ).start();
};
export const CloudRightMove = (LeftMove, Right) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(LeftMove, {
        toValue: Right,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(LeftMove, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ])
  ).start();
};
export const ArrowDownMove = (ArrowMove) => {
  Animated.loop(
    Animated.timing(ArrowMove, {
      toValue: 10,
      duration: 1000,
      useNativeDriver: true,
    }),
    { iterations: 1000 }
  ).start();
};
export const sunAnimation = (anim) => {
  //회전
  //스케일
  Animated.loop(
    Animated.timing(anim, {
      toValue: 100,
      duration: 400,
      useNativeDriver: true,
    }),
    { iterations: 1000 }
  ).start();
};
export const sunScaleAnimation = (anim) => {
  //스케일
  Animated.loop(
    Animated.sequence([
      // increase size
      Animated.timing(anim.current, {
        toValue: 1.2,
        duration: 2000,
        useNativeDriver: false,
      }),
      // decrease size
      Animated.timing(anim.current, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ])
  ).start();
};
