import { db } from "../../../database/firestoreConfig";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";

export default async function createUser(req, res) {
  try {
    const { data } = req.body;
    console.log(data.email)
    const user = collection(db, "refferar");
    const q = query(user, where("email", "==", data.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const docRef = await addDoc(user, {
        data,
      });
      res
        .status(200)
        .json({ message: "Document written with ID: ", id: docRef.id });
    } else {
      res.status(200).json({ message: "User already exists" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding document: ", error: error.message });
  }
}
