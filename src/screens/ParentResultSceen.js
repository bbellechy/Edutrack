import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getAllData } from "../services/firestoreService";

const ParentResultSceen = () => {
  const [students, setStudents] = useState([]);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllData();
      setStudents(allData.students || []);
      setTestResults(allData.testResults || []);
    };
    fetchData();
  }, []);

  // Create a render item function to reuse for FlatList
  const renderStudentItem = ({ item }) => (
    <View style={styles.card}>
      <Text>{item.name}</Text>
    </View>
  );

  const renderTestResultItem = ({ item }) => (
    <View style={styles.card}>
      <Text>{item.score}</Text>
      <Text>Pass</Text>
      <Text>📅 14 Feb. 2025</Text>
    </View>
  );

  return (
    <FlatList
      data={[1]} // dummy data for the wrapper of FlatList
      keyExtractor={(item) => item.toString()}
      renderItem={() => (
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Image source={{ uri: "https://via.placeholder.com/50" }} style={styles.profilePic} />
            <Text style={styles.headerText}>Welcome, Parent</Text>
          </View>

          {/* Student List */}
          <Text style={styles.sectionTitle}>Students</Text>
          <FlatList
            data={students}
            keyExtractor={(item) => item.id}
            renderItem={renderStudentItem}
          />

          {/* Summary Stats */}
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.card}>
              <Text>📊Pre-Test</Text>
  
            </View>
            <View style={styles.card}>
              <Text>🔼 Post-Test</Text>
            </View>
          </View>

          {/* Performance Chart */}
          <Text style={styles.sectionTitle}>Progress</Text>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar"],
              datasets: [{ data: [78, 85, 92] }],
            }}
            width={300}
            height={200}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            }}
          />

          {/* Recent Test Results */}
          <Text style={styles.sectionTitle}>Recent Test Results</Text>
          <FlatList
            data={testResults}
            keyExtractor={(item) => item.id}
            renderItem={renderTestResultItem}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#C0E7FF"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  summaryContainer: {
    flexDirection: "row", // Display cards in a row
    justifyContent: "space-between", // Space out the cards
    marginTop: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    flex: 1, // Make each card take equal space
    marginRight: 10, // Add margin between cards
  },
});

export default ParentResultSceen;
