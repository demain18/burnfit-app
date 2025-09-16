import { colors } from "@/hooks/colorSchema";
import { Text, View, StyleSheet } from "react-native";

export interface Props {}

export default function CalendarWeeks({ ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.week, styles.weekSunday]}>Sun</Text>
      <Text style={styles.week}>Mon</Text>
      <Text style={styles.week}>Tue</Text>
      <Text style={styles.week}>Wed</Text>
      <Text style={styles.week}>Thu</Text>
      <Text style={styles.week}>Fri</Text>
      <Text style={[styles.week, styles.weekSaturday]}>Sat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "space-between",
    flexWrap: "wrap",
    paddingTop: 15,
  },
  week: {
    fontFamily: "Roboto",
    flexBasis: "14.28%",
    height: 27,
    textAlign: "center",
    color: colors.gray,
  },
  weekSunday: {
    color: colors.red,
  },
  weekSaturday: {
    color: colors.blue,
  },
});
