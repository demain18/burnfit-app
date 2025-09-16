import Icon from "@/components/atoms/Icon";
import useBasicStore from "@/hooks/basicStore";
import { colors } from "@/hooks/colorSchema";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { fullYearMonths } from "@/hooks/fullYearDates";

export interface Props {}

export default function CalendarHeader({ ...rest }: Props) {
  const {
    currentMonth: monthNow,
    increaseMonth,
    decreaseMonth,
  } = useBasicStore();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decreaseMonth}>
        <Icon type="Left" color={colors.blue} size={22} />
      </TouchableOpacity>

      <Text style={styles.title}>
        {fullYearMonths[monthNow]}({monthNow + 1}월) 2025
      </Text>
      <TouchableOpacity onPress={increaseMonth}>
        <Icon type="Right" color={colors.blue} size={22} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: "Roboto",
    lineHeight: 22,
  },
});
