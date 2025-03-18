import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const DashboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Exam Results</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/80" }} // รูปโปรไฟล์ (ใส่ลิงก์จริง)
          style={styles.profilePic}
        />
        <View style={styles.profileDetails}>
          <Text>Name: XXXXX</Text>
          <Text>ID: XXXXX</Text>
          <Text>Name: XXXXX</Text>
        </View>
      </View>

      {/* Overview Section */}
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.overviewContainer}>
        <View style={styles.overviewBox}>
          <Text style={styles.boxTitle}>Ranking</Text>
          <Text style={styles.boxValue}>52</Text>
        </View>
        <View style={styles.overviewBox}>
          <Text style={styles.boxTitle}>Total Score</Text>
          <Text style={styles.boxValue}>601</Text>
        </View>
      </View>

      {/* Pretest & Posttest Section */}
      <View style={styles.testContainer}>
        <View style={styles.testBox}>
          <Text style={styles.testTitle}>Pretest</Text>
          <View style={styles.circleContainer}>
            {[...Array(6)].map((_, index) => (
              <View key={index} style={styles.circle}>
                <Text style={styles.circleText}>60%</Text>
                <Text style={styles.subjectText}>Subject</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.testBox}>
          <Text style={styles.testTitle}>Posttest</Text>
          <View style={styles.circleContainer}>
            {[...Array(6)].map((_, index) => (
              <View key={index} style={styles.circle}>
                <Text style={styles.circleText}>60%</Text>
                <Text style={styles.subjectText}>Subject</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Study Plan Section */}
      <Text style={styles.sectionTitle}>Study Plan</Text>
      <View style={styles.studyPlanBox} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#C0E7FF", 
    padding: 10,
  },
  header: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileContainer: {
    flexDirection: "row",
    backgroundColor: "#D3D3D3",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileDetails: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  overviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  overviewBox: {
    backgroundColor: "#D3D3D3",
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  boxTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  boxValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  testContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  testBox: {
    backgroundColor: "#D3D3D3",
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  testTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  circleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  circleText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  subjectText: {
    fontSize: 10,
  },
  studyPlanBox: {
    backgroundColor: "#D3D3D3",
    height: 50,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default DashboardScreen;
