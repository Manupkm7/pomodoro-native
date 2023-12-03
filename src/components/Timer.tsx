import { StyleSheet, Text, View } from "react-native";

export const Timer = ({ time }: { time: number }) => {
  const formatTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 15,
    flex: 0.3,
    justifyContent: "center",
  },
  text: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
  },
});
