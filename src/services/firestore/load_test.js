import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const load_test = async (test_id) => {
  try {
    const questionsRef = collection(
      firestore,
      `Tests/${test_id}/questions`
    );
    const snapshot = await getDocs(questionsRef);

    const questions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Loaded questions successfully");
    return questions;
  } catch (error) {
    console.error("Error loading questions:", error);
    return [];
  }
};

export default load_test;
