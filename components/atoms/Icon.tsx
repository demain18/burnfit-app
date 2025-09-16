import { View, StyleSheet } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { colors } from "@/hooks/colorSchema";

export interface Props {
  type: string;
  size?: number;
  active?: boolean;
  color?: string;
}

export default function Icon({
  type,
  size = 20,
  active = false,
  color,
}: Props) {
  const IconComponent = Ionicon;

  let iconName: string;
  let iconColor = active ? colors.black : colors.gray;

  if (color) {
    iconColor = color;
  }

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
    case "Left":
      iconName = "chevron-back-outline";
      break;
    case "Right":
      iconName = "chevron-forward-outline";
      break;
    default:
      return null;
  }

  return (
    <View>
      <IconComponent name={iconName} size={size} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({});
