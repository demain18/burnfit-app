import { View, StyleSheet, Dimensions } from "react-native";
import { fullYearDates } from "@/hooks/fullYearDates";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useAnimatedReaction, // ✅ 추가: useAnimatedReaction 불러오기
  runOnJS, // ✅ 추가: runOnJS 불러오기
} from "react-native-reanimated";
import Date from "@/components/atoms/Date";
import useBasicStore from "@/hooks/basicStore";
import { ScrollView } from "react-native-gesture-handler";

export interface Props {
  calendarHeight: any;
  minHeight: number;
  maxHeight: number;
}

export default function CalendarDates({
  calendarHeight,
  minHeight,
  maxHeight,
  ...rest
}: Props) {
  const { currentMonth, activeDateLine, hideWeeks, setMonth, setHideWeeks } =
    useBasicStore();
  const deviceWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef<Animated.ScrollView | null>(null);
  const slickScrollViewRef = useRef<Animated.ScrollView | null>(null);

  // CalenderHeader버튼 클릭시 zustand state를 감지하여 페이징 실행
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentMonth * deviceWidth,
        animated: true,
      });
    }
  }, [currentMonth]);

  // 막대형 캘린더 적합한 위치로 이동 실행
  useEffect(() => {
    if (slickScrollViewRef.current) {
      slickScrollViewRef.current.scrollTo({
        x: activeDateLine * deviceWidth,
        animated: false,
      });
    }
  }, [hideWeeks]);

  // 스크롤로 좌우 움직일시 페이징 실행
  const setCurrentMonth = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentMonthIndex = Math.round(offsetX / deviceWidth);
    setMonth(currentMonthIndex);
  };

  // 캘린더 높이를 조절하는 애니메이션
  const animatedContainer = useAnimatedStyle(() => {
    return {
      height: calendarHeight.value,
    };
  });

  // 캘린더의 FlexGrow를 계산하는 애니메이션
  const animatedScrollView = useAnimatedStyle(() => {
    return {
      top:
        -(activeDateLine * minHeight - activeDateLine * 2.4) *
        (1 - (calendarHeight.value - minHeight) / (maxHeight - minHeight)),
    };
  });

  // 캘린더가 최소화됬는지 감지하는 함수
  useAnimatedReaction(
    () => calendarHeight.value,
    (currentHeight, prevHeight) => {
      "worklet";
      if (currentHeight === minHeight && prevHeight !== minHeight) {
        runOnJS(setHideWeeks)(true);
      } else if (currentHeight > minHeight) {
        runOnJS(setHideWeeks)(false);
      }
    }
  );

  return (
    <Animated.ScrollView
      style={animatedContainer}
      onMomentumScrollEnd={setCurrentMonth}
    >
      {!hideWeeks ? (
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled
          onMomentumScrollEnd={setCurrentMonth}
          style={animatedScrollView}
        >
          {fullYearDates.map((month, monthIndex) => (
            <View key={monthIndex} style={styles.monthWrap}>
              {month.dates.map((date, index) => (
                <Date
                  key={index}
                  num={date.num}
                  monthIndex={monthIndex}
                  dateIndex={index}
                  disabled={!date.place}
                />
              ))}
            </View>
          ))}
        </Animated.ScrollView>
      ) : (
        fullYearDates.map(
          (month, monthIndex) =>
            monthIndex === currentMonth && (
              <ScrollView
                ref={slickScrollViewRef}
                horizontal={true}
                pagingEnabled
                key={monthIndex}
                style={[styles.weeksWrap, { marginTop: -activeDateLine * 1.7 }]}
              >
                {month.dates.map((date, index) => (
                  <Date
                    key={index}
                    num={date.num}
                    monthIndex={monthIndex}
                    dateIndex={index}
                    disabled={!date.place}
                    block
                  />
                ))}
              </ScrollView>
            )
        )
      )}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  monthWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: Dimensions.get("window").width,
  },
  weeksWrap: {
    flexDirection: "row",
    // flexWrap: "wrap",
  },
});
