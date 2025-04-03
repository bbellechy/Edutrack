import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase";

const ParentResultScreen = () => {
  const screenWidth = Dimensions.get("window").width;
  const [testResults, setTestResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [studentID] = useState("S000001"); // ตัวอย่าง studentID ที่ต้องการแสดงผล
  const [studentName, setStudentName] = useState(""); // เก็บชื่อนักเรียน

  // ดึงข้อมูลนักเรียนจาก Firebase
  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const q = query(collection(firestore, "Students"), where("studentID", "==", studentID));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const studentData = querySnapshot.docs[0].data();
          setStudentName(studentData.name); // ตั้งค่าชื่อนักเรียน
        } else {
          console.error("Student not found");
        }
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    fetchStudentInfo();
  }, [studentID]);

  // ดึงข้อมูลผลการทดสอบจาก Firebase
  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "TestResult"));
        let allResults = [];

        for (const doc of querySnapshot.docs) {
          // ดึงข้อมูลจาก nested collection (Math, Science, Thai)
          const mathResults = await getDocs(collection(doc.ref, "Math"));
          const scienceResults = await getDocs(collection(doc.ref, "Science"));
          const thaiResults = await getDocs(collection(doc.ref, "Thai"));

          // รวมผลลัพธ์ทั้งหมด
          allResults = allResults.concat(
            mathResults.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
            scienceResults.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
            thaiResults.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }

        // กรองข้อมูลเฉพาะของ studentID ที่ต้องการ
        const studentResults = allResults.filter(
          (result) => result.studentID === studentID
        );

        setTestResults(studentResults);
        setFilteredResults(studentResults); // เริ่มต้นแสดงผลทั้งหมด
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };

    fetchTestResults();
  }, [studentID]);

  // ฟังก์ชันกรองข้อมูลตามวิชาที่เลือก
  useEffect(() => {
    if (selectedSubject === "All") {
      setFilteredResults(testResults);
    } else {
      setFilteredResults(
        testResults.filter((result) => result.subject === selectedSubject)
      );
    }
  }, [selectedSubject, testResults]);

  // เตรียมข้อมูลสำหรับ Bar Chart
  const prepareBarChartData = () => {
    const subjects = ["Math", "Science", "Thai"];
    const labels = []; // แกน x จะมี pre-test และ post-test แยกกัน
    const scores = []; // คะแนนที่จะแสดงในแต่ละ bar

    subjects.forEach((subject) => {
      labels.push(`${subject} Pre`, `${subject} Post`);
      const subjectResults = testResults.filter((result) => result.subject === subject);
      const preTest = subjectResults.find((result) => result.testType === "pre-test");
      const postTest = subjectResults.find((result) => result.testType === "post-test");

      scores.push(preTest ? preTest.score : 0);
      scores.push(postTest ? postTest.score : 0);
    });

    return {
      labels,
      datasets: [
        {
          data: scores,
          color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // สีของ bar
        },
      ],
    };
  };

  const barChartData = prepareBarChartData();

// เตรียมข้อมูลสำหรับ Line Chart แยกตามวิชา
const prepareSubjectLineChartData = (subject) => {
  const subjectResults = testResults.filter((result) => result.subject === subject);
  const preTest = subjectResults.find((result) => result.testType === "pre-test");
  const postTest = subjectResults.find((result) => result.testType === "post-test");

  return {
    preTestScore: preTest ? preTest.score : 0,
    postTestScore: postTest ? postTest.score : 0,
  };
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://example.com/avatar.png" }}
          style={styles.avatar}
        />
        <Text style={styles.studentInfo}>{studentID}, {studentName}</Text>
      </View>

      {/* Dropdown สำหรับเลือกวิชา */}
      <Picker
        selectedValue={selectedSubject}
        onValueChange={(itemValue) => setSelectedSubject(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Math" value="Math" />
        <Picker.Item label="Science" value="Science" />
        <Picker.Item label="Thai" value="Thai" />
      </Picker>

      {/* Bar Chart สำหรับ All */}
      {selectedSubject === "All" && (
        <BarChart
          data={{
            labels: barChartData.labels,
            datasets: barChartData.datasets,
          }}
          width={screenWidth * 0.9} // ความกว้างของกราฟ
          height={300} // ความสูงของกราฟ
          chartConfig={{
            backgroundColor: "#f7faff",
            backgroundGradientFrom: "#f7faff",
            backgroundGradientTo: "#f7faff",
            decimalPlaces: 0, // จำนวนทศนิยม
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.5,
            propsForLabels: {
              rotation: 45, // หมุนข้อความบนแกน x
            },
          }}
          style={{
            marginVertical: 16,
            borderRadius: 16,
          }}
        />
      )}

{/* Line Chart */}
{["Math", "Science", "Thai"].includes(selectedSubject) && (
  <>
    {/* Legend (คำอธิบายสี) */}
    <View style={styles.legendContainer}>
      <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: "rgba(54, 162, 235, 1)" }]} />
        <Text style={styles.legendText}>Pre-test</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: "rgba(255, 99, 132, 1)" }]} />
        <Text style={styles.legendText}>Post-test</Text>
      </View>
    </View>

    <LineChart
      data={{

        datasets: [
          {
            data: [0  , prepareSubjectLineChartData(selectedSubject).preTestScore], // คะแนน Pre-test
            color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // สีฟ้าสำหรับ Pre-test
            strokeWidth: 2, // ความหนาของเส้น
          },
          {
            data: [0, prepareSubjectLineChartData(selectedSubject).postTestScore], // คะแนน Post-test
            color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // สีแดงสำหรับ Post-test
            strokeWidth: 2, // ความหนาของเส้น
          },
        ],
      }}
      width={screenWidth * 0.9} // ความกว้างของกราฟ
      height={300} // ความสูงของกราฟ
      chartConfig={{
        backgroundColor: "#f7faff",
        backgroundGradientFrom: "#f7faff",
        backgroundGradientTo: "#f7faff",
        decimalPlaces: 0, // จำนวนทศนิยม
        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      style={{
        marginVertical: 16,
        borderRadius: 16,
      }}
    />
  </>
)}

      {/* Card รายละเอียดการสอบ */}
      {filteredResults.map((result, index) => (
        <View key={index} style={styles.resultBox}>
          <Text style={styles.subjectText}>วิชา: {result.subject}</Text>
          <Text style={styles.scoreText}>คะแนน: {result.score}</Text>
          <Text style={styles.testTypeText}>ประเภทการทดสอบ: {result.testType}</Text>
          <Text style={styles.dateText}>
            วันที่ทดสอบ: {new Date(result.test_date.seconds * 1000).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#cce7ff",
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
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  resultBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scoreText: {
    fontSize: 16,
    marginTop: 8,
  },
  testTypeText: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
  dateText: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#000",
  },
});

export default ParentResultScreen;