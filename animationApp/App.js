// import React, { useRef } from "react";
// import { Animated, PanResponder } from "react-native";
// import styled from "styled-components/native";
//
// const Container = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;
// const Box = styled.View`
//   background-color: tomato;
//   width: 200px;
//   height: 200px;
// `;
// const AnimatedBox = Animated.createAnimatedComponent(Box);
//
// export default function App() {
//   const POSITION = useRef(
//     new Animated.ValueXY({
//       x: 0,
//       y: 0,
//     })
//   ).current;
//   const borderRadius = POSITION.y.interpolate({
//     inputRange: [-300, 300],
//     outputRange: [100, 0],
//   });
//   const bgColor = POSITION.y.interpolate({
//     inputRange: [-300, 300],
//     outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"],
//   });
//
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true, //터치를 감조디면 active true
//       onPanResponderGrant: () => {
//         console.log("Touch Started");
//         POSITION.setOffset({
//           x: POSITION.x._value,
//           y: POSITION.y._value,
//         });
//       },
//       onPanResponderMove: (_, { dx, dy }) => {
//         //손가락움직일동안 실행
//         console.log("TouchMoving");
//
//         POSITION.setValue({
//           x: dx,
//           y: dy,
//         });
//       },
//       onPanResponderRelease: () => {
//         console.log("touchEnd");
//         POSITION.flattenOffset();
//         //offset 0으로 만들고 해당 offset을 positiond 에게 전달
//
//         //손을 땟을때
//         // Animated.spring(POSITION, {
//         //   toValue: {
//         //     x: 0,
//         //     y: 0,
//         //   },
//         //   bounciness: 20,
//         //   useNativeDriver: false,
//         // }).start();
//         // POSITION.flattenOffset();
//       },
//     })
//   ).current;
//   return (
//     <Container>
//       <AnimatedBox
//         {...panResponder.panHandlers}
//         style={{
//           borderRadius,
//           backgroundColor: bgColor,
//           transform: POSITION.getTranslateTransform(),
//         }}
//       />
//     </Container>
//   );
// }
//--------------------------------------------------------------------------------------------

// card Project

