import React from "react";
import { View, Text, Image, Dimensions, TextInput, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const ParentResultScreen = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🏠 Parent Result</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://example.com/avatar.png" }}
          style={styles.avatar}
        />
        <Text style={styles.studentInfo}>658700, Somchai Jaidee</Text>
        <Text style={styles.subject}>Subject: ITDS999</Text>
      </View>

      {/* Test Score */}
      <View style={styles.testScoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Per - Test</Text>
          <Text style={styles.scoreValue}>50</Text>
        </View>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Post - Test</Text>
          <Text style={styles.scoreValue}>90</Text>
        </View>
      </View>

      {/* Progress Chart */}
      <Text style={styles.progressText}>Progress</Text>
      <LineChart
        data={{
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [{ data: [30, 60, 50, 90] }],
        }}
        width={screenWidth * 0.9}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: () => `#000`,
          decimalPlaces: 0,
        }}
        bezier
        style={styles.chart}
      />

      {/* Pass/Fail Section */}
      <View style={styles.resultBox}>
        <Text style={styles.resultScore}>90</Text>
        <Text style={styles.resultText}>Pass</Text>
      </View>

      {/* Test Date */}
      <Text style={styles.testDate}>Test date: 01/01/2025</Text>

      {/* Teacher's Suggestion */}
      <TextInput
        style={styles.suggestionBox}
        placeholder="ข้อเสนอแนะจากอาจารย์ :"
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#cce7ff",
    padding: 16,
  },
  header: {
    width: "100%",
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  profileContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  studentInfo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subject: {
    color: "#555",
  },
  testScoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 16,
  },
  scoreBox: {
    backgroundColor: "#fff",
    padding: 12,
    width: "45%",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreLabel: {
    fontWeight: "600",
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  progressText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  chart: {
    marginTop: 10,
  },
  resultBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  resultScore: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#008000",
  },
  resultText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#008000",
  },
  testDate: {
    marginTop: 8,
    color: "#555",
  },
  suggestionBox: {
    marginTop: 16,
    width: "90%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ParentResultScreen;
