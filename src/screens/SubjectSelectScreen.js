import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAllData } from "../services/firestoreService";

const SubjectSelectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { testType } = route.params || {};

  const [groupedBySubject, setGroupedBySubject] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllData();
      if (allData) {
        const subjectList = Object.keys(allData.groupedBySubject).map((subjectName) => ({
          subjectName,
          tests: allData.groupedBySubject[subjectName],
        }));
        setGroupedBySubject(subjectList);
      } else {
        setGroupedBySubject([]);
      }
    };
    fetchData();
  }, []);

  const handleSubjectClick = (subjectID) => {
    console.log(`Navigating to ${testType} for subject ${subjectID}`);
    if (testType === "PreTest") {
      navigation.navigate("PreTest", { subjectID });
    } else {
      navigation.navigate("PostTest", { subjectID });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#C0E7FF", padding: 10, alignItems: "center" }}>
      {groupedBySubject === null ? (
        <Text>กำลังโหลดข้อมูล...</Text>
      ) : groupedBySubject.length > 0 ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          {groupedBySubject.map((subject) => (
            <TouchableOpacity
              key={subject.subjectName}
              onPress={() => handleSubjectClick(subject.subjectName)}
              onPressIn={() => setHovered(subject.subjectName)}
              onPressOut={() => setHovered(null)}
              style={{
                margin: 10,
                padding: 20,
                backgroundColor: hovered === subject.subjectName ? "#b0b0b0" : "#90CAF9",
                borderWidth: 1,
                borderColor: "#0D47A1",
                borderRadius: 15,
                alignItems: "center",
                width: "45%",
                height: 120,
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
                {subject.subjectName || "ไม่มีชื่อวิชา"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text>ไม่มีข้อมูล</Text>
      )}
    </View>
  );
};

export default SubjectSelectScreen;
