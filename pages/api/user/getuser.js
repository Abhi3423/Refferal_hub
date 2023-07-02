import { db } from "../../../database/firestoreConfig";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";

export default async function temp(req, res) {
  try {
    const { email } = await req.body;
    console.log(email);
    //find user with email id
    const q = query(collection(db, "refferar"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    let data = {};

    querySnapshot.forEach((doc) => {
      data.id = doc.id;
      data.name = doc.data().name;
      data.email = doc.data().email;
      data.phone = doc.data()?.personal.phone;
      data.personal = doc.data().personal;
      data.referal_accepted = doc.data().referal_accepted;
      data.company = doc.data().company;
      data.referal_request = doc.data().referal_request;
      data.photo = doc.data().photo;
      data.userType = doc.data().userType;
    });
    res.status(200).json({ message: "success", data: data });
  } catch (error) {
    res.status(400).json({ message: "error", data: error });
    console.log(error);
  }
}
