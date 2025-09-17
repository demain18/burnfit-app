import { colors } from "@/hooks/colorSchema";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";

export interface Props {
  gesture: any;
}

export default function CalendarBody({ gesture, ...rest }: Props) {
  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <Text style={styles.text}>Calendar Body</Text>
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
  text: {
    color: colors.gray,
  },
});
