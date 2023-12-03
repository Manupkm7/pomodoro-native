import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Header } from "./src/components/Header";
import { colors, enumTimerType } from "./src/utils/consts";
import { Timer } from "./src/components/Timer";
import { Audio } from "expo-av";

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [timer, setTimer] = useState(25 * 60);
  const [currentTab, setCurrentTab] = useState<enumTimerType>("POMO");
  const [isActive, setIsActive] = useState(false);

  const backgroundIsWorking =
    currentTab === "POMO"
      ? colors[0]
      : currentTab === "SHORT"
      ? colors[1]
      : colors[2];

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.wav")
    );
    await sound.playAsync();
  };

  const handleStartStop = () => {
    playSound();
    setIsActive(!isActive);
    setIsWorking(!isWorking);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (timer === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTimer(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, timer]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundIsWorking }]}
    >
      <View
        style={{
          paddingTop:
            (Platform.OS === "android" || Platform.OS === "web") && 30,
          paddingHorizontal: 20,
          flex: 1,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTab={currentTab}
          disabled={isWorking}
          setTime={setTimer}
          setCurrentTab={setCurrentTab}
        />
        <Timer time={timer} />
        <Pressable style={styles.button} onPress={handleStartStop}>
          <Text style={styles.textButton}>{isActive ? "Stop" : "Start"}</Text>
        </Pressable>
        <StatusBar animated={true} style="dark" />
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
  textButton: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
  },
});
