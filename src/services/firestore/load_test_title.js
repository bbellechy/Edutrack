import { firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const load_test_title = async (subject) => {
    try {
        const testRef = doc(firestore, `Tests/oCA2gAV8NVIQpx6z8Ed1/${subject}/meta`);
        const snapshot = await getDoc(testRef);

        if (snapshot.exists()) {
            const test = {  
                id: snapshot.id,
                ...snapshot.data()
            };
            console.log("Loaded test successfully:", test);
            return test;
        } else {
            console.log("No such test found!");
            return null;
        }
    } catch (error) {
        console.error("Error loading test:", error);
        return null;
    }
};
export default load_test_title;
