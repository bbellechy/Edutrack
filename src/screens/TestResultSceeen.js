import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";

const TestResultScreen = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🏠 Student Test Result</Text>
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
        <Text style={styles.testScoreTitle}>Test Score</Text>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Pre-test</Text>
          <Text style={styles.scoreValue}>Score: 50 Point</Text>
        </View>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Post-test</Text>
          <Text style={styles.scoreValue}>Score: 90 Point</Text>
        </View>
      </View>

      {/* Bar Chart */}
      <BarChart
        data={{
          labels: ["Pre-test", "Post-test"],
          datasets: [{ data: [50, 90] }],
        }}
        width={screenWidth * 0.9}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: () => `#000`,
          decimalPlaces: 0,
        }}
        style={styles.chart}
      />

      {/* Pass/Fail Section */}
      <View style={styles.resultBox}>
        <Text style={styles.resultScore}>90</Text>
        <Text style={styles.resultText}>Pass</Text>
      </View>

      {/* Test Date */}
      <Text style={styles.testDate}>Test date: 01/01/2025</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#C0E7FF",
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
    width: "100%",
    marginTop: 16,
  },
  testScoreTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  scoreBox: {
    backgroundColor: "#fff",
    padding: 12,
    margin: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreLabel: {
    textAlign: "center",
    fontWeight: "600",
  },
  scoreValue: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  chart: {
    marginTop: 16,
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
});

export default TestResultScreen;
