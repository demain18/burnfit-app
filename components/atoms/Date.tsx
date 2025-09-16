import { colors } from "@/hooks/colorSchema";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export interface Props {
  num: number | null;
  disabled?: boolean;
}

export default function Date({ num, disabled = false, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} disabled={disabled}>
      <Text style={[styles.date, disabled && { color: colors.lightGray }]}>
        {num}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "14.28%",
    color: colors.black,
    paddingTop: 15,
    paddingBottom: 15,
  },
  date: {
    fontFamily: "Roboto",
    fontWeight: 300,
    textAlign: "center",
    fontSize: 15,
  },
});
