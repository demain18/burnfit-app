import CalendarBody from "@/components/molecules/calendar/CalendarBody";
import CalendarDates from "@/components/molecules/calendar/CalendarDates";
import CalendarHeader from "@/components/molecules/calendar/CalendarHeader";
import CalendarWeeks from "@/components/molecules/calendar/CalendarWeeks";
import { colors } from "@/hooks/colorSchema";
import { View, StyleSheet } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { useSharedValue, withSpring } from "react-native-reanimated";

export interface Props {}

export default function Calendar({ ...rest }: Props) {
  const minHeight = 60;
  const maxHeight = 354;
  const calendarHeight = useSharedValue(maxHeight);

  const panGesture = Gesture.Pan().onUpdate((event) => {
    const newHeight = calendarHeight.value + event.translationY * 0.1;

    calendarHeight.value = Math.max(minHeight, Math.min(maxHeight, newHeight));
  });

  return (
    <View style={styles.container}>
      <CalendarHeader />
      <CalendarWeeks />
      <CalendarDates calendarHeight={calendarHeight} />
      <CalendarBody gesture={panGesture} calendarHeight={calendarHeight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
