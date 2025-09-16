import { Text, View, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@/components/atoms/Icon";
import Calendar from "../calendar/Calendar";
import { colors } from "@/hooks/colorSchema";
import Home from "../home/Home";
import Library from "../library/Library";
import Mypage from "../mypage/Mypage";

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
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <Icon type="Home" active={focused} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon type="Calendar" active={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon type="Dumbbell" active={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{
          tabBarIcon: ({ focused }) => <Icon type="Person" active={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
