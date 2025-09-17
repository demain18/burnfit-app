import { View, StyleSheet, Dimensions } from "react-native";
import { fullYearDates } from "@/hooks/fullYearDates";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import React, { useRef, useEffect } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import Date from "@/components/atoms/Date";
import useBasicStore from "@/hooks/basicStore";

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
  const { currentMonth, activeDateLine, setMonth } = useBasicStore();
  const deviceWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef<Animated.ScrollView | null>(null);

  // CalenderHeader버튼 클릭시 zustand state를 감지하여 페이징 실행
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentMonth * deviceWidth,
        animated: true,
      });
    }
  }, [currentMonth]);

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

  // 캘린더의 FlexGrow를 조절하는 애니메이션
  const animatedScrollView = useAnimatedStyle(() => {
    return {
      top:
        -(activeDateLine * minHeight - activeDateLine * 2.4) *
        (1 - (calendarHeight.value - minHeight) / (maxHeight - minHeight)),
    };
  });

  return (
    <Animated.ScrollView style={animatedContainer}>
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
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  monthWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: Dimensions.get("window").width,
  },
});
