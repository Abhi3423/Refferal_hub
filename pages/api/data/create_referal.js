import { db } from "../../../database/firestoreConfig";
import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";

export default async function createUser(req, res) {
  try {
    const { email, refForm } = req.body;

    const user = collection(db, "referral");
    const q = query(user, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      await addDoc(user, {
        email,
        refForm,
      });
    }

    const user1 = collection(db, "refferar");
    const q1 = query(user1, where("email", "==", email));
    const querySnapshot1 = await getDocs(q1);
    if (!querySnapshot1.empty) {
      const docRef = querySnapshot1.docs[0];
      console.log(docRef.id);
      // const docSnap = await getDoc(docRef.ref);
      await updateDoc(docRef.ref, {
        refForm,
      });
      res
        .status(200)
        .json({ message: "Document written with ID: ", id: docRef.id });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding document: ", error: error.message });
  }
}
