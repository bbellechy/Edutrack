import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const EditQuestionScreen = ({ route, navigation }) => {
  const { subjectID, question, type } = route.params;

  const isEditMode = question && question.id; // ถ้าแก้ไข
  const questionType = question?.type || type; // ถ้า Add ให้ส่ง type มา

  const [newQuestion, setNewQuestion] = useState(question?.question || "");
  const [choices, setChoices] = useState(question?.choices || ["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(question?.correctAnswer || "");

  const handleSave = async () => {
    try {
      if (isEditMode) {
        //Edit
        const questionRef = doc(
          firestore,
          `Tests/oCA2gAV8NVIQpx6z8Ed1/${subjectID}/${question.id}`
        );

        const updatedData = {
          question: newQuestion,
          correctAnswer: correctAnswer,
        };

        if (questionType === "multiple-choice") {
          updatedData.choices = choices;
        }

        await updateDoc(questionRef, updatedData);
      } else {
        //Add
        const questionRef = collection(
          firestore,
          `Tests/oCA2gAV8NVIQpx6z8Ed1/${subjectID}`
        );

        const newData = {
          question: newQuestion,
          correctAnswer: correctAnswer,
          type: questionType,
        };

        if (questionType === "multiple-choice") {
          newData.choices = choices;
        }

        await addDoc(questionRef, newData);
      }

      Alert.alert("Success", isEditMode ? "แก้ไขสำเร็จ" : "เพิ่มคำถามสำเร็จ");
      navigation.replace("AddEditPreTest", { updated: true });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "black" }}>
        {isEditMode ? "แก้ไขคำถาม" : "เพิ่มคำถามใหม่"}
      </Text>

      <TextInput
        placeholder="กรอกคำถาม"
        value={newQuestion}
        onChangeText={setNewQuestion}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      {questionType === "multiple-choice" && (
        <>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "black" }}>
            ตัวเลือก (Choices)
          </Text>
          {choices.map((choice, index) => (
            <TextInput
              key={index}
              placeholder={`ตัวเลือกที่ ${index + 1}`}
              value={choice}
              onChangeText={(text) => {
                const updatedChoices = [...choices];
                updatedChoices[index] = text;
                setChoices(updatedChoices);
              }}
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
          ))}
        </>
      )}

      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "black" }}>
        คำตอบที่ถูกต้อง
      </Text>
      <TextInput
        placeholder="กรอกคำตอบที่ถูกต้อง"
        value={correctAnswer}
        onChangeText={setCorrectAnswer}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <Button
        title={isEditMode ? "บันทึกการแก้ไข" : "เพิ่มคำถาม"}
        onPress={handleSave}
        color="#10B981"
      />
    </ScrollView>
  );
};

export default EditQuestionScreen;
