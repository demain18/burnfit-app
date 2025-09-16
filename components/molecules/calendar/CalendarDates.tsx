import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Date from "@/components/atoms/Date";
import { fullYearDates } from "@/hooks/fullYearDates";
import { ScrollView } from "react-native-gesture-handler";
import useBasicStore from "@/hooks/basicStore";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export interface Props {}

export default function CalendarDates({ ...rest }: Props) {
  const { currentMonth, setMonth } = useBasicStore();
  const deviceWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef<ScrollView | null>(null);

  // CalendarHeader 버튼으로 Month 변경하기
  useEffect(() => {
    if (scrollViewRef.current) {
      // currentMonth의 위치값 만큼 scrollTo를 사용해서 이동
      scrollViewRef.current.scrollTo({
        x: currentMonth * deviceWidth,
        animated: true,
      });
    }
  }, [currentMonth]);

  // 좌우 스크롤로 Month 변경하기
  const setCurrentMonth = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentMonthIndex = Math.round(offsetX / deviceWidth);
    setMonth(currentMonthIndex);
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  monthWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: Dimensions.get("window").width,
  },
});
