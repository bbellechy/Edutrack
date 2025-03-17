import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { getAllData } from "../services/firestoreService"; // เรียกใช้ฟังก์ชันที่ดึงข้อมูลทุกตาราง
import { firestore } from "../firebase";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";



const StudentsScreen = () => {
  const [data, setData] = useState({
    parents: [],
    students: [],
    testResults: [],
    tests: []
  });

  const save_test_score = async () => {
    const score = 100;
    const testResultID = "1";
    const test_id = "1";

    try {
      await addDoc(collection(firestore, "TestResult"), {
        score: score,
        testResultID: testResultID,
        test_date: Timestamp.fromDate(new Date("2023-03-14T21:09:29+07:00")),
        test_id: test_id
      })
      Alert.alert("Success  fully");
    }
    catch (error) {
      console.log(error);
      Alert.alert("Error: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllData(); // ดึงข้อมูลทั้งหมด
      setData(allData); // เซ็ตข้อมูลลง state
    };

    fetchData();
  }, []);



  return (
    <View>
      <Text>Parents List</Text>
      <FlatList
        data={data.parents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />

      <Text>Students List</Text>
      <FlatList
        data={data.students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />

      <Text>Test Results List</Text>
      <FlatList
        data={data.testResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />

      <Text>Tests List</Text>
      <FlatList
        data={data.tests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />

      <Button
        onPress={save_test_score}
        title="Submit Test"
        color="#000000"
      />
    </View>
  );
};

export default StudentsScreen;
