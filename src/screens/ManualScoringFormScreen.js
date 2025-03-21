import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import save_test_score from "../save_test_score";

const ManualScoringForm = () => {
  // คำถามแบบตอบเอง (Short Answer)
  const shortAnswerQuestions = [
    "1. อะไรคือระบบปฏิบัติการ (Operating System)?",
    "2. อธิบายความแตกต่างระหว่าง HDD และ SSD",
    "3. CPU ทำหน้าที่อะไรในคอมพิวเตอร์?",
    "4. RAM คืออะไร และมีผลต่อการทำงานของคอมพิวเตอร์อย่างไร?",
    "5. คุณคิดว่า AI มีผลกระทบอย่างไรต่อวงการคอมพิวเตอร์ในอนาคต?",
  ];

  // เก็บคำตอบของผู้ใช้
  const [shortAnswers, setShortAnswers] = useState(Array(shortAnswerQuestions.length).fill(""));
  const [score, setScore] = useState(null);

  // ฟังก์ชันบันทึกคำตอบและตรวจคะแนน
  const handleSubmit = async () => {
    let totalScore = 0;

    // เนื่องจากคำถามเป็นแบบตอบเอง ไม่มีคำตอบที่ถูกต้องคงที่
    // อาจจะต้องประเมินคำตอบด้วยวิธีการอื่น เช่น ตรวจสอบคำตอบที่ผู้ใช้ให้มา
    // ในที่นี้เราจะตั้งให้คะแนนเป็น 0 ถ้าผู้ใช้ไม่ตอบคำถาม
    shortAnswers.forEach((answer) => {
      if (answer.trim() !== "") {
        totalScore += 1;  // สมมุติว่าให้คะแนน 1 คะแนนต่อคำถามที่ตอบ
      }
    });

    setScore(totalScore);

    // ล้างคำตอบหลังส่ง
    setShortAnswers(Array(shortAnswerQuestions.length).fill(""));

    const randomNumber = Math.floor((Math.random() * 100) + 1);
    const randNum = Math.floor((Math.random() * 3) + 1)
    await save_test_score(totalScore, randomNumber.toString(), randomNumber.toString(), randNum.toString());

    Alert.alert(`✅ คุณได้ ${totalScore} คะแนน จาก ${shortAnswerQuestions.length} ข้อ`);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#f7fafc' }}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>📝 แบบฟอร์มตอบคำถามคอมพิวเตอร์</Text>

        {/* คำถามแบบตอบเอง */}
        <View style={{ width: '100%' }}>
          {shortAnswerQuestions.map((question, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>{question}</Text>
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
                  height: 100,
                  borderColor: '#d1d5db',
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
        <Button
          title="💾 บันทึกคำตอบ"
          onPress={handleSubmit}
          color="#007bff"
        />

        {/* แสดงคะแนน */}
        {score !== null && (
          <View style={{ marginTop: 20, padding: 10, backgroundColor: '#f0f4f8', borderRadius: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              🎯 คุณได้คะแนน: <Text style={{ color: '#1d4ed8' }}>{score}</Text> / {shortAnswerQuestions.length} จากข้อคำถามตอบเอง
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ManualScoringForm;
