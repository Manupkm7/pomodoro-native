import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import { useState } from "react";
import { Header } from "./src/components/Header";
import { colors, enumTimerType } from "./src/utils/consts";

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [timer, setTimer] = useState(25 * 60);
  const [currentTab, setCurrentTab] = useState<enumTimerType>("POMO");

  const backgroundIsWorking = currentTab === "POMO" ? colors[0] : currentTab === "SHORT" ? colors[1] : colors[2];
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundIsWorking}]}
    >
      <View
        style={{
          paddingTop:
            (Platform.OS === "android" || Platform.OS === "web") && 30,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Text style={styles.text}>{timer}</Text>
        <Header
          setTime={setTimer}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
