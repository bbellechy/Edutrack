import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { getTestResults } from "../services/firestoreService"; // ฟังก์ชันที่ดึงข้อมูลผลการทดสอบจาก Firestore
import { getStudentsData } from "../services/firestoreService"; // เพิ่มการดึงข้อมูลนักเรียน
import { Picker } from "@react-native-picker/picker";

const TestResultScreen = () => {
  const screenWidth = Dimensions.get("window").width;
  const [scores, setScores] = useState({ preTest: 0, postTest: 0 });
  const [selectedStudentID, setSelectedStudentID] = useState("S000001");
  const [students, setStudents] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("Math");
  const [selectedStudentName, setSelectedStudentName] = useState(""); // เพิ่ม state สำหรับเก็บชื่อของนักเรียน
  const subjects = ["Math", "Science", "Thai"];

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsData = await getStudentsData(); // ดึงข้อมูลนักเรียนจาก Firestore
      setStudents(studentsData); // เก็บข้อมูลนักเรียนทั้งหมด
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      const testResults = await getTestResults();
      const studentResults = testResults.filter(
        (result) => result.studentID === selectedStudentID && result.subject === selectedSubject
      );

      const preTest = studentResults.find((test) => test.testType === "pre-test")?.score || 0;
      const postTest = studentResults.find((test) => test.testType === "post-test")?.score || 0;

      setScores({ preTest, postTest });
    };
    fetchScores();
  }, [selectedStudentID, selectedSubject]);

  // เพิ่ม useEffect เพื่อดึงชื่อของนักเรียนจากข้อมูลที่ได้จาก Firestore
  useEffect(() => {
    const student = students.find((student) => student.studentID === selectedStudentID); // หาชื่อนักเรียนจาก selectedStudentID
    if (student) {
      setSelectedStudentName(student.name); // เก็บชื่อของนักเรียน
    } else {
      setSelectedStudentName("Unknown");
    }
  }, [selectedStudentID, students]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🏠 Student Test Result</Text>
      </View>

      {/* Picker สำหรับเลือกนักเรียน */}
      <Picker
        selectedValue={selectedStudentID}
        onValueChange={(itemValue) => setSelectedStudentID(itemValue)}
        style={styles.picker}
      >
        {students.map((student) => (
          <Picker.Item key={student.studentID} label={student.studentID} value={student.studentID} />
        ))}
      </Picker>

      {/* Picker สำหรับเลือกวิชา */}
      <Picker
        selectedValue={selectedSubject}
        onValueChange={(itemValue) => setSelectedSubject(itemValue)}
        style={styles.picker}
      >
        {subjects.map((subject) => (
          <Picker.Item key={subject} label={subject} value={subject} />
        ))}
      </Picker>

      {/* แสดงข้อมูลนักเรียนที่เลือก */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://example.com/avatar.png" }}
          style={styles.avatar}
        />
        <Text style={styles.studentInfo}>
          {selectedStudentName || "Student Name"} {/* แสดงชื่อของนักเรียนที่เลือก */}
        </Text>
        <Text style={styles.subject}>Subject: {selectedSubject}</Text>
      </View>

      {/* แสดงผลคะแนน */}
      <View style={styles.testScoreContainer}>
        <Text style={styles.testScoreTitle}>Test Score</Text>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Pre-test</Text>
          <Text style={styles.scoreValue}>Score: {scores.preTest} Point</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Post-test</Text>
          <Text style={styles.scoreValue}>Score: {scores.postTest} Point</Text>
        </View>
      </View>

      {/* แสดงกราฟคะแนน */}
      <BarChart
        data={{
          labels: ["Pre-test", "Post-test"],
          datasets: [{ data: [scores.preTest, scores.postTest] }],
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

      <Text style={styles.testDate}>Test date: -</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#C0E7FF", padding: 16 },
  header: { width: "100%", alignItems: "flex-start" },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  picker: { width: "80%", height: 50, backgroundColor: "#fff", marginVertical: 10 },
  profileContainer: { marginTop: 16, alignItems: "center" },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  studentInfo: { fontSize: 18, fontWeight: "bold" },
  subject: { color: "#555" },
  testScoreContainer: { width: "100%", marginTop: 16 },
  testScoreTitle: { textAlign: "center", fontSize: 18, fontWeight: "bold" },
  scoreBox: {
    backgroundColor: "#fff", padding: 12, margin: 8, borderRadius: 10,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3,
  },
  scoreLabel: { textAlign: "center", fontWeight: "600" },
  scoreValue: { textAlign: "center", fontSize: 18, fontWeight: "bold" },
  chart: { marginTop: 16 },
  testDate: { marginTop: 8, color: "#555" },
});

export default TestResultScreen;
