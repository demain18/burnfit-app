import Icon from "@/components/atoms/Icon";
import { colors } from "@/hooks/colorSchema";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export interface Props {}

export default function CalendarHeader({ ...rest }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon type="Left" color={colors.blue} size={22} />
      </TouchableOpacity>

      <Text style={styles.title}>July 2025</Text>
      <TouchableOpacity>
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
