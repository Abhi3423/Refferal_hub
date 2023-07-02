import { db } from "../../../database/firestoreConfig";
import { collection, getDocs, addDoc, where, query,updateDoc } from "firebase/firestore";

export default async function temp(req,res){

    try {
        const adminEmail=req.body.adminEmail;
        const userEmail=req.body.userEmail;
        const name=req.body.name;
        const q = query(collection(db, "refferar"), where("email", "==", adminEmail));
        const querySnapshot = await getDocs(q);
        const data={};
        const docRef = querySnapshot.docs[0];
        querySnapshot.forEach((doc) => {
            data.referal_accepted=doc.data().referal_accepted;
        });
        var referal_accepted=data.referal_accepted;
        if(referal_accepted==undefined){
            referal_accepted=[];
        }
        referal_accepted.push({userEmail,name});
        var referal_request=[];
        await updateDoc(docRef.ref, {
            referal_accepted: referal_accepted,
            referal_request:referal_request
          });
          res.send({msg:"success"});

    } catch (error) {
        console.log(error);
    }
}