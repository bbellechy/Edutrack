import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import load_test from "../services/firestore/load_test";
import load_test_title from "../services/firestore/load_test_title";

const delete_question = async (subject, questionId) => {
  try {
    const questionRef = doc(
      firestore,
      `Tests/oCA2gAV8NVIQpx6z8Ed1/${subject}/${questionId}`
    );
    await deleteDoc(questionRef);
    console.log("Deleted question:", questionId);
  } catch (error) {
    console.error("Error deleting question:", error);
  }
};

const PretestScreen = () => {
  const [subjectID, setSubjectID] = useState("");
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState([]);
  const [shortAnswerQuestions, setShortAnswerQuestions] = useState([]);
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState([]);
  const [shortAnswers, setShortAnswers] = useState([]);
  const [title, setTitle] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    if (subjectID) {
      console.log("📘 SubjectID changed:", subjectID);
      fetchData(subjectID);
    }
  }, [subjectID]);

  const fetchData = async (subject) => {
    const question = await load_test(subject);
    const test_title = await load_test_title(subject);

    const multipleChoice = question.filter((q) => q.type === "multiple-choice");
    const shortAnswer = question.filter((q) => q.type === "short-answer");

    setTitle(test_title);
    setMultipleChoiceQuestions(multipleChoice);
    setShortAnswerQuestions(shortAnswer);
    setMultipleChoiceAnswers(Array(multipleChoice.length).fill(""));
    setShortAnswers(Array(shortAnswer.length).fill(""));
    setCorrectAnswers(Array(multipleChoice.length + shortAnswer.length).fill(null));
    setScore(null);
    setShowAnswers(false);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#f7fafc" }}>
      {/* Dropdown วิชา */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>เลือกวิชา:</Text>
        <Picker
          selectedValue={subjectID}
          onValueChange={(itemValue) => setSubjectID(itemValue)}
          style={{ backgroundColor: "#fff", borderRadius: 8 }}
        >
          <Picker.Item label="-- กรุณาเลือกวิชา --" value="" />
          <Picker.Item label="คณิตศาสตร์" value="Math" />
          <Picker.Item label="วิทยาศาสตร์" value="Science" />
          <Picker.Item label="ภาษาไทย" value="Thai" />
        </Picker>
      </View>

      {subjectID !== "" && (
        <View>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{title?.title || ""}</Text>
            <Text style={{ fontSize: 16 }}>{title?.description || ""}</Text>
          </View>

          {/* Multiple Choice */}
          {multipleChoiceQuestions.map((item, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
                {item.question}
              </Text>
              {item.choices.map((choice, choiceIndex) => {
                const choiceLabels = ["1.", "2.", "3.", "4."];
                const isSelected = multipleChoiceAnswers[index] === choice;
                const isCorrect = item.correctAnswer === choice;
                const isIncorrect = isSelected && !isCorrect;

                return (
                  <TouchableOpacity
                    key={choiceIndex}
                    onPress={() => {
                      const newAnswers = [...multipleChoiceAnswers];
                      newAnswers[index] = choice;
                      setMultipleChoiceAnswers(newAnswers);
                    }}
                    style={{
                      backgroundColor: showAnswers
                        ? isCorrect
                          ? "#d1fae5" // เขียวอ่อน
                          : isIncorrect
                          ? "#fee2e2" // แดงอ่อน
                          : "#f3f4f6"
                        : isSelected
                        ? "#bfdbfe" // ฟ้าอ่อน
                        : "#f9fafb",
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 5,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {choiceLabels[choiceIndex]} {choice}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {showAnswers && (
                <Text style={{ color: "green", marginTop: 5 }}>
                  ✅ คำตอบที่ถูกต้อง: {item.correctAnswer}
                </Text>
              )}
              {/* ปุ่มลบคำถาม */}
              <Button
                title="🗑️ ลบคำถาม"
                color="#dc2626"
                onPress={async () => {
                  await delete_question(subjectID, item.id);
                  await fetchData(subjectID);
                }}
              />
            </View>
          ))}

          {/* Short Answer */}
          {shortAnswerQuestions.map((item, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
                {item.question}
              </Text>
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
                      ? "#4CAF50"
                      : "#FF5733"
                    : "#d1d5db",
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  marginBottom: 10,
                }}
                placeholder="พิมพ์คำตอบของคุณที่นี่..."
              />
              {showAnswers && (
                <Text style={{ color: "green", marginBottom: 5 }}>
                  ✅ คำตอบที่ถูกต้อง: {item.correctAnswer}
                </Text>
              )}
              {/* ปุ่มลบคำถาม */}
              <Button
                title="🗑️ ลบคำถาม"
                color="#dc2626"
                onPress={async () => {
                  await delete_question(subjectID, item.id);
                  await fetchData(subjectID);
                }}
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default PretestScreen;
