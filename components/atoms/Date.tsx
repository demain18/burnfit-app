import useBasicStore from "@/hooks/basicStore";
import { colors } from "@/hooks/colorSchema";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export interface Props {
  num: number | null;
  monthIndex: number;
  dateIndex: number;
  disabled?: boolean;
}

export default function Date({
  num,
  monthIndex,
  dateIndex,
  disabled = false,
  ...rest
}: Props) {
  const { activeMonth, activeDate, setActiveMonth, setActiveDate } =
    useBasicStore();

  let active = false;

  if (activeMonth === monthIndex && activeDate === dateIndex) {
    active = true;
  }

  const onPressDate = () => {
    setActiveMonth(monthIndex);
    setActiveDate(dateIndex);
  };

  return (
    <TouchableOpacity
      style={[styles.container, active && styles.dateActive]}
      onPress={onPressDate}
      disabled={disabled}
    >
      <Text style={[styles.date, disabled && styles.dateDisabled]}>{num}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "14.28%",
    color: colors.black,
    paddingTop: 15,
    paddingBottom: 15,
    boxSizing: "border-box",
  },
  date: {
    fontFamily: "Roboto",
    fontWeight: 300,
    textAlign: "center",
    fontSize: 15,
  },
  dateActive: {
    borderWidth: 3,
    borderColor: colors.blue,
    borderStyle: "solid",
  },
  dateDisabled: {
    color: colors.lightGray,
  },
});
