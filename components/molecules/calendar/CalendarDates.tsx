import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Date from "@/components/atoms/Date";
import { fullYearDates } from "@/hooks/fullYearDates";
import useBasicStore from "@/hooks/basicStore";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "@/hooks/colorSchema";

export interface Props {
  calendarHeight: any;
}

export default function CalendarDates({ calendarHeight, ...rest }: Props) {
  const { currentMonth, setMonth } = useBasicStore();
  const deviceWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef<Animated.ScrollView | null>(null);
  const minHeight = 60;
  const maxHeight = 354;

  // CalenderHeader버튼 클릭시 페이징 실행
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

  // 캘린더 높이를 조절하는 스타일
  const animatedContainer = useAnimatedStyle(() => {
    return {
      height: calendarHeight.value,
      // transform: [{ translateY: calendarHeight.value / 0 }],
    };
  });

  const animatedScrollViewWrap = useAnimatedStyle(() => {
    return {
      // transform: [{ translateY: calendarHeight.value - maxHeight * 2 }],
    };
  });

  return (
    <Animated.ScrollView
      style={[styles.scrollView, animatedContainer]} // animatedStyle 적용
    >
      <Animated.View style={animatedScrollViewWrap}>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled
          onMomentumScrollEnd={setCurrentMonth}
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
        </ScrollView>
      </Animated.View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    borderWidth: 2,
    borderColor: colors.blue,
    // transform: [{ translateY: 0 }],
  },

  monthWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: Dimensions.get("window").width,
  },
});
