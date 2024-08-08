import { getDatabase, ref, push, update, set } from "firebase/database";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

// https://firebase.google.com/docs/firestore/manage-data/add-data

/**
 * Appends lesson plan ID to the array of lesson plan IDs for the event object.
 * @param {} eventID the ID of the event we are adding the lesson plan to
 * @param {*} lessonPlanId the ID of the lesson plan we are adding to the event
 */
async function addLessonPlanIDToEvent(eventID, lessonPlanId) {
  const db = getFirestore();
  const ref = doc(db, "events/", eventID);
  if (!ref) {
    console.error("Event not found!");
    return;
  }
  await updateDoc(ref, {
    lesson_plan_ids: arrayUnion(lessonPlanId),
  });
}

/**
 * Adds lesson plan object to firebase.
 * @param {*} eventID the ID of the event we are attaching this to
 * @param {*} lessonPlanObject the actual lesson plan object. Contains title, teacher, description, link, etc...
 */
export async function addLessonPlanToFirebase(eventID, lessonPlanObject) {
  //console.log("Adding lesson plan object to firebase. Event id and lesson plan object are " + eventID + " " + lessonPlanObject);
  const db = getFirestore();
  console.log(lessonPlanObject);

  // Add a new document with an auto generated id, then attach it to its respective event.
  const docRef = await addDoc(collection(db, "lessonPlans"), lessonPlanObject);
  console.log("Document written with ID: ", docRef.id);
  await addLessonPlanIDToEvent(eventID, docRef.id);
}
