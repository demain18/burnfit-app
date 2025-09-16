import CalendarDates from "@/components/molecules/calendar/CalendarDates";
import CalendarHeader from "@/components/molecules/calendar/CalendarHeader";
import CalendarWeeks from "@/components/molecules/calendar/CalendarWeeks";
import { colors } from "@/hooks/colorSchema";
import { Text, View, StyleSheet } from "react-native";

export interface Props {}

export default function Calender({ ...rest }: Props) {
  return (
    <View style={styles.container}>
      <CalendarHeader />
      <CalendarWeeks />
      <CalendarDates />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
