import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Date from "@/components/atoms/Date";
import { fullYearDates } from "@/hooks/fullYearDates";
import { ScrollView } from "react-native-gesture-handler";
import useBasicStore from "@/hooks/basicStore";

export interface Props {}

export default function CalendarDates({ ...rest }: Props) {
  const { setMonth } = useBasicStore();

  const handleScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const month = Math.round(offsetX / Dimensions.get("window").width);
    console.log(`${month + 1}월`);
    setMonth(month);
  };

  return (
    <ScrollView
      horizontal={true}
      pagingEnabled
      onMomentumScrollEnd={handleScrollEnd}
    >
      {fullYearDates.map((i, x) => (
        <View key={x} style={styles.monthWrap}>
          {i.dates.map((date, x) => (
            <Date key={x} num={date.num} disabled={!date.place} />
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
