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

    const groupedBySubject = testResultsData.reduce((acc, item) => {
      if (!acc[item.subject]) {
          acc[item.subject] = [];
      }
      acc[item.subject].push(item);
      return acc;
  }, {});
  
  // เรียงคะแนนภายในแต่ละวิชา
  for (const subject in groupedBySubject) {
      groupedBySubject[subject].sort((a, b) => b.score - a.score); // เรียงจากมากไปน้อย
  }
  
  // แสดงผลลัพธ์
  console.log("groupedBySubject", groupedBySubject);
  console.log(groupedBySubject["Thai"]);
    
    return {
      parents: parentsData,
      students: studentsData,
      testResults: testResultsData,
      tests: testsData,
      groupedBySubject: groupedBySubject
    };
  } catch (error) {
    console.error("Error fetching all data:", error);
    return {
      parents: [],
      students: [],
      testResults: [],
      tests: [],
      groupedBySubject: []
    };
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