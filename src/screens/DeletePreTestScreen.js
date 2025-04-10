import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { firestore } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

const TEST_DOC_ID = "oCA2gAV8NVIQpx6z8Ed1";

// 🔸 รายชื่อวิชาที่มีอยู่ (หากต้องการ dynamic ค่อยเปลี่ยนทีหลัง)
const SUBJECTS = ["Thai", "Math", "Science"];

const DeletePreTestScreen = () => {
  const [testList, setTestList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [testTitle, setTestTitle] = useState(null);

  // ✅ โหลด meta ของแต่ละวิชา
  useEffect(() => {
    const fetchTestList = async () => {
      const testPromises = SUBJECTS.map(async (subjectName) => {
        const metaDocRef = doc(firestore, "Tests", TEST_DOC_ID, subjectName, "meta");
        const metaSnap = await getDoc(metaDocRef);

        if (metaSnap.exists()) {
          const metaData = metaSnap.data();
          return {
            subject: subjectName,
            title: metaData.title || subjectName,
            description: metaData.description || "",
          };
        } else {
          return null;
        }
      });

      const testData = (await Promise.all(testPromises)).filter(Boolean);
      setTestList(testData);
    };

    fetchTestList();
  }, []);

  // ✅ โหลดคำถามเมื่อเลือกวิชา
  useEffect(() => {
    const fetchTestDetails = async () => {
      if (!selectedSubject) return;

      // โหลด meta
      const metaDocRef = doc(firestore, "Tests", TEST_DOC_ID, selectedSubject, "meta");
      const metaSnap = await getDoc(metaDocRef);
      if (metaSnap.exists()) {
        setTestTitle(metaSnap.data());
      }

      // โหลดคำถามทั้งหมด (ยกเว้น meta)
      const subjectColRef = collection(firestore, "Tests", TEST_DOC_ID, selectedSubject);
      const snapshot = await getDocs(subjectColRef);
      const questionsData = snapshot.docs
        .filter((doc) => doc.id !== "meta")
        .map((doc) => ({ id: doc.id, ...doc.data() }));

      setQuestions(questionsData);
    };

    fetchTestDetails();
  }, [selectedSubject]);

  const handleDeleteQuestion = (questionId) => {
    Alert.alert("⚠️ ยืนยัน", "ต้องการลบข้อนี้จริงหรือไม่?", [
      { text: "ยกเลิก", style: "cancel" },
      {
        text: "ลบ",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(firestore, "Tests", TEST_DOC_ID, selectedSubject, questionId));
            const updatedQuestions = questions.filter((q) => q.id !== questionId);
            setQuestions(updatedQuestions);
            Alert.alert("✅ ลบเรียบร้อยแล้ว");
          } catch (error) {
            console.error("ลบไม่สำเร็จ:", error);
            Alert.alert("❌ ลบไม่สำเร็จ");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        📝 เลือกวิชาที่ต้องการดูหรือลบ
      </Text>

      <View style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 8, marginBottom: 20 }}>
        <Picker
          selectedValue={selectedSubject}
          onValueChange={(itemValue) => setSelectedSubject(itemValue)}
        >
          <Picker.Item label="-- กรุณาเลือกวิชา --" value={null} />
          {testList.map((test) => (
            <Picker.Item key={test.subject} label={test.title} value={test.subject} />
          ))}
        </Picker>
      </View>

      {testTitle && (
        <>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5 }}>
            {testTitle?.title}
          </Text>
          <Text style={{ marginBottom: 20 }}>{testTitle?.description}</Text>

          {questions.map((q, index) => (
            <View
              key={q.id}
              style={{
                padding: 10,
                marginBottom: 15,
                backgroundColor: "#f1f5f9",
                borderRadius: 8,
              }}
            >
              <Text style={{ fontWeight: "600" }}>
                ข้อ {index + 1}: {q.question}
              </Text>
              {q.type === "multiple-choice" ? (
                q.choices?.map((choice, i) => (
                  <Text key={i} style={{ paddingLeft: 10, marginTop: 3 }}>
                    - {choice}
                  </Text>
                ))
              ) : (
                <Text style={{ fontStyle: "italic", marginTop: 5 }}>
                  คำตอบ: __________
                </Text>
              )}
              <View style={{ marginTop: 10 }}>
                <Button
                  title="🗑️ ลบข้อนี้"
                  color="red"
                  onPress={() => handleDeleteQuestion(q.id)}
                />
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default DeletePreTestScreen;
