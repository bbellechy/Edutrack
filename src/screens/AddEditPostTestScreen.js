import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import load_test from "../services/firestore/load_test";
import load_test_title from "../services/firestore/load_test_title";

const AddPostTestScreen = () => {
  const [subjectID, setSubjectID] = useState("");
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState([]);
  const [shortAnswerQuestions, setShortAnswerQuestions] = useState([]);
  const [title, setTitle] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    if (subjectID) {
      fetchData(subjectID);
    }
  }, [subjectID]);

  useLayoutEffect(() => {
    if (subjectID) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => handleAddQuestion()}
            style={{ marginRight: 15 }}
          >
            <Text style={{ fontSize: 18, color: "#3B82F6" }}>เพิ่มคำถาม</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, subjectID]);

  const fetchData = async (subject) => {
    const question = await load_test(subject);
    const test_title = await load_test_title(subject);

    const multipleChoice = question.filter((q) => q.type === "multiple-choice");
    const shortAnswer = question.filter((q) => q.type === "short-answer");

    setTitle(test_title);
    setMultipleChoiceQuestions(multipleChoice);
    setShortAnswerQuestions(shortAnswer);
  };

  const handleAddQuestion = () => {
    Alert.alert("เลือกประเภทคำถาม", "ต้องการเพิ่มคำถามแบบไหน?", [
      {
        text: "Multiple Choice",
        onPress: () =>
          navigation.navigate("AddEditQuestion", {
            subjectID,
            type: "multiple-choice",
          }),
      },
      {
        text: "Short Answer",
        onPress: () =>
          navigation.navigate("AddEditQuestion", {
            subjectID,
            type: "short-answer",
          }),
      },
      { text: "ยกเลิก", style: "cancel" },
    ]);
  };

  return (
    <ScrollView
      contentContainerStyle={{ padding: 20, backgroundColor: "#f7fafc" }}
    >
      {/* Dropdown เลือกวิชา */}
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
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {title?.title || ""}
            </Text>
            <Text style={{ fontSize: 16 }}>{title?.description || ""}</Text>
          </View>

          {/* Multiple Choice */}
          {multipleChoiceQuestions.map((item, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}
              >
                {item.question}
              </Text>
              {item.choices.map((choice, choiceIndex) => (
                <Text
                  key={choiceIndex}
                  style={{ fontSize: 16, marginBottom: 5 }}
                >
                  {choiceIndex + 1}. {choice}
                </Text>
              ))}
              <Text style={{ color: "green", marginTop: 5 }}>
                ✅ คำตอบที่ถูกต้อง: {item.correctAnswer}
              </Text>
              <Button
                title="✏️ แก้ไขคำถาม"
                color="#3B82F6"
                onPress={() =>
                  navigation.navigate("AddEditQuestion", {
                    subjectID,
                    question: item,
                  })
                }
              />
            </View>
          ))}

          {/* Short Answer */}
          {shortAnswerQuestions.map((item, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}
              >
                {item.question}
              </Text>
              <Text style={{ fontSize: 16, color: "green", marginBottom: 5 }}>
                ✅ คำตอบที่ถูกต้อง: {item.correctAnswer}
              </Text>
              <Button
                title="✏️ แก้ไขคำถาม"
                color="#3B82F6"
                onPress={() =>
                  navigation.navigate("AddEditQuestion", {
                    subjectID,
                    question: item,
                  })
                }
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default AddPostTestScreen;
