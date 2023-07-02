import { db } from "../../../database/firestoreConfig";
import { collection, getDocs, addDoc, where, query,updateDoc } from "firebase/firestore";

export default async function temp(req,res){

    try {
        const adminEmail=req.body.adminEmail;
        const userEmail=req.body.userEmail;
        const resumeScore=req.body.resumeScore;
        const name=req.body.name;
        // console.log(req.body);
        const q = query(collection(db, "refferar"), where("email", "==", adminEmail));
        const querySnapshot = await getDocs(q);
        const data={};
        const docRef = querySnapshot.docs[0];
        querySnapshot.forEach((doc) => {
            data.referal_request=doc.data().referal_request;
        }
        );
        const referal_request=data.referal_request;
       referal_request.push({userEmail:userEmail,resumeScore:resumeScore,name:name});
       await updateDoc(docRef.ref, {
        referal_request: referal_request,
      });
      res.send({msg:"success"});

    } catch (error) {
        console.log(error);
    }
}