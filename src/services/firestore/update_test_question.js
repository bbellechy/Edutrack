import { getFirestore, doc, updateDoc } from "firebase/firestore";
import app from "../../firebase";

const update_test_question = async ( subject, questionID, newQuestion) => {
  try {
    if (typeof newQuestion !== "object" || newQuestion === null) {
      throw new Error("Invalid question data. Expected an object.");
    }

    const db = getFirestore(app);
    const questionRef = doc(db, "Tests", "oCA2gAV8NVIQpx6z8Ed1", subject, questionID);
    await updateDoc(questionRef, newQuestion);
  } catch (error) {
    console.error("Error updating question: ", error);
    throw error;
  }
};

export default update_test_question;
