import { db } from "../../../database/firestoreConfig";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";

export default async function createUser(req, res) {

  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const user = collection(db, "refferar");
        const querySnapshot = await getDocs(user);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        return res.status(200).json(users);
      } catch (error) {
        res.status(400).json({ message: "Error retrieving documents", error: error.message });
      }
      break;


    case "POST":
      try {
        const data = req.body;

        const user = collection(db, "refferar");
        const q = query(user, where("email", "==", data?.email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          const docRef = await addDoc(user, {
            ...data,
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

      break
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;

  }

}
