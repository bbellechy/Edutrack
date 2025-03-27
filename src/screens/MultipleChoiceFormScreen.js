import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, ScrollView } from "react-native";
import save_test_score from "../services/firestore/save_test_score"
import load_test from "../services/firestore/load_test";
import load_test_title from "../services/firestore/load_test_title";

const MultipleChoiceForm = () => {
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState([]);
  const [title, setTitle] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const question = await load_test("oCA2gAV8NVIQpx6z8Ed1");
      const test_title = await load_test_title("oCA2gAV8NVIQpx6z8Ed1");
      setTitle(test_title);
      setMultipleChoiceQuestions(question);
    };
    fetchData();
    console.log(111, title)
    console.log(222, multipleChoiceQuestions)
  }, []);



  // คำถามแบบตัวเลือก (Multiple Choice) 
  const multipleChoiceQuestions_old = [
    {
      question: "1. อุปกรณ์ใดใช้สำหรับเก็บข้อมูลถาวร?",
      choices: ["RAM", "CPU", "HDD", "Power Supply"],
      correctAnswer: "HDD",
    },
    {
      question: "2. ซอฟต์แวร์ใดเป็นระบบปฏิบัติการ?",
      choices: ["Microsoft Word", "Windows", "Photoshop", "Google Chrome"],
      correctAnswer: "Windows",
    },
    {
      question: "3. หน่วยความจำใดทำให้คอมพิวเตอร์เปิดเครื่องได้เร็วขึ้น?",
      choices: ["RAM", "HDD", "SSD", "Power Supply"],
      correctAnswer: "SSD",
    },
    {
      question: "4. ภาษาโปรแกรมใดนิยมใช้พัฒนาเว็บไซต์?",
      choices: ["Python", "HTML", "C++", "Java"],
      correctAnswer: "HTML",
    },
    {
      question: "5. ไฟล์ใดเป็นไฟล์รูปภาพ?",
      choices: [".exe", ".mp3", ".jpg", ".txt"],
      correctAnswer: ".jpg",
    },
  ];

  // เก็บคำตอบของผู้ใช้
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState(
    Array(multipleChoiceQuestions.length).fill("")
  );
  const [score, setScore] = useState(null);

  // ฟังก์ชันบันทึกคำตอบและตรวจคะแนน
  const handleSubmit = async () => {
    let totalScore = 0;

    // ตรวจคำตอบแบบตัวเลือก
    multipleChoiceAnswers.forEach((answer, index) => {
      if (answer === multipleChoiceQuestions[index].correctAnswer) {
        totalScore += 1;
      }
    });

    setScore(totalScore);

    // ล้างคำตอบหลังส่ง
    setMultipleChoiceAnswers(Array(multipleChoiceQuestions.length).fill(""));

    const randomNumber = Math.floor((Math.random() * 100) + 1);
    const randNum = Math.floor((Math.random() * 3) + 1)
    await save_test_score(totalScore, randomNumber.toString(), randomNumber.toString(), randNum.toString());

    Alert.alert(`✅ คุณได้ ${totalScore} คะแนน จาก ${multipleChoiceQuestions.length} ข้อ`);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#f7fafc' }}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 0 }}>{title.title}</Text>
        <Text style={{ fontSize: 18, fontWeight: '', marginBottom: 20 }}>{title.Description}</Text>

        {/* คำถามแบบตัวเลือก */}
        <View style={{ width: '100%' }}>
          {multipleChoiceQuestions.map((item, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>{item.question}</Text>
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

        {/* ปุ่มบันทึก */}
        <Button
          title="💾 บันทึกคำตอบ"
          onPress={handleSubmit}
          color="#007bff"
        />

        {/* แสดงคะแนน */}
        {score !== null && (
          <View style={{ marginTop: 20, padding: 10, backgroundColor: '#f0f4f8', borderRadius: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              🎯 คุณได้คะแนน: <Text style={{ color: '#1d4ed8' }}>{score}</Text> / {multipleChoiceQuestions.length} จากข้อคำถามเลือกตอบ
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MultipleChoiceForm;
