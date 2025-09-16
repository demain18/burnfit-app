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
      style={styles.container}
      onPress={onPressDate}
      disabled={disabled}
    >
      {active && <View style={styles.dateActive}></View>}
      <Text
        style={[
          styles.date,
          active && { fontWeight: "700" },
          disabled && styles.dateDisabled,
        ]}
      >
        {num}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "14.28%",
    color: colors.black,
    position: "relative",
  },
  date: {
    fontFamily: "Roboto",
    fontWeight: 300,
    textAlign: "center",
    fontSize: 15,
    paddingTop: 19,
    paddingBottom: 19,
  },
  dateActive: {
    position: "absolute",
    width: "70%",
    height: "70%",
    top: 9,
    left: 8.5,
    borderWidth: 2,
    borderColor: colors.blue,
    borderStyle: "solid",
    borderRadius: "100%",
  },
  dateDisabled: {
    color: colors.lightGray,
  },
});
