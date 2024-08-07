import { getDatabase, ref, push, update, set } from "firebase/database";
import { getFirestore } from "firebase/firestore";

/**
 * Adds lesson plan ID to the array of lesson plan IDs for the event object.
 * @param {} eventID the ID of the event we are adding the lesson plan to
 * @param {*} lessonPlanID the ID of the lesson plan we are adding to the event
 */
function addLessonPlanIDToEvent(eventID, lessonPlanID) {
  //get existing event data. Look for event ID
  const db = getDatabase();
  const ref = ref(db, '/events/' + eventID);
  if (!ref) {
    console.error("Event not found! How possible??");
    return;
  }
  ref.update({ lessonPlanIDs: firebase.database.ServerValue.arrayUnion([lessonPlanID]) });
}

/**
 * Adds lesson plan object to firebase.
 * @param {*} eventID the ID of the event we are attaching this to
 * @param {*} lessonPlanObject the actual lesson plan object. Contains title, teacher, description, link, etc...
 */
export function addLessonPlanToFirebase(eventID, lessonPlanObject) {
  console.log("ATTEMPTING TO DO SOMETGHING");
  //add lesson plan object
  const db = getDatabase();
  set(ref(db, 'lessonPlans/'), {
    lessonPlanObject,
  })
  .then((snapshot) => {
      //attach lesson plan to event by adding its ID to the array of lesson plans for an event
    addLessonPlanIDToEvent(eventID, snapshot.key);
    console.log("write successful");
    // Data saved successfully!
  })
  .catch((error) => {
    // The write failed...
    console.log('write failed');
  });
  console.log("jksdlhrajknasd");
}
