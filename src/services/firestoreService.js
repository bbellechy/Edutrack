import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

// ฟังก์ชันดึงข้อมูลจาก `Parents`
export const getParentsData = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "Parents"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching Parents data:", error);
    return [];
  }
};

// ฟังก์ชันดึงข้อมูลจาก `Students`
export const getStudentsData = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "Students"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching Students data:", error);
    return [];
  }
};

// ฟังก์ชันดึงข้อมูลจาก `Tests`
export const getTestsData = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "Tests"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching Tests data:", error);
    return [];
  }
};

// ฟังก์ชันดึงข้อมูลจากทุกคอลเล็กชัน
export const getAllData = async () => {
  try {
    const parentsData = await getParentsData();
    const studentsData = await getStudentsData();
    const testResultsData = await getTestResults();
    const testsData = await getTestsData();

    console.log("logggg",     parentsData, studentsData, testResultsData, testsData)
    return {
      parents: parentsData,
      students: studentsData,
      testResults: testResultsData,
      tests: testsData
    };
  } catch (error) {
    console.error("Error fetching all data:", error);
    return {
      parents: [],
      students: [],
      testResults: [],
      tests: []
    };
  }
};

// ฟังก์ชันดึงข้อมูลจาก nested collection
const getNestedTestResults = async (parentDocRef) => {
  try {
    const subCollections = await parentDocRef.listCollections();
    let results = [];

    for (const subCollection of subCollections) {
      const querySnapshot = await getDocs(subCollection);
      results = results.concat(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }

    return results;
  } catch (error) {
    console.error("Error fetching nested TestResult data:", error);
    return [];
  }
};

// ฟังก์ชันดึงข้อมูลจาก `TestResult` (รวม nested collection)
export const getTestResults = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "TestResult"));
    let allResults = [];

    for (const doc of querySnapshot.docs) {
      // ดึงข้อมูลจาก nested collection
      const mathResults = await getDocs(collection(doc.ref, "Math"));
      const scienceResults = await getDocs(collection(doc.ref, "Science"));
      const thaiResults = await getDocs(collection(doc.ref, "Thai"));

      // รวมผลลัพธ์
      allResults = allResults.concat(
        mathResults.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        scienceResults.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        thaiResults.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    }

    return allResults;
  } catch (error) {
    console.error("Error fetching TestResult data:", error);
    return [];
  }
};