import { View, StyleSheet, Dimensions } from "react-native";
import { fullYearDates } from "@/hooks/fullYearDates";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
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

  // 캘린더가 완전히 접혔을시 주별 캘린더 배치
  useEffect(() => {
    if (slickScrollViewRef.current && hideWeeks) {
      slickScrollViewRef.current.scrollTo({
        x: activeDateLine * deviceWidth,
        animated: false,
      });
    }
  }, [hideWeeks]);

  // 페이징 발생시 store에 현재 월 저장
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

  // 캘린더의 flexGrow를 연산하는 애니메이션
  const animatedScrollView = useAnimatedStyle(() => {
    return {
      top:
        -(activeDateLine * minHeight - activeDateLine * 2.4) *
        (1 - (calendarHeight.value - minHeight) / (maxHeight - minHeight)),
    };
  });

  // 캘린더가 열리고 닫힐때 감지하는 함수
  useAnimatedReaction(
    () => calendarHeight.value,
    (currentHeight, prevHeight) => {
      "worklet";
      if (currentHeight === minHeight && prevHeight !== minHeight) {
        runOnJS(setHideWeeks)(true);
      } else if (currentHeight > minHeight && prevHeight === minHeight) {
        runOnJS(setHideWeeks)(false);
      }
    }
  );

  return (
    <Animated.ScrollView style={animatedContainer}>
      {
        // 캘린더 열린 버전
        <Animated.ScrollView
          style={[
            hideWeeks === true && { display: "none" },
            animatedScrollView,
          ]}
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled
          onMomentumScrollEnd={setCurrentMonth}
        >
          {fullYearDates.map((month, monthIndex) => (
            <View key={monthIndex} style={styles.monthWrap}>
              {month.dates.map((date, dateIndex) => (
                <Date
                  key={dateIndex}
                  num={date.num}
                  monthIndex={monthIndex}
                  dateIndex={dateIndex}
                  disabled={!date.place}
                />
              ))}
            </View>
          ))}
        </Animated.ScrollView>
      }
      {
        // 캘린더 닫힌 버전
        <Animated.ScrollView
          style={[hideWeeks === false && { display: "none" }]}
        >
          {fullYearDates.map(
            (month, monthIndex) =>
              monthIndex === currentMonth && (
                <ScrollView
                  ref={slickScrollViewRef}
                  horizontal={true}
                  pagingEnabled
                  key={monthIndex}
                  style={[
                    styles.weeksWrap,
                    { marginTop: -activeDateLine * 1.7 },
                  ]}
                >
                  {month.dates.map((date, dateIndex) => (
                    <Date
                      key={dateIndex}
                      num={date.num}
                      monthIndex={monthIndex}
                      dateIndex={dateIndex}
                      disabled={!date.place}
                      block
                    />
                  ))}
                </ScrollView>
              )
          )}
        </Animated.ScrollView>
      }
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
  },
});
