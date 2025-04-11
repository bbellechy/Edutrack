import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // 👉 Import the icon library
import { Picker } from "@react-native-picker/picker"; // 👉 Import the Picker component
import save_test_score from "../services/firestore/save_test_score";
import load_test from "../services/firestore/load_test";
import load_test_title from "../services/firestore/load_test_title";
import update_test_question from "../services/firestore/update_test_question"; // 👉 Import the update function
import add_test_question from "../services/firestore/add_test_question"; // 👉 Import the add function
import { useRoute } from "@react-navigation/native";

const PostTestScreen = () => {
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState([]);
  const [shortAnswerQuestions, setShortAnswerQuestions] = useState([]);
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState([]);
  const [shortAnswers, setShortAnswers] = useState([]);
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(null);
  const route = useRoute();
  const { subjectID } = route.params || {};
  const [showAnswers, setShowAnswers] = useState(false); // 👉 ใช้แสดงเฉลย
  const [correctAnswers, setCorrectAnswers] = useState([]); // 👉 ใช้เก็บข้อมูลว่าข้อตอบถูกหรือผิด
  const [editingQuestion, setEditingQuestion] = useState({ type: null, index: null }); // 👉 Track which question is being edited
  const [tempQuestion, setTempQuestion] = useState(""); // 👉 Temporary storage for the edited question
  const [tempChoices, setTempChoices] = useState([]); // 👉 Temporary storage for the edited choices
  const [tempCorrectAnswer, setTempCorrectAnswer] = useState(""); // 👉 Temporary storage for the edited correct answer
  const [newQuestion, setNewQuestion] = useState(""); // 👉 Store the new question text
  const [newQuestionType, setNewQuestionType] = useState("multiple-choice"); // 👉 Store the new question type
  const [newChoices, setNewChoices] = useState(["", "", "", ""]); // 👉 Store choices for multiple-choice questions
  const [newCorrectAnswer, setNewCorrectAnswer] = useState(""); // 👉 Store the correct answer
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false); // 👉 Track whether the form is visible

  const toggleAddQuestionForm = () => {
    setShowAddQuestionForm(!showAddQuestionForm);
  };

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

  const handleEditQuestion = async (type, index, updatedQuestion, updatedChoices, updatedCorrectAnswer) => {
    try {
      if (type === "multiple-choice") {
        const updatedQuestions = [...multipleChoiceQuestions];
        updatedQuestions[index].question = updatedQuestion;
        updatedQuestions[index].choices = updatedChoices;
        updatedQuestions[index].correctAnswer = updatedCorrectAnswer;
        setMultipleChoiceQuestions(updatedQuestions);
        await update_test_question(subjectID, updatedQuestions[index].id, {
          question: updatedQuestion,
          choices: updatedChoices,
          correctAnswer: updatedCorrectAnswer,
        });
      } else if (type === "short-answer") {
        const updatedQuestions = [...shortAnswerQuestions];
        updatedQuestions[index].question = updatedQuestion;
        updatedQuestions[index].correctAnswer = updatedCorrectAnswer;
        setShortAnswerQuestions(updatedQuestions);
        await update_test_question(subjectID, updatedQuestions[index].id, {
          question: updatedQuestion,
          correctAnswer: updatedCorrectAnswer,
        });
      }
      Alert.alert("✅ คำถามถูกแก้ไขเรียบร้อยแล้ว");
    } catch (error) {
      Alert.alert("❌ เกิดข้อผิดพลาดในการแก้ไขคำถาม");
    }
  };

  const startEditing = (type, index, currentQuestion, currentChoices, currentCorrectAnswer) => {
    setEditingQuestion({ type, index });
    setTempQuestion(currentQuestion);
    setTempChoices(currentChoices || []);
    setTempCorrectAnswer(currentCorrectAnswer || "");
  };

  const cancelEditing = () => {
    setEditingQuestion({ type: null, index: null });
    setTempQuestion("");
    setTempChoices([]);
    setTempCorrectAnswer("");
  };

  const confirmEditing = async () => {
    const { type, index } = editingQuestion;
    await handleEditQuestion(type, index, tempQuestion, tempChoices, tempCorrectAnswer);
    setEditingQuestion({ type: null, index: null });
    setTempQuestion("");
    setTempChoices([]);
    setTempCorrectAnswer("");
  };

  const handleAddQuestion = async () => {
    if (!newQuestion.trim() || !newCorrectAnswer.trim()) {
      Alert.alert("❌ กรุณากรอกคำถามและคำตอบที่ถูกต้อง");
      return;
    }

    try {
      const newQuestionData = {
        question: newQuestion,
        type: newQuestionType,
        choices: newQuestionType === "multiple-choice" ? newChoices : [],
        correctAnswer: newCorrectAnswer,
      };

      // ใช้ subjectID เป็น Test ID และ title.subject เป็น Subject เช่น Math, Thai, Science
      const questionID = await add_test_question(subjectID, title.subject, newQuestionData);

      if (newQuestionType === "multiple-choice") {
        setMultipleChoiceQuestions([...multipleChoiceQuestions, { ...newQuestionData, id: questionID }]);
      } else {
        setShortAnswerQuestions([...shortAnswerQuestions, { ...newQuestionData, id: questionID }]);
      }

      setNewQuestion("");
      setNewChoices(["", "", "", ""]);
      setNewCorrectAnswer("");
      Alert.alert("✅ เพิ่มคำถามเรียบร้อยแล้ว");
    } catch (error) {
      Alert.alert("❌ เกิดข้อผิดพลาดในการเพิ่มคำถาม");
    }
  };

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
    setCorrectAnswers(updatedCorrectAnswers);
    setShowAnswers(true); // 👉 แสดงเฉลยหลังจากกดบันทึก

    const randomNumber = Math.floor(Math.random() * 1000 + 1);
    await save_test_score(totalScore, "S000099", randomNumber.toString(), title.test_id, title.subject, "post-test");

    Alert.alert(`✅ คุณได้ ${totalScore} คะแนน จาก ${multipleChoiceQuestions.length + shortAnswerQuestions.length} ข้อ`);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#f7fafc" }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 0 }}>{title.title}</Text>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>{title.description}</Text>

        {/* ปุ่มเพิ่มคำถาม */}
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", flex: 1 }}>คำถาม</Text>
          <TouchableOpacity onPress={toggleAddQuestionForm}>
            <Icon name={showAddQuestionForm ? "remove" : "add"} size={30} color="#007bff" />
          </TouchableOpacity>
        </View>

        {/* ฟอร์มเพิ่มคำถาม */}
        {showAddQuestionForm && (
          <View style={{ marginVertical: 10, padding: 40, backgroundColor: "#f0f4f8", borderRadius: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom:10 }}>เพิ่มคำถามใหม่</Text>
            <TextInput
              value={newQuestion}
              onChangeText={setNewQuestion}
              placeholder="พิมพ์คำถามของคุณ"
              style={{
                borderColor: "#d1d5db",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 10,
                marginBottom: 10,
              }}
            />
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, marginBottom: 5 }}>ประเภทคำถาม:</Text>
              <Button
                title={`ประเภท: ${newQuestionType === "multiple-choice" ? "ตัวเลือก" : "คำตอบสั้น"}`}
                onPress={() =>
                  setNewQuestionType(newQuestionType === "multiple-choice" ? "short-answer" : "multiple-choice")
                }
                color="#007bff"
              />
            </View>
            {newQuestionType === "multiple-choice" && (
              <>
                {newChoices.map((choice, index) => (
                  <TextInput
                    key={index}
                    value={choice}
                    onChangeText={(text) => {
                      const updatedChoices = [...newChoices];
                      updatedChoices[index] = text;
                      setNewChoices(updatedChoices);
                    }}
                    placeholder={`${index + 1}`}
                    style={{
                      borderColor: "#d1d5db",
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      marginBottom: 5,
                    }}
                  />
                ))}
                <Text style={{ fontSize: 16, marginBottom: 5 }}>เลือกคำตอบที่ถูกต้อง:</Text>
                <View
                  style={{
                    borderColor: "#d1d5db",
                    borderWidth: 1,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                >
                  <Picker
                    selectedValue={newCorrectAnswer}
                    onValueChange={(itemValue) => setNewCorrectAnswer(itemValue)}
                  >
                    <Picker.Item label="กรุณาเลือกคำตอบที่ถูกต้อง" value="" />
                    {newChoices.map((choice, index) => (
                      <Picker.Item key={index} label={choice || ` ${index + 1}`} value={choice} />
                    ))}
                  </Picker>
                </View>
              </>
            )}
            {newQuestionType === "short-answer" && (
              <TextInput
                value={newCorrectAnswer}
                onChangeText={setNewCorrectAnswer}
                placeholder="คำตอบที่ถูกต้อง"
                style={{
                  borderColor: "#d1d5db",
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  marginBottom: 10,
                }}
              />
            )}
            <Button title="เพิ่มคำถาม" onPress={handleAddQuestion} color="#4CAF50" />
          </View>
        )}

        {/* คำถามแบบตัวเลือก */}
        <View style={{ width: "100%" }}>
          {multipleChoiceQuestions.map((item, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              {editingQuestion.type === "multiple-choice" && editingQuestion.index === index ? (
                <>
                  <TextInput
                    value={tempQuestion}
                    onChangeText={setTempQuestion}
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      marginBottom: 10,
                      borderColor: "#d1d5db",
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                  />
                  {tempChoices.map((choice, choiceIndex) => (
                    <TextInput
                      key={choiceIndex}
                      value={choice}
                      onChangeText={(text) => {
                        const updatedChoices = [...tempChoices];
                        updatedChoices[choiceIndex] = text;
                        setTempChoices(updatedChoices);
                      }}
                      placeholder={`ตัวเลือกที่ ${choiceIndex + 1}`}
                      style={{
                        borderColor: "#d1d5db",
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginBottom: 5,
                      }}
                    />
                  ))}
                  <Text style={{ fontSize: 16, marginBottom: 5 }}>เลือกคำตอบที่ถูกต้อง:</Text>
                  <View
                    style={{
                      borderColor: "#d1d5db",
                      borderWidth: 1,
                      borderRadius: 8,
                      marginBottom: 10,
                    }}
                  >
                    <Picker
                      selectedValue={tempCorrectAnswer}
                      onValueChange={(itemValue) => setTempCorrectAnswer(itemValue)}
                    >
                      <Picker.Item label="กรุณาเลือกคำตอบที่ถูกต้อง" value="" />
                      {tempChoices.map((choice, choiceIndex) => (
                        <Picker.Item key={choiceIndex} label={choice || `ตัวเลือกที่ ${choiceIndex + 1}`} value={choice} />
                      ))}
                    </Picker>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Button title="Confirm" onPress={confirmEditing} color="#4CAF50" />
                    <Button title="Cancel" onPress={cancelEditing} color="#FF5733" />
                  </View>
                </>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600", flex: 1 }}>{item.question}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setEditingQuestion({ type: "multiple-choice", index });
                      setTempQuestion(item.question);
                      setTempChoices(item.choices);
                      setTempCorrectAnswer(item.correctAnswer);
                    }}
                  >
                    <Icon name="edit" size={24} color="#007bff" />
                  </TouchableOpacity>
                </View>
              )}
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
              {editingQuestion.type === "short-answer" && editingQuestion.index === index ? (
                <>
                  <TextInput
                    value={tempQuestion}
                    onChangeText={setTempQuestion}
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      marginBottom: 10,
                      borderColor: "#d1d5db",
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                  />
                  <TextInput
                    value={tempCorrectAnswer}
                    onChangeText={setTempCorrectAnswer}
                    placeholder="คำตอบที่ถูกต้อง"
                    style={{
                      borderColor: "#d1d5db",
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      marginBottom: 10,
                    }}
                  />
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Button title="Confirm" onPress={confirmEditing} color="#4CAF50" />
                    <Button title="Cancel" onPress={cancelEditing} color="#FF5733" />
                  </View>
                </>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600", flex: 1 }}>{item.question}</Text>
                  <TouchableOpacity
                    onPress={() => startEditing("short-answer", index, item.question, null, item.correctAnswer)}
                  >
                    <Icon name="edit" size={24} color="#007bff" />
                  </TouchableOpacity>
                </View>
              )}
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

export default PostTestScreen;
