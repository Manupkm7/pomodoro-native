import { View, Text, StyleSheet, Pressable } from "react-native";
import { enumTimerType } from "../utils/consts";

const options = [
  { value: "POMO", label: "Pomodoro" },
  { value: "SHORT", label: "Short Break" },
  { value: "LONG", label: "Long Break" },
];

export const Header = ({
  currentTab,
  disabled,
  setCurrentTab,
  setTime,
}: {
  currentTab: enumTimerType;
  disabled: boolean;
  setCurrentTab: (value: enumTimerType) => void;
  setTime: (value: number) => void;
}) => {
  const handleChangeTime = (value: number) => {
    const newTime = value === 0 ? 25 : value === 1 ? 5 : 15;
    setTime(newTime * 60);
  };

  const handleChangeCurrentTab = (value: enumTimerType) => {
    setCurrentTab(value);
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Pressable
          key={option.value}
          onPress={() => {
            handleChangeTime(index);
            handleChangeCurrentTab(option.value as enumTimerType);
          }}
          disabled={disabled}
          style={[
            styles.optionStyle,
            currentTab !== option.value && { borderColor: "transparent" },
          ]}
        >
          <Text style={styles.text}>{option.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  optionStyle: {
    padding: 5,
    borderWidth: 3,
    width: "33%",
    alignItems: "center",
    borderColor: "white",
    borderRadius: 5,
    marginVertical: 20,
  },
  text: {
    fontWeight: "bold",
  },
});
