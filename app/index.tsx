import TabNavigator from "@/components/organisms/tabNavigator/TabNavigator";
import { Text, View, StyleSheet } from "react-native";

export interface Props {}

export default function Index({ ...rest }: Props) {
  return (
    <View style={styles.container}>
      <TabNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
