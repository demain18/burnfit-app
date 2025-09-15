import { Text, View, StyleSheet } from "react-native";

import { FaHome } from "react-icons/fa";
import { CiHome } from "react-icons/ci";

import { IoHomeSharp } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";

import { BsCalendar2DateFill } from "react-icons/bs";
import { BsCalendar2Date } from "react-icons/bs";

import { FaDumbbell } from "react-icons/fa";
import { CiDumbbell } from "react-icons/ci";

import { IoPersonSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

export interface Props {
  type: string;
  active?: boolean;
}

export function IconComponent({ type, active = false }: Props) {
  if (type === "Home") {
    return active ? <IoHomeSharp /> : <IoHomeOutline />;
  } else if (type === "Calender") {
    return active ? <BsCalendar2DateFill /> : <BsCalendar2Date />;
  } else if (type === "Dumbbell") {
    return active ? <FaDumbbell /> : <CiDumbbell />;
  } else if (type === "Person") {
    return active ? <IoPersonSharp /> : <IoPersonOutline />;
  }
}

export default function Icon({ type, active, ...rest }: Props) {
  return (
    <View>
      <IconComponent type={type} active={active} />
    </View>
  );
}

const styles = StyleSheet.create({});
