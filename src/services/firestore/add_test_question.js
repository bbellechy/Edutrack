import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../../firebase";

const add_test_question = async (subject, questionData) => {
  try {
    const db = getFirestore(app);
    const questionRef = await addDoc(collection(db, "Tests", "oCA2gAV8NVIQpx6z8Ed1", subject), questionData);
    return questionRef.id;
  } catch (error) {
    console.error("Error adding question: ", error);
    throw error;
  }
};

export default add_test_question;
