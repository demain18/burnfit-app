import { useRoute } from "@react-navigation/native";

export const getRouteName = () => {
  const route = useRoute();
  const currentRoute = route.name;
  return currentRoute.split(/[/-]/).pop();
};
