import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import save_test_score from "../services/firestore/save_test_score";
import load_test from "../services/firestore/load_test";
import load_test_title from "../services/firestore/load_test_title";
import { useRoute } from "@react-navigation/native";

const PreTestScreen = () => {
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState([]);
  const [shortAnswerQuestions, setShortAnswerQuestions] = useState([]);
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState([]);
  const [shortAnswers, setShortAnswers] = useState([]);
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(null);

  const [shortAnswerErrors, setShortAnswerErrors] = useState([]);
  const [multipleChoiceErrors, setMultipleChoiceErrors] = useState([]);
  const route = useRoute();
  const { subjectID } = route.params || {};
  const [showAnswers, setShowAnswers] = useState(false); // 👉 ใช้แสดงเฉลย
  const [correctAnswers, setCorrectAnswers] = useState([]); // 👉 ใช้เก็บข้อมูลว่าข้อตอบถูกหรือผิด


  useEffect(() => {
    const fetchData = async () => {
      const question = await load_test(subjectID);
      const test_title = await load_test_title(subjectID);

      const multipleChoice = question.filter((q) => q.type === "multiple-choice");
      const shortAnswer = question.filter((q) => q.type === "short-answer");

      setTitle(test_title);
      setMultipleChoiceQuestions(multipleChoice);
      setShortAnswerQuestions(shortAnswer);
      setMultipleChoiceAnswers(Array(multipleChoice.length).fill(""));
      setShortAnswers(Array(shortAnswer.length).fill(""));
      setCorrectAnswers(Array(multipleChoice.length + shortAnswer.length).fill(null)); // 👉 ตั้งค่าเริ่มต้นให้ยังไม่มีคำตอบถูกผิด
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    let totalScore = 0;
    let updatedCorrectAnswers = [...correctAnswers];

    if (multipleChoiceAnswers.includes("") || shortAnswers.some((answer) => answer.trim() === "")) {
      Alert.alert("❌ กรุณาตอบให้ครบทุกข้อก่อนส่งแบบทดสอบ");
      return;
    }

    // ตรวจคำตอบ Multiple Choice
    multipleChoiceAnswers.forEach((answer, index) => {
      if (answer === multipleChoiceQuestions[index].correctAnswer) {
        totalScore += 1;
        updatedCorrectAnswers[index] = true; // ✅ ตอบถูก
      } else {
        updatedCorrectAnswers[index] = false; // ❌ ตอบผิด
      }
    });

    // ตรวจคำตอบ Short Answer
    shortAnswers.forEach((answer, index) => {
      if (answer.trim().toLowerCase() === shortAnswerQuestions[index].correctAnswer.trim().toLowerCase()) {
        totalScore += 1;
        updatedCorrectAnswers[multipleChoiceQuestions.length + index] = true; // ✅ ตอบถูก
      } else {
        updatedCorrectAnswers[multipleChoiceQuestions.length + index] = false; // ❌ ตอบผิด
      }
    });

    setScore(totalScore);
    setMultipleChoiceAnswers(Array(multipleChoiceQuestions.length).fill(""));
    setShortAnswers(Array(shortAnswerQuestions.length).fill(""));
    setShortAnswerErrors([]);
    setMultipleChoiceErrors([]);
    setCorrectAnswers(updatedCorrectAnswers);
    setShowAnswers(true); // 👉 แสดงเฉลยหลังจากกดบันทึก

    const randomNumber = Math.floor(Math.random() * 1000 + 1);
    await save_test_score(totalScore, "S000099", randomNumber.toString(), title.test_id, title.subject, "pre-test");

    Alert.alert(`✅ คุณได้ ${totalScore} คะแนน จาก ${multipleChoiceQuestions.length + shortAnswerQuestions.length} ข้อ`);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#f7fafc" }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 0 }}>{title.title}</Text>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>{title.description}</Text>

        {/* คำถามแบบตัวเลือก */}
        <View style={{ width: "100%" }}>
          {multipleChoiceQuestions.map((item, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>{item.question}</Text>
              {item.choices.map((choice, choiceIndex) => (
                <View key={choiceIndex} style={{ marginBottom: 10 }}>
                  <Button
                    title={choice}
                    onPress={() => {
                      const newAnswers = [...multipleChoiceAnswers];
                      newAnswers[index] = choice;
                      setMultipleChoiceAnswers(newAnswers);
                    }}
                    color={
                      showAnswers
                        ? choice === item.correctAnswer
                          ? "#4CAF50" // ✅ สีเขียว (ตอบถูก)
                          : multipleChoiceAnswers[index] === choice
                          ? "#FF5733" // ❌ สีแดง (ตอบผิด)
                          : "#2196F3" // 🔹 สีฟ้า (ตัวเลือกทั่วไป)
                        : multipleChoiceAnswers[index] === choice
                        ? "#4CAF50"
                        : "#2196F3"
                    }
                  />
                </View>
              ))}
              {showAnswers && (
                <Text style={{ color: "green", marginTop: 5 }}>
                  ✅ คำตอบที่ถูกต้อง: {item.correctAnswer}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* คำถามแบบ Short Answer */}
        <View style={{ width: "100%" }}>
          {shortAnswerQuestions.map((item, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>{item.question}</Text>
              <TextInput
                value={shortAnswers[index]}
                onChangeText={(text) => {
                  const newAnswers = [...shortAnswers];
                  newAnswers[index] = text;
                  setShortAnswers(newAnswers);
                }}
                multiline
                numberOfLines={3}
                style={{
                  height: 50,
                  borderColor: showAnswers
                    ? correctAnswers[multipleChoiceQuestions.length + index]
                      ? "#4CAF50" // ✅ สีเขียว (ตอบถูก)
                      : "#FF5733" // ❌ สีแดง (ตอบผิด)
                    : "#d1d5db",
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                placeholder="พิมพ์คำตอบของคุณที่นี่..."
              />
              {showAnswers && (
                <Text style={{ color: "green", marginTop: 5 }}>
                  ✅ คำตอบที่ถูกต้อง: {item.correctAnswer}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* ปุ่มบันทึก */}
        <Button title="💾 บันทึกคำตอบ" onPress={handleSubmit} color="#007bff" />

        {/* แสดงคะแนน */}
        {score !== null && (
          <View style={{ marginTop: 20, padding: 10, backgroundColor: "#f0f4f8", borderRadius: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              🎯 คุณได้คะแนน: <Text style={{ color: "#1d4ed8" }}>{score}</Text> /{" "}
              {multipleChoiceQuestions.length + shortAnswerQuestions.length} ข้อ
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PreTestScreen;
