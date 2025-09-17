import useBasicStore from "@/hooks/basicStore";
import { colors } from "@/hooks/colorSchema";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export interface Props {
  num: number | null;
  monthIndex: number;
  dateIndex: number;
  disabled?: boolean;
  block?: boolean;
}

export default function Date({
  num,
  monthIndex,
  dateIndex,
  disabled = false,
  block = false,
  ...rest
}: Props) {
  const {
    activeMonth,
    activeDate,
    activeDateLine,
    setActiveMonth,
    setActiveDate,
    setActiveDateLine,
  } = useBasicStore();

  const active =
    activeMonth === monthIndex && activeDate === dateIndex ? true : false;

  const onPressDate = () => {
    setActiveMonth(monthIndex);
    setActiveDate(dateIndex);
    setActiveDateLine(Math.floor(dateIndex / 7));

    console.log(activeDateLine);
  };

  return (
    <TouchableOpacity
      style={[styles.container, block && styles.containerBlock]}
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
    boxSizing: "border-box",
    borderWidth: 1,
    borderColor: colors.white,
  },
  containerBlock: {
    flexBasis: 0,
    width: 55.7,
  },
  date: {
    fontFamily: "Roboto",
    fontWeight: 300,
    textAlign: "center",
    fontSize: 15,
    paddingTop: 18,
    paddingBottom: 18,
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
