import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker"; // นำเข้า Picker จากที่นี่
import { getAllData } from "../services/firestoreService";

const DashboardScreen = () => {
  const [students, setStudents] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [selectedStudentID, setSelectedStudentID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllData();
      // console.log("alll data", JSON.stringify(allData["groupedBySubject"], null, 4));
      if (allData) {
        setStudents(allData.students || []);
        setTestResults(allData.testResults || []);

        // เลือกนักเรียนคนแรกเป็นค่าเริ่มต้น
        if (allData.students.length > 0) {
          setSelectedStudentID(allData.students[0].studentID);
        }
      }
    };
    fetchData();
  }, []);

  // กรองข้อมูลนักเรียนที่เลือก
  const filteredStudents = students.filter(
    (student) => student.studentID === selectedStudentID
  );

  // กรองข้อมูลผลการทดสอบของนักเรียนที่เลือก
  const filteredTestResults = testResults.filter(
    (result) => result.studentID === selectedStudentID
  );

  // คำนวณ totalScore
  const totalScore =
  filteredTestResults.length > 0
    ? filteredTestResults.reduce((acc, curr) => acc + (Number(curr.score) || 0), 0)
    : 0;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Exam Results</Text>
      </View>

      {/* Student Selection */}
      <Text style={styles.sectionTitle}>Select Student</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedStudentID}
          onValueChange={(itemValue) => setSelectedStudentID(itemValue)}
          style={styles.picker}
        >
          {students.map((student) => (
            <Picker.Item
              key={student.studentID}
              label={`${student.name} (${student.studentID})`}
              value={student.studentID}
            />
          ))}
        </Picker>
      </View>

      {/* Student Details */}
      <Text style={styles.sectionTitle}>Student Details</Text>
      {filteredStudents.map((item) => (
        <View key={item.studentID} style={styles.profileContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.profilePic}
          />
          <View style={styles.profileDetails}>
            <Text>Profile</Text>
            <Text>Name: {item.name}</Text>
            <Text>ID: {item.studentID}</Text>
          </View>
        </View>
      ))}

      {/* Overview Section */}
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.overviewContainer}>
        <View style={styles.overviewBox}>
          <Text style={styles.boxTitle}>Ranking</Text>
          <Text style={styles.boxValue}>1</Text>
        </View>
        <View style={styles.overviewBox}>
          <Text style={styles.boxTitle}>Total Score</Text>
          <Text style={styles.boxValue}>{totalScore}</Text>
        </View>
      </View>

      {/* Pretest & Posttest Section */}
      <Text style={styles.sectionTitle}>Test Results</Text>
      <View style={styles.resultsContainer}>
        {/* Pretest Section */}
        <View style={styles.pretestBox}>
          <Text style={styles.testCategory}>Pre-test</Text>
          {filteredTestResults.filter((item) => item.testType === "pre-test").length > 0 ? (
            filteredTestResults
              .filter((item) => item.testType === "pre-test")
              .map((item) => (
                <View key={item.testResultID} style={styles.testBox}>
                  <Text style={styles.testTitle}>{item.subject}</Text>
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>{item.score}%</Text>
                  </View>
                </View>
              ))
          ) : (
            <Text style={styles.noDataText}>No Pre-test Data</Text>
          )}
        </View>

        {/* Posttest Section */}
        <View style={styles.posttestBox}>
          <Text style={styles.testCategory}>Post-test</Text>
          {filteredTestResults.filter((item) => item.testType === "post-test").length > 0 ? (
            filteredTestResults
              .filter((item) => item.testType === "post-test")
              .map((item) => (
                <View key={item.testResultID} style={styles.testBox}>
                  <Text style={styles.testTitle}>{item.subject}</Text>
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>{item.score}%</Text>
                  </View>
                </View>
              ))
          ) : (
            <Text style={styles.noDataText}>No Post-test Data</Text>
          )}
        </View>
      </View>

      {/* Study Plan Section */}
      <Text style={styles.sectionTitle}>Study Plan</Text>
      <View style={styles.studyPlanBox} />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 5,
    marginVertical: 10,
  },
  picker: {
    width: "100%",
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
  testBox: {
    backgroundColor: "#D3D3D3",
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
  noDataText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
  studyPlanBox: {
    backgroundColor: "#D3D3D3",
    height: 50,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default DashboardScreen;