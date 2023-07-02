import { db } from "../../../database/firestoreConfig";
import { collection, getDocs, addDoc, where, query,updateDoc } from "firebase/firestore";

export default async function temp(req,res){
    try {
        //get all the referals
        const q = query(collection(db, "referral"));
        const querySnapshot = await getDocs(q);
        var data=[];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        // console.log(data);
        res.status(200).json({ message: "success", data: data });

    } catch (error) {
        console.log(error);
    }
}