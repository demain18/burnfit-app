import { colors } from "@/hooks/colorSchema";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";

export interface Props {
  gesture: any; // 전달받을 제스처의 타입
  calendarHeight: any;
}

export default function CalendarBody({
  gesture,
  calendarHeight,
  ...rest
}: Props) {
  return (
    // GestureDetector로 감싸서 제스처를 감지
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <Text>Calendar Body</Text>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 300,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#ececec",
    justifyContent: "center",
    alignItems: "center",
  },
});
