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

// ฟังก์ชันดึงข้อมูลจาก `TestResult`
export const getTestResults = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "TestResult"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching TestResult data:", error);
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