// import React, { useRef, useState } from "react";
// import { Animated, PanResponder, Text, View } from "react-native";
// import styled from "styled-components/native";
// import { Ionicons } from "@expo/vector-icons";
// import icons from "./icons";
//
// export default function App() {
//
//   const scale = useRef(new Animated.Value(1)).current;
//   const position = useRef(new Animated.Value(0)).current;
//   const rotation = position.interpolate({
//     inputRange: [-250, 250],
//     outputRange: ["-15deg", "15deg"],
//     //input이 범위바깥으로 나갈경우 처리해주는 것
//     // extrapolate: "extend",   // 한개치를 넘어서하는거
//     // extrapolate: "identity", //먼가 이상하게 작동하는거
//     extrapolate: "clamp", // 한계치 이상안하는것
//   });
//   const secondScale = position.interpolate({
//     inputRange: [-300, 0, 300],
//     outputRange: [1, 0.7, 1],
//     extrapolate: "clamp",
//   });
//   const onPressOut = Animated.spring(scale, {
//     toValue: 1,
//     useNativeDriver: true,
//   });
//   const onPressIn = Animated.spring(scale, {
//     toValue: 0.95,
//     useNativeDriver: true,
//   });
//   const goCenter = Animated.spring(position, {
//     toValue: 0,
//     useNativeDriver: true,
//   });
//   const goLeft = Animated.spring(position, {
//     toValue: -500,
//     tension: 5, //움직을 느리게
//     useNativeDriver: true,
//     restDisplacementThreshold: 100, //스프링에대한 임계치
//     restSpeedThreshold: 100, //임계속도 이만큼이면 애니메이션이 끝난것으로 간주
//   });
//   const goRight = Animated.spring(position, {
//     toValue: 500,
//     tension: 5,
//     useNativeDriver: true,
//   });
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, { dx }) => {
//         position.setValue(dx);
//       },
//       onPanResponderGrant: () => onPressIn.start(),
//       onPanResponderRelease: (_, { dx }) => {
//         if (dx < -250) {
//           goLeft.start(onDismiss);
//         } else if (dx > 250) {
//           goRight.start(onDismiss);
//         } else {
//           Animated.parallel([onPressOut, goCenter]).start();
//         }
//       },
//     })
//   ).current;
//   // position.addListener(() => {
//   //   console.log(position, rotation);
//   // });
//
//   //  State
//   const [index, setIndex] = useState(0);
//   const onDismiss = () => {
//     scale.setValue(1);
//     position.setValue(0); //해당부분이없으면 바뀌지않는다
//     setIndex((prev) => prev + 1);
//   };
//
//   const closePress = () => {
//     goLeft.start(onDismiss);
//   };
//   const checkPress = () => {
//     goRight.start(onDismiss);
//   };
//   return (
//     <Container>
//       <CardContainer>
//         <Card style={{ transform: [{ scale: secondScale }] }}>
//           <Ionicons name={icons[index + 1]} color="#192a56" size={98} />
//         </Card>
//         <Card
//           {...panResponder.panHandlers} //이게 없으면 카드 터치를 못한다...
//           style={{
//             transform: [
//               { scale },
//               { translateX: position },
//               { rotateZ: rotation },
//             ],
//           }}
//         >
//           <Ionicons name={icons[index]} color="#192a56" size={98} />
//         </Card>
//       </CardContainer>
//       <BtnContainer>
//         <Btn onPress={closePress}>
//           <Ionicons name="close-circle" color="white" size={58} />
//         </Btn>
//         <Btn onPress={checkPress}>
//           <Ionicons name="checkmark-circle" color="white" size={58} />
//         </Btn>
//       </BtnContainer>
//     </Container>
//   );
// }
//
// const Container = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: #00a8ff;
// `;
//
// const Card = styled(Animated.createAnimatedComponent(View))`
//   background-color: white;
//   width: 300px;
//   height: 300px;
//   justify-content: center;
//   align-items: center;
//   border-radius: 12px;
//   box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
//   position: absolute;
// `;
//
// const Btn = styled.TouchableOpacity`
//   margin: 0px 10px;
// `;
//
// const BtnContainer = styled.View`
//   flex-direction: row;
//   flex: 1;
// `;
//
// const CardContainer = styled.View`
//   flex: 3;
//   justify-content: center;
//   align-items: center;
// `;
// -------------------------------------------------------------------------------------------
import React, { useEffect, useRef, useState } from "react";
import { Easing, Animated, PanResponder, Text, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import icons from "./icons";

const BLACK_COLOR = "#1e272e";
const GREY = "#485460";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;
const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  border-radius: 50px;
`;

const Word = styled.Text`
  font-size: 38px;
  font-weight: 500;
  color: ${(props) => props.color};
`;
const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
`;
export default function App() {
  //value
  const opacity = useRef(new Animated.Value(2)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goHome = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const scaleOne = position.y.interpolate({
    inputRange: [-300, -80],
    outputRange: [2, 1],
    extrapolate: "clamp", //최대 값 이상으로 안됨
  });
  const scaleTwo = position.y.interpolate({
    inputRange: [80, 300],
    outputRange: [1, 2],
    extrapolate: "clamp", //최대 값 이상으로 안됨
  });
  const onDropScale = Animated.timing(scale, {
    toValue: 0,
    easing: Easing.linear,
    duration: 100,
    useNativeDriver: true,
  });
  const onDropOpacity = Animated.timing(opacity, {
    toValue: 0,
    easing: Easing.linear,
    duration: 100,
    useNativeDriver: true,
  });
  //animation

  //pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, //손가락 이벤트를 감지 할것인가
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({ x: dx, y: dy });
        //  setValue= 곧장
        //  animated는 천천히
      },
      onPanResponderGrant: () => {
        //손가락움직이면 이걸 실행
        onPressIn.start();
        // Animated.spring(scale, {
        //   toValue: 0.9,
        //   useNativeDriver: true,
        // }).start();
      },
      //
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -250 || dy > 250) {
          Animated.sequence([
            Animated.parallel([onDropScale, onDropOpacity]),
            Animated.timing(position, {
              toValue: 0,
              useNativeDriver: true,
              duration: 100,
              easing: Easing.linear,
            }),
          ]).start(nextIcon);
          //--------
          // Animated.timing(opacity, {
          //   toValue: 0,
          //   easing: Easing.linear,
          //   duration: 300,
          //   useNativeDriver: true,
          // }).start();
          // onDrop.start();
          // -------
          // Animated.timing(position, {
          //   toValue: 0, //x 0 y 0
          // }).start();
          //
          // position.setValue({ x: 0, y: 0 });
          //  drop
        } else {
          Animated.parallel([onPressOut, goHome]).start(); //함수 2개 한번에 실행 sequense는 순서대로 실행
        }
        // Animated.spring(scale, {
        //   toValue: 1,
        //   useNativeDriver: true,s
        // }).start();
      },
    })
  ).current;
  //state
  const [index, setIndex] = useState(0);
  const nextIcon = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.spring(opacity, { toValue: 1, useNativeDriver: true }),
    ]).start();
    setIndex((prev) => prev + 1);
  };
  return (
    <Container>
      <Edge>
        <WordContainer style={{ transform: [{ scale: scaleOne }] }}>
          <Word color={GREEN}>알어</Word>
        </WordContainer>
      </Edge>
      <Center>
        <IconCard
          {...panResponder.panHandlers}
          style={{
            opacity,
            transform: [...position.getTranslateTransform(), { scale }],
          }}
        >
          <Ionicons name={icons[index]} color={GREY} size={66} />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer style={{ transform: [{ scale: scaleTwo }] }}>
          <Word color={RED}>알어</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
}
