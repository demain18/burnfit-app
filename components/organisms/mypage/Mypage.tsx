import { Text, View, StyleSheet } from "react-native";

export interface Props {}

export default function Mypage({ ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mypage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
