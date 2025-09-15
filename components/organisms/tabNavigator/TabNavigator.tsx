import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@/components/atoms/Icon";
import Calender from "../calender/Calender";
import PlaceHolder from "../placeholder/Placeholder";

const Tab = createBottomTabNavigator();

export interface Props {}

export default function TabNavigator({ ...rest }: Props) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarActiveTintColor: "#000000" }}
    >
      <Tab.Screen
        name="Home"
        component={Calender}
        options={{
          tabBarIcon: ({ focused }) => <Icon type="Home" active={focused} />,
        }}
      />
      <Tab.Screen
        name="Calender"
        component={Calender}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon type="Calender" active={focused} />
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
