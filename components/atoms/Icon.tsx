import { View, StyleSheet } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { colors } from "@/hooks/colorSchema";

export interface Props {
  type: string;
  active?: boolean;
}

export default function TabBarIcon({ type, active = false }: Props) {
  const IconComponent = Ionicon;

  let iconName: string;
  let iconColor = active ? colors.black : colors.gray;

  switch (type) {
    case "Home":
      iconName = active ? "home" : "home-outline";
      break;
    case "Calendar":
      iconName = active ? "calendar" : "calendar-outline";
      break;
    case "Dumbbell":
      iconName = active ? "barbell" : "barbell-outline";
      break;
    case "Person":
      iconName = active ? "person" : "person-outline";
      break;
    default:
      return null;
  }

  return (
    <View>
      <IconComponent name={iconName} size={20} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({});
