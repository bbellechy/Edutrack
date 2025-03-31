import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'; // ใช้ useNavigation
import { getAllData } from "../services/firestoreService";

const DashboardScreen = () => {
  const [groupedBySubject, setGroupedBySubject] = useState(null); // ตั้งค่าเริ่มต้นเป็น null
  const [hovered, setHovered] = useState(null); // เพิ่ม state สำหรับจับการเอานิ้วไปชี้
  const navigation = useNavigation(); // กำหนด navigation ด้วย useNavigation

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllData();
      console.log("มาจ้าาาาา");

      if (allData) {
        // เปลี่ยน groupedBySubject จากอ็อบเจกต์เป็นอาเรย์
        const subjectList = Object.keys(allData.groupedBySubject).map((subjectName) => ({
          subjectName,
          tests: allData.groupedBySubject[subjectName],
        }));
        setGroupedBySubject(subjectList); // ตั้งค่า groupedBySubject
      } else {
        setGroupedBySubject([]); // ถ้าไม่มีข้อมูลก็สามารถตั้งเป็นอาเรย์เปล่าได้
      }
    };
    fetchData();
  }, []);

  const handleSubjectClick = (subjectID) => {
    console.log(`Navigating to test for subject ${subjectID}`);
    navigation.navigate('Multiple'); // ใช้ navigation เพื่อนำทางไปหน้าต่างๆ
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#C0E7FF" }}>
      {/* ตรวจสอบว่า groupedBySubject เป็น null หรือไม่ */}
      <View style={{ padding: 10, flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {/* ถ้า groupedBySubject เป็น null หรือยังไม่ได้รับข้อมูล แสดงข้อความ "กำลังโหลดข้อมูล..." */}
        {groupedBySubject === null ? (
          <Text>กำลังโหลดข้อมูล...</Text>
        ) : groupedBySubject.length > 0 ? (
          // ถ้ามีข้อมูลแล้ว ให้แสดงข้อมูล
          groupedBySubject.map((subject) => (
            <TouchableOpacity
              key={subject.subjectName}
              onPress={() => handleSubjectClick(subject.subjectName)} // ใช้ handleSubjectClick เพื่อนำทาง
              onPressIn={() => setHovered(subject.subjectName)} // เมื่อชี้ที่ปุ่ม
              onPressOut={() => setHovered(null)} // เมื่อออกจากปุ่ม
              style={{
                margin: 10,
                padding: 20,
                backgroundColor: hovered === subject.subjectName ? "#b0b0b0" : "#90CAF9", // สีฟ้าเมื่อไม่ชี้
                borderWidth: 1,
                borderColor: "#0D47A1",
                borderRadius: 15,
                alignItems: "center", // จัดข้อความให้กึ่งกลาง
                width: "45%", // ทำให้แต่ละปุ่มอยู่ในแถวละ 2 ปุ่ม
                height: 120, // กำหนดขนาดปุ่ม
                justifyContent: "center", // จัดข้อความให้อยู่กลาง
                shadowColor: "#000", // เพิ่มเงา
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5, // สำหรับ Android
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
                {subject.subjectName || "ไม่มีชื่อวิชา"} {/* ถ้ามีค่าจะใช้ชื่อวิชา ถ้าไม่มีก็จะแสดง "ไม่มีชื่อวิชา" */}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>ไม่มีข้อมูล</Text> // ถ้าไม่มีข้อมูลจาก `groupedBySubject`
        )}
      </View>
    </View>
  );
};

export default DashboardScreen;
