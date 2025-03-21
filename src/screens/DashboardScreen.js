import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from "react-native";
import { getAllData } from "../services/firestoreService"; // นำเข้า service ที่ใช้ดึงข้อมูลจาก Firestore

const DashboardScreen = () => {
  const [students, setStudents] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [getTestsData, setgetTestsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllData();
      setStudents(allData.students || []);
      setTestResults(allData.testResults || []);
      setgetTestsData(allData.getTestsData || []);
    };
    fetchData();
  }, []);

  // ฟังก์ชัน Render รายการนักเรียน
  const renderStudentItem = ({ item }) => {
    return (
      <View style={styles.profileContainer}>
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
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Exam Results</Text>
      </View>

      {/* Student List */}
      <Text style={styles.sectionTitle}>Students</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudentItem}
      />

      {/* Overview Section */}
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.overviewContainer}>
        <View style={styles.overviewBox}>
          <Text style={styles.boxTitle}>Ranking</Text>
          <Text style={styles.boxValue}>1</Text> 
        </View>
        <View style={styles.overviewBox}>
          <Text style={styles.boxTitle}>Total Score</Text>
          <Text style={styles.boxValue}>{testResults.reduce((acc, curr) => acc + curr.score, 0)}</Text>
        </View>
      </View>

      {/* Pretest & Posttest Section */}
      <Text style={styles.sectionTitle}>Test Results</Text>
<View style={styles.resultsContainer}>
  {/* Pretest Section */}
  <View style={styles.pretestBox}>
    <Text style={styles.testCategory}>Pretest</Text>
    <FlatList
      data={testResults.filter(item => item.testType === 'pretest')}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.testBox}>
          <Text style={styles.testTitle}>{item.subject}</Text>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{item.score}%</Text>
          </View>
        </View>
      )}
    />
  </View>

  {/* Posttest Section */}
  <View style={styles.posttestBox}>
    <Text style={styles.testCategory}>Posttest</Text>
    <FlatList
      data={testResults.filter(item => item.testType === 'posttest')}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.testBox}>
          <Text style={styles.testTitle}>{item.subject}</Text>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{item.score}%</Text>
          </View>
        </View>
      )}
    />
  </View>
</View>



  {/* <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }} 
          style={styles.profilePic}
        />
        <View style={styles.profileDetails}>
          <Text>Name: {item.name}</Text>
          <Text>ID: {item.studentID}</Text>
        </View>
      </View>
    ); */}
    
      {/* Study Plan Section */}
      <Text style={styles.sectionTitle}>Study Plan</Text>
      <View style={styles.studyPlanBox} />
    </ScrollView>
  );
};

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
  studyPlanBox: {
    backgroundColor: "#D3D3D3",
    height: 50,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default DashboardScreen;
