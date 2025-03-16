import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getAllData } from "../services/firestoreService"; // เรียกใช้ฟังก์ชันที่ดึงข้อมูลทุกตาราง

const StudentsScreen = () => {
  const [data, setData] = useState({
    parents: [],
    students: [],
    testResults: [],
    tests: []
  });

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
    </View>
  );
};

export default StudentsScreen;
