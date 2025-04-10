import { firestore } from "../../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const save_test_score = async (score, studentID, testResultID, test_id, subjectName, test_type) => {
  const sID = `S${studentID.toString().padStart(6, "0")}`;

  try {
    await addDoc(collection(firestore, `TestResult/Q77OT8TXVsEZsQ1dTFEm/${subjectName}`), {
      score: score,
      studentID: sID,
      subject: subjectName,
      testResultID: testResultID,
      testType: test_type,
      test_date: Timestamp.fromDate(new Date()),
      test_id: test_id,
    });
    console.log("Saved Data Successfully to", test_type, subjectName, "StudentID:", sID, "Score:", score, "testResultID:", testResultID, "test_id:", test_id);
  } catch (error) {
    console.log("Error saving data: ", error);
  }
};

export default save_test_score;