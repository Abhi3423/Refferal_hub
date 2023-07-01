import { db } from "../../../database/firestoreConfig";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";


export default async function temp(req,res){
    try {
       const email=await req.body.email;
       //find user with email id 
         const q = query(collection(db, "refferar"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            const data={};
            querySnapshot.forEach((doc) => {
                data.id=doc.id;
                data.name=doc.data().name;
                data.email=doc.data().email;
                data.phone=doc.data().phone;
                data.referal_accepted=doc.data().referal_accepted;
                data.referal_request=doc.data().referal_request;
            });
            res.status(200).json({message:"success",data:data});

    } catch (error) {
        console.log(error);
    }
}