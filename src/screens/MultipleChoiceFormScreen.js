import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import save_test_score from "../services/firestore/save_test_score";
import load_test from "../services/firestore/load_test";
import load_test_title from "../services/firestore/load_test_title";

const MultipleChoiceForm = () => {
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState([]);
  const [shortAnswerQuestions, setShortAnswerQuestions] = useState([]);
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState([]);
  const [shortAnswers, setShortAnswers] = useState([]);
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const question = await load_test("oCA2gAV8NVIQpx6z8Ed1");
      const test_title = await load_test_title("oCA2gAV8NVIQpx6z8Ed1");

      // แยกคำถามแบบ Multiple Choice และ Short Answer
      const multipleChoice = question.filter((q) => q.type === "multiple-choice");
      const shortAnswer = question.filter((q) => q.type === "short-answer");

      setTitle(test_title);
      setMultipleChoiceQuestions(multipleChoice);
      setShortAnswerQuestions(shortAnswer);
      setMultipleChoiceAnswers(Array(multipleChoice.length).fill(""));
      setShortAnswers(Array(shortAnswer.length).fill(""));
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    let totalScore = 0;

    // ตรวจคำตอบแบบ Multiple Choice
    multipleChoiceAnswers.forEach((answer, index) => {
      if (answer === multipleChoiceQuestions[index].correctAnswer) {
        totalScore += 1;
      }
    });

    // ตรวจคำตอบแบบ Short Answer
    shortAnswers.forEach((answer, index) => {
      if (answer.trim().toLowerCase() === shortAnswerQuestions[index].correctAnswer.trim().toLowerCase()) {
        totalScore += 1;
      }
    });

    setScore(totalScore);

    // ล้างคำตอบหลังส่ง
    setMultipleChoiceAnswers(Array(multipleChoiceQuestions.length).fill(""));
    setShortAnswers(Array(shortAnswerQuestions.length).fill(""));

    const randomNumber = Math.floor(Math.random() * 100 + 1);
    const randNum = Math.floor(Math.random() * 3 + 1);
    await save_test_score(totalScore, randomNumber.toString(), randomNumber.toString(), randNum.toString());

    Alert.alert(`✅ คุณได้ ${totalScore} คะแนน จาก ${multipleChoiceQuestions.length + shortAnswerQuestions.length} ข้อ`);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#f7fafc" }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 0 }}>{title.title}</Text>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>{title.Description}</Text>

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
                    color={multipleChoiceAnswers[index] === choice ? "#4CAF50" : "#2196F3"}
                  />
                </View>
              ))}
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
                  borderColor: "#d1d5db",
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                placeholder="พิมพ์คำตอบของคุณที่นี่..."
              />
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

export default MultipleChoiceForm;