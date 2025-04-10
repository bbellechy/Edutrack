import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const load_test = async (subject) => {
  try {
    const questionsRef = collection(
      firestore,
      `Tests/oCA2gAV8NVIQpx6z8Ed1/${subject}`
    );
    const snapshot = await getDocs(questionsRef);

    const questions = snapshot.docs.filter((doc) => doc.id !== "meta" && doc.data().question !== "").map((doc) => ({

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
