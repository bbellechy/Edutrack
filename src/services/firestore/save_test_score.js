import { firestore } from "../../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const save_test_score = async (score, studentID, testResultID, test_id) => {
  const sID = `S${studentID.toString().padStart(6, "0")}`;
  let subjectName = "";
  if (test_id == "1") {
    subjectName = "Math"
  } else if (test_id == "2") {
    subjectName = "Science"
  } else if (test_id == "3") {
    subjectName = "Thai"
  }
  try {
    await addDoc(collection(firestore, `TestResult/Q77OT8TXVsEZsQ1dTFEm/${subjectName}`), {
      score: score,
      studentID: sID,
      subject: subjectName,
      testResultID: testResultID,
      testType: "pre-test",
      test_date: Timestamp.fromDate(new Date()),
      test_id: test_id,
    });
    console.log("Saved Data Successfully to ", subjectName);
  } catch (error) {
    console.log("Error saving data: ", error);
  }
};

export default save_test_score;