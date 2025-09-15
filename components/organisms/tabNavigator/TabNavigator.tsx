import { Text, View, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@/components/atoms/Icon";
import Calender from "../calender/Calender";
import PlaceHolder from "../placeholder/Placeholder";
import { colors } from "@/hooks/colorSchema";

const Tab = createBottomTabNavigator();

export interface Props {}

export default function TabNavigator({ ...rest }: Props) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarActiveTintColor: colors.black }}
    >
      <Tab.Screen
        name="Home"
        component={Calender}
        options={{
          tabBarIcon: ({ focused }) => <Icon type="Home" active={focused} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calender}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon type="Calendar" active={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={PlaceHolder}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon type="Dumbbell" active={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={PlaceHolder}
        options={{
          tabBarIcon: ({ focused }) => <Icon type="Person" active={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingBottom: 10,
  },
});
